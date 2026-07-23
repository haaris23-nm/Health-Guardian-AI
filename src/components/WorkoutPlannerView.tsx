import React, { useState } from 'react';
import { Dumbbell, Sparkles, Flame, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { UserProfile, WorkoutPlan } from '../types';

interface WorkoutPlannerViewProps {
  user: UserProfile;
}

export const WorkoutPlannerView: React.FC<WorkoutPlannerViewProps> = ({ user }) => {
  const [goal, setGoal] = useState<string>(user.goal || 'maintain');
  const [loading, setLoading] = useState<boolean>(false);
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal }),
      });

      if (res.ok) {
        const data = await res.json();
        setPlan(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Title */}
      <div className="flex items-center gap-3 border-b border-outline-light dark:border-outline-dark pb-4">
        <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-sm">
          <Dumbbell className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">
            AI Workout Routine Planner
          </h1>
          <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
            Generates structured weekly resistance & cardio exercise routines with muscle target guidance.
          </p>
        </div>
      </div>

      {/* Goal Selector */}
      <div className="rounded-3xl p-6 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-sm space-y-4">
        <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark">
          Select Workout Objective
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'lose_weight', label: 'Fat Burn & HIIT' },
            { id: 'gain_muscle', label: 'Hypertrophy & Power' },
            { id: 'maintain', label: 'General Fitness' },
            { id: 'improve_stamina', label: 'Cardio Endurance' },
          ].map((g) => (
            <button
              key={g.id}
              onClick={() => setGoal(g.id)}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                goal === g.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-surface-variant-light dark:bg-surface-variant-dark text-on-surface-light dark:text-on-surface-dark'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3.5 rounded-full bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Crafting AI Workout Routine...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Generate Workout Plan with Gemini</span>
            </>
          )}
        </button>
      </div>

      {/* Routine Display */}
      {plan && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="space-y-4">
            {plan.weeklySchedule.map((dayPlan, idx) => (
              <div
                key={idx}
                className="rounded-3xl p-6 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-light/40 dark:border-outline-dark/40 pb-3">
                  <div>
                    <h3 className="text-lg font-black text-on-surface-light dark:text-on-surface-dark">
                      {dayPlan.day}
                    </h3>
                    <p className="text-xs text-blue-600 font-semibold">{dayPlan.focus}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-bold w-fit">
                    {dayPlan.exercises.length} Exercises Scheduled
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {dayPlan.exercises.map((ex, eIdx) => (
                    <div
                      key={eIdx}
                      className="p-4 rounded-2xl bg-surface-variant-light/40 dark:bg-surface-variant-dark/40 border border-outline-light/40 dark:border-outline-dark/40 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm text-on-surface-light dark:text-on-surface-dark">
                          {ex.name}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                          {ex.sets} Sets × {ex.reps}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-primary">Target: {ex.targetMuscle}</p>
                      <p className="text-[11px] text-on-surface-variant-light dark:text-on-surface-variant-dark leading-snug">
                        {ex.instructions}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Recovery Tips */}
          <div className="rounded-2xl p-5 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-xs space-y-2">
            <h3 className="font-bold text-xs uppercase text-primary tracking-wider">
              Trainer Recovery & Form Guidelines
            </h3>
            <ul className="space-y-1.5">
              {plan.tips.map((tip, idx) => (
                <li key={idx} className="text-xs text-on-surface-light dark:text-on-surface-dark flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}

    </div>
  );
};
