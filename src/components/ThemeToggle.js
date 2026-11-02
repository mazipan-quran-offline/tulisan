import React, { useState, useEffect } from 'react';

import { SunIcon, MoonIcon } from './icons';

// The inline script in html.js already applies the saved/system theme before
// first paint. This component only keeps React state in sync and persists
// the user's explicit choice.
const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'dark' || current === 'light') {
      setTheme(current);
    }
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      // storage unavailable (private mode); the choice still applies this visit
    }
  };

  return (
    <button
      type="button"
      className="icon-btn theme-toggle"
      onClick={mounted ? toggle : undefined}
      aria-pressed={theme === 'dark'}
      aria-label="Mode gelap"
      title={theme === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
    >
      <span className="theme-toggle__icon" key={theme}>
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
};

export default ThemeToggle;
