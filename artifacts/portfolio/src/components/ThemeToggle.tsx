import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(() => {
    return localStorage.getItem('theme') === 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isLight) {
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLight]);

  return (
    <button
      onClick={() => setIsLight((v) => !v)}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      data-testid="theme-toggle"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '28px',
        height: '28px',
        border: '1px solid currentColor',
        background: 'transparent',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        color: 'var(--color-foreground, #fff)',
        transition: 'opacity 0.15s',
        padding: 0,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      {/* Half-filled circle: ◐ = light, ◑ = dark */}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
        {/* Fill right half to indicate opposite mode available */}
        <path
          d={isLight ? 'M6 1 A5 5 0 0 1 6 11 Z' : 'M6 11 A5 5 0 0 1 6 1 Z'}
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
