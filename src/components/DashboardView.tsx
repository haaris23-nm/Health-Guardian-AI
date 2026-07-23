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
              className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] shadow-xs border border-blue-100 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Steps Today</span>
                <div className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950 rounded-xl text-blue-700 dark:text-blue-300 font-bold text-xs">
                  +{stepsPercent}%
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {metrics.stepsCount.toLocaleString()}
                </div>
                <div className="w-full bg-blue-50 dark:bg-slate-800 h-2 mt-3 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${stepsPercent}%` }} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Goal: {metrics.stepsGoal.toLocaleString()} steps</p>
              </div>
            </div>

            {/* Calories Card */}
            <div
              onClick={() => onNavigate('reports')}
              className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] shadow-xs border border-blue-100 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Calories</span>
                <div className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950 rounded-xl text-blue-700 dark:text-blue-300 font-bold text-xs">
                  Active
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {metrics.caloriesBurned.toLocaleString()} <span className="text-sm font-medium text-slate-400">kcal</span>
                </div>
                <div className="w-full bg-blue-50 dark:bg-slate-800 h-2 mt-3 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${caloriesPercent}%` }} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Daily Burn: {metrics.caloriesGoal} kcal</p>
              </div>
            </div>

            {/* Heart Rate Card */}
            <div
              onClick={() => onNavigate('reports')}
              className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] shadow-xs border border-blue-100 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Heart Rate</span>
                <div className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950 rounded-xl text-blue-700 dark:text-blue-300 font-bold text-xs">
                  Normal
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {metrics.heartRateBpm} <span className="text-base font-medium text-slate-400">bpm</span>
                </div>
                {/* Equalizer Bar Chart Visual */}
                <div className="flex gap-1.5 mt-3 items-end h-8">
                  <div className="w-1.5 h-3 bg-blue-200 dark:bg-blue-900 rounded-full"></div>
                  <div className="w-1.5 h-5 bg-blue-300 dark:bg-blue-800 rounded-full"></div>
                  <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
                  <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                  <div className="w-1.5 h-4 bg-blue-300 dark:bg-blue-800 rounded-full"></div>
                  <div className="w-1.5 h-7 bg-blue-600 rounded-full"></div>
                  <div className="w-1.5 h-5 bg-blue-400 rounded-full"></div>
                </div>
              </div>
            </div>

          </div>

          {/* AI Health Insight Hero Section */}
          <div className="bg-blue-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-md flex-1 min-h-[220px] flex flex-col justify-between border border-blue-800">
            <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/80 border border-blue-700/50 text-blue-200 text-xs font-bold mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                  Gemini AI Health Recommendation
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-white">AI Health Insight for {user.name.split(' ')[0]}</h2>
                <p className="text-blue-100 max-w-xl text-sm sm:text-base leading-relaxed">
                  Based on your sleep quality ({metrics.sleepHours}h) and steady resting heart rate ({metrics.heartRateBpm} bpm), your physical recovery index is optimal today. Great day for a workout or cardio session!
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate('workout_planner')}
                  className="px-6 py-3 bg-white text-blue-900 rounded-2xl font-bold hover:bg-blue-50 transition-colors shadow-xs text-sm cursor-pointer"
                >
                  View Workout Plan
                </button>
                <button
                  onClick={() => onNavigate('chatbot')}
                  className="px-6 py-3 bg-blue-800 text-white border border-blue-700 rounded-2xl font-bold hover:bg-blue-700 transition-colors text-sm flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-blue-300" />
                  Ask Gemini AI
                </button>
              </div>
            </div>

            {/* Decorative background glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 p-6 pointer-events-none opacity-10">
              <Heart className="w-32 h-32 text-white" />
            </div>
          </div>

          {/* Quick Metrics: Water & BMI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Water Card */}
            <div
              onClick={() => onNavigate('water')}
              className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-xs border border-blue-100 dark:border-slate-800 flex items-center gap-5 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="relative w-16 h-16 rounded-full border-[6px] border-blue-600 border-t-transparent flex items-center justify-center shrink-0">
                <span className="font-black text-blue-700 dark:text-blue-400 text-sm">{waterPercent}%</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate">Water Intake</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickLogWater(250);
                    }}
                    className="p-1.5 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-colors"
                    title="Add 250ml"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  {(metrics.waterIntakeMl / 1000).toFixed(2)}L / {(metrics.waterGoalMl / 1000).toFixed(1)}L goal
                </p>
              </div>
            </div>

            {/* BMI Card */}
            <div
              onClick={() => onNavigate('bmi')}
              className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-xs border border-blue-100 dark:border-slate-800 flex items-center gap-5 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 dark:border-slate-700">
                <span className="text-2xl font-black text-blue-700 dark:text-blue-300">{metrics.bmi}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate">BMI: {metrics.bmiCategory}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate font-medium">Weight: {metrics.weightKg}kg • Height: {metrics.heightCm}cm</p>
              </div>
            </div>

          </div>

          {/* AI Features Suite Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              AI Medical & Health Intelligence
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={() => onNavigate('prescription')}
                className="p-5 rounded-[1.75rem] bg-blue-600 text-white border border-blue-500 text-left hover:bg-blue-700 transition-all hover:shadow-md group relative overflow-hidden cursor-pointer"
              >
                <div className="p-3 rounded-2xl bg-white/15 text-white w-fit mb-3">
                  <FileText className="w-5 h-5 text-blue-100" />
                </div>
                <h4 className="font-bold text-sm text-white group-hover:translate-x-0.5 transition-transform flex items-center justify-between">
                  <span>AI Prescription Reader</span>
                  <span className="text-[10px] bg-white text-blue-900 font-extrabold px-2 py-0.5 rounded-full">New</span>
                </h4>
                <p className="text-xs text-blue-100 mt-1">
                  Scan doctor Rx & get step-by-step action plan.
                </p>
              </button>

              <button
                onClick={() => onNavigate('symptom_checker')}
                className="p-5 rounded-[1.75rem] bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 text-left hover:border-blue-500 transition-all hover:shadow-md group cursor-pointer"
              >
                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-400 w-fit mb-3">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  AI Symptom Checker
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Analyze symptoms safely with Gemini safety guards.
                </p>
              </button>

              <button
                onClick={() => onNavigate('diet_planner')}
                className="p-5 rounded-[1.75rem] bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 text-left hover:border-blue-500 transition-all hover:shadow-md group cursor-pointer"
              >
                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-400 w-fit mb-3">
                  <Utensils className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  AI Diet Planner
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Custom macros & daily meal recommendations.
                </p>
              </button>

              <button
                onClick={() => onNavigate('workout_planner')}
                className="p-5 rounded-[1.75rem] bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 text-left hover:border-blue-500 transition-all hover:shadow-md group cursor-pointer"
              >
                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-400 w-fit mb-3">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  AI Workout Planner
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Custom routines for cardio & strength training.
                </p>
              </button>
            </div>
          </div>

        </div>

        {/* Right Sidebar Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Upcoming Meds Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-xs border border-blue-100 dark:border-slate-800 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
              Upcoming Meds
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-4 bg-blue-50/40 dark:bg-slate-800/40 rounded-2xl border border-blue-100/60 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">Multivitamin</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">After lunch • 14:00</p>
                  </div>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded-full accent-blue-600 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50/40 dark:bg-slate-800/40 rounded-2xl border border-blue-100/60 dark:border-slate-800 opacity-80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-slate-700 text-blue-700 dark:text-blue-300 rounded-xl flex items-center justify-center font-bold">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">Omega 3 Fish Oil</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">Taken • 08:30</p>
                  </div>
                </div>
                <span className="text-blue-600 font-bold text-sm">✓</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50/40 dark:bg-slate-800/40 rounded-2xl border border-blue-100/60 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">Magnesium</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Before bed • 22:00</p>
                  </div>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded-full accent-blue-600 cursor-pointer" />
              </div>
            </div>

            {/* Daily Tip Card */}
            <div className="mt-auto bg-blue-50 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700 rounded-2xl p-4">
              <p className="text-[10px] font-extrabold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-1">
                Daily Medical Tip
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                "Drinking warm water with morning routine helps rehydrate your digestive system and boost metabolic recovery."
              </p>
            </div>
          </div>

          {/* Nearby Services Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-xs border border-blue-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Nearby Services</h3>
              <button
                onClick={() => onNavigate('hospitals')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                View Map
              </button>
            </div>

            <div
              onClick={() => onNavigate('hospitals')}
              className="relative w-full h-32 bg-blue-50 dark:bg-slate-800 rounded-2xl overflow-hidden mb-3 cursor-pointer group border border-blue-100 dark:border-slate-700"
            >
              <div className="absolute inset-0 bg-blue-100/30 dark:bg-slate-800 flex items-center justify-center">
                <span className="text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center gap-1.5 group-hover:scale-105 transition-transform">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Find Emergency Hospitals
                </span>
              </div>
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2 ring-4 ring-blue-200 dark:ring-blue-900"></div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">General Hospital West</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">0.8 miles away • Open 24h</p>
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

