import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { analyticsService, type DistrictAnalyticsResponse } from '../../services/analyticsService';
import { facilityService, type FacilityData } from '../../services/facilityService';
import { referralService, type ReferralRecord } from '../../services/referralService';
import {
  Activity,
  Building2,
  Share2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'analytics' | 'facilities' | 'referrals'>('analytics');

  const [analytics, setAnalytics] = useState<DistrictAnalyticsResponse | null>(null);
  const [facilities, setFacilities] = useState<FacilityData[]>([]);
  const [referrals, setReferrals] = useState<ReferralRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAdminData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [anRes, facRes, refRes] = await Promise.all([
        analyticsService.getDistrictAnalytics(),
        facilityService.getFacilities(),
        referralService.getReferrals()
      ]);
      setAnalytics(anRes);
      setFacilities(facRes.facilities || []);
      setReferrals(refRes.referrals || []);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to district health analytics server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* District Admin Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-900 text-white flex items-center justify-center font-bold text-xl shadow-xs">
              CMO
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  {user?.name || 'Dr. R.K. Saxena (Chief Medical Officer)'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 text-[10px] font-bold">
                  District Command
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                District Health Society • Sehore & Rampur Region, Madhya Pradesh
              </p>
            </div>
          </div>

          <button
            onClick={loadAdminData}
            disabled={loading}
            className="px-3.5 py-2 border border-slate-300 bg-white hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-600' : 'text-slate-500'}`} />
            <span>Refresh District Telemetry</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 text-xs">
          {[
            { id: 'analytics', label: 'District Intelligence & Bottlenecks', icon: <Activity className="w-3.5 h-3.5" /> },
            { id: 'facilities', label: `Facility Network (${facilities.length})`, icon: <Building2 className="w-3.5 h-3.5" /> },
            { id: 'referrals', label: `Referrals Audit (${referrals.length})`, icon: <Share2 className="w-3.5 h-3.5" /> }
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
            <p className="text-sm font-semibold text-slate-600">Loading district healthcare telemetry...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <p className="text-sm font-bold text-red-900">{error}</p>
            <button
              onClick={loadAdminData}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {!loading && !error && analytics && (
          <>
            {/* ANALYTICS TAB */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="text-3xl font-black text-slate-900">
                      {analytics.stats.totalPatientsServed.toLocaleString()}
                    </div>
                    <div className="text-xs font-semibold text-slate-500 mt-1">Total Patients Served</div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-2xs">
                    <div className="text-3xl font-black text-blue-600">
                      {analytics.stats.totalReferrals.toLocaleString()}
                    </div>
                    <div className="text-xs font-semibold text-slate-500 mt-1">Total Logged Referrals</div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-2xs">
                    <div className="text-3xl font-black text-emerald-700">
                      {analytics.stats.completedReferrals.toLocaleString()}
                    </div>
                    <div className="text-xs font-semibold text-slate-500 mt-1">Closed-Loop Completed</div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-red-200 shadow-2xs">
                    <div className="text-3xl font-black text-red-600">
                      {analytics.stats.highRiskCases}
                    </div>
                    <div className="text-xs font-semibold text-slate-500 mt-1">High-Risk Cases</div>
                  </div>
                </div>

                {/* Charts: Recharts Line + Bar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <h3 className="text-base font-bold text-slate-900">Monthly Referral Progression & Resolution</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analytics.referralTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#64748b" />
                          <YAxis tick={{ fontSize: 11 }} stroke="#64748b" />
                          <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                          <Legend wrapperStyle={{ fontSize: '12px' }} />
                          <Line type="monotone" dataKey="referrals" stroke="#0F5B4E" strokeWidth={2.5} name="Referrals" />
                          <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2.5} name="Resolved" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <h3 className="text-base font-bold text-slate-900">Facility Load by Tier</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analytics.facilityLoad} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="facility" tick={{ fontSize: 10 }} stroke="#64748b" />
                          <YAxis tick={{ fontSize: 10 }} stroke="#64748b" />
                          <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                          <Bar dataKey="load" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Inflow" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Bottlenecks List */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="text-base font-bold text-slate-900">Critical District Bottlenecks Radar</h3>
                    <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">Action Required</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {analytics.bottlenecks.map((b, idx) => (
                      <div key={idx} className="p-3.5 bg-red-50/50 border border-red-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-slate-900">{b.facility}</span>
                          <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded">
                            {b.issue}
                          </span>
                        </div>
                        <div className="text-slate-500 font-medium">{b.metric}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* FACILITIES TAB */}
            {activeTab === 'facilities' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                <h3 className="text-base font-bold text-slate-900">District Healthcare Facilities Directory</h3>
                <div className="divide-y divide-slate-100">
                  {facilities.map((fac) => (
                    <div key={fac._id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{fac.name}</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                            {fac.tier}
                          </span>
                        </div>
                        <div className="text-slate-500 mt-0.5">
                          {fac.address} • Contact: {fac.contactPhone}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-800">
                          {fac.bedCapacity.available} / {fac.bedCapacity.total} beds available
                        </div>
                        <div className="text-slate-500 text-[11px]">Avg wait: ~{fac.queue.avgWaitMinutes} mins</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REFERRALS TAB */}
            {activeTab === 'referrals' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
                <h3 className="text-base font-bold text-slate-900">District-Wide Referral Audit Log</h3>
                <div className="divide-y divide-slate-100">
                  {referrals.map((r) => (
                    <div key={r._id} className="py-3 flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-slate-900 text-sm">{r.referralCode}</span>
                        <div className="text-slate-500 mt-0.5">
                          Patient: <strong>{r.patient?.name}</strong> • To: {r.toFacility?.name} • Specialty: {r.specialtyRequired}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                        {r.currentStatus}
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
