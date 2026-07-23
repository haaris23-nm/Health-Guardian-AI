import React, { useState } from 'react';
import { Pill, Plus, Check, Clock, Calendar, AlertCircle } from 'lucide-react';
import { MedicineReminder } from '../types';

interface MedicineReminderViewProps {
  reminders: MedicineReminder[];
  onToggleTaken: (id: string) => void;
  onAddReminder: (med: Omit<MedicineReminder, 'id' | 'takenToday'>) => void;
}

export const MedicineReminderView: React.FC<MedicineReminderViewProps> = ({
  reminders,
  onToggleTaken,
  onAddReminder,
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [dosage, setDosage] = useState<string>('');
  const [time, setTime] = useState<string>('08:00 AM');
  const [days, setDays] = useState<string[]>(['Mon', 'Wed', 'Fri']);
  const [notes, setNotes] = useState<string>('');

  const allDaysList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day: string) => {
    if (days.includes(day)) {
      setDays(days.filter((d) => d !== day));
    } else {
      setDays([...days, day]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onAddReminder({
      name,
      dosage: dosage || '1 Dose',
      time,
      days: days.length ? days : ['Daily'],
      notes,
    });
    setName('');
    setDosage('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-outline-light dark:border-outline-dark pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-500 text-white shadow-sm">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">
              Medicine Reminders
            </h1>
            <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
              Schedule medications, set dosage times, and track daily adherence.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-full bg-primary text-on-primary font-bold text-xs hover:bg-primary-dark transition-all flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Reminder</span>
        </button>
      </div>

      {/* Medication Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reminders.map((med) => (
          <div
            key={med.id}
            className={`rounded-2xl p-5 border transition-all flex items-center justify-between ${
              med.takenToday
                ? 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/30'
                : 'bg-surface-light dark:bg-surface-dark border-outline-light dark:border-outline-dark shadow-xs'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-on-surface-light dark:text-on-surface-dark">
                  {med.name}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-variant-light dark:bg-surface-variant-dark text-[10px] font-bold text-primary">
                  {med.dosage}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
                <span className="flex items-center gap-1 font-semibold text-indigo-500">
                  <Clock className="w-3.5 h-3.5" />
                  {med.time}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {med.days.join(', ')}
                </span>
              </div>

              {med.notes && (
                <p className="text-[11px] text-on-surface-variant-light dark:text-on-surface-variant-dark italic">
                  "{med.notes}"
                </p>
              )}
            </div>

            <button
              onClick={() => onToggleTaken(med.id)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                med.takenToday
                  ? 'bg-emerald-500 text-white shadow-md scale-105'
                  : 'border-2 border-outline-light dark:border-outline-dark text-on-surface-variant-light hover:border-emerald-500 hover:text-emerald-500'
              }`}
              title={med.takenToday ? 'Taken Today' : 'Mark as Taken'}
            >
              <Check className="w-6 h-6 stroke-[3]" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Medicine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-surface-light dark:bg-surface-dark rounded-3xl p-6 shadow-2xl border border-outline-light dark:border-outline-dark space-y-4">
            <h2 className="text-lg font-black text-on-surface-light dark:text-on-surface-dark flex items-center gap-2">
              <Pill className="w-5 h-5 text-primary" />
              Add Medicine Schedule
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-1">
                  Medicine Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amoxicillin, Vitamin C"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-light dark:border-outline-dark bg-background-light dark:bg-background-dark text-sm font-semibold text-on-surface-light dark:text-on-surface-dark focus:ring-2 ring-primary focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Tablet, 500mg"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-light dark:border-outline-dark bg-background-light dark:bg-background-dark text-sm font-semibold text-on-surface-light dark:text-on-surface-dark focus:ring-2 ring-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 08:00 AM"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-light dark:border-outline-dark bg-background-light dark:bg-background-dark text-sm font-semibold text-on-surface-light dark:text-on-surface-dark focus:ring-2 ring-primary focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-1">
                  Days
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {allDaysList.map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => toggleDay(d)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        days.includes(d)
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-variant-light dark:bg-surface-variant-dark text-on-surface-variant-light'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark mb-1">
                  Notes / Instructions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Take after meals with water"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-light dark:border-outline-dark bg-background-light dark:bg-background-dark text-sm font-semibold text-on-surface-light dark:text-on-surface-dark focus:ring-2 ring-primary focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-on-surface-variant-light hover:bg-surface-variant-light"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-primary text-on-primary text-xs font-bold shadow-md hover:bg-primary-dark"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
