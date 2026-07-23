import React from 'react';
import {
  Scale,
  Droplet,
  Moon,
  Flame,
  Footprints,
  Heart,
  Plus,
  Sparkles,
  ChevronRight,
  Lightbulb,
  Stethoscope,
  Utensils,
  Dumbbell,
  Pill,
  MapPin,
  FileText
} from 'lucide-react';
import { HealthMetrics, UserProfile } from '../types';

interface DashboardViewProps {
  metrics: HealthMetrics;
  user: UserProfile;
  onNavigate: (view: string) => void;
  onQuickLogWater: (amountMl: number) => void;
  onOpenFAB: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  metrics,
  user,
  onNavigate,
  onQuickLogWater,
  onOpenFAB,
}) => {
  const waterPercent = Math.min(100, Math.round((metrics.waterIntakeMl / metrics.waterGoalMl) * 100));
  const stepsPercent = Math.min(100, Math.round((metrics.stepsCount / metrics.stepsGoal) * 100));
  const sleepPercent = Math.min(100, Math.round((metrics.sleepHours / metrics.sleepGoalHours) * 100));
  const caloriesPercent = Math.min(100, Math.round((metrics.caloriesBurned / metrics.caloriesGoal) * 100));

  return (
    <div className="space-y-6 pb-24 font-sans">
      
      {/* Grid Layout: Left Main Column (8 cols on lg), Right Sidebar Column (4 cols on lg) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Top 3 KPI Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Steps Card */}
            <div
              onClick={() => onNavigate('reports')}
              className="bg-white dark:bg-[#151C2C] p-5 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800/80 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Steps Today</span>
                <div className="px-2.5 py-1 bg-orange-50 dark:bg-orange-950/50 rounded-xl text-orange-600 dark:text-orange-400 font-bold text-xs">
                  +{stepsPercent}%
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                  {metrics.stepsCount.toLocaleString()}
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 mt-3 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full rounded-full transition-all duration-500" style={{ width: `${stepsPercent}%` }} />
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 italic">Goal: {metrics.stepsGoal.toLocaleString()} steps</p>
              </div>
            </div>

            {/* Calories Card */}
            <div
              onClick={() => onNavigate('reports')}
              className="bg-white dark:bg-[#151C2C] p-5 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800/80 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Calories</span>
                <div className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                  Active
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                  {metrics.caloriesBurned.toLocaleString()} <span className="text-sm font-medium text-slate-400">kcal</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 mt-3 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${caloriesPercent}%` }} />
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 italic">Daily Burn: {metrics.caloriesGoal} kcal</p>
              </div>
            </div>

            {/* Heart Rate Card */}
            <div
              onClick={() => onNavigate('reports')}
              className="bg-white dark:bg-[#151C2C] p-5 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800/80 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Heart Rate</span>
                <div className="px-2.5 py-1 bg-rose-50 dark:bg-rose-950/50 rounded-xl text-rose-600 dark:text-rose-400 font-bold text-xs">
                  Normal
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                  {metrics.heartRateBpm} <span className="text-base font-medium text-slate-400">bpm</span>
                </div>
                {/* Equalizer Bar Chart Visual */}
                <div className="flex gap-1.5 mt-3 items-end h-8">
                  <div className="w-1.5 h-3 bg-rose-200 dark:bg-rose-900 rounded-full"></div>
                  <div className="w-1.5 h-5 bg-rose-300 dark:bg-rose-800 rounded-full"></div>
                  <div className="w-1.5 h-8 bg-rose-500 rounded-full"></div>
                  <div className="w-1.5 h-6 bg-rose-400 rounded-full"></div>
                  <div className="w-1.5 h-4 bg-rose-300 dark:bg-rose-800 rounded-full"></div>
                  <div className="w-1.5 h-7 bg-rose-500 rounded-full"></div>
                  <div className="w-1.5 h-5 bg-rose-400 rounded-full"></div>
                </div>
              </div>
            </div>

          </div>

          {/* AI Health Insight Hero Section */}
          <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-lg flex-1 min-h-[220px] flex flex-col justify-between">
            <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-800/80 border border-indigo-700/50 text-indigo-200 text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Gemini AI Powered Recommendation
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">AI Health Insight for {user.name.split(' ')[0]}</h2>
                <p className="text-indigo-200 max-w-xl text-sm sm:text-base leading-relaxed">
                  Based on your sleep quality ({metrics.sleepHours}h) and steady resting heart rate ({metrics.heartRateBpm} bpm), your physical recovery index is optimal today. Great day for a workout or cardio session!
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate('workout_planner')}
                  className="px-6 py-3 bg-white text-indigo-900 rounded-2xl font-bold hover:bg-indigo-50 transition-colors shadow-sm text-sm"
                >
                  View Workout Plan
                </button>
                <button
                  onClick={() => onNavigate('chatbot')}
                  className="px-6 py-3 bg-indigo-800 text-white border border-indigo-700 rounded-2xl font-bold hover:bg-indigo-700 transition-colors text-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Ask Gemini AI
                </button>
              </div>
            </div>

            {/* Decorative background glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 p-6 pointer-events-none opacity-10">
              <Heart className="w-32 h-32 text-white" />
            </div>
          </div>

          {/* Quick Metrics: Water & BMI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Water Card */}
            <div
              onClick={() => onNavigate('water')}
              className="bg-white dark:bg-[#151C2C] rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800/80 flex items-center gap-5 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="relative w-16 h-16 rounded-full border-[6px] border-blue-500 border-t-transparent flex items-center justify-center shrink-0">
                <span className="font-black text-blue-600 dark:text-blue-400 text-sm">{waterPercent}%</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 truncate">Water Intake</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickLogWater(250);
                    }}
                    className="p-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
                    title="Add 250ml"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {(metrics.waterIntakeMl / 1000).toFixed(2)}L / {(metrics.waterGoalMl / 1000).toFixed(1)}L goal
                </p>
              </div>
            </div>

            {/* BMI Card */}
            <div
              onClick={() => onNavigate('bmi')}
              className="bg-white dark:bg-[#151C2C] rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800/80 flex items-center gap-5 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="w-16 h-16 bg-amber-50 dark:bg-amber-950/40 rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{metrics.bmi}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 truncate">BMI: {metrics.bmiCategory}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">Weight: {metrics.weightKg}kg • Height: {metrics.heightCm}cm</p>
              </div>
            </div>

          </div>

          {/* AI Features Suite Cards */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              AI Intelligence Modules
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={() => onNavigate('prescription')}
                className="p-5 rounded-[1.75rem] bg-indigo-600 text-white border border-indigo-500 text-left hover:bg-indigo-700 transition-all hover:shadow-md group relative overflow-hidden"
              >
                <div className="p-3 rounded-2xl bg-white/15 text-white w-fit mb-3">
                  <FileText className="w-5 h-5 text-amber-300" />
                </div>
                <h4 className="font-bold text-sm text-white group-hover:translate-x-0.5 transition-transform flex items-center justify-between">
                  <span>AI Prescription Reader</span>
                  <span className="text-[10px] bg-amber-400 text-slate-900 font-extrabold px-2 py-0.5 rounded-full">New</span>
                </h4>
                <p className="text-xs text-indigo-200 mt-1">
                  Scan doctor Rx & get step-by-step action plan.
                </p>
              </button>

              <button
                onClick={() => onNavigate('symptom_checker')}
                className="p-5 rounded-[1.75rem] bg-white dark:bg-[#151C2C] border border-slate-100 dark:border-slate-800/80 text-left hover:border-indigo-500/50 transition-all hover:shadow-md group"
              >
                <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 w-fit mb-3">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                  AI Symptom Checker
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Analyze symptoms safely with Gemini safety guards.
                </p>
              </button>

              <button
                onClick={() => onNavigate('diet_planner')}
                className="p-5 rounded-[1.75rem] bg-white dark:bg-[#151C2C] border border-slate-100 dark:border-slate-800/80 text-left hover:border-indigo-500/50 transition-all hover:shadow-md group"
              >
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 w-fit mb-3">
                  <Utensils className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                  AI Diet Planner
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Custom macros & daily meal recommendations.
                </p>
              </button>

              <button
                onClick={() => onNavigate('workout_planner')}
                className="p-5 rounded-[1.75rem] bg-white dark:bg-[#151C2C] border border-slate-100 dark:border-slate-800/80 text-left hover:border-indigo-500/50 transition-all hover:shadow-md group"
              >
                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 w-fit mb-3">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                  AI Workout Planner
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Custom routines for cardio & strength training.
                </p>
              </button>
            </div>
          </div>

        </div>

        {/* Right Sidebar Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Upcoming Meds Card */}
          <div className="bg-white dark:bg-[#151C2C] rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800/80 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
              Upcoming Meds
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center font-bold">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-100">Multivitamin</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">After lunch • 14:00</p>
                  </div>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded-full accent-indigo-600 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/50 opacity-70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center font-bold">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-100">Omega 3 Fish Oil</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Taken • 08:30</p>
                  </div>
                </div>
                <span className="text-emerald-500 font-bold text-sm">✓</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center font-bold">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-100">Magnesium</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Before bed • 22:00</p>
                  </div>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded-full accent-indigo-600 cursor-pointer" />
              </div>
            </div>

            {/* Daily Tip Card */}
            <div className="mt-auto bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/30 rounded-2xl p-4">
              <p className="text-[10px] font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1">
                Daily Wellness Tip
              </p>
              <p className="text-xs text-rose-900 dark:text-rose-200 italic leading-relaxed">
                "Drinking warm lemon water first thing in the morning helps rehydrate your digestive system and boost metabolic rate."
              </p>
            </div>
          </div>

          {/* Nearby Services Card */}
          <div className="bg-white dark:bg-[#151C2C] rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Nearby Services</h3>
              <button
                onClick={() => onNavigate('hospitals')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View Map
              </button>
            </div>

            <div
              onClick={() => onNavigate('hospitals')}
              className="relative w-full h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden mb-3 cursor-pointer group border border-slate-200 dark:border-slate-700"
            >
              <div className="absolute inset-0 bg-indigo-50/50 dark:bg-indigo-950/30 flex items-center justify-center">
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-xs flex items-center gap-1.5 group-hover:scale-105 transition-transform">
                  <MapPin className="w-4 h-4" />
                  Find Emergency Hospitals
                </span>
              </div>
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-indigo-600 rounded-full -translate-x-1/2 -translate-y-1/2 ring-4 ring-indigo-200 dark:ring-indigo-900"></div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">General Hospital West</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">0.8 miles away • Open 24h</p>
            </div>
          </div>

        </div>

      </div>

      {/* Floating Quick Action FAB */}
      <button
        onClick={onOpenFAB}
        className="fixed bottom-20 md:bottom-8 right-6 z-40 p-4 rounded-2xl bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 hover:scale-105 transition-all flex items-center gap-2 focus:outline-hidden"
        title="Quick Log Entry"
      >
        <Plus className="w-6 h-6" />
        <span className="hidden sm:inline font-bold text-sm">Quick Log</span>
      </button>

    </div>
  );
};

