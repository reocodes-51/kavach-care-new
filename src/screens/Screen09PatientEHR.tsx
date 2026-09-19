import React, { useState } from 'react';
import {
  Edit2,
  Calendar,
  FileText,
  Activity,
  Pill,
  Share2,
  Plus
} from 'lucide-react';

interface Screen09PatientEHRProps {
  onNavigate: (screenNumber: number) => void;
}

export const Screen09PatientEHR: React.FC<Screen09PatientEHRProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  const navItems = [
    { label: 'Overview', icon: <Activity className="w-3.5 h-3.5" /> },
    { label: 'Timeline', icon: <Calendar className="w-3.5 h-3.5" /> },
    { label: 'Conditions', icon: <Activity className="w-3.5 h-3.5" /> },
    { label: 'Medications', icon: <Pill className="w-3.5 h-3.5" /> },
    { label: 'Reports', icon: <FileText className="w-3.5 h-3.5" /> },
    { label: 'Referrals', icon: <Share2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Patient Header Card matching Screen 9 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#0F5B4E] font-bold text-lg flex items-center justify-center border-2 border-emerald-300">
              SS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">Sita Sharma</h2>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">
                  ABDM Active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                42 years • Female • ABHA / KVC ID: <strong className="font-mono text-[#0F5B4E]">KVC-1024</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate(6)}
              className="px-3 py-1.5 border border-emerald-600 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Track Referral</span>
            </button>
            <button
              onClick={() => alert('Editing patient demographics')}
              className="px-3.5 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* 3 Columns Layout matching Screen 9 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: EHR Sub Navigation */}
          <div className="lg:col-span-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1 text-xs">
            {navItems.map((item) => {
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-semibold text-left transition-colors ${
                    isActive
                      ? 'bg-[#0F5B4E] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Center: Health Journey Timeline */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Health Journey</h3>
              <span className="text-[10px] font-semibold text-slate-400">Longitudinal EHR</span>
            </div>

            <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 text-xs">
              {/* Event 1 */}
              <div className="relative flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 z-10 text-[10px]">
                  ✓
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">19 Sep 2024</div>
                  <div className="font-bold text-slate-900">Doctor Consultation</div>
                  <div className="text-[11px] text-slate-500">CHC Rampur • General Medicine</div>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 z-10 text-[10px]">
                  ✓
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">18 Sep 2024</div>
                  <div className="font-bold text-slate-900">CBC Report</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">Uploaded to ABDM Locker</div>
                </div>
              </div>

              {/* Event 3 */}
              <div className="relative flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0 z-10 text-[10px]">
                  ✓
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">17 Sep 2024</div>
                  <div className="font-bold text-slate-900">Referral Created</div>
                  <div className="text-[11px] text-slate-500">Dispatched to CHC Rampur</div>
                </div>
              </div>

              {/* Event 4 */}
              <div className="relative flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 z-10 text-[10px]">
                  !
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">17 Sep 2024</div>
                  <div className="font-bold text-slate-900">AI-Assisted Assessment</div>
                  <div className="text-[11px] text-red-700 font-bold">Urgent Evaluation Tagged</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Conditions, Medications, Documents */}
          <div className="lg:col-span-4 space-y-4 text-xs">
            {/* Conditions Box */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-800">Conditions</h4>
                <button className="text-[11px] font-semibold text-[#0F5B4E] flex items-center gap-1 hover:underline">
                  <Plus className="w-3 h-3" />
                  <span>Add</span>
                </button>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-medium flex items-center justify-between">
                <span>Hypertension</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Chronic</span>
              </div>
            </div>

            {/* Medications Box */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-800">Medications</h4>
                <button className="text-[11px] font-semibold text-[#0F5B4E] hover:underline">
                  View All
                </button>
              </div>
              <div className="space-y-1.5">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800">
                  <div className="font-bold">Amlodipine 5mg</div>
                  <div className="text-[10px] text-slate-500">1 tablet once daily morning</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800">
                  <div className="font-bold">Metformin 500mg</div>
                  <div className="text-[10px] text-slate-500">1 tablet twice daily after meals</div>
                </div>
              </div>
            </div>

            {/* Documents Box */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-800">Documents</h4>
                <span className="text-[10px] font-bold text-slate-500">3 Reports</span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span className="font-semibold text-slate-800">CBC_Report_18Sep.pdf</span>
                </div>
                <button
                  onClick={() => alert('Downloading verified clinical lab report.')}
                  className="text-[10px] font-bold text-[#0F5B4E] hover:underline"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
