import React, { useState } from 'react';
import { Droplet, Plus, Bell, CheckCircle2, Trash2 } from 'lucide-react';
import { WaterLog } from '../types';

interface WaterTrackerViewProps {
  waterIntakeMl: number;
  waterGoalMl: number;
  waterLogs: WaterLog[];
  onAddWater: (amountMl: number) => void;
}

export const WaterTrackerView: React.FC<WaterTrackerViewProps> = ({
  waterIntakeMl,
  waterGoalMl,
  waterLogs,
  onAddWater,
}) => {
  const [customAmount, setCustomAmount] = useState<string>('250');
  const [remindersEnabled, setRemindersEnabled] = useState<boolean>(true);

  const percent = Math.min(100, Math.round((waterIntakeMl / waterGoalMl) * 100));

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(customAmount);
    if (val > 0) {
      onAddWater(val);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-outline-light dark:border-outline-dark pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-500 text-white shadow-sm">
            <Droplet className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">
              Water Intake Tracker
            </h1>
            <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
              Monitor daily hydration levels and manage drink logs & reminders.
            </p>
          </div>
        </div>

        <button
          onClick={() => setRemindersEnabled(!remindersEnabled)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
            remindersEnabled
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
              : 'bg-surface-variant-light text-on-surface-variant-light'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>{remindersEnabled ? 'Reminders On' : 'Reminders Off'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Visual Water Bottle / Hydration Cylinder */}
        <div className="rounded-3xl p-6 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-sm flex flex-col items-center justify-center text-center space-y-6">
          <div className="relative w-36 h-64 rounded-3xl border-4 border-blue-400/40 p-1.5 overflow-hidden bg-blue-50 dark:bg-slate-900 shadow-inner">
            {/* Liquid Fill */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-700 ease-out rounded-b-2xl flex items-center justify-center"
              style={{ height: `${percent}%` }}
            >
              <span className="text-white font-black text-lg drop-shadow-md">
                {percent}%
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black text-on-surface-light dark:text-on-surface-dark">
              {(waterIntakeMl / 1000).toFixed(2)} / {(waterGoalMl / 1000).toFixed(1)} L
            </h2>
            <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark mt-1">
              {waterGoalMl - waterIntakeMl > 0
                ? `${waterGoalMl - waterIntakeMl} ml remaining to reach your goal!`
                : '🎉 Congratulations! Hydration goal achieved today!'}
            </p>
          </div>

          {/* Quick Add Buttons */}
          <div className="grid grid-cols-3 gap-3 w-full">
            {[150, 250, 500].map((amt) => (
              <button
                key={amt}
                onClick={() => onAddWater(amt)}
                className="py-2.5 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-500 hover:text-white transition-all border border-blue-500/20 flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                +{amt} ml
              </button>
            ))}
          </div>
        </div>

        {/* Custom Logger & Today's History */}
        <div className="space-y-6">
          
          {/* Custom Amount Form */}
          <div className="rounded-3xl p-5 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-sm">
            <h3 className="font-bold text-sm text-on-surface-light dark:text-on-surface-dark mb-3">
              Custom Water Log
            </h3>
            <form onSubmit={handleCustomSubmit} className="flex gap-2">
              <input
                type="number"
                min="50"
                max="2000"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Amount in ml"
                className="flex-1 px-4 py-2.5 rounded-xl border border-outline-light dark:border-outline-dark bg-background-light dark:bg-background-dark text-sm font-semibold text-on-surface-light dark:text-on-surface-dark focus:outline-hidden focus:ring-2 ring-blue-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Add Log
              </button>
            </form>
          </div>

          {/* Today's Log List */}
          <div className="rounded-3xl p-5 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-on-surface-light dark:text-on-surface-dark flex items-center justify-between">
              <span>Today's Hydration Logs</span>
              <span className="text-xs text-blue-500 font-semibold">{waterLogs.length} Entries</span>
            </h3>

            {waterLogs.length === 0 ? (
              <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark py-4 text-center">
                No water logged yet today. Click +250ml above to begin!
              </p>
            ) : (
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {waterLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-surface-variant-light/50 dark:bg-surface-variant-dark/50 border border-outline-light/40 dark:border-outline-dark/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                        <Droplet className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-on-surface-light dark:text-on-surface-dark">
                          +{log.amountMl} ml Intake
                        </p>
                        <p className="text-[10px] text-on-surface-variant-light dark:text-on-surface-variant-dark">
                          {log.timestamp}
                        </p>
                      </div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
