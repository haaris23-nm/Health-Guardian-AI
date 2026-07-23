import React, { useState } from 'react';
import { X, Droplet, Pill, Scale, Smile, Plus } from 'lucide-react';

interface QuickLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogWater: (amountMl: number) => void;
  onNavigate: (view: string) => void;
}

export const QuickLogModal: React.FC<QuickLogModalProps> = ({
  isOpen,
  onClose,
  onLogWater,
  onNavigate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-surface-light dark:bg-surface-dark rounded-3xl p-6 shadow-2xl border border-outline-light dark:border-outline-dark space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-variant-light dark:hover:bg-surface-variant-dark text-on-surface-variant-light"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-black text-on-surface-light dark:text-on-surface-dark">
          Quick Health Log
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              onLogWater(250);
              onClose();
            }}
            className="p-4 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex flex-col items-center gap-2 transition-all"
          >
            <Droplet className="w-6 h-6" />
            <span className="font-bold text-xs">+250ml Water</span>
          </button>

          <button
            onClick={() => {
              onNavigate('medicine');
              onClose();
            }}
            className="p-4 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex flex-col items-center gap-2 transition-all"
          >
            <Pill className="w-6 h-6" />
            <span className="font-bold text-xs">Medication</span>
          </button>

          <button
            onClick={() => {
              onNavigate('bmi');
              onClose();
            }}
            className="p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex flex-col items-center gap-2 transition-all"
          >
            <Scale className="w-6 h-6" />
            <span className="font-bold text-xs">Log Weight</span>
          </button>

          <button
            onClick={() => {
              onNavigate('mood');
              onClose();
            }}
            className="p-4 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex flex-col items-center gap-2 transition-all"
          >
            <Smile className="w-6 h-6" />
            <span className="font-bold text-xs">Mood Check</span>
          </button>
        </div>
      </div>
    </div>
  );
};
