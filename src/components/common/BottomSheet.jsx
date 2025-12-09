import React from 'react';
import { useTheme, tokens } from '../../contexts/ThemeContext';

const BottomSheet = ({ isOpen, onClose, title, children }) => {
  const { colors } = useTheme();
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, bottom: 0, left: 0, right: 0,
      zIndex: 1000, display: 'flex', justifyContent: 'center'
    }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: colors.overlay }} />
      <div style={{
        position: 'absolute', bottom: 0, width: '100%', maxWidth: 480,
        background: colors.bgElevated, borderRadius: `${tokens.radius.xl}px ${tokens.radius.xl}px 0 0`,
        maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: tokens.spacing.lg, borderBottom: `1px solid ${colors.border}` }}>
          <div style={{
            width: 40, height: 4, background: colors.gray300,
            borderRadius: 2, margin: '0 auto 12px'
          }} />
          <div style={{ fontSize: tokens.fontSize.lg, fontWeight: 700, color: colors.text }}>{title}</div>
        </div>
        <div style={{ padding: tokens.spacing.xl, overflowY: 'auto', flex: 1 }}>{children}</div>
      </div>
    </div>
  );
};

export default BottomSheet;
