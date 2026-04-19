# 登录页面设计规范

> **设计状态：** ⚠️ Figma 设计稿待创建（Figma MCP 工具不可用）
> **技术栈：** Vite + React + MUI (Material UI)
> **设计基准：** MUI 默认主题

---

## 1. 页面概述

登录页面是用户进入应用的第一个接触点。设计目标：

- 简洁、专注，减少认知负担
- 居中卡片布局，视觉焦点明确
- 覆盖所有交互状态（默认、加载中、错误）
- 移动端完美适配

---

## 2. 布局结构

```
┌──────────────────────────────────────────────┐
│                                              │
│              (渐变/纯色背景)                   │
│                                              │
│         ┌──────────────────────┐             │
│         │                      │             │
│         │     [Logo 占位符]     │             │
│         │      64x64px         │             │
│         │                      │             │
│         │  ─────────────────── │             │
│         │                      │             │
│         │  用户名/邮箱          │             │
│         │  ┌──────────────┐   │             │
│         │  │              │   │             │
│         │  └──────────────┘   │             │
│         │                      │             │
│         │  密码                 │             │
│         │  ┌──────────────┐   │             │
│         │  │          👁  │   │             │
│         │  └──────────────┘   │             │
│         │                      │             │
│         │  ☑ 记住我    忘记密码? │             │
│         │                      │             │
│         │  ┌──────────────┐   │             │
│         │  │   登  录     │   │             │
│         │  └──────────────┘   │             │
│         │                      │             │
│         │  ──── 或 ────        │             │
│         │                      │             │
│         │  ┌──────────────┐   │             │
│         │  │ G  Google 登录│   │             │
│         │  └──────────────┘   │             │
│         │  ┌──────────────┐   │             │
│         │  │ ⌥ GitHub 登录 │   │             │
│         │  └──────────────┘   │             │
│         │                      │             │
│         └──────────────────────┘             │
│                                              │
└──────────────────────────────────────────────┘
```

### 布局规格

| 属性 | 值 | MUI 实现 |
|------|-----|----------|
| 页面背景 | `#f5f5f5` (grey[100]) | `Box` with `sx={{ bgcolor: 'grey.100', minHeight: '100vh' }}` |
| 居中方式 | Flex 垂直+水平居中 | `display: 'flex', justifyContent: 'center', alignItems: 'center'` |
| 卡片容器 | 白色，圆角 8px，阴影 | `Card` with `elevation={3}` |
| 卡片宽度 | 400px (桌面) / 100% - 32px (移动端) | `maxWidth: 400, width: '100%'` |
| 卡片内间距 | 32px (top/bottom), 24px (left/right) | `CardContent` with `sx={{ p: 4, px: 3 }}` |

---

## 3. 组件清单

### 3.1 Logo 占位符

| 属性 | 值 |
|------|-----|
| 类型 | `Box` 或 `Avatar` |
| 尺寸 | 64 x 64px |
| 位置 | 卡片顶部居中 |
| 下方间距 | 24px (`mb: 3`) |
| 占位样式 | 圆形灰底 + 文字 "Logo" |

### 3.2 页面标题

| 属性 | 值 |
|------|-----|
| MUI 组件 | `Typography` |
| variant | `h5` |
| 文案 | "登录" |
| 对齐 | 居中 `textAlign: 'center'` |
| 下方间距 | 8px |
| 副标题 | `Typography variant="body2" color="text.secondary"` — "登录到您的账户" |

### 3.3 用户名/邮箱输入框

| 属性 | 值 |
|------|-----|
| MUI 组件 | `TextField` |
| variant | `outlined` |
| label | "用户名或邮箱" |
| placeholder | "请输入用户名或邮箱地址" |
| fullWidth | `true` |
| autoComplete | `"email"` |
| autoFocus | `true` |
| InputProps | `startAdornment: <PersonOutlineIcon />` |
| 下方间距 | 16px (`mb: 2`) |

### 3.4 密码输入框

| 属性 | 值 |
|------|-----|
| MUI 组件 | `TextField` |
| variant | `outlined` |
| label | "密码" |
| type | 动态切换 `"password"` / `"text"` |
| fullWidth | `true` |
| autoComplete | `"current-password"` |
| InputProps.startAdornment | `<LockOutlinedIcon />` |
| InputProps.endAdornment | `<IconButton>` 包含 `<Visibility />` 或 `<VisibilityOff />` |
| 下方间距 | 8px (`mb: 1`) |

**密码可见性切换行为：**
- 默认隐藏（type="password"）
- 点击眼睛图标切换显示/隐藏
- 图标状态随密码可见性同步变化
- `aria-label="切换密码可见性"` 确保无障碍

### 3.5 "记住我" + "忘记密码" 行

| 属性 | 值 |
|------|-----|
| 布局 | `Box` with `display: 'flex', justifyContent: 'space-between', alignItems: 'center'` |
| 左侧 | `FormControlLabel` + `Checkbox` size="small" |
| 右侧 | `Link` variant="body2" — "忘记密码?" |
| 下方间距 | 24px (`mb: 3`) |

