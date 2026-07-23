import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Pill,
  ShieldAlert,
  Loader2,
  Calendar,
  UserCheck,
  Plus,
  ArrowRight,
  MessageSquare,
  Info,
  Check
} from 'lucide-react';
import { PrescriptionAnalysis, UserProfile } from '../types';

interface PrescriptionViewProps {
  user: UserProfile;
  onNavigate: (view: string) => void;
  onAddMedicineReminder?: (med: { name: string; dosage: string; time: string; days: string[] }) => void;
}

export const PrescriptionView: React.FC<PrescriptionViewProps> = ({
  user,
  onNavigate,
  onAddMedicineReminder
}) => {
  const [prescriptionText, setPrescriptionText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<PrescriptionAnalysis | null>(null);
  const [addedMeds, setAddedMeds] = useState<Record<string, boolean>>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async (presetId?: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/prescription-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prescriptionText,
          imageBase64: imagePreview,
          presetId
        })
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error('Failed to analyze prescription', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedReminder = async (medName: string, dosage: string, time: string) => {
    try {
      await fetch('/api/medicine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: medName,
          dosage,
          time,
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          notes: 'Added from AI Prescription Scanner'
        })
      });
      if (onAddMedicineReminder) {
        onAddMedicineReminder({ name: medName, dosage, time, days: ['Daily'] });
      }
      setAddedMeds(prev => ({ ...prev, [medName]: true }));
    } catch (err) {
      console.error('Error adding medicine reminder:', err);
    }
  };

  return (
    <div className="space-y-6 pb-24 font-sans max-w-7xl mx-auto px-1 sm:px-4">
      
      {/* Header Banner */}
      <div className="bg-blue-900 text-white rounded-[2.5rem] p-6 sm:p-8 relative overflow-hidden shadow-md border border-blue-800">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-800/80 border border-blue-700/50 text-blue-200 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-blue-300" />
            AI Prescription Reader & Guide
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Prescription Reader & Action Plan
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed font-medium">
            Upload or snap a photo of your doctor's prescription note or paste handwritten medicine names. Our Gemini AI will translate medical jargon into a clear step-by-step action plan, dosage timings, food precautions, and alert flags.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
      </div>

      {/* Input Section: Upload Image, Paste Text, or Select Presets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input Panel */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-xs border border-blue-100 dark:border-slate-800 space-y-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            1. Provide Your Prescription
          </h2>

          {/* Quick Presets for Instant Demo */}
          <div>
            <label className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block mb-2">
              Try Preset Doctor Prescriptions (1-Click AI Demo)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setPrescriptionText('Rx: Amoxicillin 625mg twice daily after food x 7 days. Paracetamol 650mg 3x daily as needed for fever. Omeprazole 20mg once before breakfast.');
                  handleAnalyze('infection');
                }}
                className="p-3 rounded-2xl bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 border border-blue-100 dark:border-slate-700 text-blue-800 dark:text-blue-300 text-left text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold">
                  Rx1
                </div>
                <div>
                  <span className="block font-bold">Respiratory & Infection</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Antibiotic Care</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPrescriptionText('Rx: Amlodipine 5mg once daily morning. Atorvastatin 10mg once daily night. Omeprazole 20mg before food.');
                  handleAnalyze('cardio');
                }}
                className="p-3 rounded-2xl bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 border border-blue-100 dark:border-slate-700 text-blue-800 dark:text-blue-300 text-left text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold">
                  Rx2
                </div>
                <div>
                  <span className="block font-bold">Hypertension & Heart</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">BP Maintenance</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPrescriptionText('Rx: Metformin 500mg twice daily with meals. Glimepiride 1mg before breakfast. Multivitamin 1 tab daily.');
                  handleAnalyze('diabetes');
                }}
                className="p-3 rounded-2xl bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 border border-blue-100 dark:border-slate-700 text-blue-800 dark:text-blue-300 text-left text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold">
                  Rx3
                </div>
                <div>
                  <span className="block font-bold">Diabetes & Glycemic</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Sugar Regimen</span>
                </div>
              </button>
            </div>
          </div>

          {/* Upload Image Box */}
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Upload Prescription Image or Photo
            </label>
            <div className="relative border-2 border-dashed border-blue-200 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-4 text-center bg-blue-50/30 dark:bg-slate-800/40 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {imagePreview ? (
                <div className="space-y-2">
                  <img src={imagePreview} alt="Prescription preview" className="max-h-48 mx-auto rounded-xl shadow-md object-contain" />
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">Image uploaded cleanly. Click "Analyze with AI" below.</p>
                </div>
              ) : (
                <div className="space-y-2 py-4">
                  <Upload className="w-8 h-8 mx-auto text-blue-600 dark:text-blue-400" />
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Click or drag & drop prescription image here
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">Supports JPG, PNG, WEBP (Handwritten or Printed Doctor Notes)</p>
                </div>
              )}
            </div>
          </div>

          {/* Or Paste Prescription Text */}
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Or Type / Paste Prescription Details
            </label>
            <textarea
              rows={3}
              value={prescriptionText}
              onChange={(e) => setPrescriptionText(e.target.value)}
              placeholder="e.g. Amoxicillin 500mg 3x daily for 7 days, Paracetamol 650mg as needed for fever..."
              className="w-full rounded-2xl border border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          {/* Analyze CTA */}
          <button
            onClick={() => handleAnalyze()}
            disabled={loading || (!prescriptionText && !imagePreview)}
            className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Reading & Decoding Prescription with Gemini AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-blue-200" />
                <span>Analyze Prescription & Generate Action Guide</span>
              </>
            )}
          </button>
        </div>

        {/* How It Works Card */}
        <div className="lg:col-span-5 bg-white dark:bg-[#151C2C] rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-600" />
              What AI Prescription Reader Does
            </h3>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 font-bold flex items-center justify-center text-xs shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">Decodes Medicine Names & Dosages</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Identifies exact drug strength, generic name, and active pharmacological class.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 font-bold flex items-center justify-center text-xs shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">Explains "What To Do" For Each Med</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Provides clear guidelines on whether to take before/after food, with water, and mandatory precautions.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 font-bold flex items-center justify-center text-xs shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">Maps Out Daily Routine Schedule</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Organizes medication timings into Morning, Afternoon, Evening, and Night routines.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 font-bold flex items-center justify-center text-xs shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">Syncs With Medicine Reminders</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">1-click addition directly into your daily alarm tracker so you never miss a dose.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 bg-rose-50/60 dark:bg-rose-950/20 p-3.5 rounded-2xl">
            <p className="text-[11px] text-rose-800 dark:text-rose-300 font-medium leading-relaxed flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span><strong>Medical Safety Note:</strong> Always review prescription schedules with your physician or local pharmacist.</span>
            </p>
          </div>
        </div>

      </div>

      {/* Analysis Results View */}
      {analysis && (
        <div className="space-y-6 pt-4 animate-fadeIn">
          
          {/* Summary Overview Banner */}
          <div className="bg-white dark:bg-[#151C2C] rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                  Prescription Decoded
                </span>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">{analysis.rxTitle}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-3">
                  <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-indigo-600" /> {analysis.prescribingDoctor}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-indigo-600" /> {analysis.date}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('medicine')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Pill className="w-4 h-4" />
                  View Medicine Reminders
                </button>
              </div>
            </div>

            {/* Overall Action Guide */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Primary Indication & Action Plan ("What to do")
              </h3>
              <p className="text-sm font-semibold text-indigo-950 dark:text-indigo-200 mb-2">
                Indication: {analysis.diagnosisIndication}
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {analysis.overallGuideline}
              </p>
            </div>
          </div>

          {/* Critical Warning Flags */}
          {analysis.warningFlags && analysis.warningFlags.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-[2rem] p-5 space-y-2">
              <h3 className="font-bold text-amber-800 dark:text-amber-300 text-xs uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Critical Safety Flags & Red Warnings
              </h3>
              <ul className="space-y-1.5">
                {analysis.warningFlags.map((flag, i) => (
                  <li key={i} className="text-xs text-amber-950 dark:text-amber-200 font-semibold flex items-start gap-2">
                    <span className="text-amber-500 shrink-0">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Medications Detailed Breakdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Pill className="w-5 h-5 text-indigo-600" />
              Prescribed Medications Guide & Dosage Instructions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysis.medications.map((med, idx) => {
                const isAdded = addedMeds[med.name];

                return (
                  <div
                    key={idx}
                    className="bg-white dark:bg-[#151C2C] rounded-[2rem] p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-indigo-200 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                            {med.category}
                          </span>
                          <h4 className="font-bold text-base text-slate-800 dark:text-slate-100 mt-1">
                            {med.name}
                          </h4>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs shrink-0">
                          {med.timing}
                        </span>
                      </div>

                      {/* Dosage info pills */}
                      <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                        <span className="bg-slate-50 dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
                          Dose: <strong>{med.dosage}</strong>
                        </span>
                        <span className="bg-slate-50 dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
                          Freq: <strong>{med.frequency}</strong>
                        </span>
                        <span className="bg-slate-50 dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
                          For: <strong>{med.duration}</strong>
                        </span>
                      </div>

                      {/* What to do guide */}
                      <div className="bg-indigo-50/60 dark:bg-indigo-950/30 p-3 rounded-2xl border border-indigo-100/60 dark:border-indigo-900/30 space-y-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block">
                          What You Should Do:
                        </span>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                          {med.instructionsWhatToDo}
                        </p>
                      </div>

                      {/* Precautions */}
                      {med.precautions && med.precautions.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Precautions:</span>
                          <div className="flex flex-wrap gap-1">
                            {med.precautions.map((p, pi) => (
                              <span key={pi} className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">
                                • {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Add to Reminders Button */}
                    <button
                      onClick={() => handleAddMedReminder(med.name, med.dosage, '08:00 AM')}
                      disabled={isAdded}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 cursor-default'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Daily Reminders!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add to Medicine Reminders</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Schedule Plan */}
          <div className="bg-white dark:bg-[#151C2C] rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              Daily Medication Timetable & Routine Plan
            </h3>

            <div className="space-y-3">
              {analysis.dailySchedule.map((slot, sIdx) => (
                <div
                  key={sIdx}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 gap-3"
                >
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{slot.timeSlot}</h4>
                      <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        {slot.medsToTake.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-[#151C2C] p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-200 block mb-0.5">Action Step:</span>
                    {slot.actionSteps}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ask Follow Up Questions with AI */}
          <div className="bg-indigo-50 dark:bg-indigo-950/40 rounded-[2rem] p-6 border border-indigo-100 dark:border-indigo-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-bold text-base text-indigo-950 dark:text-indigo-100 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                Have questions about side effects or missed doses?
              </h4>
              <p className="text-xs text-indigo-800 dark:text-indigo-300">
                Ask Gemini HealthMate Assistant for instant personalized answers about food interactions or drug questions.
              </p>
            </div>

            <button
              onClick={() => onNavigate('chatbot')}
              className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shrink-0 shadow-md flex items-center gap-2"
            >
              <span>Ask AI Chatbot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
