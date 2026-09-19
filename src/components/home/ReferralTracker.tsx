import React, { useState, useEffect } from 'react';
import { referralService, type ReferralRecord } from '../../services/referralService';
import { useLanguage } from '../../context/LanguageContext';
import {
  Search,
  CheckCircle2,
  Printer,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  MapPin,
  Phone
} from 'lucide-react';

interface ReferralTrackerProps {
  initialReferralCode?: string;
}

export const ReferralTracker: React.FC<ReferralTrackerProps> = ({
  initialReferralCode
}) => {
  const { t } = useLanguage();
  const [referrals, setReferrals] = useState<ReferralRecord[]>([]);
  const [selectedReferral, setSelectedReferral] = useState<ReferralRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialReferralCode || 'REF-2024-MP-10482');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReferrals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await referralService.getReferrals();
      if (data.referrals && data.referrals.length > 0) {
        setReferrals(data.referrals);
        const matched = data.referrals.find(
          (r) => r.referralCode.toUpperCase() === searchQuery.trim().toUpperCase()
        );
        setSelectedReferral(matched || data.referrals[0]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load referral tracking records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    const match = referrals.find(
      (r) =>
        r.referralCode.toUpperCase().includes(query) ||
        (r.patient?.name && r.patient.name.toUpperCase().includes(query)) ||
        (r.patient?.abhaId && r.patient.abhaId.includes(query))
    );
    if (match) {
      setSelectedReferral(match);
    } else {
      alert(`No referral found matching "${searchQuery}". Please select one of the available live records below.`);
    }
  };


  return (
    <section id="care-journey" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Closed-Loop Continuum Verification</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('careJourneyTitle', 'The Patient Referral Journey & Live Audit')}
          </h2>
          <p className="text-sm text-slate-600">
            {t('careJourneySubtitle', 'Track real-time patient transit, hospital acceptance, specialist consultation, and ASHA home follow-up.')}
          </p>
        </div>

        {/* Search Bar & Live Presets */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('enterReferralCode', 'Enter Referral Code (e.g. REF-2024-MP-10482)...')}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0F5B4E] hover:bg-[#0B3D34] text-white text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>{t('trackReferral', 'Track Referral')}</span>
            </button>
          </form>

          {/* Preset Buttons */}
          {referrals.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-semibold">Live Database Records:</span>
              {referrals.slice(0, 4).map((ref) => (
                <button
                  key={ref._id}
                  type="button"
                  onClick={() => {
                    setSearchQuery(ref.referralCode);
                    setSelectedReferral(ref);
                  }}
                  className={`px-2.5 py-1 rounded-lg border font-mono font-bold transition-colors ${
                    selectedReferral?._id === ref._id
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {ref.referralCode} ({ref.patient?.name || 'Patient'})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-600">
              {t('loadingReferrals', 'Loading referral tracking data from server...')}
            </p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 p-8 rounded-2xl text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <p className="text-sm font-bold text-red-900">{error}</p>
            <button
              onClick={fetchReferrals}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t('retry', 'Retry Connection')}</span>
            </button>
          </div>
        )}

        {/* SELECTED REFERRAL TIMELINE & DETAILS */}
        {!loading && !error && selectedReferral && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Patient & Route Card */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Official Referral Code
                  </span>
                  <h3 className="font-mono text-lg font-black text-[#0F5B4E]">
                    {selectedReferral.referralCode}
                  </h3>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    selectedReferral.priority === 'EMERGENCY'
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : selectedReferral.priority === 'URGENT'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  {selectedReferral.priority}
                </span>
              </div>

              {/* Patient Info */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">
                    {selectedReferral.patient?.name || 'Patient'}
                  </span>
                  <span className="font-mono text-emerald-800 font-semibold">
                    {selectedReferral.patient?.kvcId || 'KVC-1024'}
                  </span>
                </div>
                <div className="text-slate-600">
                  {selectedReferral.patient?.age} yrs • {selectedReferral.patient?.gender} • Blood Group: {selectedReferral.patient?.bloodGroup || 'B+'}
                </div>
                <div className="text-slate-500 font-mono text-[11px]">
                  ABHA: {selectedReferral.patient?.abhaId}
                </div>
                <div className="flex items-center gap-1 text-slate-500 pt-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{selectedReferral.patient?.village}, {selectedReferral.patient?.district}</span>
                </div>
              </div>

              {/* Clinical Referral Summary */}
              <div className="space-y-2 text-xs">
                <div className="font-bold text-slate-800">Specialty Required:</div>
                <div className="p-2.5 bg-emerald-50 text-emerald-900 rounded-lg font-semibold border border-emerald-200">
                  {selectedReferral.specialtyRequired}
                </div>

                <div className="font-bold text-slate-800 pt-1">Clinical Observation:</div>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                  {selectedReferral.clinicalSummary}
                </p>

                <div className="font-bold text-slate-800 pt-1">Provisional Diagnosis:</div>
                <div className="text-slate-700 font-medium italic">
                  "{selectedReferral.provisionalDiagnosis}"
                </div>
              </div>

              {/* Transport Card */}
              <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl text-xs space-y-1">
                <div className="font-bold text-blue-900 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Transport Advice:</span>
                </div>
                <div className="text-blue-800 font-semibold">{selectedReferral.transportMode}</div>
                <div className="text-blue-600 text-[11px]">{selectedReferral.ambulanceContact}</div>
              </div>
            </div>

            {/* Right: Vertical 9-Stage Care Timeline */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Care Continuity Progress Timeline
                  </h3>
                  <p className="text-xs text-slate-500">
                    Current Milestone:{' '}
                    <strong className="text-emerald-700 font-bold">
                      {selectedReferral.currentStatus}
                    </strong>
                  </p>
                </div>

                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 border border-slate-300 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors no-print"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  <span>Print Slip</span>
                </button>
              </div>

              {/* Vertical Stepper */}
              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {selectedReferral.timeline && selectedReferral.timeline.map((step, idx) => {
                  const isCurrent = idx === selectedReferral.timeline.length - 1;
                  return (
                    <div key={idx} className="relative flex items-start gap-4 text-xs">
                      {/* Circle Indicator */}
                      <div
                        className={`absolute -left-6 sm:-left-8 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-[11px] z-10 ${
                          isCurrent
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 animate-pulse'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </div>

                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex-grow space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="font-bold text-slate-900 text-sm">
                            {step.label}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {new Date(step.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-slate-600 font-medium">
                          Authorized by: <strong className="text-slate-800">{step.actorName}</strong>
                        </div>
                        {step.notes && (
                          <div className="text-slate-500 text-[11px] bg-white p-2 rounded border border-slate-100 mt-1">
                            {step.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
