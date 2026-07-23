import React, { useState } from 'react';
import { Stethoscope, Sparkles, AlertTriangle, ShieldAlert, Loader2, Info } from 'lucide-react';
import { SymptomCheckResult } from '../types';

export const SymptomCheckerVIew: React.FC = () => {
  const [symptomsInput, setSymptomsInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<SymptomCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const commonSymptomChips = [
    'Mild headache & dizziness',
    'Dry cough & sore throat',
    'Low grade fever & fatigue',
    'Lower back stiffness',
    'Stomach ache & nausea',
    'Seasonal sneezing & itchy eyes'
  ];

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!symptomsInput.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/symptom-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: symptomsInput }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to analyze symptoms.');
      }
    } catch (err) {
      setError('Network error while connecting to Gemini AI triage service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 font-sans">
      
      {/* Title Header */}
      <div className="flex items-center gap-3 border-b border-blue-100 dark:border-slate-800 pb-4">
        <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-xs">
          <Stethoscope className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            AI Symptom Checker & Medical Triage
          </h1>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Describe symptoms clearly to receive AI-powered potential causes & medical urgency guidance.
          </p>
        </div>
      </div>

      {/* Mandatory Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 text-blue-900 dark:text-blue-200 flex items-start gap-3 text-xs leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold uppercase tracking-wide block mb-0.5 text-blue-700 dark:text-blue-300">Medical Advisory</span>
          This tool provides AI-generated informational insights powered by Google Gemini. It is <strong>NOT a medical diagnosis</strong>, treatment plan, or doctor prescription. If you are experiencing severe symptoms, chest pain, or a medical emergency, call emergency medical services immediately.
        </div>
      </div>

      {/* Input Section */}
      <div className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 shadow-xs space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
          Describe Your Symptoms
        </label>

        <textarea
          rows={3}
          value={symptomsInput}
          onChange={(e) => setSymptomsInput(e.target.value)}
          placeholder="e.g. I have had a dull headache for 2 days, mild nasal congestion, and felt fatigued since yesterday morning..."
          className="w-full p-4 rounded-2xl border border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
        />

        {/* Quick Suggestion Chips */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-2">
            Common Quick Symptoms:
          </span>
          <div className="flex flex-wrap gap-2">
            {commonSymptomChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => setSymptomsInput(chip)}
                className="px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-xs font-bold transition-all border border-blue-100 dark:border-slate-700 cursor-pointer"
              >
                + {chip}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleAnalyze()}
          disabled={loading || !symptomsInput.trim()}
          className="w-full py-3.5 rounded-full bg-blue-600 text-white font-bold text-sm shadow-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing Symptoms with Gemini AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-blue-200" />
              <span>Analyze Symptoms with Gemini</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-200 text-blue-800 dark:text-blue-200 text-xs font-bold">
          {error}
        </div>
      )}

      {/* Analysis Results Card */}
      {result && (
        <div className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 shadow-xs space-y-6">
          
          {/* Header with Urgency Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase text-blue-600 tracking-wider">
                Analysis Report
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Reported Symptoms: "{result.symptoms.join(', ')}"
              </h2>
            </div>

            <div className="px-4 py-2 rounded-full font-black text-xs border uppercase tracking-wider flex items-center gap-1.5 w-fit bg-blue-50 text-blue-800 border-blue-200 dark:bg-slate-800 dark:text-blue-300">
              <AlertTriangle className="w-4 h-4 text-blue-600" />
              <span>Urgency: {result.urgency}</span>
            </div>
          </div>

          {/* Probable Causes List */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Potential Medical Causes Identified
            </h3>

            <div className="space-y-3">
              {result.probableCauses.map((cause, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-blue-50/40 dark:bg-slate-800/40 border border-blue-100 dark:border-slate-800 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {cause.title}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 dark:bg-slate-700 dark:text-blue-200">
                      {cause.likelihood} Likelihood
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    {cause.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 text-slate-900 dark:text-slate-100 space-y-1">
            <h4 className="font-extrabold text-xs uppercase text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              General Care Advice
            </h4>
            <p className="text-xs font-medium leading-relaxed">
              {result.recommendation}
            </p>
          </div>

          {/* Bottom Disclaimer */}
          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic border-t border-blue-100 dark:border-slate-800 pt-3">
            {result.disclaimer}
          </p>

        </div>
      )}

    </div>
  );
};
