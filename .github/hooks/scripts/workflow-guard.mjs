import fs from 'node:fs';
import path from 'node:path';

function readStdin() {
  return new Promise((resolve, reject) => {
    let buffer = '';

    process.stdin.setEncoding('utf8');
    process.stdin.on('data', chunk => {
      buffer += chunk;
    });
    process.stdin.on('end', () => {
      if (!buffer.trim()) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(buffer));
      } catch (error) {
        reject(error);
      }
    });
    process.stdin.on('error', reject);
  });
}

function outputJson(payload = {}) {
  process.stdout.write(`${JSON.stringify(payload)}\n`);
}

function sanitizeSessionId(sessionId) {
  return String(sessionId || 'unknown-session').replace(/[^a-zA-Z0-9._-]/g, '_');
}

function getPaths(cwd, sessionId) {
  const stateDir = path.join(cwd, '.github', 'hooks', '.state');
  const safeSessionId = sanitizeSessionId(sessionId);

  return {
    stateDir,
    stateFile: path.join(stateDir, `${safeSessionId}.json`),
    logFile: path.join(stateDir, `${safeSessionId}.jsonl`)
  };
}

function createDefaultState(input) {
  return {
    sessionId: input.sessionId || 'unknown-session',
    createdAt: input.timestamp || new Date().toISOString(),
    lastSeenAt: input.timestamp || new Date().toISOString(),
    teamLead: {
      delegations: 0,
      todoUpdates: 0,
      userEscalations: 0,
      disallowedAttempts: 0,
      lastDelegatedAgent: null
    },
    subagents: {
      started: [],
      stopped: []
    }
  };
}

function ensureStateDirectory(paths) {
  fs.mkdirSync(paths.stateDir, { recursive: true });
}

function loadState(paths, input) {
  ensureStateDirectory(paths);

  if (!fs.existsSync(paths.stateFile)) {
    return createDefaultState(input);
  }

  try {
    const raw = fs.readFileSync(paths.stateFile, 'utf8');
    return JSON.parse(raw);
  } catch {
    return createDefaultState(input);
  }
}

function saveState(paths, state) {
  ensureStateDirectory(paths);
  fs.writeFileSync(paths.stateFile, `${JSON.stringify(state, null, 2)}\n`);
}

function appendLog(paths, eventName, input, details = {}) {
  ensureStateDirectory(paths);

  const record = {
    timestamp: input.timestamp || new Date().toISOString(),
    hookEventName: eventName,
    sessionId: input.sessionId || 'unknown-session',
    details
  };

  fs.appendFileSync(paths.logFile, `${JSON.stringify(record)}\n`);
}

function additionalContext(eventName, text) {
  return {
    hookSpecificOutput: {
      hookEventName: eventName,
      additionalContext: text
    }
  };
}

function denyTool(reason) {
  return {
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: reason
    }
  };
}

function blockStop(reason) {
  return {
    hookSpecificOutput: {
      hookEventName: 'Stop',
      decision: 'block',
      reason
    }
  };
}

function isTeamLeadRole() {
  return process.env.AGENT_ROLE === 'team-lead';
}

function isAllowedTeamLeadTool(toolName) {
  return new Set([
    'runSubagent',
    'run_subagent',
    'manage_todo_list',
    'manageTodoList',
    'vscode_askQuestions'
  ]).has(toolName);
}

function extractAgentName(toolInput) {
  if (!toolInput || typeof toolInput !== 'object') {
    return null;
  }

  return toolInput.agentName || toolInput.agent_name || toolInput.description || null;
}

async function main() {
  const input = await readStdin();
  const cwd = input.cwd || process.cwd();
  const paths = getPaths(cwd, input.sessionId);
  const eventName = input.hookEventName;

  if (!eventName) {
    outputJson({});
    return;
  }

  const state = loadState(paths, input);
  state.lastSeenAt = input.timestamp || new Date().toISOString();

  if (eventName === 'SessionStart') {
    saveState(paths, state);
    appendLog(paths, eventName, input, { source: input.source || 'unknown' });
    outputJson(additionalContext(eventName, 'Workflow guard active: delegate implementation work through subagents and keep artifact handoff explicit.'));
    return;
  }

  if (eventName === 'SubagentStart') {
    state.subagents.started.push({
      agentId: input.agent_id || null,
      agentType: input.agent_type || null,
      timestamp: input.timestamp || new Date().toISOString()
    });
    saveState(paths, state);
    appendLog(paths, eventName, input, {
      agentId: input.agent_id || null,
      agentType: input.agent_type || null
    });
    outputJson(additionalContext(eventName, 'Report back to Team Lead with concrete outputs, and only escalate to the user when a required tool or MCP dependency is blocked.'));
    return;
  }

  if (eventName === 'SubagentStop') {
    state.subagents.stopped.push({
      agentId: input.agent_id || null,
      agentType: input.agent_type || null,
      timestamp: input.timestamp || new Date().toISOString()
    });
    saveState(paths, state);
    appendLog(paths, eventName, input, {
      agentId: input.agent_id || null,
      agentType: input.agent_type || null,
      stopHookActive: Boolean(input.stop_hook_active)
    });
    outputJson({});
    return;
  }

  if (eventName === 'PreToolUse' && isTeamLeadRole()) {
    if (isAllowedTeamLeadTool(input.tool_name)) {
      outputJson({});
      return;
    }

    state.teamLead.disallowedAttempts += 1;
    saveState(paths, state);
    appendLog(paths, eventName, input, {
      toolName: input.tool_name || null,
      decision: 'deny'
    });
    outputJson(denyTool('Team Lead 只能直接委派子 Agent、维护 todo，或在工具故障场景下向用户确认。实现、编辑和检索工作必须交给子 Agent。'));
    return;
  }

  if (eventName === 'PostToolUse' && isTeamLeadRole()) {
    if (input.tool_name === 'runSubagent' || input.tool_name === 'run_subagent') {
      state.teamLead.delegations += 1;
      state.teamLead.lastDelegatedAgent = extractAgentName(input.tool_input);
    }

    if (input.tool_name === 'manage_todo_list' || input.tool_name === 'manageTodoList') {
      state.teamLead.todoUpdates += 1;
    }

    if (input.tool_name === 'vscode_askQuestions') {
      state.teamLead.userEscalations += 1;
    }

    saveState(paths, state);
    appendLog(paths, eventName, input, {
      toolName: input.tool_name || null,
      tracked: true,
      lastDelegatedAgent: state.teamLead.lastDelegatedAgent
    });
    outputJson({});
    return;
  }

  if (eventName === 'Stop' && isTeamLeadRole()) {
    saveState(paths, state);
    appendLog(paths, eventName, input, {
      stopHookActive: Boolean(input.stop_hook_active),
      delegations: state.teamLead.delegations,
      todoUpdates: state.teamLead.todoUpdates,
      userEscalations: state.teamLead.userEscalations
    });

    if (input.stop_hook_active) {
      outputJson({});
      return;
    }

    if (state.teamLead.todoUpdates > 0 && state.teamLead.delegations === 0 && state.teamLead.userEscalations === 0) {
      outputJson(blockStop('Team Lead 已开始编排流程，但还没有真正委派任何子 Agent。请先把工作交给 PM、Designer、Dev 或 Tester，再结束当前回合。'));
      return;
    }

    outputJson({});
    return;
  }

  saveState(paths, state);
  appendLog(paths, eventName, input, { ignored: true });
  outputJson({});
}

main().catch(error => {
  outputJson({
    systemMessage: `Workflow guard hook failed: ${error instanceof Error ? error.message : String(error)}`
  });
});
