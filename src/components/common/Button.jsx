import React from 'react';
import { useTheme, tokens } from '../../contexts/ThemeContext';

const Button = ({ children, variant = 'primary', size = 'md', fullWidth, onClick, disabled, style }) => {
  const { colors } = useTheme();
  const variants = {
    primary: { bg: colors.blue500, color: '#FFFFFF' },
    secondary: { bg: colors.gray100, color: colors.text },
    ghost: { bg: 'transparent', color: colors.blue500 },
    danger: { bg: colors.red500, color: '#FFFFFF' },
    success: { bg: colors.green500, color: '#FFFFFF' },
  };
  const sizes = {
    sm: { padding: '8px 12px', fontSize: 13 },
    md: { padding: '12px 16px', fontSize: 15 },
    lg: { padding: '16px 20px', fontSize: 16 }
  };
  const v = variants[variant];
  const s = sizes[size];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? colors.gray200 : v.bg, color: disabled ? colors.gray400 : v.color,
      border: 'none', borderRadius: tokens.radius.md, padding: s.padding, fontSize: s.fontSize,
      fontWeight: 600, fontFamily: 'inherit', width: fullWidth ? '100%' : 'auto', cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s', ...style,
    }}>{children}</button>
  );
};

export default Button;
