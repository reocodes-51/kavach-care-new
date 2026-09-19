import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { appointmentService, type AppointmentRecord } from '../../services/appointmentService';
import { referralService, type ReferralRecord } from '../../services/referralService';
import { notificationService, type NotificationItem } from '../../services/notificationService';
import {
  Calendar,
  Clock,
  Share2,
  FileText,
  Bell,
  RefreshCw,
  AlertCircle,
  User
} from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'referrals' | 'records' | 'notifications'>('overview');

  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [referrals, setReferrals] = useState<ReferralRecord[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [appRes, refRes, notifRes] = await Promise.all([
        appointmentService.getAppointments(),
        referralService.getReferrals(),
        notificationService.getNotifications()
      ]);
      setAppointments(appRes.appointments || []);
      setReferrals(refRes.referrals || []);
      setNotifications(notifRes.notifications || []);
    } catch (err: any) {
      setError(err.message || 'Unable to connect to the healthcare server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeAppointment = appointments[0];
  const activeReferral = referrals[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Patient Profile Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#0F5B4E] flex items-center justify-center font-bold text-xl border-2 border-emerald-300">
              {user?.name?.slice(0, 2).toUpperCase() || 'PT'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{user?.name || 'Sita Sharma'}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                  ABDM Active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                ABHA ID: <strong className="font-mono text-[#0F5B4E]">91-4821-9920-1024</strong> • KVC-1024 • Sehore, MP
              </p>
            </div>
          </div>

          <button
            onClick={loadData}
            disabled={loading}
            className="px-3.5 py-2 border border-slate-300 bg-white hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-600' : 'text-slate-500'}`} />
            <span>Sync Data</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 text-xs overflow-x-auto scrollbar-thin">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: <User className="w-3.5 h-3.5" /> },
            { id: 'appointments', label: `Appointments (${appointments.length})`, icon: <Calendar className="w-3.5 h-3.5" /> },
            { id: 'referrals', label: `Referrals (${referrals.length})`, icon: <Share2 className="w-3.5 h-3.5" /> },
            { id: 'records', label: 'EHR Health Records', icon: <FileText className="w-3.5 h-3.5" /> },
            { id: 'notifications', label: `Notifications (${notifications.length})`, icon: <Bell className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${
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

        {/* LOADING STATE */}
        {loading && (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-600">Loading patient information from national health database...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 p-8 rounded-2xl text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <p className="text-sm font-bold text-red-900">{error}</p>
            <button
              onClick={loadData}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* TAB CONTENTS */}
        {!loading && !error && (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Active Live Token Banner */}
                {activeAppointment ? (
                  <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Live OPD Queue Token
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">{activeAppointment.date}</span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div>
                        <div className="text-xs text-slate-500 font-medium">Your Token Number</div>
                        <div className="text-3xl font-black text-[#0F5B4E]">{activeAppointment.queueNumber}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500 font-medium">Currently Serving</div>
                        <div className="text-2xl font-black text-amber-600">
                          {activeAppointment.currentTokenServing || 'A-098'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 bg-emerald-50/60 p-3 rounded-lg border border-emerald-200">
                      <Clock className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                      <span>
                        Estimated wait time: <strong>~{activeAppointment.estimatedWaitMinutes || 18} mins</strong> at{' '}
                        {activeAppointment.facility?.name || 'CHC Rampur'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="lg:col-span-6 bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
                    <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-sm font-bold text-slate-700">No active appointment tokens today</p>
                    <p className="text-xs text-slate-500">Appointments scheduled by your doctor or ASHA will appear here.</p>
                  </div>
                )}

                {/* Active Care Journey Snapshot */}
                {activeReferral ? (
                  <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Care Continuity Referral</div>
                        <div className="text-sm font-mono font-bold text-[#0F5B4E]">{activeReferral.referralCode}</div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-900">
                        {activeReferral.currentStatus}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5">
                      <div className="font-bold text-slate-800">{activeReferral.specialtyRequired}</div>
                      <p className="text-slate-600">{activeReferral.clinicalSummary}</p>
                    </div>

                    <div className="text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
                      <span>Destination: <strong>{activeReferral.toFacility?.name || 'CHC Rampur'}</strong></span>
                      <button
                        onClick={() => setActiveTab('referrals')}
                        className="font-bold text-[#0F5B4E] hover:underline"
                      >
                        View Timeline →
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="lg:col-span-6 bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
                    <Share2 className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-sm font-bold text-slate-700">No active referrals found</p>
                    <p className="text-xs text-slate-500">Your referral history will appear here once issued.</p>
                  </div>
                )}
              </div>
            )}

            {/* APPOINTMENTS TAB */}
            {activeTab === 'appointments' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900">Upcoming & Past Appointments</h3>
                {appointments.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">No appointments found.</p>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {appointments.map((app) => (
                      <div key={app._id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-[#0F5B4E]">{app.queueNumber}</span>
                            <span className="font-bold text-slate-800">{app.doctor?.name || 'Specialist Doctor'}</span>
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                              {app.status}
                            </span>
                          </div>
                          <div className="text-slate-500 mt-0.5">
                            {app.facility?.name || 'Healthcare Facility'} • {app.date} at {app.time}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded">
                            Serving: {app.currentTokenServing}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* REFERRALS TAB */}
            {activeTab === 'referrals' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900">Referral Tracking & Care Timeline</h3>
                {referrals.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">No referrals found.</p>
                ) : (
                  <div className="space-y-4">
                    {referrals.map((ref) => (
                      <div key={ref._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-sm text-[#0F5B4E]">{ref.referralCode}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                            {ref.currentStatus}
                          </span>
                        </div>
                        <p className="text-slate-700 font-medium">{ref.clinicalSummary}</p>
                        <div className="text-slate-500">
                          Referred to: <strong>{ref.toFacility?.name}</strong> • Specialty: <strong>{ref.specialtyRequired}</strong>
                        </div>
                        {ref.timeline && ref.timeline.length > 0 && (
                          <div className="pt-2 border-t border-slate-200 space-y-1">
                            <div className="font-bold text-slate-700">Latest Update:</div>
                            <div className="text-slate-600">
                              {ref.timeline[ref.timeline.length - 1].label} by{' '}
                              <strong>{ref.timeline[ref.timeline.length - 1].actorName}</strong>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* RECORDS TAB */}
            {activeTab === 'records' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                <h3 className="text-base font-bold text-slate-900">Longitudinal Health Records (EHR)</h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">CBC Pathology Lab Report</div>
                      <div className="text-slate-500">CHC Rampur • 18 Sep 2024 • Verified by Dr. Anand Sharma</div>
                    </div>
                    <button
                      onClick={() => alert('Downloading verified clinical lab report.')}
                      className="px-3 py-1.5 bg-[#0F5B4E] text-white font-bold rounded-lg shadow-2xs"
                    >
                      Download PDF
                    </button>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">E-Discharge Summary & Prescription</div>
                      <div className="text-slate-500">Ayushman Arogya Mandir • 15 Aug 2024</div>
                    </div>
                    <button
                      onClick={() => alert('Downloading verified discharge record.')}
                      className="px-3 py-1.5 bg-slate-200 text-slate-800 font-bold rounded-lg"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
                <h3 className="text-base font-bold text-slate-900">Live Health System Notifications</h3>
                {notifications.length === 0 ? (
                  <p className="text-slate-500 py-6 text-center">No notifications at this time.</p>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {notifications.map((n) => (
                      <div key={n._id} className="py-3 space-y-1">
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {new Date(n.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-slate-600">{n.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
