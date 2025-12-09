import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const lightColors = {
  bg: '#F2F4F6', bgCard: '#FFFFFF', bgElevated: '#FFFFFF',
  gray50: '#F9FAFB', gray100: '#F2F4F6', gray200: '#E5E8EB',
  gray300: '#D1D6DB', gray400: '#B0B8C1', gray500: '#8B95A1',
  gray600: '#6B7684', gray700: '#4E5968', gray800: '#333D4B', gray900: '#191F28',
  blue50: '#E8F3FF', blue100: '#C9E2FF', blue500: '#3182F6', blue600: '#1B64DA',
  green50: '#E8FAF0', green100: '#B1F1CC', green500: '#16CC83', green600: '#0AB26F',
  red50: '#FFEBEE', red100: '#FFCDD2', red500: '#F44336', red600: '#E53935',
  orange50: '#FFF3E0', orange100: '#FFE0B2', orange500: '#FF9800',
  white: '#FFFFFF', text: '#191F28', textSecondary: '#6B7684', textTertiary: '#8B95A1',
  border: '#E5E8EB', shadow: 'rgba(0,0,0,0.08)', overlay: 'rgba(0,0,0,0.4)',
};

const darkColors = {
  bg: '#17171C', bgCard: '#1E1E24', bgElevated: '#2C2C35',
  gray50: '#2C2C35', gray100: '#3D3D47', gray200: '#4E4E59',
  gray300: '#6B6B78', gray400: '#8B8B98', gray500: '#A8A8B3',
  gray600: '#C5C5CD', gray700: '#DCDCE3', gray800: '#ECECF1', gray900: '#F9F9FB',
  blue50: '#1A2744', blue100: '#1E3A5F', blue500: '#4B96FF', blue600: '#6EADFF',
  green50: '#1A3328', green100: '#1E4D35', green500: '#4ADE80', green600: '#6EE7A0',
  red50: '#3D1A1A', red100: '#5C2626', red500: '#FF6B6B', red600: '#FF8A8A',
  orange50: '#3D2E1A', orange100: '#5C4326', orange500: '#FFB347', orange600: '#FFC56B',
  white: '#1E1E24', text: '#F9F9FB', textSecondary: '#C5C5CD', textTertiary: '#A8A8B3',
  border: '#3D3D47', shadow: 'rgba(0,0,0,0.3)', overlay: 'rgba(0,0,0,0.6)',
};

export const tokens = {
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 },
  radius: { sm: 8, md: 12, lg: 16, xl: 20, full: 9999 },
  fontSize: { xs: 11, sm: 12, md: 14, lg: 16, xl: 18, xxl: 20, xxxl: 24, xxxxl: 28 },
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mq.matches);
    const handler = (e) => setIsDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const colors = isDark ? darkColors : lightColors;
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
