import React, { useState } from 'react';
import type { ReferralRecord, ReferralStatus } from '../../types';
import { mockReferrals } from '../../data/mockReferrals';
import {
  Search,
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck,
  QrCode
} from 'lucide-react';
import { UrgencyBadge, StatusBadge } from '../common/Badge';
import { ReferralSlipModal } from '../modals/ReferralSlipModal';

interface ReferralTrackerProps {
  initialReferralId?: string;
  customReferrals?: ReferralRecord[];
}

export const ReferralTracker: React.FC<ReferralTrackerProps> = ({
  initialReferralId,
  customReferrals = []
}) => {
  const allReferrals = [...customReferrals, ...mockReferrals];

  const [searchQuery, setSearchQuery] = useState(initialReferralId || 'REF-2024-MH-8421');
  const [selectedReferral, setSelectedReferral] = useState<ReferralRecord>(() => {
    const found = allReferrals.find(r => r.id === (initialReferralId || 'REF-2024-MH-8421'));
    return found || allReferrals[0];
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    const match = allReferrals.find(
      r => r.id.toUpperCase() === query ||
           r.abhaId.includes(query) ||
           r.patientName.toUpperCase().includes(query)
    );
    if (match) {
      setSelectedReferral(match);
    } else {
      alert(`No active referral found matching "${searchQuery}". Please select one of the sample demo IDs.`);
    }
  };

  const selectPreset = (ref: ReferralRecord) => {
    setSearchQuery(ref.id);
    setSelectedReferral(ref);
  };

  const statusList: ReferralStatus[] = [
    'CREATED',
    'ACCEPTED',
    'APPOINTMENT',
    'ARRIVAL',
    'CONSULTATION',
    'TREATMENT',
    'FOLLOWUP',
    'COMPLETED'
  ];

  const getStepIndex = (status: ReferralStatus) => statusList.indexOf(status);
  const currentStepIndex = getStepIndex(selectedReferral.status);

  return (
    <section id="referral-tracking" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-[#123B63] border border-blue-200 text-xs font-bold mb-2">
              <QrCode className="w-3.5 h-3.5" />
              <span>Real-Time Clinical Continuity Tracker</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#123B63] tracking-tight">
              Closed-Loop Referral Tracking System
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Track patient milestones from frontline village screening to post-discharge ASHA home recovery
            </p>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Referral ID (e.g. REF-2024...)"
                className="pl-9 pr-3 py-2 text-xs border border-slate-300 rounded w-64 focus:outline-none focus:ring-1 focus:ring-[#123B63] bg-slate-50 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#123B63] hover:bg-[#0e2f50] text-white text-xs font-bold rounded shadow-xs"
            >
              Verify & Track
            </button>
          </form>
        </div>

        {/* Demo Referral Case Quick Switchers */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500">Demo Active Records:</span>
          {allReferrals.slice(0, 4).map((r) => (
            <button
              key={r.id}
              onClick={() => selectPreset(r)}
              className={`px-2.5 py-1 rounded border text-xs font-medium transition-colors ${
                selectedReferral.id === r.id
                  ? 'bg-[#123B63] text-white border-[#123B63]'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              <span className="font-mono font-bold mr-1">{r.id}</span>
              <span>({r.patientName.split(' ')[0]} • {r.urgency})</span>
            </button>
          ))}
        </div>

        {/* Active Referral Card & 8-Step Tracker */}
        <div className="mt-6 bg-slate-50 border border-slate-300 rounded shadow-sm overflow-hidden">
          {/* Card Top Info Bar */}
          <div className="bg-white p-5 border-b border-slate-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Patient Basic Info */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded bg-[#123B63] text-white flex items-center justify-center font-bold text-base flex-shrink-0">
                  {selectedReferral.patientName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">
                      {selectedReferral.patientName}
                    </h3>
                    <UrgencyBadge urgency={selectedReferral.urgency} size="sm" />
                    <StatusBadge status={selectedReferral.status} size="sm" />
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                    <span><strong>ABHA:</strong> <code className="font-mono text-[#123B63] font-bold">{selectedReferral.abhaId}</code></span>
                    <span><strong>Age:</strong> {selectedReferral.age} Yrs ({selectedReferral.gender})</span>
                    <span><strong>Origin:</strong> {selectedReferral.village}, {selectedReferral.block}</span>
                    <span><strong>Token:</strong> <strong className="text-amber-800">{selectedReferral.tokenNumber}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-health-green hover:bg-health-green-dark text-white rounded text-xs font-bold shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>View Official QR Slip</span>
                </button>
              </div>
            </div>
          </div>

          {/* 8-Stage Visual Timeline Progress */}
          <div className="p-5 sm:p-6 bg-white border-b border-slate-200">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
              Closed-Loop Clinical Progression (8 Stages)
            </h4>

            {/* Horizontal Timeline */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 relative">
              {statusList.map((st, idx) => {
                const isCompleted = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                const stepTimelineData = selectedReferral.timeline.find(t => t.status === st);

                return (
                  <div
                    key={st}
                    className={`p-2.5 rounded border text-left flex flex-col justify-between transition-all ${
                      isCurrent
                        ? 'bg-blue-50/80 border-[#123B63] ring-1 ring-[#123B63]'
                        : isCompleted
                        ? 'bg-emerald-50/50 border-emerald-300'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[9px] font-bold px-1 rounded ${
                          isCompleted ? 'bg-emerald-700 text-white' : 'bg-slate-300 text-slate-700'
                        }`}>
                          0{idx + 1}
                        </span>
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-health-green" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </div>

                      <div className="text-[11px] font-bold text-slate-900 leading-tight">
                        {stepTimelineData ? stepTimelineData.labelEn.split(' ')[0] : st}
                      </div>
                    </div>

                    <div className="text-[9px] text-slate-500 mt-2 line-clamp-1">
                      {stepTimelineData?.timestamp || 'Pending'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Two-Column Breakdown */}
          <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
            {/* Left: Detailed Timeline Audit Log */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                Facility & Milestones Audit Trail
              </h4>

              <div className="space-y-3">
                {selectedReferral.timeline.map((step, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded border flex items-start gap-3 ${
                      step.completed ? 'bg-white border-slate-200' : 'bg-slate-100/60 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className={`p-1.5 rounded mt-0.5 ${
                      step.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {step.completed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">
                          {step.labelEn}
                        </span>
                        <span className="text-[10px] font-medium text-slate-500">
                          {step.timestamp}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#123B63] font-semibold mt-0.5">
                        {step.facility} • <span className="text-slate-600">{step.actor}</span>
                      </div>
                      <div className="text-slate-600 text-[11px] mt-1">
                        {step.remarks}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Clinical & Logistics Summary */}
            <div className="space-y-4">
              {/* Destination Facility Box */}
              <div className="bg-white p-4 rounded border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Assigned Destination Facility
                </span>
                <div className="font-bold text-slate-900 text-sm">
                  {selectedReferral.targetFacility}
                </div>
                <div className="text-slate-600 text-xs mt-0.5">
                  Dept: {selectedReferral.specialtyRequired}
                </div>
                <div className="mt-2 text-[11px] text-slate-700">
                  <span className="font-semibold">Attending Doctor: </span>
                  {selectedReferral.targetDoctorName || 'Duty Specialist'}
                </div>
                <div className="mt-1 text-[11px] text-slate-700">
                  <span className="font-semibold">Transport: </span>
                  {selectedReferral.transportType} ({selectedReferral.ashaAccompanied ? 'ASHA Accompanied' : 'Family Accompanied'})
                </div>
              </div>

              {/* Clinical Snapshot */}
              <div className="bg-white p-4 rounded border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Provisional Clinical Impression
                </span>
                <div className="font-bold text-slate-900 text-xs p-2 bg-amber-50 rounded border border-amber-200 mb-2">
                  {selectedReferral.provisionalDiagnosis}
                </div>
                <div className="text-[11px] text-slate-600 mb-2">
                  {selectedReferral.clinicalSummary}
                </div>
                {selectedReferral.treatmentProvided && (
                  <div className="border-t border-slate-100 pt-2 text-[11px]">
                    <span className="font-bold text-slate-800">Treatment Provided: </span>
                    <span className="text-slate-700">{selectedReferral.treatmentProvided}</span>
                  </div>
                )}
              </div>

              {/* Frontline ASHA Follow-up Loop */}
              <div className="bg-emerald-50/70 p-4 rounded border border-emerald-200">
                <div className="flex items-center gap-1.5 text-health-green font-bold text-xs mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>ASHA Home Verification Protocol</span>
                </div>
                <div className="text-[11px] text-slate-700 mb-2">
                  Assigned Frontline Worker: <strong>{selectedReferral.referringAsha}</strong>
                </div>
                {selectedReferral.followUpTasks && (
                  <div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                      Post-Discharge Checklist:
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-700">
                      {selectedReferral.followUpTasks.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-health-green mt-0.5">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Referral Slip Modal */}
      <ReferralSlipModal
        referral={selectedReferral}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};
