import React, { useState } from 'react';
import { useTheme, tokens } from '../../contexts/ThemeContext';

/**
 * AI 생성 버튼 컴포넌트 (토스 스타일)
 * @param {function} onGenerate - AI 생성 함수 (async)
 * @param {function} onResult - 결과 받았을 때 콜백
 * @param {string} label - 버튼 라벨
 * @param {boolean} disabled - 비활성화 여부
 */
const AIGenerateButton = ({ onGenerate, onResult, label = 'AI 추천', disabled = false }) => {
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
        gap: 4,
        padding: '6px 12px',
        background: loading ? colors.gray100 : colors.blue50,
        color: loading ? colors.gray400 : colors.blue500,
        border: 'none',
        borderRadius: tokens.radius.full,
        fontSize: tokens.fontSize.xs,
        fontWeight: 500,
        cursor: loading || disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.15s',
      }}
    >
      {loading ? '생성 중...' : label}
    </button>
  );
};

export default AIGenerateButton;
