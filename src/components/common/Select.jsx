import React from 'react';
import { useTheme, tokens } from '../../contexts/ThemeContext';

const Select = ({ value, onChange, options, placeholder }) => {
  const { colors } = useTheme();
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: tokens.spacing.md,
        border: `1px solid ${colors.border}`,
        borderRadius: tokens.radius.md,
        fontSize: tokens.fontSize.md,
        background: colors.bgCard,
        color: value ? colors.text : colors.textTertiary,
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      <option value="">{placeholder}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
};

export default Select;
