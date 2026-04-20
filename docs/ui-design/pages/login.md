# 登录页面设计规范

> **设计状态：** 🔄 视觉重设计中（Figma 稿待更新）
> **Figma 文件：** [Login Page - AgentsWorkflow](https://www.figma.com/design/aGumSfmwEiHAZxmZn1WPKb) → "Login Page" 页面
> **fileKey：** `aGumSfmwEiHAZxmZn1WPKb`
> **Figma Node ID：** `31:2325` (Login Page - Desktop)
> **技术栈：** Vite + React + MUI (Material UI)
> **设计基准：** MUI 自定义主题（清新/现代风格）
> **配色方案：** 蓝紫渐变 Primary `#6366f1`→`#8b5cf6`，背景 `#f8fafc`

---

## 1. 页面概述

登录页面是用户进入应用的第一个接触点。设计目标：

- 简洁、专注，减少认知负担
- 居中卡片布局，视觉焦点明确
- **现代感与品质感**：渐变配色、柔和阴影、装饰性背景元素
- 覆盖所有交互状态（默认、加载中、错误）
- 移动端完美适配

---

## 2. 布局结构

```
┌──────────────────────────────────────────────────┐
│  (渐变背景 #f8fafc → #eef2ff)                      │
│                                                    │
│     ◯ 装饰色块 (蓝紫渐变, blur 80px, 左上)           │
│                                                    │
│         ┌────────────────────────────┐             │
│         │                            │             │
│         │    [Logo 64x64 蓝紫色]      │             │
│         │                            │             │
│         │      欢迎回来               │  ← 600wt   │
│         │   登录以继续使用             │  ← #64748b │
│         │                            │             │
│         │  用户名/邮箱                │             │
│         │  ┌────────────────────┐   │  ← 8px圆角  │
│         │  │                    │   │             │
│         │  └────────────────────┘   │             │
│         │                            │             │
│         │  密码                       │             │
│         │  ┌────────────────────┐   │             │
│         │  │                👁  │   │             │
│         │  └────────────────────┘   │             │
│         │                            │             │
│         │  ☑ 记住我        忘记密码?  │             │
│         │                            │             │
│         │  ┌════════════════════┐   │  ← 渐变按钮 │
│         │  │     登  录         │   │  #6366f1→   │
│         │  └════════════════════┘   │  #8b5cf6    │
│         │                            │             │
│         │  ──── 或 ────              │             │
│         │                            │             │
│         │  [Google 登录]              │             │
│         │  [GitHub 登录]              │             │
│         │                            │             │
│         │  没有账户? 立即注册          │             │
│         │                            │             │
│         └────────────────────────────┘             │
│                                                    │
│              ◯ 装饰色块 (紫色, blur 60px, 右下)      │
│                                                    │
└──────────────────────────────────────────────────┘
```

### 布局规格

| 属性 | 值 | MUI 实现 |
|------|-----|----------|
| 页面背景 | 柔和渐变 `linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f5f3ff 100%)` | `Box` with `sx={{ background: 'linear-gradient(...)' , minHeight: '100vh' }}` |
| 背景装饰 | 2-3 个半透明模糊色块（见下方 §2.1） | 绝对定位 `Box`，`filter: blur(...)`, `opacity: 0.3-0.5` |
| 居中方式 | Flex 垂直+水平居中 | `display: 'flex', justifyContent: 'center', alignItems: 'center'` |
| 卡片容器 | 白色，圆角 **20px**，多层柔和阴影 | `Card` with `sx={{ borderRadius: '20px', boxShadow: '...' }}` |
| 卡片宽度 | **420px** (桌面) / 100% - 32px (移动端) | `maxWidth: 420, width: '100%'` |
| 卡片内间距 | **40px** (top/bottom), **36px** (left/right) | `CardContent` with `sx={{ py: 5, px: 4.5 }}` |

### 2.1 背景装饰元素

在页面背景中放置半透明的模糊几何色块，营造深度感和品牌调性：

| 元素 | 形状 | 尺寸 | 位置 | 颜色 | 模糊 | 透明度 |
|------|------|------|------|------|------|--------|
| 色块 A | 圆形 | 400x400px | 左上角 (-100, -100) | `#6366f1` | `blur(80px)` | 0.15 |
| 色块 B | 椭圆 | 300x500px | 右下角 (-80, -150) | `#8b5cf6` | `blur(60px)` | 0.12 |
| 色块 C | 圆形 | 200x200px | 右上角 (60, -40) | `#a78bfa` | `blur(50px)` | 0.10 |

```tsx
// 实现参考
<Box sx={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%',
  background: '#6366f1', filter: 'blur(80px)', opacity: 0.15,
  top: -100, left: -100, pointerEvents: 'none' }} />
```

---

## 3. 组件清单

### 3.1 Logo 占位符

| 属性 | 值 |
|------|-----|
| 类型 | `Box` 或 `Avatar` |
| 尺寸 | 64 x 64px |
| 位置 | 卡片顶部居中 |
| 下方间距 | 20px (`mb: 2.5`) |
| 占位样式 | **蓝紫渐变圆角方块** (`linear-gradient(135deg, #6366f1, #8b5cf6)`, borderRadius **16px**) + 白色字母 "A" (28px, Bold) |
| 阴影 | `0 4px 16px rgba(99, 102, 241, 0.3)` — Logo 自带品牌色阴影 |

### 3.2 页面标题

| 属性 | 值 |
|------|-----|
| MUI 组件 | `Typography` |
| variant | `h5` |
| 文案 | "欢迎回来" |
| 对齐 | 居中 `textAlign: 'center'` |
| **字重** | **600** (`fontWeight: 600`) |
| **颜色** | `#1e293b` (slate-800) |
| 下方间距 | 8px |
| 副标题 | `Typography variant="body2"` — "登录以继续使用" |
| **副标题颜色** | **`#64748b`** (slate-500) — 与标题形成明显对比 |
| 副标题下方间距 | 28px (`mb: 3.5`) |

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
| **圆角** | **8px** (`sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}`) |
| **Focus 发光** | `0 0 0 3px rgba(99, 102, 241, 0.15)` — 聚焦时主色发光环 |
| **Focus 边框** | `#6366f1` — 主色替代默认蓝 |
| 下方间距 | 20px (`mb: 2.5`) |

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
| **圆角** | **8px** |
| **Focus 发光** | `0 0 0 3px rgba(99, 102, 241, 0.15)` |
| 下方间距 | 12px (`mb: 1.5`) |

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
| **Checkbox 选中色** | **`#6366f1`** — 使用主色 |
| 右侧 | `Link` variant="body2" — "忘记密码?" |
| **链接颜色** | **`#6366f1`** — 使用主色 |
| hover | 下划线 + `#4f46e5` (加深) |
| 下方间距 | 28px (`mb: 3.5`) |

### 3.6 登录按钮

| 属性 | 值 |
|------|-----|
| MUI 组件 | `Button` |
| variant | `contained` |
| size | `large` |
| fullWidth | `true` |
| 文案 | "登  录" |
| **字重** | **500** |
| **字号** | **16px** |
| **背景** | **`linear-gradient(135deg, #6366f1, #8b5cf6)`** — 蓝紫渐变 |
| **圆角** | **10px** (`borderRadius: '10px'`) |
| **阴影** | `0 4px 16px rgba(99, 102, 241, 0.35)` — 品牌色阴影 |
| **Hover 阴影** | `0 6px 24px rgba(99, 102, 241, 0.45)` — 浮起效果 |
| **Hover 背景** | `linear-gradient(135deg, #4f46e5, #7c3aed)` — 加深渐变 |
| **高度** | **48px** |
| 下方间距 | 28px (`mb: 3.5`) |
| disableElevation | `true` (使用自定义阴影) |

```tsx
// 实现参考
<Button
  variant="contained"
  fullWidth
  size="large"
  sx={{
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    borderRadius: '10px',
    height: 48,
    fontSize: '16px',
    fontWeight: 500,
    textTransform: 'none',
    boxShadow: '0 4px 16px rgba(99, 102, 241, 0.35)',
    '&:hover': {
      background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
      boxShadow: '0 6px 24px rgba(99, 102, 241, 0.45)',
    },
  }}
>
  登  录
</Button>
```

### 3.7 分隔线

| 属性 | 值 |
|------|-----|
| MUI 组件 | `Divider` |
| 文案 | "或" |
| 样式 | 左右线条 + 中间文字 |
| **文字颜色** | `#94a3b8` (slate-400) |
| **线条颜色** | `#e2e8f0` (slate-200) |
| 实现 | `<Divider sx={{ color: '#94a3b8', '&::before, &::after': { borderColor: '#e2e8f0' } }}>或</Divider>` |
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
| **圆角** | **10px** |
| **边框颜色** | `#e2e8f0` (slate-200) |
| 文字颜色 | `#334155` (slate-700) |
| **Hover 背景** | `#f8fafc` (slate-50) |
| **高度** | **44px** |
| 下方间距 | 12px (`mb: 1.5`) |

#### GitHub 登录

| 属性 | 值 |
|------|-----|
| MUI 组件 | `Button` |
| variant | `contained` |
| fullWidth | `true` |
| 文案 | "使用 GitHub 登录" |
| startIcon | `<GitHubIcon />` |
| **圆角** | **10px** |
| 背景颜色 | `#24292e` (GitHub 品牌色) |
| 文字颜色 | `#ffffff` |
| hover 背景 | `#1b1f23` |
| **高度** | **44px** |

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

## 6. 视觉规范（清新/现代主题）

### 6.1 色彩

| 用途 | 色值 | 说明 |
|------|------|------|
| **主色（起始）** | `#6366f1` | Indigo-500，渐变起点 |
| **主色（终止）** | `#8b5cf6` | Violet-500，渐变终点 |
| **主色深** | `#4f46e5` | Hover / Active 状态 |
| **主色浅** | `rgba(99, 102, 241, 0.08)` | 选中背景、subtle highlight |
| **主色发光** | `rgba(99, 102, 241, 0.15)` | Input focus ring |
| 错误色 | `#ef4444` | Red-500 |
| 警告色 | `#f59e0b` | Amber-500 |
| 成功色 | `#10b981` | Emerald-500 |
| **页面背景** | `linear-gradient(135deg, #f8fafc, #eef2ff, #f5f3ff)` | 柔和渐变 |
| 卡片背景 | `#ffffff` | 纯白 |
| **主文字** | `#1e293b` | Slate-800 |
| **次要文字** | `#64748b` | Slate-500 |
| **禁用文字** | `#94a3b8` | Slate-400 |
| **边框/分隔线** | `#e2e8f0` | Slate-200 |

### 6.2 排版

| 用途 | MUI variant | 字号 | **字重** | **颜色** |
|------|-------------|------|----------|----------|
| 页面标题 | `h5` | 24px / 1.5rem | **600** | `#1e293b` |
| 副标题 | `body2` | 14px / 0.875rem | 400 | **`#64748b`** |
| 输入框标签 | `body1` | 16px / 1rem | 400 | `#475569` |
| **按钮文字** | `button` | **16px** / 1rem | **500** | `#ffffff` |
| 辅助文字 | `caption` | 12px / 0.75rem | 400 | `#94a3b8` |
| **链接** | `body2` | 14px | **500** | **`#6366f1`** |

### 6.3 间距

基础单位：8px（MUI spacing(1) = 8px）

| 位置 | 间距 | spacing 值 |
|------|------|------------|
| 卡片上下内间距 | **40px** | `5` |
| 卡片左右内间距 | **36px** | `4.5` |
| 输入框之间 | **20px** | `2.5` |
| 按钮区域上方 | **28px** | `3.5` |
| 第三方按钮之间 | 12px | `1.5` |
| 分隔线上下 | **28px** | `3.5` |
| Logo 到标题 | **20px** | `2.5` |

### 6.4 圆角与阴影

| 元素 | 圆角 | 阴影 |
|------|------|------|
| **卡片** | **20px** | **`0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)`** — 多层柔和阴影 |
| **输入框** | **8px** | Focus: `0 0 0 3px rgba(99,102,241,0.15)` |
| **主按钮** | **10px** | `0 4px 16px rgba(99,102,241,0.35)` — 品牌色阴影 |
| **第三方按钮** | **10px** | 无 |
| **Logo** | **16px** | `0 4px 16px rgba(99,102,241,0.3)` |

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
- **背景装饰色块在移动端缩小或隐藏**（减少渲染负担）

---

## 8. 无障碍性 (a11y)

| 要求 | 实现 |
|------|------|
| 颜色对比度 | 所有文字与背景对比度 ≥ 4.5:1 (WCAG AA)。主色 `#6366f1` 在白底上对比度 ~4.6:1 ✅ |
| 焦点指示 | `0 0 0 3px rgba(99,102,241,0.15)` 发光环 + `#6366f1` 边框 |
| ARIA 标签 | 密码可见性按钮：`aria-label="切换密码可见性"` |
| 表单标签 | 使用 TextField 的 `label` prop（自动关联 `<label>`) |
| 错误提示 | `aria-describedby` 自动关联 `helperText` |
| 键盘操作 | 完整的 Tab 导航序列 |
| 屏幕阅读器 | Alert 使用 `role="alert"` 自动播报错误 |

