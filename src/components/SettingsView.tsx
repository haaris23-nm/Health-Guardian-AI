import React from 'react';
import { Settings, Moon, Sun, Bell, ShieldCheck } from 'lucide-react';

interface SettingsViewProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  darkMode,
  setDarkMode,
}) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 font-sans">
      
      {/* Title */}
      <div className="flex items-center gap-3 border-b border-blue-100 dark:border-slate-800 pb-4">
        <div className="p-3 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Application Settings
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Manage UI theme preferences, medication alerts, and security settings.
          </p>
        </div>
      </div>

      <div className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 shadow-xs space-y-6">
        
        {/* Theme Settings */}
        <div className="flex items-center justify-between pb-4 border-b border-blue-50 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500">
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                Dark & Light Theme Mode
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Toggle application color theme
              </p>
            </div>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all cursor-pointer"
          >
            {darkMode ? 'Light Theme' : 'Dark Theme'}
          </button>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between pb-4 border-b border-blue-50 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                Push & Local Notifications
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Receive medication alerts and hydration reminders
              </p>
            </div>
          </div>

          <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600 cursor-pointer" />
        </div>

        {/* Security & Data Privacy */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                Data Privacy & Encryption
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Local HIPAA-compliant encrypted storage enabled
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-[10px]">
            Protected
          </span>
        </div>

      </div>

    </div>
  );
};