**"忘记密码" 链接：**
- 颜色：`primary` (MUI 默认蓝 `#1976d2`)
- hover: 下划线
- 点击行为：导航到密码重置页面

### 3.6 登录按钮

| 属性 | 值 |
|------|-----|
| MUI 组件 | `Button` |
| variant | `contained` |
| color | `primary` |
| size | `large` |
| fullWidth | `true` |
| 文案 | "登 录" |
| 下方间距 | 24px (`mb: 3`) |
| disableElevation | `false` |

### 3.7 分隔线

| 属性 | 值 |
|------|-----|
| MUI 组件 | `Divider` |
| 文案 | "或" |
| 样式 | 左右线条 + 中间文字 |
| 实现 | `<Divider>或</Divider>` (MUI 内置文字分隔线) |
| 下方间距 | 24px (`mb: 3`) |

### 3.8 第三方登录按钮

#### Google 登录

| 属性 | 值 |
|------|-----|
| MUI 组件 | `Button` |
| variant | `outlined` |
| fullWidth | `true` |
| 文案 | "使用 Google 登录" |
| startIcon | Google Logo SVG (多色) |
| 边框颜色 | `grey[300]` |
| 文字颜色 | `text.primary` |
| 下方间距 | 12px (`mb: 1.5`) |

#### GitHub 登录

| 属性 | 值 |
|------|-----|
| MUI 组件 | `Button` |
| variant | `outlined` |
| fullWidth | `true` |
| 文案 | "使用 GitHub 登录" |
| startIcon | `<GitHubIcon />` |
| 背景颜色 | `#24292e` (GitHub 品牌色) |
| 文字颜色 | `#ffffff` |
| hover 背景 | `#1b1f23` |

---

## 4. 状态设计

### 4.1 默认状态

- 所有输入框为空
- 登录按钮可点击（enabled）
- 无错误提示

### 4.2 加载中状态

| 元素 | 变化 |
|------|------|
| 登录按钮 | 文字替换为 `CircularProgress` (size=24, color="inherit") + "登录中..."，`disabled={true}` |
| 输入框 | `disabled={true}`，防止修改 |
| 第三方登录按钮 | `disabled={true}` |
| "忘记密码" 链接 | `pointer-events: none`, 颜色变灰 |

### 4.3 错误状态

#### 表单验证错误（前端）

| 场景 | 表现 |
|------|------|
| 用户名为空 | TextField `error={true}`, `helperText="请输入用户名或邮箱"` |
| 邮箱格式无效 | TextField `error={true}`, `helperText="请输入有效的邮箱地址"` |
| 密码为空 | TextField `error={true}`, `helperText="请输入密码"` |
| 密码过短 | TextField `error={true}`, `helperText="密码至少需要 8 个字符"` |

#### 服务端错误

| 场景 | 表现 |
|------|------|
| 用户名或密码错误 | 表单顶部显示 `Alert severity="error"` — "用户名或密码不正确" |
| 账户被锁定 | `Alert severity="warning"` — "您的账户已被临时锁定，请 30 分钟后再试" |
| 网络错误 | `Alert severity="error"` — "网络连接失败，请检查网络后重试" |
| 服务器错误 | `Alert severity="error"` — "服务器异常，请稍后再试" |

**Alert 组件规格：**
- MUI 组件：`Alert`
- 位置：Logo 下方，表单上方
- 动画：`Collapse` 包裹，展开/收起过渡
- 下方间距：16px

### 4.4 成功状态

- 登录成功后显示 `CircularProgress` 并自动跳转
- 无需独立的成功界面

---

## 5. 交互流程

### 5.1 主登录流程

```
1. 用户打开页面 → 用户名输入框自动获取焦点
2. 用户输入用户名 → 按 Tab 跳转到密码框
3. 用户输入密码 →（可选）点击眼睛图标查看密码
4. （可选）勾选 "记住我"
5. 用户点击 "登录" 按钮 或 按 Enter 键
   → 前端验证
     → 失败：显示字段级错误提示，焦点移到第一个错误字段
     → 通过：进入加载状态
       → API 请求
         → 成功：跳转到主页
         → 失败：显示 Alert 错误，恢复表单可编辑状态
```

### 5.2 第三方登录流程

```
1. 用户点击 "使用 Google 登录" / "使用 GitHub 登录"
2. 按钮进入 loading 状态（disabled + spinner）
3. 打开 OAuth 弹窗或重定向到第三方
4. 授权成功 → 自动跳转到主页
5. 授权失败/取消 → 恢复按钮状态，显示 Alert 提示
```

### 5.3 键盘导航

| 按键 | 行为 |
|------|------|
| Tab | 按顺序聚焦：用户名 → 密码 → 密码可见性图标 → 记住我 → 忘记密码 → 登录按钮 → Google → GitHub |
| Enter | 在任意输入框内按 Enter 触发表单提交 |
| Space | 在 Checkbox 上切换选中状态 |

---

## 6. 视觉规范（MUI 默认主题）

### 6.1 色彩

