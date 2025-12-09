import React from 'react';
import { useTheme, tokens } from '../../contexts/ThemeContext';

const EmptyState = ({ icon, title, description }) => {
  const { colors } = useTheme();
  return (
    <div style={{ textAlign: 'center', padding: `${tokens.spacing.xxxl}px ${tokens.spacing.xl}px` }}>
      <div style={{ fontSize: 48, marginBottom: tokens.spacing.lg }}>{icon}</div>
      <div style={{
        fontSize: tokens.fontSize.lg, fontWeight: 600,
        color: colors.text, marginBottom: tokens.spacing.sm
      }}>{title}</div>
      <div style={{ fontSize: tokens.fontSize.md, color: colors.textTertiary }}>{description}</div>
    </div>
  );
};

export default EmptyState;
