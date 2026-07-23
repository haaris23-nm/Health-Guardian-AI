import React, { useState } from 'react';
import { Smile, Frown, Meh, Heart, Sparkles, Send, Loader2 } from 'lucide-react';
import { MoodLog } from '../types';

interface MoodTrackerViewProps {
  moodLogs: MoodLog[];
  onLogMood: (moodLevel: 1 | 2 | 3 | 4 | 5, moodLabel: string, notes: string) => void;
}

export const MoodTrackerView: React.FC<MoodTrackerViewProps> = ({ moodLogs, onLogMood }) => {
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [notes, setNotes] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const moodLevels = [
    { level: 1 as const, label: 'Terrible', icon: Frown, color: 'text-rose-500 bg-rose-500/10' },
    { level: 2 as const, label: 'Low', icon: Frown, color: 'text-amber-500 bg-amber-500/10' },
    { level: 3 as const, label: 'Okay', icon: Meh, color: 'text-blue-500 bg-blue-500/10' },
    { level: 4 as const, label: 'Good', icon: Smile, color: 'text-emerald-500 bg-emerald-500/10' },
    { level: 5 as const, label: 'Energetic', icon: Heart, color: 'text-purple-500 bg-purple-500/10' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const item = moodLevels.find((m) => m.level === selectedLevel);
    await onLogMood(selectedLevel, item?.label || 'Good', notes);
    setNotes('');
    setSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-outline-light dark:border-outline-dark pb-4">
        <div className="p-3 rounded-2xl bg-purple-600 text-white shadow-sm">
          <Smile className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">
            Mood Tracker & AI Mental Wellness
          </h1>
          <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
            Log daily emotional states and receive uplifting AI wellness suggestions powered by Gemini.
          </p>
        </div>
      </div>

      {/* Mood Entry Form */}
      <div className="rounded-3xl p-6 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-sm space-y-5">
        <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark">
          How are you feeling right now?
        </label>

        {/* Mood Level Selector */}
        <div className="grid grid-cols-5 gap-2">
          {moodLevels.map((m) => {
            const Icon = m.icon;
            const isSelected = selectedLevel === m.level;

            return (
              <button
                key={m.level}
                type="button"
                onClick={() => setSelectedLevel(m.level)}
                className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all ${
                  isSelected
                    ? `${m.color} ring-2 ring-purple-500 font-bold scale-105 shadow-xs`
                    : 'bg-surface-variant-light dark:bg-surface-variant-dark text-on-surface-variant-light hover:bg-surface-variant-light/80'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-[11px] leading-none">{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Notes Textarea */}
        <div>
          <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-1">
            Journal Notes / Feelings
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Completed an important project milestone today, feeling excited but slightly drained..."
            className="w-full p-4 rounded-2xl border border-outline-light dark:border-outline-dark bg-background-light dark:bg-background-dark text-sm font-medium text-on-surface-light dark:text-on-surface-dark focus:ring-2 ring-purple-500 focus:outline-hidden"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-3.5 rounded-full bg-purple-600 text-white font-bold text-sm shadow-md hover:bg-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing Mood with Gemini AI...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Log Mood & Get AI Wellness Tip</span>
            </>
          )}
        </button>
      </div>

      {/* Mood History List */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-on-surface-light dark:text-on-surface-dark flex items-center gap-2">
          <Heart className="w-5 h-5 text-purple-500" />
          Recent Mood Entries & AI Reflections
        </h2>

        <div className="space-y-3">
          {moodLogs.map((log) => (
            <div
              key={log.id}
              className="rounded-2xl p-5 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-on-surface-light dark:text-on-surface-dark flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 font-bold text-xs">
                    Mood: {log.moodLabel} ({log.moodLevel}/5)
                  </span>
                </span>
                <span className="text-[11px] text-on-surface-variant-light dark:text-on-surface-variant-dark font-semibold">
                  {log.timestamp}
                </span>
              </div>

              {log.notes && (
                <p className="text-xs text-on-surface-light dark:text-on-surface-dark bg-surface-variant-light/40 dark:bg-surface-variant-dark/40 p-3 rounded-xl">
                  "{log.notes}"
                </p>
              )}

              {log.aiSuggestion && (
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-900 dark:text-purple-200 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">Gemini Wellness Advice:</span>
                    {log.aiSuggestion}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
