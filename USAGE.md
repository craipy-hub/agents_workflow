# 使用指南

## 快速开始

在 VS Code 的 Copilot Chat 中，通过 `@` 调用 Agent。

---

## 场景一：从零开发新项目

```
@team-lead 帮我开发一个任务管理应用，支持：
- 任务的增删改查
- 任务分组和标签
- 拖拽排序
- 数据持久化到本地存储
```

**Team Lead 会自动执行完整流程：**
PM 需求分析 → Designer Figma 设计 → Dev 编码实现 → Tester 测试验证

---

## 场景二：给已有项目添加新功能

```
@team-lead 在当前项目中添加用户登录功能，要求：
- 支持邮箱和密码登录
- 登录表单有验证
- 登录成功后跳转到首页
- 记住登录状态
```

---

## 场景三：测试已有项目

### 全面测试

```
@team-lead 对当前项目进行全面的功能测试和操作流程测试
```

### 系统化测试（推荐）

```
@team-lead 我有一个已有项目，请：
1. PM 先分析现有项目的功能清单和核心流程
2. Tester 根据功能清单进行全面测试，包括截图验证
3. 汇总测试报告
```

### 快速测试某个功能

```
@tester 测试当前项目的登录功能，使用 Chrome 自动化截图
```

---

## 场景四：修复 Bug

### 简单 Bug

```
@team-lead 用户反馈：点击"删除"按钮后页面没有刷新，数据还在显示
```

Team Lead 会判断为小任务，直接 Dev → Tester。

### 复杂 Bug

```
@team-lead 用户反馈多个问题：
1. 偶尔登录后显示空白页
2. 大量数据时列表卡顿
3. 移动端布局错位
```

---

## 场景五：单独使用子 Agent

### PM：需求分析

```
@pm 分析以下需求并输出需求规格：
我们要做一个内部知识库系统，支持文档管理、搜索和权限控制
```

### Designer：UI 设计

```
@designer 为以下功能设计 UI（使用 Figma + MUI 规范）：
一个数据仪表盘页面，展示销售数据的图表和统计
```

### Dev：实现功能

```
@dev 实现一个 React 组件：用户列表表格
要求：使用 MUI DataGrid，支持排序、筛选和分页
```

### Tester：测试验证

```
@tester 使用 Chrome 自动化测试当前项目的首页：
1. 截图记录所有元素
2. 测试所有按钮和链接
3. 检查响应式布局
4. 生成 Playwright E2E 测试
```

---

## 场景六：代码审查

```
@tester 对 src/components/ 目录下的代码进行代码审查：
重点检查设计质量、安全性、性能和 MUI 使用规范
```

---

## 场景七：设计系统搭建

```
@designer 为当前项目搭建 MUI 设计系统：
1. 在 Figma 中创建组件库
2. 定义主题色、字体、间距规范
3. 创建常用组件（按钮、表单、卡片、导航）
4. 输出设计系统文档
```

---

## 场景八：性能优化

```
@team-lead 当前项目首页加载太慢，请：
1. Tester 进行性能分析（Lighthouse + Core Web Vitals）
2. Dev 根据分析结果进行优化
3. Tester 验证优化效果
```

---

## 产出物目录

所有工作产出自动保存到 `docs/` 目录：

```
docs/
├── requirements.md          # 需求规格
├── known-issues.md          # 已知问题
├── delivery-report.md       # 交付报告
├── ui-design/               # UI 设计文档
│   ├── style-guide.md
│   ├── components.md
│   ├── pages/
│   └── interactions/
├── dev-reports/             # 开发报告
└── test-reports/            # 测试报告
    └── screenshots/         # 测试截图
```

## 注意事项

- Team Lead 会根据任务规模自动选择流程（小任务跳过 PM/Designer）
- 所有代码变更会自动 git commit
- Bug 修复最多循环 3 轮，超出由 PM 仲裁
- 前端使用 Vite + React + MUI，Designer 使用 Figma
- 所有注释和文档使用中文
