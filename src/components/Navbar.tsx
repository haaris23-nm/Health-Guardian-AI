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
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-[#151C2C] border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Drawer Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDrawerHandler}
            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors focus:outline-hidden"
            title="Open Menu"
            aria-label="Toggle navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 cursor-pointer" onClick={toggleDrawerHandler}>
            <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-sm flex items-center justify-center">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100 block leading-none">
                HealthMate <span className="text-indigo-600 font-extrabold">AI</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider block mt-0.5">
                Sleek Health Platform
              </span>
            </div>
          </div>
        </div>

        {/* Center: Current Section Tag (Hidden on mobile) */}
        <div className="hidden md:flex items-center px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-wide">
          {activeView.toUpperCase().replace('_', ' ')}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Android & Flask Code Vault Button */}
          <button
            onClick={onOpenCodeVault}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 text-xs font-semibold transition-all shadow-xs"
            title="Android & Flask Source Code"
          >
            <Code2 className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">Source Code</span>
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={toggleThemeHandler}
            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>

          {/* User Badge / Profile */}
          <div
            onClick={onOpenProfile}
            className="flex items-center gap-2 cursor-pointer group p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="hidden lg:flex flex-col items-end pr-1">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Alex Johnson</span>
              <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">Premium Member</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-sm ring-2 ring-indigo-100 dark:ring-indigo-950">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
