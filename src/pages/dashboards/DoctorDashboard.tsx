import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { appointmentService, type AppointmentRecord } from '../../services/appointmentService';
import { referralService, type ReferralRecord, type ReferralStatus } from '../../services/referralService';
import { patientService, type PatientRecord } from '../../services/patientService';
import {
  Stethoscope,
  Users,
  Clock,
  Share2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'queue' | 'referrals' | 'patients'>('queue');

  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [referrals, setReferrals] = useState<ReferralRecord[]>([]);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDoctorData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [appRes, refRes, ptRes] = await Promise.all([
        appointmentService.getAppointments(),
        referralService.getReferrals(),
        patientService.getPatients()
      ]);
      setAppointments(appRes.appointments || []);
      setReferrals(refRes.referrals || []);
      setPatients(ptRes.patients || []);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to clinic server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctorData();
  }, []);

  const handleUpdateReferralStatus = async (id: string, newStatus: ReferralStatus) => {
    try {
      await referralService.updateStatus(id, {
        status: newStatus,
        notes: `Clinical status advanced to ${newStatus} by ${user?.name || 'Doctor'}`
      });
      loadDoctorData();
    } catch (err: any) {
      alert('Failed to update referral: ' + err.message);
    }
  };

  const handleUpdateAppointment = async (id: string, status: any) => {
    try {
      await appointmentService.updateAppointment(id, { status });
      loadDoctorData();
    } catch (err: any) {
      alert('Failed to update appointment: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Doctor Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xl border-2 border-blue-300">
              <Stethoscope className="w-7 h-7 text-[#0F5B4E]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{user?.name || 'Dr. Anand Sharma'}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold">
                  Medical Officer
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                General Medicine • CHC Rampur (FRU) • Registration: <strong>MCI-MP-41092</strong>
              </p>
            </div>
          </div>

          <button
            onClick={loadDoctorData}
            disabled={loading}
            className="px-3.5 py-2 border border-slate-300 bg-white hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-600' : 'text-slate-500'}`} />
            <span>Sync Live Queue</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 text-xs">
          {[
            { id: 'queue', label: `OPD Queue (${appointments.length})`, icon: <Clock className="w-3.5 h-3.5" /> },
            { id: 'referrals', label: `Inward Referrals (${referrals.length})`, icon: <Share2 className="w-3.5 h-3.5" /> },
            { id: 'patients', label: `Patients Directory (${patients.length})`, icon: <Users className="w-3.5 h-3.5" /> }
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
            <p className="text-sm font-semibold text-slate-600">Loading clinical patient queue...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <p className="text-sm font-bold text-red-900">{error}</p>
            <button
              onClick={loadDoctorData}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* QUEUE TAB */}
            {activeTab === 'queue' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Today's OPD Consultation Roster</h3>
                  <span className="text-emerald-700 font-bold">Currently Serving: A-098</span>
                </div>

                {appointments.length === 0 ? (
                  <p className="text-center text-slate-500 py-8">No patients in queue today.</p>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {appointments.map((app) => (
                      <div key={app._id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0F5B4E] font-mono font-black text-sm flex items-center justify-center border border-slate-200 flex-shrink-0">
                            {app.queueNumber}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900">{app.patient?.name}</span>
                              <span className="font-mono text-[10px] text-slate-500">({app.patient?.kvcId})</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                app.status === 'SERVING'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : app.status === 'COMPLETED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}>
                                {app.status}
                              </span>
                            </div>
                            <div className="text-slate-500 mt-0.5">
                              {app.patient?.age}y • {app.patient?.gender} • {app.time}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {app.status !== 'SERVING' && app.status !== 'COMPLETED' && (
                            <button
                              onClick={() => handleUpdateAppointment(app._id, 'SERVING')}
                              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg shadow-2xs"
                            >
                              Call Token
                            </button>
                          )}
                          {app.status !== 'COMPLETED' && (
                            <button
                              onClick={() => handleUpdateAppointment(app._id, 'COMPLETED')}
                              className="px-3 py-1.5 bg-[#0F5B4E] hover:bg-[#0B3D34] text-white font-bold rounded-lg shadow-2xs"
                            >
                              Mark Done
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* INWARD REFERRALS TAB */}
            {activeTab === 'referrals' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Inward Referrals Triage & Review</h3>
                  <span className="text-slate-500 font-semibold">{referrals.length} Cases Logged</span>
                </div>

                <div className="space-y-4">
                  {referrals.map((ref) => (
                    <div key={ref._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#0F5B4E]">{ref.referralCode}</span>
                          <span className="font-bold text-slate-900">{ref.patient?.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            ref.priority === 'EMERGENCY'
                              ? 'bg-red-100 text-red-800'
                              : ref.priority === 'URGENT'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {ref.priority}
                          </span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white border border-slate-300">
                          {ref.currentStatus}
                        </span>
                      </div>

                      <p className="text-slate-700 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed">
                        {ref.clinicalSummary}
                      </p>

                      {/* Advance Status Controls */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200">
                        <span className="text-slate-500 font-semibold">Advance Care Status:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {(['CONSULTATION', 'DIAGNOSTICS', 'TREATMENT', 'FOLLOW_UP', 'COMPLETED'] as ReferralStatus[]).map((st) => (
                            <button
                              key={st}
                              onClick={() => handleUpdateReferralStatus(ref._id, st)}
                              disabled={ref.currentStatus === st}
                              className={`px-2.5 py-1 rounded text-[10px] font-bold transition-colors ${
                                ref.currentStatus === st
                                  ? 'bg-[#0F5B4E] text-white shadow-2xs'
                                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PATIENTS DIRECTORY */}
            {activeTab === 'patients' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                <h3 className="text-base font-bold text-slate-900">Hospital Patient Records</h3>
                <div className="divide-y divide-slate-100">
                  {patients.map((p) => (
                    <div key={p._id} className="py-3 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">{p.name}</span>
                        <div className="text-slate-500 mt-0.5">
                          {p.age}y • {p.gender} • Blood: {p.bloodGroup || 'B+'} • ABHA: {p.abhaId}
                        </div>
                      </div>
                      <span className="font-mono text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded">
                        {p.kvcId}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
