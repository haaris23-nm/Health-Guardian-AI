import React from 'react';
import { Settings, Moon, Sun, Bell, ShieldCheck, Database, Smartphone } from 'lucide-react';

interface SettingsViewProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenCodeVault: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  darkMode,
  setDarkMode,
  onOpenCodeVault,
}) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      
      {/* Title */}
      <div className="flex items-center gap-3 border-b border-outline-light dark:border-outline-dark pb-4">
        <div className="p-3 rounded-2xl bg-surface-variant-light dark:bg-surface-variant-dark text-on-surface-light dark:text-on-surface-dark shadow-sm">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">
            Application Settings
          </h1>
          <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
            Manage UI theme, notification preferences, measurement units, and source code exports.
          </p>
        </div>
      </div>

      <div className="rounded-3xl p-6 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-sm space-y-6">
        
        {/* Theme Settings */}
        <div className="flex items-center justify-between pb-4 border-b border-outline-light/40 dark:border-outline-dark/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500">
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="font-bold text-sm text-on-surface-light dark:text-on-surface-dark">
                Dark & Light Theme Mode
              </h2>
              <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
                Toggle Material Design 3 color theme
              </p>
            </div>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-full bg-primary text-on-primary font-bold text-xs hover:bg-primary-dark transition-all"
          >
            {darkMode ? 'Light Theme' : 'Dark Theme'}
          </button>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between pb-4 border-b border-outline-light/40 dark:border-outline-dark/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-on-surface-light dark:text-on-surface-dark">
                Push & Local Notifications
              </h2>
              <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
                Receive medication alerts and water hydration reminders
              </p>
            </div>
          </div>

          <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary cursor-pointer" />
        </div>

        {/* Android & Flask Code Export */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-on-surface-light dark:text-on-surface-dark">
                Android Studio Java & Flask Code Export
              </h2>
              <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
                Inspect or copy the complete source codebase & REST backend files
              </p>
            </div>
          </div>

          <button
            onClick={onOpenCodeVault}
            className="px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container font-bold text-xs hover:bg-secondary-container/80 transition-all"
          >
            Open Code Vault
          </button>
        </div>

      </div>

    </div>
  );
};
