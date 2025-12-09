import React from 'react';

const FloatingChatButton = () => {
  return (
    <a
      href="http://pf.kakao.com/_xiJxmxdG/chat"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: 100,
        right: 16,
        width: 52,
        height: 52,
        borderRadius: 26,
        background: '#FEE500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 99,
        textDecoration: 'none',
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#3C1E1E">
        <path d="M12 3C6.48 3 2 6.58 2 11c0 2.62 1.69 4.94 4.27 6.38L5 21l4.41-2.31C10.25 18.89 11.11 19 12 19c5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
      </svg>
    </a>
  );
};

export default FloatingChatButton;
