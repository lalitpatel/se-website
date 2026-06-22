import React, { useEffect, useState } from 'react';
import { IoDesktopOutline, IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';

const STORAGE_KEY = 'se-theme';
const DEFAULT_THEME = 'system';
const THEME_ORDER = ['system', 'light', 'dark'];
const THEME_LABELS = {
  system: 'System',
  light: 'Light',
  dark: 'Dark'
};
const THEME_ICONS = {
  system: IoDesktopOutline,
  light: IoSunnyOutline,
  dark: IoMoonOutline
};

const applyTheme = theme => {
  if (theme === 'system') {
    document.documentElement.removeAttribute('data-theme');
    return;
  }

  document.documentElement.setAttribute('data-theme', theme);
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  const setStoredTheme = nextTheme => {
    setTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  };

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    const nextTheme = THEME_ORDER.includes(storedTheme) ? storedTheme : DEFAULT_THEME;
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  const onClick = () => {
    const currentIndex = THEME_ORDER.indexOf(theme);
    const nextTheme = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];
    setStoredTheme(nextTheme);
  };

  const currentIndex = THEME_ORDER.indexOf(theme);
  const nextTheme = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];
  const Icon = THEME_ICONS[theme];
  const label = `Theme: ${THEME_LABELS[theme]}. Click to switch to ${THEME_LABELS[nextTheme]}.`;

  return (
    <button className="button se-theme-toggle" type="button" aria-label={label} title={label} onClick={onClick}>
      <span className="icon">
        <Icon size="1.15em" aria-hidden="true" />
      </span>
    </button>
  );
};

export default ThemeToggle;
