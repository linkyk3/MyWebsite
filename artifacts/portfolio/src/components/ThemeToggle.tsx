import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

// Shared hook so both inline + fixed instances share localStorage state
function useTheme() {
  const [isLight, setIsLight] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'dark' ? false : true;
  });
  useEffect(() => {
    document.documentElement.classList.toggle('light', isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }, [isLight]);
  return { isLight, toggle: () => setIsLight((v) => !v) };
}

const Icon = ({ isLight, size = 11 }: { isLight: boolean; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <defs>
      <clipPath id="ttg-right"><rect x="6" y="0" width="6" height="12" /></clipPath>
      <clipPath id="ttg-left"><rect x="0" y="0" width="6" height="12" /></clipPath>
    </defs>
    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
    <circle cx="6" cy="6" r="5" fill="currentColor" clipPath={isLight ? 'url(#ttg-left)' : 'url(#ttg-right)'} />
  </svg>
);

/** Inline variant — used inside the Home footer row */
export function ThemeToggleInline() {
  const { isLight, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      data-testid="theme-toggle"
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', display: 'flex', alignItems: 'center' }}
    >
      <Icon isLight={isLight} size={18} />
    </button>
  );
}

/** Fixed variant — shown on all pages except home (which has the inline version) */
export function ThemeToggle() {
  const { isLight, toggle } = useTheme();
  const [location] = useLocation();
  if (location === '/' || location === '/projects') return null;

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      data-testid="theme-toggle"
      style={{ position: 'fixed', bottom: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--color-foreground, #fff)', display: 'flex', alignItems: 'center', zIndex: 9999, opacity: 0.5 }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
    >
      <Icon isLight={isLight} />
    </button>
  );
}
