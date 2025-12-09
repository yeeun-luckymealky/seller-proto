import React from 'react';
import { useTheme, tokens } from '../../contexts/ThemeContext';

const Header = ({ title, onBack, right }) => {
  const { colors } = useTheme();
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: tokens.spacing.lg, background: colors.bgCard,
      borderBottom: `1px solid ${colors.border}`, position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
        {onBack && (
          <button onClick={onBack} style={{
            background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', padding: 4, color: colors.text
          }}>
            ←
          </button>
        )}
        <span style={{ fontSize: tokens.fontSize.xl, fontWeight: 700, color: colors.text }}>{title}</span>
      </div>
      {right}
    </div>
  );
};

export default Header;
