import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { facilityService, type FacilityData } from '../../services/facilityService';
import { referralService, type ReferralRecord } from '../../services/referralService';
import { appointmentService, type AppointmentRecord } from '../../services/appointmentService';
import {
  Building2,
  Bed,
  Share2,
  Clock,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export const FacilityDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'referrals' | 'queue' | 'services'>('overview');

  const [facilities, setFacilities] = useState<FacilityData[]>([]);
  const [referrals, setReferrals] = useState<ReferralRecord[]>([]);
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFacilityData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [facRes, refRes, appRes] = await Promise.all([
        facilityService.getFacilities(),
        referralService.getReferrals(),
        appointmentService.getAppointments()
      ]);
      setFacilities(facRes.facilities || []);
      setReferrals(refRes.referrals || []);
      setAppointments(appRes.appointments || []);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to facility server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFacilityData();
  }, []);

  const currentFacility = facilities[0] || {
    name: 'CHC Rampur (FRU)',
    tier: 'Tier 3 - First Referral Unit',
    district: 'Sehore',
    bedCapacity: { total: 40, occupied: 26, available: 14, icuAvailable: 2, maternityHduAvailable: 4 },
    queue: { currentlyWaiting: 22, avgWaitMinutes: 18 },
    services: ['General Medicine', 'Maternity HDU', 'Digital X-Ray', 'Clinical Pathology', 'Emergency 24x7', 'Pediatrics']
  };

  const handleAcceptReferral = async (id: string) => {
    try {
      await referralService.updateStatus(id, {
        status: 'ACCEPTED',
        notes: 'Inward referral accepted by CHC Rampur Triage Desk'
      });
      loadFacilityData();
    } catch (err: any) {
      alert('Failed to accept referral: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Facility Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0F5B4E] text-white flex items-center justify-center font-bold text-xl shadow-xs">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{currentFacility.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {user?.name || 'Facility Admin'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {currentFacility.tier} • {currentFacility.district}, MP
              </p>
            </div>
          </div>

          <button
            onClick={loadFacilityData}
            disabled={loading}
            className="px-3.5 py-2 border border-slate-300 bg-white hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-600' : 'text-slate-500'}`} />
            <span>Sync Hospital Telemetry</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 text-xs">
          {[
            { id: 'overview', label: 'Capacity & Beds', icon: <Bed className="w-3.5 h-3.5" /> },
            { id: 'referrals', label: `Inward Referrals (${referrals.length})`, icon: <Share2 className="w-3.5 h-3.5" /> },
            { id: 'queue', label: `OPD Queue (${appointments.length})`, icon: <Clock className="w-3.5 h-3.5" /> },
            { id: 'services', label: 'Services & Specialists', icon: <Building2 className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#0F5B4E] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* LOADING & ERROR */}
        {loading && (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-600">Loading facility bed registry & queue...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <p className="text-sm font-bold text-red-900">{error}</p>
            <button
              onClick={loadFacilityData}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 4 Bed Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="text-3xl font-black text-slate-900">{currentFacility.bedCapacity.total}</div>
                    <div className="text-xs font-semibold text-slate-500 mt-1">Total Sanctioned Beds</div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-2xs">
                    <div className="text-3xl font-black text-emerald-700">{currentFacility.bedCapacity.available}</div>
                    <div className="text-xs font-semibold text-slate-500 mt-1">Vacant General Beds</div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-red-200 shadow-2xs">
                    <div className="text-3xl font-black text-red-600">{currentFacility.bedCapacity.icuAvailable}</div>
                    <div className="text-xs font-semibold text-slate-500 mt-1">Vacant ICU Beds</div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-2xs">
                    <div className="text-3xl font-black text-blue-600">{currentFacility.bedCapacity.maternityHduAvailable}</div>
                    <div className="text-xs font-semibold text-slate-500 mt-1">Maternity HDU Available</div>
                  </div>
                </div>

                {/* Services Availability */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                  <h3 className="text-base font-bold text-slate-900">Clinical Department Telemetry</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {currentFacility.services.map((srv, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                        <span className="font-bold text-slate-800">{srv}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          Available
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* REFERRALS TAB */}
            {activeTab === 'referrals' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                <h3 className="text-base font-bold text-slate-900">Inward Referral Transit & Intake</h3>
                <div className="space-y-3">
                  {referrals.map((ref) => (
                    <div key={ref._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#0F5B4E]">{ref.referralCode}</span>
                          <span className="font-bold text-slate-900">{ref.patient?.name}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                            {ref.currentStatus}
                          </span>
                        </div>
                        <div className="text-slate-600 mt-1">
                          Specialty: <strong>{ref.specialtyRequired}</strong> • {ref.clinicalSummary}
                        </div>
                      </div>

                      {ref.currentStatus === 'CREATED' && (
                        <button
                          onClick={() => handleAcceptReferral(ref._id)}
                          className="px-4 py-2 bg-[#0F5B4E] hover:bg-[#0B3D34] text-white font-bold rounded-lg shadow-2xs self-start sm:self-auto"
                        >
                          Accept Inward
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* QUEUE TAB */}
            {activeTab === 'queue' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                <h3 className="text-base font-bold text-slate-900">Facility OPD Token Queue</h3>
                <div className="divide-y divide-slate-100">
                  {appointments.map((app) => (
                    <div key={app._id} className="py-3 flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-slate-900 text-sm">{app.queueNumber}</span>
                        <div className="text-slate-500">{app.patient?.name} • {app.doctor?.name} • {app.time}</div>
                      </div>
                      <span className="text-slate-700 bg-slate-100 font-bold px-2 py-0.5 rounded">
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                <h3 className="text-base font-bold text-slate-900">Hospital Departments & Diagnostic Labs</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-lg border flex items-center justify-between">
                    <span className="font-bold">Automated Clinical Pathology Lab (CBC, LFT, KFT, RBS)</span>
                    <span className="text-emerald-700 font-bold">₹ Free (Govt.)</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border flex items-center justify-between">
                    <span className="font-bold">Digital X-Ray & Ultrasound Sonography (USG)</span>
                    <span className="text-emerald-700 font-bold">₹ Free (Govt.)</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border flex items-center justify-between">
                    <span className="font-bold">24x7 Emergency Trauma Stabilization Unit</span>
                    <span className="text-emerald-700 font-bold">Operational</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
