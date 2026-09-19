import React from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

interface Screen06ReferralTrackingProps {
  onNavigate: (screenNumber: number) => void;
}

export const Screen06ReferralTracking: React.FC<Screen06ReferralTrackingProps> = ({ onNavigate }) => {
  const steps = [
    {
      title: 'Created',
      time: '17 Sep, 10:30 AM',
      detail: 'Referral created by ASHA Sunita',
      status: 'completed'
    },
    {
      title: 'Sent to CHC',
      time: '17 Sep, 11:15 AM',
      detail: 'Referral dispatched to CHC Rampur',
      status: 'completed'
    },
    {
      title: 'Accepted',
      time: '17 Sep, 01:30 PM',
      detail: 'Accepted by facility medical officer',
      status: 'completed'
    },
    {
      title: 'Appointment Booked',
      time: '18 Sep, 09:00 AM',
      detail: 'Token A-103 pre-allocated in General Medicine OPD',
      status: 'active'
    },
    {
      title: 'Consultation',
      time: 'Scheduled',
      detail: 'Awaiting patient arrival at Room 04',
      status: 'pending'
    },
    {
      title: 'Diagnostics',
      time: 'Pending',
      detail: 'CBC & malaria smear staged in hospital lab',
      status: 'pending'
    },
    {
      title: 'Follow-up',
      time: 'Pending',
      detail: 'Post-discharge ASHA home recovery visit',
      status: 'pending'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header Card matching Screen 6 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Referral #KVC-10482
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Active In-Transit
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Created on 17 Sep 2024, 10:30 AM • By ASHA - Sunita (Rampur)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate(7)}
              className="px-3.5 py-2 bg-[#0F5B4E] hover:bg-[#0b3d34] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
            >
              View Queue Token (A-103)
            </button>
          </div>
        </div>

        {/* Two Columns: Left Vertical Stepper + Right Patient Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Vertical Timeline Stepper */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">
              Referral Journey Milestones
            </h3>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Step Icon */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                    step.status === 'completed'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : step.status === 'active'
                      ? 'bg-[#0F5B4E] text-white ring-4 ring-emerald-100'
                      : 'bg-slate-100 border border-slate-300 text-slate-400'
                  }`}>
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : step.status === 'active' ? (
                      <Clock className="w-4 h-4 animate-spin" />
                    ) : (
                      <span className="text-[10px] font-bold">{idx + 1}</span>
                    )}
                  </div>

                  {/* Step Info */}
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${
                        step.status === 'active' ? 'text-[#0F5B4E] text-sm' : 'text-slate-900'
                      }`}>
                        {step.title}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-0.5 text-[11px]">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Patient Details Card matching Screen 6 */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Patient Details
            </h3>

            {/* Profile Row */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#0F5B4E] font-bold flex items-center justify-center text-base border border-emerald-300">
                SS
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Sita Sharma</h4>
                <p className="text-xs text-slate-500">
                  42 years • Female • <span className="font-mono font-semibold text-[#0F5B4E]">KVC-1024</span>
                </p>
              </div>
            </div>

            {/* Referral Info */}
            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 font-medium block">Referral Type:</span>
                <span className="font-bold text-slate-800">General Medicine</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Reason:</span>
                <span className="font-semibold text-slate-800">Persistent fever and weakness (3+ days)</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Referred to:</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="font-bold text-[#0F5B4E]">CHC Rampur</span>
                  <span className="text-slate-500 font-semibold">8.2 km</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onNavigate(9)}
              className="w-full py-2.5 bg-[#0F5B4E] hover:bg-[#0b3d34] text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <span>View Patient Record</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
