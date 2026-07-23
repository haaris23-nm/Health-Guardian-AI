import React, { useState } from 'react';
import { Scale, HeartPulse, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface BmiCalculatorViewProps {
  user: UserProfile;
  onUpdateMetrics: (heightCm: number, weightKg: number) => void;
}

export const BmiCalculatorView: React.FC<BmiCalculatorViewProps> = ({ user, onUpdateMetrics }) => {
  const [height, setHeight] = useState<number>(user.heightCm || 170);
  const [weight, setWeight] = useState<number>(user.weightKg || 70);
  const [age, setAge] = useState<number>(user.age || 25);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(user.gender || 'male');

  // Calculate live BMI
  const heightM = height / 100;
  const bmiVal = Number((weight / (heightM * heightM)).toFixed(1));

  let category = 'Normal weight';
  let badgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300';
  let progressColor = 'bg-emerald-500';
  let needlePercent = 50;

  if (bmiVal < 18.5) {
    category = 'Underweight';
    badgeColor = 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300';
    progressColor = 'bg-blue-500';
    needlePercent = Math.min(25, Math.max(5, (bmiVal / 18.5) * 25));
  } else if (bmiVal < 25) {
    category = 'Normal weight';
    badgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300';
    progressColor = 'bg-emerald-500';
    needlePercent = 25 + ((bmiVal - 18.5) / 6.5) * 25;
  } else if (bmiVal < 30) {
    category = 'Overweight';
    badgeColor = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300';
    progressColor = 'bg-amber-500';
    needlePercent = 50 + ((bmiVal - 25) / 5) * 25;
  } else {
    category = 'Obese';
    badgeColor = 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300';
    progressColor = 'bg-rose-500';
    needlePercent = Math.min(95, 75 + ((bmiVal - 30) / 10) * 20);
  }

  const getSuggestions = () => {
    if (bmiVal < 18.5) {
      return [
        "Increase daily caloric surplus with high-density nutrient foods (nuts, avocado, oats).",
        "Engage in progressive resistance strength training to gain lean muscle mass.",
        "Include complex carbohydrates with healthy fats in every major meal.",
        "Ensure 7-8 hours of restful sleep for cellular recovery."
      ];
    } else if (bmiVal < 25) {
      return [
        "Maintain current calorie balance with fresh lean proteins, vegetables, and complex grains.",
        "Aim for 150+ minutes of aerobic physical activity weekly.",
        "Stay consistently hydrated with 2.5 to 3 Liters of water daily.",
        "Keep up regular flexibility, posture, and core stability exercises."
      ];
    } else if (bmiVal < 30) {
      return [
        "Create a mild daily caloric deficit (300-500 kcal below maintenance).",
        "Incorporate HIIT cardio (High-Intensity Interval Training) 3 times per week.",
        "Reduce consumption of liquid sugars, refined bakery products, and deep-fried items.",
        "Prioritize protein and dietary fiber to maximize satiety during meals."
      ];
    } else {
      return [
        "Consult a certified medical doctor or clinical nutritionist for personalized oversight.",
        "Start with low-impact joint-friendly exercises like swimming or brisk walking.",
        "Track daily food intake with a food journal to identify hidden calories.",
        "Set realistic 0.5kg per week weight management milestones."
      ];
    }
  };

  const handleSaveToProfile = () => {
    onUpdateMetrics(height, weight);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Title */}
      <div className="flex items-center gap-3 border-b border-outline-light dark:border-outline-dark pb-4">
        <div className="p-3 rounded-2xl bg-primary text-on-primary shadow-sm">
          <Scale className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">
            BMI Calculator & Health Advisor
          </h1>
          <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
            Calculate your Body Mass Index and receive tailored medical suggestions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Input Controls */}
        <div className="rounded-3xl p-6 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-sm space-y-5">
          <h2 className="font-bold text-base text-on-surface-light dark:text-on-surface-dark flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-primary" />
            Body Parameters
          </h2>

          {/* Gender Picker */}
          <div>
            <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-2">
              Gender
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['male', 'female', 'other'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                    gender === g
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-variant-light dark:bg-surface-variant-dark text-on-surface-light dark:text-on-surface-dark hover:bg-surface-variant-light/80'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Age Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark">
                Age
              </label>
              <span className="text-sm font-black text-primary">{age} yrs</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          {/* Height Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark">
                Height
              </label>
              <span className="text-sm font-black text-primary">{height} cm ({Math.floor(height / 30.48)}' {Math.round((height % 30.48) / 2.54)}")</span>
            </div>
            <input
              type="range"
              min="100"
              max="230"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          {/* Weight Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark">
                Weight
              </label>
              <span className="text-sm font-black text-primary">{weight} kg ({(weight * 2.20462).toFixed(1)} lbs)</span>
            </div>
            <input
              type="range"
              min="30"
              max="200"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          <button
            onClick={handleSaveToProfile}
            className="w-full py-3 rounded-full bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Update Profile & Save Metrics
          </button>
        </div>

        {/* BMI Results & Meter Gauge */}
        <div className="rounded-3xl p-6 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <p className="text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark">
              Calculated BMI Result
            </p>

            <div className="flex items-center justify-between mt-2">
              <span className="text-5xl font-black text-on-surface-light dark:text-on-surface-dark">
                {bmiVal}
              </span>
              <span className={`px-4 py-1.5 rounded-full text-xs font-black border ${badgeColor}`}>
                {category}
              </span>
            </div>

            {/* Custom Visual Range Meter */}
            <div className="mt-6 space-y-2">
              <div className="relative w-full h-4 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
                <div className="w-1/4 bg-blue-500 h-full" title="Underweight <18.5" />
                <div className="w-1/4 bg-emerald-500 h-full" title="Normal 18.5-24.9" />
                <div className="w-1/4 bg-amber-500 h-full" title="Overweight 25-29.9" />
                <div className="w-1/4 bg-rose-500 h-full" title="Obese >30" />
              </div>

              {/* Indicator Needle */}
              <div className="relative w-full h-4">
                <div
                  className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-300"
                  style={{ left: `${needlePercent}%` }}
                >
                  <div className="w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-primary" />
                  <span className="text-[10px] font-extrabold text-primary">YOUR BMI</span>
                </div>
              </div>

              <div className="flex justify-between text-[10px] font-semibold text-on-surface-variant-light dark:text-on-surface-variant-dark pt-2">
                <span>&lt; 18.5 (Under)</span>
                <span>18.5 - 24.9 (Normal)</span>
                <span>25 - 29.9 (Over)</span>
                <span>&gt; 30 (Obese)</span>
              </div>
            </div>
          </div>

          {/* AI Suggestions Box */}
          <div className="rounded-2xl p-4 bg-surface-variant-light/50 dark:bg-surface-variant-dark/50 border border-outline-light/50 dark:border-outline-dark/50 space-y-2">
            <h3 className="font-bold text-xs uppercase text-primary tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Tailored Health Recommendations
            </h3>
            <ul className="space-y-1.5">
              {getSuggestions().map((s, idx) => (
                <li key={idx} className="text-xs text-on-surface-light dark:text-on-surface-dark flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
