/**
 * @file LoginPage.tsx
 * @description 登录页面，包含用户名/密码表单、社交登录按钮和表单验证
 * @author Dev Agent
 * @date 2026-04-20
 */
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Divider,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  PersonOutline as PersonOutlineIcon,
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import AuthLayout from '../components/AuthLayout';

/** Google 图标 SVG（MUI 没有内置 Google 图标） */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
    </svg>
  );
}

interface FormErrors {
  username?: string;
  password?: string;
}

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  /** 表单验证 */
  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!username.trim()) {
      newErrors.username = '请输入用户名或邮箱';
    }
    if (!password) {
      newErrors.password = '请输入密码';
    } else if (password.length < 8) {
      newErrors.password = '密码至少需要8个字符';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  /** 模拟登录提交 */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // 模拟异步请求 1.5s
    setTimeout(() => {
      setLoading(false);
      alert(`登录成功！\n用户名: ${username}\n记住我: ${rememberMe}`);
    }, 1500);
  }

  return (
    <AuthLayout>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/* Logo */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
            }}
          >
            <Typography sx={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>
              A
            </Typography>
          </Box>
        </Box>

        {/* 标题 */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: '#1e293b', textAlign: 'center', mb: 0.5 }}
        >
          欢迎回来
        </Typography>
        <Typography
          sx={{ color: '#64748b', textAlign: 'center', mb: 3, fontSize: '0.95rem' }}
        >
          登录以继续使用
        </Typography>

        {/* 用户名输入框 */}
        <TextField
          fullWidth
          label="用户名或邮箱"
          placeholder="请输入用户名或邮箱地址"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!errors.username}
          helperText={errors.username}
          autoFocus
          sx={{ mb: 2.5 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon sx={{ color: '#94a3b8' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* 密码输入框 */}
        <TextField
          fullWidth
          label="密码"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          sx={{ mb: 1.5 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon sx={{ color: '#94a3b8' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  size="small"
                  aria-label={showPassword ? '隐藏密码' : '显示密码'}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* 记住我 + 忘记密码 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                size="small"
              />
            }
            label={
              <Typography sx={{ fontSize: '0.875rem', color: '#64748b' }}>
                记住我
              </Typography>
            }
          />
          <Link
            href="#"
            underline="hover"
            sx={{ fontSize: '0.875rem', color: '#6366f1', fontWeight: 500 }}
          >
            忘记密码?
          </Link>
        </Box>

        {/* 登录按钮 */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            height: 48,
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '0.5em',
            '&:hover': {
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              boxShadow: '0 6px 20px rgba(99,102,241,0.45)',
            },
            '&.Mui-disabled': {
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              opacity: 0.7,
            },
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : '登  录'}
        </Button>

        {/* 分隔线 */}
        <Divider sx={{ my: 3, color: '#94a3b8', fontSize: '0.85rem', '&::before, &::after': { borderColor: '#e2e8f0' } }}>
          或
        </Divider>

        {/* Google 登录 */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{
            height: 44,
            borderRadius: '10px',
            borderColor: '#e2e8f0',
            color: '#1e293b',
            textTransform: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
            mb: 1.5,
            '&:hover': {
              borderColor: '#cbd5e1',
              background: '#f8fafc',
            },
          }}
        >
          使用 Google 登录
        </Button>

        {/* GitHub 登录 */}
        <Button
          fullWidth
          variant="contained"
          startIcon={<GitHubIcon />}
          sx={{
            height: 44,
            borderRadius: '10px',
            background: '#24292e',
            textTransform: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
            mb: 3,
            '&:hover': {
              background: '#1b1f23',
            },
          }}
        >
          使用 GitHub 登录
        </Button>

        {/* 注册链接 */}
        <Typography sx={{ textAlign: 'center', fontSize: '0.9rem', color: '#64748b' }}>
          没有账户?{' '}
          <Link
            component={RouterLink}
            to="/register"
            underline="hover"
            sx={{ color: '#6366f1', fontWeight: 600 }}
          >
            立即注册
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