| 用途 | 色值 | MUI Token |
|------|------|-----------|
| 主色 | `#1976d2` | `primary.main` |
| 主色深 | `#1565c0` | `primary.dark` |
| 错误色 | `#d32f2f` | `error.main` |
| 警告色 | `#ed6c02` | `warning.main` |
| 成功色 | `#2e7d32` | `success.main` |
| 页面背景 | `#f5f5f5` | `grey.100` |
| 卡片背景 | `#ffffff` | `background.paper` |
| 主文字 | `rgba(0,0,0,0.87)` | `text.primary` |
| 次要文字 | `rgba(0,0,0,0.6)` | `text.secondary` |
| 禁用文字 | `rgba(0,0,0,0.38)` | `text.disabled` |

### 6.2 排版

| 用途 | MUI variant | 字号 | 字重 |
|------|-------------|------|------|
| 页面标题 | `h5` | 24px / 1.5rem | 400 |
| 副标题 | `body2` | 14px / 0.875rem | 400 |
| 输入框标签 | `body1` | 16px / 1rem | 400 |
| 按钮文字 | `button` | 14px / 0.875rem | 500 (大写) |
| 辅助文字 | `caption` | 12px / 0.75rem | 400 |

### 6.3 间距

基础单位：8px（MUI spacing(1) = 8px）

| 位置 | 间距 | spacing 值 |
|------|------|------------|
| 卡片上下内间距 | 32px | `4` |
| 卡片左右内间距 | 24px | `3` |
| 输入框之间 | 16px | `2` |
| 按钮区域上方 | 24px | `3` |
| 第三方按钮之间 | 12px | `1.5` |
| 分隔线上下 | 24px | `3` |

### 6.4 圆角与阴影

| 元素 | 圆角 | 阴影 |
|------|------|------|
| 卡片 | 8px (`borderRadius: 2`) | `elevation={3}` |
| 输入框 | 4px (MUI 默认) | 无 |
| 按钮 | 4px (MUI 默认) | contained 有阴影, outlined 无 |

---

## 7. 响应式设计

### 断点规格

| 断点 | 宽度范围 | 布局调整 |
|------|----------|----------|
| xs (移动端) | 0 - 599px | 卡片宽度 `100% - 32px`，内间距减小到 `p: 3, px: 2`，Logo 缩小到 48px |
| sm (小平板) | 600 - 899px | 卡片宽度 `400px`，正常间距 |
| md+ (桌面) | 900px+ | 卡片宽度 `400px`，完整布局 |

### 移动端适配要点

- 触控目标最小 48x48px（符合 WCAG 2.1）
- 输入框使用 `size="medium"` 确保可点击区域足够
- 密码可见性图标区域不小于 44x44px
- 第三方登录按钮高度不小于 48px
- 虚拟键盘弹出时，表单区域可滚动不被遮挡

---

## 8. 无障碍性 (a11y)

| 要求 | 实现 |
|------|------|
| 颜色对比度 | 所有文字与背景对比度 ≥ 4.5:1 (WCAG AA) |
| 焦点指示 | MUI 默认蓝色焦点环，不要覆盖 |
| ARIA 标签 | 密码可见性按钮：`aria-label="切换密码可见性"` |
| 表单标签 | 使用 TextField 的 `label` prop（自动关联 `<label>`) |
| 错误提示 | `aria-describedby` 自动关联 `helperText` |
| 键盘操作 | 完整的 Tab 导航序列 |
| 屏幕阅读器 | Alert 使用 `role="alert"` 自动播报错误 |

---

## 9. React 组件结构建议

```
LoginPage/
├── LoginPage.tsx              // 页面容器（背景、居中布局）
├── LoginCard.tsx              // 白色卡片容器
├── LoginForm.tsx              // 表单逻辑（状态管理、验证、提交）
├── PasswordField.tsx          // 密码输入框（含显示/隐藏逻辑）
├── SocialLoginButtons.tsx     // 第三方登录按钮组
└── LoginPage.test.tsx         // 测试文件
```

---

## 10. Figma 设计稿状态

> **⚠️ Figma 设计稿未创建**
>
> **原因：** Figma MCP 服务器未连接。`tool_search` 搜索以下关键词均返回空结果：
> - `mcp_com_figma`
> - `mcp figma create file`
> - `figma design generate`
>
> **影响步骤：**
> - ❌ 步骤 2: `mcp_com_figma_mcp_create_new_file` — 无法创建文件
> - ❌ 步骤 3: `mcp_com_figma_mcp_search_design_system` — 无法搜索组件
> - ❌ 步骤 4: `mcp_com_figma_mcp_use_figma` — 无法构建组件
> - ❌ 步骤 5: `mcp_com_figma_mcp_generate_figma_design` — 无法生成设计
> - ❌ 步骤 6: `mcp_com_figma_mcp_get_screenshot` — 无法截图验证
>
> **修复建议：**
> 1. 确认 Figma MCP 服务器已安装：`npx @anthropic/figma-mcp-server` 或同等方式
> 2. 在 VS Code MCP 设置中添加 Figma 服务器配置并提供 Figma Access Token
> 3. 重新加载 VS Code 窗口后重试
>
> **Figma 文件链接：** N/A（未创建）
> **设计截图：** N/A（未创建）
