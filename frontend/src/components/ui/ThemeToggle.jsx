import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        background: 'none',
        border: '1px solid var(--color-border-base)',
        borderRadius: 'var(--radius-full)',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--color-text-muted)',
        transition: 'all var(--transition-fast)',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-brand-primary)'; e.currentTarget.style.color = 'var(--color-brand-primary)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-base)'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
    >
      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
};

export default ThemeToggle;
