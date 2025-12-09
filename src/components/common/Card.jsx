import React from 'react';
import { useTheme, tokens } from '../../contexts/ThemeContext';

const Card = ({ children, style, onClick }) => {
  const { colors } = useTheme();
  return (
    <div onClick={onClick} style={{
      background: colors.bgCard, borderRadius: tokens.radius.lg, padding: tokens.spacing.xl,
      boxShadow: `0 1px 3px ${colors.shadow}`, cursor: onClick ? 'pointer' : 'default',
      transition: 'background 0.2s', ...style
    }}>{children}</div>
  );
};

export default Card;
