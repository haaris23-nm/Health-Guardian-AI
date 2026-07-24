import React, { useState } from 'react';
import { User, Save, CheckCircle2, Shield, HeartPulse, LogOut } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onLogout?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdateUser, onLogout }) => {
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [age, setAge] = useState<number>(user.age);
  const [gender, setGender] = useState<UserProfile['gender']>(user.gender);
  const [heightCm, setHeightCm] = useState<number>(user.heightCm);
  const [weightKg, setWeightKg] = useState<number>(user.weightKg);
  const [goal, setGoal] = useState<UserProfile['goal']>(user.goal);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name,
      email,
      age: Number(age),
      gender,
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      goal,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      
      {/* Title */}
      <div className="flex items-center gap-3 border-b border-outline-light dark:border-outline-dark pb-4">
        <div className="p-3 rounded-2xl bg-primary text-on-primary shadow-sm">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">
            User Profile Management
          </h1>
          <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
            Manage your personal physical parameters, body stats, and fitness goals.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span>Profile parameters updated successfully!</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="rounded-3xl p-6 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-outline-light dark:border-outline-dark bg-background-light dark:bg-background-dark text-sm font-semibold text-on-surface-light dark:text-on-surface-dark focus:ring-2 ring-primary focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-outline-light dark:border-outline-dark bg-background-light dark:bg-background-dark text-sm font-semibold text-on-surface-light dark:text-on-surface-dark focus:ring-2 ring-primary focus:outline-hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-1">
              Age
            </label>
            <input
              type="number"
              min="10"
              max="100"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-outline-light dark:border-outline-dark bg-background-light dark:bg-background-dark text-sm font-semibold text-on-surface-light dark:text-on-surface-dark focus:ring-2 ring-primary focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-1">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-outline-light dark:border-outline-dark bg-background-light dark:bg-background-dark text-sm font-semibold text-on-surface-light dark:text-on-surface-dark focus:ring-2 ring-primary focus:outline-hidden capitalize"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-outline-light dark:border-outline-dark bg-background-light dark:bg-background-dark text-sm font-semibold text-on-surface-light dark:text-on-surface-dark focus:ring-2 ring-primary focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-outline-light dark:border-outline-dark bg-background-light dark:bg-background-dark text-sm font-semibold text-on-surface-light dark:text-on-surface-dark focus:ring-2 ring-primary focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-2">
            Fitness Target Goal
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'lose_weight', label: 'Fat Loss' },
              { id: 'maintain', label: 'Maintain' },
              { id: 'gain_muscle', label: 'Muscle Gain' },
              { id: 'improve_stamina', label: 'Stamina' },
            ].map((g) => (
              <button
                type="button"
                key={g.id}
                onClick={() => setGoal(g.id as any)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  goal === g.id
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-variant-light dark:bg-surface-variant-dark text-on-surface-light dark:text-on-surface-dark'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </form>

      {/* Account Security & Sign Out Section */}
      {onLogout && (
        <div className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Active Session Security</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Logged in as {user.email}. Click below to end your active session.</p>
          </div>
          <button
            onClick={onLogout}
            className="w-full sm:w-auto py-2.5 px-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 font-bold text-xs transition-all flex items-center justify-center gap-2 border border-rose-100 dark:border-rose-900/50 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out / Log Out</span>
          </button>
        </div>
      )}

    </div>
  );
};
