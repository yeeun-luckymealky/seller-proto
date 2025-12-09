import React from 'react';
import { useTheme, tokens } from '../../contexts/ThemeContext';

const Badge = ({ children, variant = 'default' }) => {
  const { colors } = useTheme();
  const variants = {
    default: { bg: colors.gray100, color: colors.gray700 },
    primary: { bg: colors.blue50, color: colors.blue600 },
    success: { bg: colors.green50, color: colors.green600 },
    warning: { bg: colors.orange50, color: colors.orange500 },
    danger: { bg: colors.red50, color: colors.red600 },
  };
  const v = variants[variant];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '4px 8px',
      borderRadius: tokens.radius.sm, fontSize: tokens.fontSize.xs,
      fontWeight: 600, background: v.bg, color: v.color,
    }}>{children}</span>
  );
};

export default Badge;
