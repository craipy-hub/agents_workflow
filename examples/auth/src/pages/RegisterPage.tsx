/**
 * @file RegisterPage.tsx
 * @description 注册页面，包含4个输入框、服务条款复选框、社交注册按钮和表单验证
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
  FormHelperText,
} from '@mui/material';
import {
  PersonOutline as PersonOutlineIcon,
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import AuthLayout from '../components/AuthLayout';

/** Google 图标 SVG */
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
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
}

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  /** 表单验证 */
  function validate(): boolean {
    const newErrors: FormErrors = {};

    // 用户名：必填，3-20字符
    if (!username.trim()) {
      newErrors.username = '请输入用户名';
    } else if (username.trim().length < 3 || username.trim().length > 20) {
      newErrors.username = '用户名需要3-20个字符';
    }

    // 邮箱：必填，有效格式
    if (!email.trim()) {
      newErrors.email = '请输入邮箱地址';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    // 密码：必填，至少8位，含大小写和数字
    if (!password) {
      newErrors.password = '请输入密码';
    } else if (password.length < 8) {
      newErrors.password = '密码至少需要8个字符';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = '密码需要包含大写字母、小写字母和数字';
    }

    // 确认密码：必填，与密码一致
    if (!confirmPassword) {
      newErrors.confirmPassword = '请再次输入密码';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }

    // 服务条款：必须勾选
    if (!agreeTerms) {
      newErrors.agreeTerms = '请阅读并同意服务条款';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  /** 模拟注册提交 */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // 模拟异步请求 1.5s
    setTimeout(() => {
      setLoading(false);
      alert(`注册成功！\n用户名: ${username}\n邮箱: ${email}`);
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
          创建账户
        </Typography>
        <Typography
          sx={{ color: '#64748b', textAlign: 'center', mb: 3, fontSize: '0.95rem' }}
        >
          填写以下信息注册
        </Typography>

        {/* 用户名 */}
        <TextField
          fullWidth
          label="用户名"
          placeholder="请输入用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!errors.username}
          helperText={errors.username}
          autoFocus
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon sx={{ color: '#94a3b8' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* 邮箱 */}
        <TextField
          fullWidth
          label="邮箱"
          type="email"
          placeholder="请输入邮箱地址"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon sx={{ color: '#94a3b8' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* 密码 */}
        <TextField
          fullWidth
          label="密码"
          type={showPassword ? 'text' : 'password'}
          placeholder="至少8位，含大小写和数字"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          sx={{ mb: 2 }}
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

        {/* 确认密码 */}
        <TextField
          fullWidth
          label="确认密码"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="请再次输入密码"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon sx={{ color: '#94a3b8' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                  size="small"
                  aria-label={showConfirmPassword ? '隐藏密码' : '显示密码'}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* 服务条款复选框 */}
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                size="small"
              />
            }
            label={
              <Typography sx={{ fontSize: '0.85rem', color: '#64748b' }}>
                我已阅读并同意{' '}
                <Link href="#" sx={{ color: '#6366f1', fontWeight: 600 }}>
                  服务条款
                </Link>
                {' '}和{' '}
                <Link href="#" sx={{ color: '#6366f1', fontWeight: 600 }}>
                  隐私政策
                </Link>
              </Typography>
            }
          />
          {errors.agreeTerms && (
            <FormHelperText error sx={{ ml: 4 }}>
              {errors.agreeTerms}
            </FormHelperText>
          )}
        </Box>

        {/* 注册按钮 */}
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
          {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : '注  册'}
        </Button>

        {/* 分隔线 */}
        <Divider sx={{ my: 3, color: '#94a3b8', fontSize: '0.85rem', '&::before, &::after': { borderColor: '#e2e8f0' } }}>
          或
        </Divider>

        {/* Google 注册 */}
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
          使用 Google 注册
        </Button>

        {/* GitHub 注册 */}
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
          使用 GitHub 注册
        </Button>

        {/* 登录链接 */}
        <Typography sx={{ textAlign: 'center', fontSize: '0.9rem', color: '#64748b' }}>
          已有账户?{' '}
          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            sx={{ color: '#6366f1', fontWeight: 600 }}
          >
            立即登录
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