---

## 9. MUI 主题自定义（新增）

```tsx
// theme.ts — 清新/现代主题配置
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',       // Indigo-500
      dark: '#4f46e5',       // Indigo-600
      light: '#818cf8',      // Indigo-400
      contrastText: '#ffffff',
    },
    error: { main: '#ef4444' },
    warning: { main: '#f59e0b' },
    success: { main: '#10b981' },
    text: {
      primary: '#1e293b',    // Slate-800
      secondary: '#64748b',  // Slate-500
      disabled: '#94a3b8',   // Slate-400
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    divider: '#e2e8f0',
  },
  shape: {
    borderRadius: 8,          // 全局默认圆角
  },
  typography: {
    fontFamily: '"Inter", "Noto Sans SC", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 600, color: '#1e293b' },
    body2: { color: '#64748b' },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#6366f1',
          },
          '&.Mui-focused': {
            boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#cbd5e1',
          '&.Mui-checked': { color: '#6366f1' },
        },
      },
    },
  },
});
```

---

## 10. React 组件结构建议

```
LoginPage/
├── LoginPage.tsx              // 页面容器（渐变背景 + 装饰色块 + 居中布局）
├── LoginCard.tsx              // 白色卡片容器（圆角20px + 多层阴影）
├── LoginForm.tsx              // 表单逻辑（状态管理、验证、提交）
├── PasswordField.tsx          // 密码输入框（含显示/隐藏逻辑）
├── SocialLoginButtons.tsx     // 第三方登录按钮组
├── BackgroundDecoration.tsx   // 背景装饰色块组件
└── LoginPage.test.tsx         // 测试文件
```

---

## 11. Figma 设计稿状态

> **设计状态：** 🔄 Figma 设计稿已有基础版本，待视觉升级
> **Figma 文件：** [AgentsWorkflow](https://www.figma.com/design/aGumSfmwEiHAZxmZn1WPKb)
> **Node ID：** `31:2325` (Login Page - Desktop)
>
> **待执行的 Figma 更新：**
> 1. 页面背景：将 `#f5f5f5` 纯色替换为柔和渐变 + 装饰性色块
> 2. 卡片：圆角从 12px 增大到 20px，阴影升级为多层柔和阴影
> 3. Logo：颜色从 `#1a75d1` 改为蓝紫渐变 `#6366f1→#8b5cf6`
> 4. 主按钮：纯色改为渐变 + 品牌色阴影
> 5. 输入框：圆角增大到 8px，添加 focus 发光效果
> 6. 所有链接/强调色从 `#1976d2` 改为 `#6366f1`
> 7. 标题字重从 400 改为 600，副标题颜色改为 `#64748b`
>
> **阻塞：** Figma MCP 工具当前不可用，待连接后执行上述更新
