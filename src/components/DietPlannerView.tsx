import React, { useState } from 'react';
import { Utensils, Sparkles, Flame, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { DietPlan, Meal, UserProfile } from '../types';

interface DietPlannerViewProps {
  user: UserProfile;
}

export const DietPlannerView: React.FC<DietPlannerViewProps> = ({ user }) => {
  const [goal, setGoal] = useState<UserProfile['goal']>(user.goal || 'maintain');
  const [loading, setLoading] = useState<boolean>(false);
  const [plan, setPlan] = useState<DietPlan | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/diet-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: user.age,
          gender: user.gender,
          heightCm: user.heightCm,
          weightKg: user.weightKg,
          goal,
        }),
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
        <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-sm">
          <Utensils className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">
            AI Personalized Diet Planner
          </h1>
          <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
            Calculates macronutrients & daily meal schedules based on age, gender, height, weight, and fitness targets.
          </p>
        </div>
      </div>

      {/* Goal Selector & Parameters */}
      <div className="rounded-3xl p-6 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-sm space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-surface-variant-light dark:bg-surface-variant-dark">
            <span className="text-on-surface-variant-light block text-[10px] font-bold uppercase">Age</span>
            <span className="font-black text-sm text-on-surface-light dark:text-on-surface-dark">{user.age} Years</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-variant-light dark:bg-surface-variant-dark">
            <span className="text-on-surface-variant-light block text-[10px] font-bold uppercase">Gender</span>
            <span className="font-black text-sm text-on-surface-light dark:text-on-surface-dark capitalize">{user.gender}</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-variant-light dark:bg-surface-variant-dark">
            <span className="text-on-surface-variant-light block text-[10px] font-bold uppercase">Height</span>
            <span className="font-black text-sm text-on-surface-light dark:text-on-surface-dark">{user.heightCm} cm</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-variant-light dark:bg-surface-variant-dark">
            <span className="text-on-surface-variant-light block text-[10px] font-bold uppercase">Weight</span>
            <span className="font-black text-sm text-on-surface-light dark:text-on-surface-dark">{user.weightKg} kg</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-2">
            Primary Nutritional Goal
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'lose_weight', label: 'Fat Loss' },
              { id: 'maintain', label: 'Maintenance' },
              { id: 'gain_muscle', label: 'Muscle Gain' },
              { id: 'improve_stamina', label: 'Endurance' },
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => setGoal(g.id as any)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  goal === g.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-surface-variant-light dark:bg-surface-variant-dark text-on-surface-light dark:text-on-surface-dark'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3.5 rounded-full bg-emerald-600 text-white font-bold text-sm shadow-md hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating AI Diet Plan...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Generate Custom Meal Plan with Gemini</span>
            </>
          )}
        </button>
      </div>

      {/* Plan Results */}
      {plan && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Target Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300">
              <span className="text-[10px] font-extrabold uppercase block">Daily Caloric Target</span>
              <span className="text-2xl font-black">{plan.dailyCalories} kcal</span>
            </div>
            <div className="rounded-2xl p-4 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark">
              <span className="text-[10px] font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark block">Protein Target</span>
              <span className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">{plan.macros.proteinG}g</span>
            </div>
            <div className="rounded-2xl p-4 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark">
              <span className="text-[10px] font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark block">Carbohydrates Target</span>
              <span className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">{plan.macros.carbsG}g</span>
            </div>
            <div className="rounded-2xl p-4 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark">
              <span className="text-[10px] font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark block">Healthy Fats Target</span>
              <span className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">{plan.macros.fatG}g</span>
            </div>
          </div>

          {/* Meals Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(plan.meals).map(([mealKey, mealObj]) => {
              const meal = mealObj as Meal;
              return (
                <div
                  key={mealKey}
                  className="rounded-2xl p-5 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-xs space-y-3"
                >
                <div className="flex items-center justify-between border-b border-outline-light/40 dark:border-outline-dark/40 pb-2">
                  <span className="font-black text-sm uppercase text-primary tracking-wider">
                    {mealKey}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    {meal.calories} kcal
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-on-surface-light dark:text-on-surface-dark">
                  {meal.name}
                </h3>

                <ul className="space-y-1">
                  {meal.items.map((item, idx) => (
                    <li key={idx} className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 flex justify-between text-[11px] font-bold text-on-surface-variant-light dark:text-on-surface-variant-dark border-t border-outline-light/30">
                  <span>Protein: {meal.proteinGrams}g</span>
                  <span>Carbs: {meal.carbsGrams}g</span>
                  <span>Fats: {meal.fatGrams}g</span>
                </div>
              </div>
            );
          })}
          </div>

          {/* Key Nutritional Advice */}
          <div className="rounded-2xl p-5 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-xs space-y-2">
            <h3 className="font-bold text-xs uppercase text-primary tracking-wider">
              Dietitian Key Recommendations
            </h3>
            <ul className="space-y-1.5">
              {plan.keyAdvice.map((adv, idx) => (
                <li key={idx} className="text-xs text-on-surface-light dark:text-on-surface-dark flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}

    </div>
  );
};
