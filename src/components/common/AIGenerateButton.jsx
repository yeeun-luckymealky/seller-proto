import React, { useState } from 'react';
import { useTheme, tokens } from '../../contexts/ThemeContext';

/**
 * AI 생성 버튼 컴포넌트
 * @param {function} onGenerate - AI 생성 함수 (async)
 * @param {function} onResult - 결과 받았을 때 콜백
 * @param {string} label - 버튼 라벨
 * @param {boolean} disabled - 비활성화 여부
 */
const AIGenerateButton = ({ onGenerate, onResult, label = 'AI 추천받기', disabled = false }) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading || disabled) return;

    setLoading(true);
    try {
      const result = await onGenerate();
      if (onResult) {
        onResult(result);
      }
    } catch (error) {
      console.error('AI 생성 실패:', error);
      alert('AI 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading || disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 14px',
        background: loading ? colors.gray200 : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: loading ? colors.gray500 : '#FFFFFF',
        border: 'none',
        borderRadius: tokens.radius.md,
        fontSize: tokens.fontSize.sm,
        fontWeight: 600,
        cursor: loading || disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        boxShadow: loading ? 'none' : '0 2px 8px rgba(102, 126, 234, 0.3)',
      }}
    >
      {loading ? (
        <>
          <span style={{
            display: 'inline-block',
            width: 14,
            height: 14,
            border: '2px solid #ccc',
            borderTopColor: '#666',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          생성 중...
        </>
      ) : (
        <>
          <span style={{ fontSize: 14 }}>✨</span>
          {label}
        </>
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};

export default AIGenerateButton;
