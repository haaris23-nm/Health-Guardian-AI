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
      <div className="relative w-80 max-w-[85vw] bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 overflow-hidden border-r border-blue-100 dark:border-slate-800">
        {/* Header */}
        <div className="p-6 bg-blue-50/50 dark:bg-slate-800/50 border-b border-blue-100 dark:border-slate-800 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-blue-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          >
            <X className="w-5 h-5 text-blue-800 dark:text-slate-200" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Health Guardian <span className="text-blue-600 font-black">AI</span>
              </h2>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">Medical Platform</span>
            </div>
          </div>

          <div className="pt-2 border-t border-blue-100 dark:border-slate-800">
            <p className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">{userName}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{userEmail}</p>
          </div>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {drawerSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
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
                          ? 'bg-blue-600 text-white font-bold shadow-xs'
                          : item.highlight
                          ? 'bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-bold border border-blue-100 dark:border-blue-900'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-blue-50/80 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${isActive ? 'bg-white/20 text-white' : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'}`}>
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
        <div className="p-4 border-t border-blue-100 dark:border-slate-800 bg-blue-50/30 dark:bg-slate-900/50 text-center">
          <p className="text-[11px] font-bold text-blue-700 dark:text-blue-400">
            Health Guardian AI • Clean & Professional
          </p>
        </div>
      </div>
    </div>
  );
};

