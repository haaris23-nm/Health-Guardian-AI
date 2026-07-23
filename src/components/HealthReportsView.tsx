import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';
import { HealthReport } from '../types';

export const HealthReportsView: React.FC = () => {
  const [report, setReport] = useState<HealthReport | null>(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await fetch('/api/reports');
      if (res.ok) {
        const data = await res.json();
        setReport(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!report) {
    return (
      <div className="p-8 text-center text-sm font-semibold text-on-surface-variant-light">
        Loading health report analytics...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-outline-light dark:border-outline-dark pb-4">
        <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-sm">
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">
            Weekly & Monthly Health Analytics
          </h1>
          <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
            Visualize trends for step counts, hydration levels, sleep cycles, and weight progression.
          </p>
        </div>
      </div>

      {/* AI Health Summary */}
      <div className="rounded-3xl p-6 bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent border border-indigo-500/20 space-y-3">
        <h2 className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          AI Biometric Trends Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {report.insights.map((insight, idx) => (
            <div key={idx} className="flex items-start gap-2 bg-surface-light/60 dark:bg-surface-dark/60 p-3 rounded-2xl border border-outline-light/40">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-on-surface-light dark:text-on-surface-dark leading-relaxed">{insight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Weekly Steps Bar Chart */}
        <div className="rounded-3xl p-5 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-on-surface-light dark:text-on-surface-dark flex items-center justify-between">
            <span>Weekly Step Counts</span>
            <span className="text-xs text-orange-500 font-bold">Avg 8,950 steps/day</span>
          </h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={report.weeklySteps}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="day" stroke="#888" fontSize={11} />
                <YAxis stroke="#888" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="steps" fill="#f97316" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Water Intake Area Chart */}
        <div className="rounded-3xl p-5 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-on-surface-light dark:text-on-surface-dark flex items-center justify-between">
            <span>Weekly Hydration (Liters)</span>
            <span className="text-xs text-blue-500 font-bold">Target 2.5L/day</span>
          </h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={report.weeklyWater}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="day" stroke="#888" fontSize={11} />
                <YAxis stroke="#888" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="waterLiters" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Sleep Hours Line Chart */}
        <div className="rounded-3xl p-5 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-on-surface-light dark:text-on-surface-dark flex items-center justify-between">
            <span>Weekly Sleep Hours</span>
            <span className="text-xs text-indigo-500 font-bold">Avg 7.5 hrs/night</span>
          </h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={report.weeklySleep}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="day" stroke="#888" fontSize={11} />
                <YAxis stroke="#888" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Weight Trend */}
        <div className="rounded-3xl p-5 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-on-surface-light dark:text-on-surface-dark flex items-center justify-between">
            <span>Monthly Weight Progression (kg)</span>
            <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              -1.5 kg Total
            </span>
          </h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={report.monthlyWeight}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="date" stroke="#888" fontSize={11} />
                <YAxis stroke="#888" fontSize={11} domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="weightKg" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
