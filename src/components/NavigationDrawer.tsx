import React from 'react';
import {
  LayoutDashboard,
  Scale,
  Droplet,
  Pill,
  Stethoscope,
  Utensils,
  Dumbbell,
  Smile,
  Building2,
  BarChart3,
  Bot,
  User,
  Settings,
  Code2,
  X,
  HeartPulse,
  Sparkles,
  ChevronRight,
  FileText
} from 'lucide-react';


interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeView?: string;
  currentView?: string;
  setActiveView?: (view: string) => void;
  onNavigate?: (view: string) => void;
  userName?: string;
  userEmail?: string;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  activeView,
  currentView,
  setActiveView,
  onNavigate,
  userName = 'Alex Johnson',
  userEmail = 'alex.johnson@healthmate.ai',
}) => {
  if (!isOpen) return null;

  const currentActive = currentView || activeView || 'dashboard';
  const selectHandler = onNavigate || setActiveView || (() => {});

  const drawerSections = [
    {
      title: 'Core Dashboard',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'reports', label: 'Health Reports & Charts', icon: BarChart3 },
        { id: 'profile', label: 'User Profile', icon: User },
        { id: 'settings', label: 'Settings', icon: Settings },
      ],
    },
    {
      title: 'AI Intelligence Suite',
      items: [
        { id: 'prescription', label: 'AI Prescription Reader', icon: FileText, badge: 'New' },
        { id: 'symptom_checker', label: 'AI Symptom Checker', icon: Stethoscope, badge: 'Gemini' },
        { id: 'diet_planner', label: 'AI Diet Planner', icon: Utensils, badge: 'Gemini' },
        { id: 'workout_planner', label: 'AI Workout Planner', icon: Dumbbell, badge: 'Gemini' },
        { id: 'chatbot', label: 'AI Health Chatbot', icon: Bot, badge: 'Gemini' },
      ],
    },
    {
      title: 'Health Trackers',
      items: [
        { id: 'bmi', label: 'BMI Calculator', icon: Scale },
        { id: 'water', label: 'Water Intake Tracker', icon: Droplet },
        { id: 'medicine', label: 'Medicine Reminders', icon: Pill },
        { id: 'mood', label: 'Mood & Mental Health', icon: Smile },
      ],
    },
    {
      title: 'Services & Developer Tools',
      items: [
        { id: 'hospitals', label: 'Nearby Hospitals & ER', icon: Building2 },
        { id: 'code_vault', label: 'Android & Flask Code Vault', icon: Code2, highlight: true },
      ],
    },
  ];

  const handleSelect = (id: string) => {
    selectHandler(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-80 max-w-[85vw] bg-white dark:bg-[#151C2C] h-full shadow-2xl flex flex-col z-10 overflow-hidden border-r border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
                HealthMate <span className="text-indigo-600">AI</span>
              </h2>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 block">Sleek Interface Platform</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <p className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">{userName}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{userEmail}</p>
          </div>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {drawerSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentActive === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all text-sm font-semibold ${
                        isActive
                          ? 'bg-indigo-600 text-white font-bold shadow-md'
                          : item.highlight
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-400 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300'}`}>
                          <Sparkles className="w-3 h-3" />
                          {item.badge}
                        </span>
                      )}

                      {!item.badge && (
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 opacity-60'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-center">
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            HealthMate AI • Sleek Design
          </p>
        </div>
      </div>
    </div>
  );
};

