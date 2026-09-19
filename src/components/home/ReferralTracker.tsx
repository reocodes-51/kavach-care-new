import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { referralService, type ReferralRecord } from '../../services/referralService';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import {
  Search,
  CheckCircle2,
  Printer,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  MapPin,
  Phone,
  Lock,
  LogIn,
  EyeOff,
  Building
} from 'lucide-react';

interface ReferralTrackerProps {
  initialReferralCode?: string;
}

export const ReferralTracker: React.FC<ReferralTrackerProps> = ({
  initialReferralCode
}) => {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [selectedReferral, setSelectedReferral] = useState<ReferralRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialReferralCode || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrackCode = async (codeToTrack: string) => {
    const trimmed = codeToTrack.trim().toUpperCase();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    try {
      const data = await referralService.trackReferral(trimmed);
      if (data.referral) {
        setSelectedReferral(data.referral);
      } else {
        setError(`No referral found matching "${trimmed}". Please check the 14-digit referral code on your printed slip.`);
        setSelectedReferral(null);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        `Referral code "${trimmed}" was not found in the national registry. Please verify the code or contact your ASHA worker.`
      );
      setSelectedReferral(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialReferralCode) {
      handleTrackCode(initialReferralCode);
    }
  }, [initialReferralCode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a valid Referral Code (e.g. REF-2024-MP-10482)');
      return;
    }
    handleTrackCode(searchQuery);
  };

  const handleDemoPreset = (code: string) => {
    setSearchQuery(code);
    handleTrackCode(code);
  };

  return (
    <section id="care-journey" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DPDP Act 2023 Compliant Citizen Tracking</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('careJourneyTitle', 'Track Referral Journey & Care Status')}
          </h2>
          <p className="text-sm text-slate-600">
            {t(
              'careJourneySubtitle',
              'Real-time milestone tracking for ambulance transit, hospital OPD queue, and post-discharge follow-up.'
            )}
          </p>
        </div>

        {/* Search Bar & Privacy Notice */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('enterReferralCode', 'Enter Referral Code (e.g. REF-2024-MP-10482)...')}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none uppercase font-mono placeholder:normal-case placeholder:font-sans"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#0F5B4E] hover:bg-[#0B3D34] text-white text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>{t('trackReferral', 'Track Status')}</span>
            </button>
          </form>

          {/* Privacy Tag & Demo Evaluator Hint */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Lock className="w-3.5 h-3.5 text-emerald-700" />
              {isAuthenticated ? (
                <span>
                  Session: <strong className="text-slate-800">{user?.name}</strong> ({user?.role}) • Full clinical chart access enabled
                </span>
              ) : (
                <span>
                  Protected under Digital Personal Data Protection (DPDP) Act 2023. PII and clinical diagnoses are redacted in public view.
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Evaluation Code:</span>
              <button
                type="button"
                onClick={() => handleDemoPreset('REF-2024-MP-10482')}
                className="px-2.5 py-0.5 rounded bg-slate-100 hover:bg-emerald-50 hover:text-[#0F5B4E] border border-slate-200 font-mono text-[11px] font-bold text-slate-700 transition-colors"
                title="Test with live demo record"
              >
                REF-2024-MP-10482
              </button>
            </div>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-600">
              {t('loadingReferrals', 'Securely looking up referral record from National Health Portal...')}
            </p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-center space-y-3">
            <AlertCircle className="w-7 h-7 text-red-600 mx-auto" />
            <p className="text-sm font-bold text-red-900">{error}</p>
            <p className="text-xs text-red-700 max-w-md mx-auto">
              Please verify the referral tracking code printed on your official hospital OPD / Ayushman referral slip.
            </p>
          </div>
        )}

        {/* INITIAL EMPTY STATE (WHEN NO RECORD QUERIED YET) */}
        {!loading && !error && !selectedReferral && (
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">
            <div className="max-w-2xl mx-auto text-center space-y-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0F5B4E] flex items-center justify-center mx-auto border border-emerald-200">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Official Citizen Referral Status Portal
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Enter your 14-character Referral Code above to verify inward bed availability, ambulance transport, and specialist OPD admission status in real-time.
              </p>
            </div>

            {/* 3 Steps Guide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-[#123B63] text-white flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div className="font-bold text-slate-900">Locate Referral Code</div>
                <p className="text-slate-600 leading-relaxed">
                  Printed on the top-right corner of your Ayushman Arogya Mandir / Sub-centre referral slip or received via ASHA SMS.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-[#0F5B4E] text-white flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div className="font-bold text-slate-900">Live Journey Tracking</div>
                <p className="text-slate-600 leading-relaxed">
                  Track 108/102 ambulance dispatch, hospital queue priority token, and doctor consultation milestones without waiting in line.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div className="font-bold text-slate-900">Data Privacy Guarantee</div>
                <p className="text-slate-600 leading-relaxed">
                  Medical records and clinical diagnoses remain strictly confidential and accessible solely by verified medical officers, ASHA workers, and the patient.
                </p>
              </div>
            </div>
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

              {/* Patient Info Card (Masked if restricted) */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-sm">
                      {selectedReferral.patient?.name || 'Patient'}
                    </span>
                    {selectedReferral.isRestricted && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-200 text-slate-700">
                        <EyeOff className="w-2.5 h-2.5" /> Masked
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-emerald-800 font-semibold">
                    {selectedReferral.patient?.kvcId || 'KVC-ID'}
                  </span>
                </div>

                <div className="text-slate-600">
                  {selectedReferral.patient?.age ? `${selectedReferral.patient.age} yrs • ` : ''}
                  {selectedReferral.patient?.gender} • Blood Group:{' '}
                  <span className={selectedReferral.isRestricted ? 'font-mono text-slate-400' : 'font-bold'}>
                    {selectedReferral.patient?.bloodGroup || 'Confidential'}
                  </span>
                </div>

                <div className="text-slate-500 font-mono text-[11px]">
                  ABHA: {selectedReferral.patient?.abhaId}
                </div>

                <div className="flex items-center gap-1 text-slate-500 pt-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>
                    {selectedReferral.patient?.village ? `${selectedReferral.patient.village}, ` : ''}
                    {selectedReferral.patient?.district || 'Sehore'}
                  </span>
                </div>
              </div>

              {/* Destination Facility */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>Destination Facility:</span>
                </div>
                <div className="font-bold text-slate-900 text-sm">
                  {selectedReferral.toFacility?.name || 'District Hospital / CHC'}
                </div>
                <div className="text-[11px] text-slate-500">
                  {selectedReferral.toFacility?.tier || 'First Referral Unit (FRU)'}
                </div>
              </div>

              {/* Clinical Referral Summary or DPDP Privacy Box */}
              {selectedReferral.isRestricted ? (
                /* DPDP ACT 2023 CLINICAL PRIVACY LOCK BOX */
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
                    <Lock className="w-4 h-4 text-amber-700" />
                    <span>Clinical Chart Protected (DPDP Act 2023)</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Personal health records, vitals, and physician clinical notes are encrypted. To view full unmasked records, log in as an authorized Doctor, ASHA worker, or verified Patient.
                  </p>
                  <div className="pt-1">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0F5B4E] hover:bg-[#0B3D34] text-white text-xs font-bold rounded-lg transition-colors shadow-2xs"
                    >
                      <LogIn className="w-3 h-3" />
                      <span>Log In to Access Clinical Chart</span>
                    </Link>
                  </div>
                </div>
              ) : (
                /* AUTHORIZED CLINICAL SUMMARY VIEW */
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Specialty Required:</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ Authorized Session
                    </span>
                  </div>
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
              )}

              {/* Transport Card */}
              <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl text-xs space-y-1">
                <div className="font-bold text-blue-900 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Transport Advice:</span>
                </div>
                <div className="text-blue-800 font-semibold">{selectedReferral.transportMode || '108 Emergency Ambulance'}</div>
                <div className="text-blue-600 text-[11px]">{selectedReferral.ambulanceContact || '108 / +91 98260 12345'}</div>
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
                {selectedReferral.timeline &&
                  selectedReferral.timeline.map((step, idx) => {
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
