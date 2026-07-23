import React, { useState } from 'react';
import { Stethoscope, Sparkles, AlertTriangle, CheckCircle2, ShieldAlert, Loader2, Info } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Title Header */}
      <div className="flex items-center gap-3 border-b border-outline-light dark:border-outline-dark pb-4">
        <div className="p-3 rounded-2xl bg-rose-500 text-white shadow-sm">
          <Stethoscope className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">
            AI Symptom Checker & Triage
          </h1>
          <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
            Describe symptoms to receive AI-powered potential causes & medical urgency indicators.
          </p>
        </div>
      </div>

      {/* Mandatory Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start gap-3 text-xs leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold uppercase tracking-wide block mb-0.5">Medical Disclaimer</span>
          This tool provides AI-generated informational insights powered by Google Gemini. It is <strong>NOT a medical diagnosis</strong>, treatment plan, or professional medical advice. If you are experiencing severe symptoms, chest pain, difficulty breathing, or a medical emergency, call emergency medical services immediately.
        </div>
      </div>

      {/* Input Section */}
      <div className="rounded-3xl p-6 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-sm space-y-4">
        <label className="block text-xs font-bold uppercase text-on-surface-variant-light dark:text-on-surface-variant-dark">
          Describe Your Symptoms
        </label>

        <textarea
          rows={3}
          value={symptomsInput}
          onChange={(e) => setSymptomsInput(e.target.value)}
          placeholder="e.g. I have had a dull headache for 2 days, mild nasal congestion, and felt fatigued since yesterday morning..."
          className="w-full p-4 rounded-2xl border border-outline-light dark:border-outline-dark bg-background-light dark:bg-background-dark text-sm font-medium text-on-surface-light dark:text-on-surface-dark focus:ring-2 ring-primary focus:outline-hidden"
        />

        {/* Quick Suggestion Chips */}
        <div>
          <span className="text-[11px] font-bold text-on-surface-variant-light dark:text-on-surface-variant-dark uppercase block mb-2">
            Common Quick Symptoms:
          </span>
          <div className="flex flex-wrap gap-2">
            {commonSymptomChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => setSymptomsInput(chip)}
                className="px-3 py-1.5 rounded-full bg-surface-variant-light dark:bg-surface-variant-dark hover:bg-primary/10 hover:text-primary text-xs font-semibold text-on-surface-light dark:text-on-surface-dark transition-all"
              >
                + {chip}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleAnalyze()}
          disabled={loading || !symptomsInput.trim()}
          className="w-full py-3.5 rounded-full bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing with Gemini AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Analyze Symptoms with Gemini</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs font-bold">
          {error}
        </div>
      )}

      {/* Analysis Results Card */}
      {result && (
        <div className="rounded-3xl p-6 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark shadow-md space-y-6 animate-fade-in">
          
          {/* Header with Urgency Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-light dark:border-outline-dark pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase text-primary tracking-wider">
                Analysis Report
              </span>
              <h2 className="text-xl font-black text-on-surface-light dark:text-on-surface-dark">
                Reported Symptoms: "{result.symptoms.join(', ')}"
              </h2>
            </div>

            <div className={`px-4 py-2 rounded-full font-black text-xs border uppercase tracking-wider flex items-center gap-1.5 w-fit ${
              result.urgency === 'Urgent Medical Attention Required'
                ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-200'
                : result.urgency === 'Non-urgent'
                ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-200'
                : 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200'
            }`}>
              <AlertTriangle className="w-4 h-4" />
              <span>Urgency: {result.urgency}</span>
            </div>
          </div>

          {/* Probable Causes List */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-on-surface-light dark:text-on-surface-dark uppercase tracking-wider">
              Potential Medical Causes Identified
            </h3>

            <div className="space-y-3">
              {result.probableCauses.map((cause, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-surface-variant-light/40 dark:bg-surface-variant-dark/40 border border-outline-light/40 dark:border-outline-dark/40 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-on-surface-light dark:text-on-surface-dark">
                      {cause.title}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      cause.likelihood === 'High'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : cause.likelihood === 'Moderate'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {cause.likelihood} Likelihood
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark leading-relaxed">
                    {cause.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="p-4 rounded-2xl bg-primary-container/20 border border-primary-container text-on-surface-light dark:text-on-surface-dark space-y-1">
            <h4 className="font-extrabold text-xs uppercase text-primary flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              General Care Advice
            </h4>
            <p className="text-xs leading-relaxed">
              {result.recommendation}
            </p>
          </div>

          {/* Bottom Disclaimer */}
          <p className="text-[11px] text-on-surface-variant-light dark:text-on-surface-variant-dark italic border-t border-outline-light dark:border-outline-dark pt-3">
            {result.disclaimer}
          </p>

        </div>
      )}

    </div>
  );
};
