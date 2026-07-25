import React, { useState, useEffect } from 'react';
import { Dumbbell, Sparkles, Flame, CheckCircle2, Loader2, ArrowRight, Filter, Clock } from 'lucide-react';
import { UserProfile, WorkoutPlan } from '../types';

interface WorkoutPlannerViewProps {
  user: UserProfile;
}

export const WorkoutPlannerView: React.FC<WorkoutPlannerViewProps> = ({ user }) => {
  const [goal, setGoal] = useState<string>(user.goal || 'maintain');
  const [fitnessLevel, setFitnessLevel] = useState<string>('intermediate');
  const [equipment, setEquipment] = useState<string>('gym');
  const [duration, setDuration] = useState<number>(45);
  const [loading, setLoading] = useState<boolean>(false);
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal,
          fitnessLevel,
          equipment,
          duration,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setPlan(data);
      } else {
        throw new Error('Fallback trigger');
      }
    } catch (e) {
      console.error('Workout Plan generation error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerate();
  }, [goal, fitnessLevel, equipment, duration]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 font-sans">
      
      {/* Title */}
      <div className="flex items-center gap-3 border-b border-outline-light dark:border-outline-dark pb-4">
        <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-sm">
          <Dumbbell className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">
            AI Intelligent Workout Planner
          </h1>
          <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
            Generates custom weekly exercise routines tailored specifically to your goal, fitness level, and available equipment.
          </p>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="rounded-3xl p-5 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-xs space-y-4">
        
        <div className="flex items-center justify-between border-b border-outline-light/40 dark:border-outline-dark/40 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
            <Filter className="w-4 h-4" />
            Customize Workout Parameters
          </span>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {user.name}
          </span>
        </div>

        {/* Goal Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark">
            1. Target Fitness Objective
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'lose_weight', label: 'Fat Loss & HIIT' },
              { id: 'gain_muscle', label: 'Hypertrophy & Muscle' },
              { id: 'maintain', label: 'General Fitness' },
              { id: 'improve_stamina', label: 'Cardio & Endurance' },
            ].map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGoal(g.id)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  goal === g.id
                    ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-500/50'
                    : 'bg-surface-variant-light dark:bg-surface-variant-dark text-on-surface-light dark:text-on-surface-dark hover:bg-blue-500/10'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-1">
              2. Experience Level
            </label>
            <select
              value={fitnessLevel}
              onChange={(e) => setFitnessLevel(e.target.value)}
              className="w-full p-2.5 text-xs font-bold rounded-xl bg-surface-variant-light dark:bg-surface-variant-dark border border-outline-light dark:border-outline-dark text-on-surface-light dark:text-on-surface-dark"
            >
              <option value="beginner">Beginner (Foundational)</option>
              <option value="intermediate">Intermediate (Progressive)</option>
              <option value="advanced">Advanced (High Intensity)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-1">
              3. Training Location & Equipment
            </label>
            <select
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              className="w-full p-2.5 text-xs font-bold rounded-xl bg-surface-variant-light dark:bg-surface-variant-dark border border-outline-light dark:border-outline-dark text-on-surface-light dark:text-on-surface-dark"
            >
              <option value="gym">Full Commercial Gym</option>
              <option value="home_dumbbells">Home Dumbbells & Resistance</option>
              <option value="bodyweight">Bodyweight / No Equipment</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-1">
              4. Target Session Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full p-2.5 text-xs font-bold rounded-xl bg-surface-variant-light dark:bg-surface-variant-dark border border-outline-light dark:border-outline-dark text-on-surface-light dark:text-on-surface-dark"
            >
              <option value={30}>30 Minutes (Quick Express)</option>
              <option value={45}>45 Minutes (Balanced)</option>
              <option value={60}>60 Minutes (Intense Full Workout)</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-black text-sm shadow-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Building Custom Workout Schedule...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Recalculate AI Workout Routine</span>
            </>
          )}
        </button>
      </div>

      {/* Routine Results */}
      {plan && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-2xl p-4 text-xs font-bold text-blue-900 dark:text-blue-200">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Routine Focus: <span className="capitalize">{plan.fitnessGoal.replace('_', ' ')}</span> • {equipment.replace('_', ' ')}
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {duration} mins / session
            </span>
          </div>

          <div className="space-y-4">
            {plan.weeklySchedule.map((day, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-5 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-outline-light/40 dark:border-outline-dark/40 pb-2.5 gap-1">
                  <h3 className="font-extrabold text-base text-on-surface-light dark:text-on-surface-dark">
                    {day.day}
                  </h3>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 w-fit">
                    Focus: {day.focus}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  {day.exercises.map((ex, eIdx) => (
                    <div
                      key={eIdx}
                      className="p-3.5 rounded-xl bg-surface-variant-light/80 dark:bg-surface-variant-dark/80 border border-outline-light/30 space-y-1.5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-extrabold text-xs text-on-surface-light dark:text-on-surface-dark">
                            {ex.name}
                          </h4>
                          <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-blue-600/10 text-blue-700 dark:text-blue-300 shrink-0">
                            {ex.sets} sets × {ex.reps}
                          </span>
                        </div>
                        <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                          Target: {ex.targetMuscle}
                        </p>
                      </div>
                      <p className="text-[11px] text-on-surface-variant-light dark:text-on-surface-variant-dark leading-snug">
                        {ex.instructions}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="rounded-2xl p-5 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-xs space-y-2">
            <h3 className="font-extrabold text-xs uppercase text-blue-700 dark:text-blue-400 tracking-wider">
              Trainer Key Safety & Technique Advice
            </h3>
            <ul className="space-y-2">
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
