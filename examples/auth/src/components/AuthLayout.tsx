/**
 * @file AuthLayout.tsx
 * @description 登录/注册页面共享的布局组件：渐变背景 + 装饰色块 + 居中卡片
 * @author Dev Agent
 * @date 2026-04-20
 */
import { Box, Card, CardContent } from '@mui/material';
import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f5f3ff 100%)',
        position: 'relative',
        overflow: 'hidden',
        px: 2,
        py: 4,
      }}
    >
      {/* 装饰色块 A：左上角蓝紫圆形 */}
      <Box
        sx={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: '#6366f1',
          filter: 'blur(80px)',
          opacity: 0.15,
          top: -100,
          left: -100,
          pointerEvents: 'none',
        }}
      />
      {/* 装饰色块 B：右下角紫色椭圆 */}
      <Box
        sx={{
          position: 'absolute',
          width: 300,
          height: 500,
          borderRadius: '50%',
          background: '#8b5cf6',
          filter: 'blur(60px)',
          opacity: 0.12,
          bottom: -150,
          right: -80,
          pointerEvents: 'none',
        }}
      />
      {/* 装饰色块 C：右上角浅紫圆形 */}
      <Box
        sx={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: '#a78bfa',
          filter: 'blur(50px)',
          opacity: 0.1,
          top: -40,
          right: 60,
          pointerEvents: 'none',
        }}
      />

      {/* 卡片容器 */}
      <Card
        elevation={0}
        sx={{
          maxWidth: 420,
          width: '100%',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <CardContent sx={{ py: 5, px: 4.5 }}>
          {children}
        </CardContent>
      </Card>
    </Box>
  );
}
