# Dev Team Workflow — Copilot Agents 插件

四角色协作的软件开发工作流插件：一个主控编排者 + 四个专业子Agent，模拟真实软件开发团队的协作模式。

## 技术栈

- **前端**：Vite + React + TypeScript + MUI (Material UI)
- **设计**：Figma（通过 MCP 服务器直接操作画布）
- **测试**：Chrome 自动化截图 + Playwright E2E

## 依赖项

本插件引用了以下外部插件、Skills 和 MCP 服务。使用前请确保已安装。

### 必需插件

| 插件 | 来源 | 用于 Agent | 说明 |
|------|------|-----------|------|
| [superpowers](https://github.com/obra/superpowers) | `obra/superpowers` | Dev, PM | TDD、系统化调试、验证、头脑风暴等开发方法论 |
| [superpowers-chrome](https://github.com/obra/superpowers-chrome) | `obra/superpowers-chrome` | Tester | Chrome 浏览器自动化，截图、DOM 操作、表单填充 |
| [project-planning](https://github.com/github/awesome-copilot) | `github/awesome-copilot` (plugins/project-planning) | PM | Epic/Feature PRD、技术 Spike、实现计划 |
| [frontend-web-dev](https://github.com/github/awesome-copilot) | `github/awesome-copilot` (plugins/frontend-web-dev) | Tester | Playwright 网站探索和 E2E 测试生成 |

### 必需 MCP 服务

| MCP 服务 | 来源 | 用于 Agent | 说明 |
|----------|------|-----------|------|
| **Figma MCP Server** | [figma/mcp-server-guide](https://github.com/figma/mcp-server-guide) | Designer | 直接在 Figma 画布上创建/编辑设计，需要 Figma 账号和 API 连接 |

### 引用的 Agents（来自 awesome-copilot）

| Agent | 用于 | 说明 |
|-------|------|------|
| `gem-designer` | Designer | 通用 UI/UX 设计决策（布局、主题、色彩、可访问性） |
| `gem-designer-mobile` | Designer | 移动端设计规范（iOS HIG / Android Material Design 3） |
| `gem-browser-tester` | Tester | 视觉回归测试（基线截图对比） |
| `accessibility-runtime-tester` | Tester | 运行时无障碍测试（键盘导航、WCAG 合规） |
| `frontend-performance-investigator` | Tester | 前端性能分析（Core Web Vitals、Lighthouse） |
| `devtools-regression-investigator` | Tester | 回归 bug 复现与证据收集 |

### Figma Skills 清单

| Skill | 说明 |
|-------|------|
| `figma-use` | **强制前置** — Figma Plugin API 底层执行器 |
| `figma-generate-design` | 从需求创建完整屏幕设计 |
| `figma-generate-library` | 构建设计系统/组件库/变量令牌 |
| `figma-create-new-file` | 创建新的 Figma 文件 |
| `figma-create-design-system-rules` | 生成项目级设计系统规则 |
| `figma-code-connect` | Figma 组件与代码组件的映射 |

### 安装依赖

在 VS Code Extensions 视图中搜索 `@agentPlugins`，找到并安装以下插件：
- `obra/superpowers`
- `obra/superpowers-chrome`
- `github/awesome-copilot`（包含 project-planning、frontend-web-dev）
- `figma/mcp-server-guide`

## 安装

### 方式一：从源仓库安装（推荐）

1. 打开 VS Code
2. 打开命令面板（`⇧⌘P`）
3. 输入 `Chat: Install Plugin From Source`
4. 输入仓库地址：`https://github.com/craipy-hub/agents_workflow`
5. VS Code 会自动克隆并安装插件

### 方式二：添加到插件市场配置

在 `settings.json` 中添加：
```json
"chat.plugins.marketplaces": [
    "craipy-hub/agents_workflow"
]
```
然后在 Extensions 视图中搜索 `@agentPlugins` 即可找到并安装。

### 方式三：本地插件注册

```bash
# 克隆仓库
git clone https://github.com/craipy-hub/agents_workflow.git ~/my-plugins/agents_workflow
```

在 `settings.json` 中注册：
```json
"chat.pluginLocations": {
    "/Users/yourname/my-plugins/agents_workflow": true
}
```

### 方式四：项目级安装（仅当前项目可用）

将插件文件复制到项目中：

```bash
# 作为 git submodule
git submodule add https://github.com/craipy-hub/agents_workflow.git .github/copilot/agents_workflow

# 或直接克隆
mkdir -p .github/copilot
git clone https://github.com/craipy-hub/agents_workflow.git .github/copilot/agents_workflow
```

项目级安装的好处：
- 只在当前项目中生效，不影响其他项目
- 可以和项目代码一起版本控制
- 团队成员 clone 项目后自动获得这些 Agent

## 插件结构

```
agents_workflow/
├── plugin.json                      # 插件元数据（Copilot 格式）
├── .claude-plugin/plugin.json       # Claude Code 兼容
├── agents/                          # Agent 定义
│   ├── team-lead.agent.md           # 主控编排者
│   ├── project-manager.agent.md     # 项目经理
│   ├── designer.agent.md            # UI 设计师
│   ├── developer.agent.md           # 开发者
│   └── tester.agent.md              # 测试员
├── README.md
├── USAGE.md                         # 使用示例
└── LICENSE
```

## 架构概览

```
┌─────────────────────────────────────────┐
│              用户请求                     │
└──────────────────┬──────────────────────┘
                   ▼
┌─────────────────────────────────────────┐
│           🎯 Team Lead（主控）            │
│   • 分解任务  • 委派工作  • 验证结果      │
│   • 绝不亲自写代码                        │
└───┬─────────┬─────────┬─────────┬───────┘
    │         │         │         │
    ▼         ▼         ▼         ▼
┌───────┐ ┌─────────┐ ┌──────┐ ┌────────┐
│ 📋 PM │ │🎨Designer│ │💻 Dev│ │🔍 Tester│
│项目经理│ │ 设计师   │ │ 开发者│ │ 测试员  │
│       │ │         │ │      │ │        │
│• 需求  │ │• UI机会  │ │• 制定│ │• 代码  │
│  分析  │ │  分析    │ │  步骤│ │  审查  │
│• 进度  │ │• 界面    │ │• 编写│ │• 任务流│
│  规划  │ │  设计    │ │  代码│ │• 可用性│
│• 产品  │ │• 视觉    │ │• 实现│ │• 边界  │
│  边界  │ │  规范    │ │  功能│ │• 前端UI│
│• 用户  │ │• 交互    │ │• 自测│ │• 只报告│
│  故事  │ │  流程    │ │  验证│ │  不改码│
└───────┘ └─────────┘ └──────┘ └────────┘
```

## 工作流程

### 标准开发流程

```
 1. 用户提出需求
 2. Team Lead → 委派 PM 分析需求
 3. PM 输出需求规格 → 写入 docs/requirements.md
 4. Team Lead → 委派 Designer 进行 UI 设计（如有前端需求）
 5. Designer 输出设计稿 → 写入 docs/ui-design/
 6. Team Lead 审阅并拆解为开发任务
 7. Team Lead → 逐个委派 Dev 实现任务（附带设计稿）
 8. Dev 完成后 → Tester 先做代码审查（Code Review）
 9. 代码审查通过 → Tester 进行功能测试（任务流/可用性/边界/前端UI）
10. Tester 发现问题 → 反馈给 Dev 修复 → 再次验证（最多3轮）
11. 3轮未解决 → PM 仲裁（严重问题继续修/非关键推迟）
12. 里程碑完成 → PM 复审（检查需求满足度，评估是否调整计划）
13. 所有里程碑完成 → Tester 集成测试
14. Team Lead 汇总并向用户交付
```

### Bug 修复循环（最多3轮）

```
Tester 报告问题 → Dev 修复 → Tester 验证 → 通过/继续循环
                                              ↓ (3轮未通过)
                                         PM 仲裁优先级
```

### 分歧解决

```
Dev vs Tester 意见不一 → Team Lead 召唤 PM 仲裁 → 从产品价值角度决策
```

### 产出物管理

所有关键文档自动持久化到 `docs/` 目录：
```
docs/
├── requirements.md          # PM 的需求规格
├── known-issues.md          # 推迟处理的已知问题
├── delivery-report.md       # 最终交付报告
├── ui-design/               # Designer 的 UI 设计文档
│   ├── style-guide.md       # 视觉规范
│   ├── components.md        # 组件规范
│   ├── pages/               # 页面设计
│   └── interactions/        # 交互流程
├── dev-reports/             # Dev 每个任务的完成报告
│   ├── task-1-xxx.md
│   └── task-2-xxx.md
└── test-reports/            # Tester 的测试报告
    ├── task-1-xxx.md
    └── integration-test.md
```

## 包含的 Agents

| Agent | 文件 | 描述 | 集成 Skills |
|-------|------|------|-------------|
| Team Lead | `agents/team-lead.agent.md` | 纯编排者，分解任务、委派工作、验证结果、管理上下文传递 | - |
| PM | `agents/project-manager.agent.md` | 需求分析、进度规划、产品边界定义、里程碑复审 | superpowers 头脑风暴、Epic/Feature PRD、技术 Spike |
| Designer | `agents/designer.agent.md` | Figma UI 设计、MUI 规范、视觉规范、交互流程 | Figma MCP（6 个 skills）、gem-designer、MUI 设计系统 |
| Dev | `agents/developer.agent.md` | Vite+React+MUI 开发、TDD、编写代码、实现功能 | superpowers TDD/调试/验证/并行处理 |
| Tester | `agents/tester.agent.md` | 代码审查 + 截图测试 + E2E + 多角色测试 | Chrome 自动化、Playwright、性能/无障碍测试 |

## 使用方式

在 VS Code Copilot Chat 中，通过 `@` 调用 Agent：

```
@team-lead 帮我开发一个 TODO 应用，支持添加、删除、标记完成功能
```

Team Lead 会自动协调 PM、Designer、Dev、Tester 完成整个开发流程。

你也可以单独调用子 Agent：

```
@pm 分析一下这个项目的需求：[需求描述]
@designer 为这个功能设计 UI 界面：[功能描述]
@dev 实现这个功能：[功能描述]
@tester 测试一下当前项目的 [模块名]
```

## 设计理念

- **关注点分离**：每个 Agent 有明确的职责边界，不越界
- **质量内建**：代码审查 + 功能测试双重保障，嵌入每个迭代
- **上下文保真**：Agent 之间传递信息必须完整附原文，禁止概括压缩
- **多角色视角**：Tester 从普通用户、高级用户、恶意用户、运维四种视角测试
- **迭代式开发**：开发-审查-测试-修复的小循环（最多3轮），避免死循环
- **持续校准**：PM 在每个里程碑复审需求，确保方向不偏移
- **产出物持久化**：所有关键文档写入 `docs/`，不会丢失在对话中
- **代码零接触**：Team Lead 和 Tester 绝不修改源代码（Tester 可写独立测试脚本）

## 许可证

MIT
