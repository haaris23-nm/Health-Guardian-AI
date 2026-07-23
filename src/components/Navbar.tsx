import React from 'react';
import { Menu, Sun, Moon, Code2, HeartPulse, User } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode?: () => void;
  setDarkMode?: (val: boolean) => void;
  onOpenDrawer?: () => void;
  onToggleDrawer?: () => void;
  onOpenCodeVault: () => void;
  onOpenProfile?: () => void;
  activeView?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  setDarkMode,
  onOpenDrawer,
  onToggleDrawer,
  onOpenCodeVault,
  onOpenProfile,
  activeView = 'dashboard',
}) => {
  const toggleDrawerHandler = onOpenDrawer || onToggleDrawer;
  const toggleThemeHandler = onToggleDarkMode || (() => setDarkMode && setDarkMode(!darkMode));

  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-slate-900 border-b border-blue-100 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Drawer Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDrawerHandler}
            className="p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors focus:outline-hidden"
            title="Open Menu"
            aria-label="Toggle navigation drawer"
          >
            <Menu className="w-5 h-5 text-blue-700 dark:text-blue-400" />
          </button>

          <div className="flex items-center gap-3 cursor-pointer" onClick={toggleDrawerHandler}>
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow-xs flex items-center justify-center">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white block leading-none">
                Health Guardian <span className="text-blue-600 font-black">AI</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider block mt-0.5">
                Medical & Wellness Platform
              </span>
            </div>
          </div>
        </div>

        {/* Center: Current Section Tag (Hidden on mobile) */}
        <div className="hidden md:flex items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-100 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wide">
          {activeView.toUpperCase().replace('_', ' ')}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Android & Flask Code Vault Button */}
          <button
            onClick={onOpenCodeVault}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-slate-700 text-xs font-bold transition-all border border-blue-100 dark:border-slate-700"
            title="Android & Flask Source Code"
          >
            <Code2 className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Source Code</span>
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={toggleThemeHandler}
            className="p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-blue-300" /> : <Moon className="w-5 h-5 text-blue-600" />}
          </button>

          {/* User Badge / Profile */}
          <div
            onClick={onOpenProfile}
            className="flex items-center gap-2 cursor-pointer group p-1 rounded-full hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="hidden lg:flex flex-col items-end pr-1">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Alex Johnson</span>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">Verified Patient</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs ring-2 ring-blue-100 dark:ring-blue-900">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
