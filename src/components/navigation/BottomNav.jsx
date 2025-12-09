import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

// 아이콘 컴포넌트들
const IconHome = ({ active, color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? color : 'none'} stroke={color} strokeWidth="2">
    <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z" />
    <path d="M9 21V14H15V21" stroke={active ? '#FFFFFF' : color} strokeWidth="2" />
  </svg>
);

const IconOrder = ({ active, color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? color : 'none'} stroke={color} strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="7" y1="8" x2="17" y2="8" stroke={active ? '#FFFFFF' : color} />
    <line x1="7" y1="12" x2="17" y2="12" stroke={active ? '#FFFFFF' : color} />
    <line x1="7" y1="16" x2="12" y2="16" stroke={active ? '#FFFFFF' : color} />
  </svg>
);

const IconSettings = ({ active, color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
    {active && <>
      <circle cx="8" cy="6" r="2" fill={color} />
      <circle cx="16" cy="12" r="2" fill={color} />
      <circle cx="10" cy="18" r="2" fill={color} />
    </>}
  </svg>
);

const BottomNav = ({ activeTab, onChange }) => {
  const { colors } = useTheme();
  const tabs = [
    { id: 'home', label: '홈', Icon: IconHome },
    { id: 'orders', label: '주문', Icon: IconOrder },
    { id: 'settings', label: '전체', Icon: IconSettings },
  ];
  return (
    <div style={{
      position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)', maxWidth: 400, zIndex: 100,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '8px 16px',
        background: colors.bgCard, borderRadius: 50,
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
      }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const iconColor = isActive ? colors.gray800 : colors.gray400;
          return (
            <button key={tab.id} onClick={() => onChange(tab.id)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              background: 'none', border: 'none', cursor: 'pointer', padding: '8px 20px',
            }}>
              <tab.Icon active={isActive} color={iconColor} />
              <span style={{
                fontSize: 11, fontWeight: isActive ? 600 : 400,
                color: isActive ? colors.gray800 : colors.gray400,
              }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
