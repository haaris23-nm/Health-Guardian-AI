import React, { useState, useEffect } from 'react';
import { Utensils, Sparkles, Flame, CheckCircle2, Loader2, ArrowRight, ShieldAlert, Filter } from 'lucide-react';
import { DietPlan, Meal, UserProfile } from '../types';

interface DietPlannerViewProps {
  user: UserProfile;
}

export const DietPlannerView: React.FC<DietPlannerViewProps> = ({ user }) => {
  const [age, setAge] = useState<number>(user.age || 25);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(user.gender || 'male');
  const [heightCm, setHeightCm] = useState<number>(user.heightCm || 170);
  const [weightKg, setWeightKg] = useState<number>(user.weightKg || 70);
  const [goal, setGoal] = useState<UserProfile['goal']>(user.goal || 'maintain');
  const [dietaryPreference, setDietaryPreference] = useState<string>('veg');
  const [cuisine, setCuisine] = useState<string>('indian');
  const [allergies, setAllergies] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [plan, setPlan] = useState<DietPlan | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/diet-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: Number(age),
          gender,
          heightCm: Number(heightCm),
          weightKg: Number(weightKg),
          goal,
          dietaryPreference,
          cuisine,
          allergies,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setPlan(data);
      } else {
        throw new Error('Fallback trigger');
      }
    } catch (e) {
      console.error('Diet Plan generation error:', e);
    } finally {
      setLoading(false);
    }
  };

  // Generate automatically on first load or when key parameters change
  useEffect(() => {
    handleGenerate();
  }, [goal, dietaryPreference, cuisine]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 font-sans">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-outline-light dark:border-outline-dark pb-4">
        <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-sm">
          <Utensils className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">
            AI Intelligent Diet & Nutrition Planner
          </h1>
          <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
            Precision macronutrient calculation & personalized meal schedules tailored to your body metrics, goal, and dietary choices.
          </p>
        </div>
      </div>

      {/* User Body Metrics Bar */}
      <div className="rounded-3xl p-5 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-outline-light/40 dark:border-outline-dark/40 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <Filter className="w-4 h-4" />
            User Biological Profile
          </span>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {user.name} ({user.gender}, {user.age} yrs)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-2xl bg-surface-variant-light/80 dark:bg-surface-variant-dark/80 border border-outline-light/30">
            <label className="text-on-surface-variant-light block text-[10px] font-bold uppercase mb-1">Age (Years)</label>
            <input
              type="number"
              min="1"
              max="120"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-xl font-bold text-sm text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
            />
          </div>
          <div className="p-2.5 rounded-2xl bg-surface-variant-light/80 dark:bg-surface-variant-dark/80 border border-outline-light/30">
            <label className="text-on-surface-variant-light block text-[10px] font-bold uppercase mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              className="w-full bg-white dark:bg-slate-900 px-2 py-1.5 rounded-xl font-bold text-sm text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 capitalize"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="p-2.5 rounded-2xl bg-surface-variant-light/80 dark:bg-surface-variant-dark/80 border border-outline-light/30">
            <label className="text-on-surface-variant-light block text-[10px] font-bold uppercase mb-1">Height (cm)</label>
            <input
              type="number"
              min="50"
              max="250"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="w-full bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-xl font-bold text-sm text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
            />
          </div>
          <div className="p-2.5 rounded-2xl bg-surface-variant-light/80 dark:bg-surface-variant-dark/80 border border-outline-light/30">
            <label className="text-on-surface-variant-light block text-[10px] font-bold uppercase mb-1">Weight (kg)</label>
            <input
              type="number"
              min="20"
              max="300"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-xl font-bold text-sm text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>

        {/* Nutritional Goal Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark">
            1. Primary Caloric & Physical Objective
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'lose_weight', label: 'Fat Loss & Cutting' },
              { id: 'maintain', label: 'Body Maintenance' },
              { id: 'gain_muscle', label: 'Muscle Gain & Bulking' },
              { id: 'improve_stamina', label: 'Endurance & Athletic' },
            ].map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGoal(g.id as any)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  goal === g.id
                    ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/50'
                    : 'bg-surface-variant-light dark:bg-surface-variant-dark text-on-surface-light dark:text-on-surface-dark hover:bg-emerald-500/10'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Preference & Type */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark">
            2. Food Choice & Dietary Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {[
              { id: 'veg', label: ' Vegetarian' },
              { id: 'non_veg', label: ' Non-Vegetarian' },
              { id: 'eggetarian', label: ' Eggetarian' },
              { id: 'vegan', label: ' Vegan' },
              { id: 'keto', label: ' Keto / Low-Carb' },
              { id: 'high_protein', label: ' High Protein' },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDietaryPreference(d.id)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center truncate ${
                  dietaryPreference === d.id
                    ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/50'
                    : 'bg-surface-variant-light dark:bg-surface-variant-dark text-on-surface-light dark:text-on-surface-dark hover:bg-emerald-500/10'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cuisine & Allergies Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-1">
              3. Cuisine Style
            </label>
            <select
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="w-full p-2.5 text-xs font-bold rounded-xl bg-surface-variant-light dark:bg-surface-variant-dark border border-outline-light dark:border-outline-dark text-on-surface-light dark:text-on-surface-dark"
            >
              <option value="indian">Indian Regional (North/South/West)</option>
              <option value="global">Global & Continental</option>
              <option value="mediterranean">Mediterranean Healthy Wholefoods</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-1">
              4. Medical Allergies / Dislikes (Optional)
            </label>
            <input
              type="text"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="e.g. Lactose intolerant, No peanuts, Diabetic friendly"
              className="w-full p-2.5 text-xs font-medium rounded-xl bg-surface-variant-light dark:bg-surface-variant-dark border border-outline-light dark:border-outline-dark text-on-surface-light dark:text-on-surface-dark placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl bg-emerald-600 text-white font-black text-sm shadow-md hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Calculating & Generating AI Plan...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Recalculate AI Custom Diet Plan</span>
            </>
          )}
        </button>
      </div>

      {/* Plan Results */}
      {plan && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Target Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl p-4 bg-emerald-600 text-white shadow-xs">
              <span className="text-[10px] font-extrabold uppercase block text-emerald-200">Daily Calorie Target</span>
              <span className="text-2xl font-black">{plan.dailyCalories} kcal</span>
            </div>
            <div className="rounded-2xl p-4 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-xs">
              <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 block">Protein Target</span>
              <span className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">{plan.macros.proteinG}g</span>
            </div>
            <div className="rounded-2xl p-4 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-xs">
              <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 block">Carbs Target</span>
              <span className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">{plan.macros.carbsG}g</span>
            </div>
            <div className="rounded-2xl p-4 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-xs">
              <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400 block">Healthy Fats</span>
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
                    <span className="font-black text-xs uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                      {mealKey}
                    </span>
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {meal.calories} kcal
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-on-surface-light dark:text-on-surface-dark">
                    {meal.name}
                  </h3>

                  <ul className="space-y-1.5">
                    {meal.items.map((item, idx) => (
                      <li key={idx} className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark flex items-start gap-1.5 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 flex justify-between text-[11px] font-extrabold text-on-surface-variant-light dark:text-on-surface-variant-dark border-t border-outline-light/30">
                    <span className="text-emerald-700 dark:text-emerald-300">P: {meal.proteinGrams}g</span>
                    <span className="text-blue-700 dark:text-blue-300">C: {meal.carbsGrams}g</span>
                    <span className="text-amber-700 dark:text-amber-300">F: {meal.fatGrams}g</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Key Nutritional Advice */}
          <div className="rounded-2xl p-5 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-xs space-y-2">
            <h3 className="font-extrabold text-xs uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
              Dietitian Key Advice & Guidelines
            </h3>
            <ul className="space-y-2">
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
