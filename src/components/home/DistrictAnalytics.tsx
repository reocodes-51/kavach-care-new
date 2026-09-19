import React, { useState, useEffect } from 'react';
import { analyticsService, type DistrictAnalyticsResponse } from '../../services/analyticsService';
import { useLanguage } from '../../context/LanguageContext';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Activity, TrendingUp, Users, CheckCircle2, AlertTriangle, RefreshCw, AlertCircle } from 'lucide-react';

export const DistrictAnalytics: React.FC = () => {
  const { t } = useLanguage();
  const [data, setData] = useState<DistrictAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await analyticsService.getDistrictAnalytics();
      if (res.success) {
        setData(res);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch district analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <section id="impact" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>District Health Command & Real-Time Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('impactTitle', 'District Health Impact & Outcome Indicators')}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {t('impactSubtitle', 'Live public health metrics aggregated across Sehore & Rampur Region, Madhya Pradesh.')}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500">Region:</span>
            <span className="font-bold text-[#0F5B4E] bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-300">
              Sehore / Rampur, MP
            </span>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="p-12 rounded-xl border border-slate-200 text-center space-y-3 bg-slate-50">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-600">
              Loading real-time district healthcare intelligence from backend...
            </p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 p-8 rounded-xl text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <p className="text-sm font-bold text-red-900">{error}</p>
            <button
              onClick={fetchAnalytics}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t('retry', 'Retry Connection')}</span>
            </button>
          </div>
        )}

        {/* METRICS & CHARTS */}
        {!loading && !error && data && (
          <div className="space-y-8">
            {/* 4 Stat KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>{t('patientsServed', 'Patients Served')}</span>
                  <Users className="w-4 h-4 text-[#0F5B4E]" />
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">
                  {data.stats.totalPatientsServed.toLocaleString()}
                </div>
                <div className="mt-1 text-[11px] text-emerald-700 font-semibold">
                  Verifiable digital ABHA records
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>{t('referralsCompleted', 'Completed Referrals')}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-black text-emerald-700">
                  {data.stats.completedReferrals.toLocaleString()}
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  Total referrals: {data.stats.totalReferrals}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>{t('resolutionRate', 'Referral Completion')}</span>
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-black text-blue-600">
                  {data.stats.completionRate}
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  vs 38% unassisted baseline
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>{t('highRiskCases', 'High-Risk Cases')}</span>
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-black text-red-600">
                  {data.stats.highRiskCases}
                </div>
                <div className="mt-1 text-[11px] text-emerald-700 font-semibold">
                  100% with priority transport & follow-up
                </div>
              </div>
            </div>

            {/* Charts: Referral Trends & Facility Load */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Line Chart */}
              <div className="lg:col-span-8 bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    6-Month Referral Volume vs Successful Completion
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold">Monthly Trends</span>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.referralTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#64748b" />
                      <YAxis tick={{ fontSize: 11 }} stroke="#64748b" />
                      <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Line type="monotone" dataKey="referrals" stroke="#0F5B4E" strokeWidth={2.5} name="Referrals Created" />
                      <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2.5} name="Completed Care" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart: Facility Load */}
              <div className="lg:col-span-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    Facility Load Distribution
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold">By Tier</span>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.facilityLoad} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="facility" tick={{ fontSize: 10 }} stroke="#64748b" />
                      <YAxis tick={{ fontSize: 10 }} stroke="#64748b" />
                      <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                      <Bar dataKey="load" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Patient Inflow" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
