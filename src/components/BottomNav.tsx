import React from 'react';
import { LayoutDashboard, Sparkles, Activity, Building2, Code2, Plus } from 'lucide-react';

interface BottomNavProps {
  currentView?: string;
  activeView?: string;
  onNavigate?: (view: string) => void;
  setActiveView?: (view: string) => void;
  onOpenFAB?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  activeView,
  onNavigate,
  setActiveView,
  onOpenFAB,
}) => {
  const active = currentView || activeView || 'dashboard';
  const navigateHandler = onNavigate || setActiveView || (() => {});

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'chatbot', label: 'AI Chat', icon: Sparkles },
    { id: 'fab', label: 'Quick Log', icon: Plus, isFab: true },
    { id: 'reports', label: 'Records', icon: Activity },
    { id: 'code_vault', label: 'Source', icon: Code2 },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 h-20 bg-white dark:bg-slate-900 border-t border-blue-100 dark:border-slate-800 px-4 flex justify-between items-center shadow-lg">
      <div className="flex justify-around items-center w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id || 
            (item.id === 'chatbot' && ['symptom_checker', 'diet_planner', 'workout_planner', 'chatbot'].includes(active));

          if (item.isFab) {
            return (
              <button
                key={item.id}
                onClick={onOpenFAB || (() => navigateHandler('dashboard'))}
                className="w-14 h-14 bg-blue-600 rounded-full shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center text-white -mt-10 border-4 border-white dark:border-slate-900 hover:scale-105 transition-transform"
                title="Quick Log"
              >
                <Plus className="w-7 h-7" />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => navigateHandler(item.id)}
              className="flex flex-col items-center gap-1 px-2 focus:outline-hidden group"
            >
              <div
                className={`p-1.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800 scale-105'
                    : 'text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-slate-300'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] font-bold tracking-tight transition-colors ${
                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

