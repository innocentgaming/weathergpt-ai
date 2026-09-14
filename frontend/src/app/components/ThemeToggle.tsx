"use client";

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'icon' | 'material' | 'button';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  variant = 'default' as unknown as 'material',
}) => {
  const { theme, toggleTheme, setTheme } = useTheme();

  if (variant === 'button') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex-1 py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
            theme === 'light'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Sun className="h-4 w-4 text-amber-500" />
          <span>Light Mode</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex-1 py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
            theme === 'dark'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Moon className="h-4 w-4 text-cyan-400" />
          <span>Dark Mode</span>
        </button>
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer ${
          theme === 'dark'
            ? 'bg-slate-800/90 border-slate-700 text-amber-300 hover:text-amber-200 hover:border-amber-400/50'
            : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-slate-900'
        } ${className}`}
        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label="Toggle interface theme"
      >
        {theme === 'dark' ? (
          <Sun className="h-4 w-4 text-amber-400" />
        ) : (
          <Moon className="h-4 w-4 text-indigo-600" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs select-none ${
        theme === 'dark'
          ? 'bg-slate-800/90 border-slate-700 text-slate-200 hover:border-amber-400/50 hover:bg-slate-800 shadow-[0_0_12px_rgba(245,158,11,0.1)]'
          : 'bg-slate-100/90 hover:bg-slate-200/90 border-slate-200 text-slate-700 hover:text-slate-900'
      } ${className}`}
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme mode"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="h-4 w-4 text-amber-400" />
          <span className="text-[11px] font-bold font-mono text-slate-200">Dark</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-indigo-600" />
          <span className="text-[11px] font-bold font-mono text-slate-700">Light</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
