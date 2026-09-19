import React, { useState } from 'react';
import {
  ArrowLeft,
  Mic,
  AlertTriangle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface Screen04AITriageProps {
  onNavigate: (screenNumber: number) => void;
}

export const Screen04AITriage: React.FC<Screen04AITriageProps> = ({ onNavigate }) => {
  const [symptomsText, setSymptomsText] = useState('High fever for 3 days with severe headache, vomiting and acute fatigue.');
  const [selectedPills, setSelectedPills] = useState<string[]>(['Fever', 'Headache', 'Vomiting', 'Weakness']);
  const [isRecording, setIsRecording] = useState(false);

  const symptomOptions = [
    'Fever',
    'Cough',
    'Pain',
    'Breathing',
    'Weakness',
    'Headache',
    'Vomiting',
    'Chest Pain'
  ];

  const togglePill = (pill: string) => {
    if (selectedPills.includes(pill)) {
      setSelectedPills(selectedPills.filter(p => p !== pill));
    } else {
      setSelectedPills([...selectedPills, pill]);
      if (!symptomsText.includes(pill)) {
        setSymptomsText(prev => prev ? `${prev}, ${pill}` : pill);
      }
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setSymptomsText('Patient reports sudden onset of high fever with shivering, vomiting twice since morning, and dizziness.');
        setIsRecording(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with Back button and Step 2 of 4 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => onNavigate(3)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#0F5B4E]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-slate-800">
              Patient Assessment
            </span>
            <span className="text-[11px] text-slate-500">Step 2 of 4</span>
          </div>

          {/* 4-Step Progress Bar */}
          <div className="w-36 h-2 bg-slate-100 rounded-full overflow-hidden flex">
            <div className="w-1/2 bg-[#0F5B4E] h-full" />
          </div>
        </div>

        {/* Two-Column Grid matching Screen 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Symptoms Input */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                What symptoms is the patient experiencing?
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Enter clinical observations or select common symptoms below.
              </p>
            </div>

            {/* Symptoms Textarea */}
            <div className="relative">
              <textarea
                rows={4}
                value={symptomsText}
                onChange={(e) => setSymptomsText(e.target.value)}
                placeholder="Describe symptoms in detail..."
                className="w-full p-3.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0F5B4E] focus:outline-none bg-slate-50 leading-relaxed"
              />

              {/* Speak Instead Voice Button */}
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  isRecording
                    ? 'bg-rose-100 border-rose-300 text-rose-800 animate-pulse'
                    : 'bg-emerald-50 border-emerald-200 text-[#0F5B4E] hover:bg-emerald-100'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{isRecording ? 'Listening...' : 'Speak instead'}</span>
              </button>
            </div>

            {/* Common Symptoms Pill Grid */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Common Symptoms
              </label>
              <div className="flex flex-wrap gap-2">
                {symptomOptions.map((symp) => {
                  const isSelected = selectedPills.includes(symp);
                  return (
                    <button
                      key={symp}
                      type="button"
                      onClick={() => togglePill(symp)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#0F5B4E] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {symp}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Continue Button */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => onNavigate(6)}
                className="px-6 py-2.5 bg-[#0F5B4E] hover:bg-[#0b3d34] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: AI Triage Result & Facility Match */}
          <div className="lg:col-span-5 space-y-4">
            {/* Triage Result Card (Red Urgent Box matching image) */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 text-red-950 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="font-extrabold text-sm tracking-wide uppercase text-red-700">
                    Triage Result:
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-black tracking-widest uppercase">
                  URGENT
                </span>
              </div>
              <p className="text-xs font-bold text-red-900 leading-snug">
                Medical evaluation recommended
              </p>
              <p className="text-[11px] text-red-800/90 leading-relaxed">
                Persistent fever with neurological signs (severe headache and vomiting) warrants immediate physical consultation and laboratory blood count at a Community Health Centre.
              </p>
            </div>

            {/* Recommended Facility Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Recommended Facility
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  8.2 km away
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">CHC Rampur</h3>
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-600 mt-1.5">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>General Medicine</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Laboratory</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Emergency Services</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onNavigate(6)}
                  className="py-2.5 px-3 bg-[#0F5B4E] hover:bg-[#0b3d34] text-white text-xs font-bold rounded-lg transition-colors text-center shadow-xs"
                >
                  Create Referral
                </button>
                <button
                  onClick={() => onNavigate(5)}
                  className="py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold rounded-lg transition-colors text-center"
                >
                  View Facility
                </button>
              </div>

              {/* Clinical AI Disclaimer Footnote */}
              <div className="pt-2 text-[10px] text-slate-400 text-center leading-tight border-t border-slate-100">
                AI-assisted assessment • Final decision by healthcare professional
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
