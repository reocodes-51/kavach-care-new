import React from 'react';
import {
  districtOverviewStats,
  monthlyContinuityTrends,
  blockReferralDistribution,
  facilityUtilizationData
} from '../../data/districtStats';
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
import { Activity, ShieldCheck, TrendingDown, Users, BedDouble } from 'lucide-react';

export const DistrictAnalytics: React.FC = () => {
  return (
    <section id="district-preview" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>District Health Command & Tele-Governance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#123B63] tracking-tight">
              District Health Intelligence & Utilization Dashboard
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Aggregated public health metrics for Chief Medical Officers (CMO) and District Collectors
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600">Target Region:</span>
            <span className="font-bold text-[#123B63] bg-white px-3 py-1 rounded border border-slate-300">
              {districtOverviewStats.districtName}
            </span>
          </div>
        </div>

        {/* 4 Top KPI Cards */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Total Referrals Audited</span>
              <Users className="w-4 h-4 text-[#123B63]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#123B63]">
              {districtOverviewStats.totalReferralsLogged.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] text-emerald-700 font-medium">
              100% ABHA digital record continuity
            </div>
          </div>

          <div className="bg-white p-4 rounded border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Referral Drop-off Rate</span>
              <TrendingDown className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-700 flex items-baseline gap-2">
              <span>{districtOverviewStats.dropOffRateCurrent}</span>
              <span className="text-xs line-through text-slate-400 font-normal">
                from {districtOverviewStats.dropOffRateBaseline}
              </span>
            </div>
            <div className="mt-1 text-[11px] text-emerald-700 font-medium">
              -52.7% reduction in lost patients
            </div>
          </div>

          <div className="bg-white p-4 rounded border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">ASHA Home Visit Rate</span>
              <ShieldCheck className="w-4 h-4 text-health-green" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">
              {districtOverviewStats.ashaFollowUpCompletionRate}
            </div>
            <div className="mt-1 text-[11px] text-slate-600 font-medium">
              Verified within 72h post-discharge
            </div>
          </div>

          <div className="bg-white p-4 rounded border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Live Monitored Beds</span>
              <BedDouble className="w-4 h-4 text-indigo-700" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900 flex items-baseline gap-2">
              <span>{districtOverviewStats.bedsVacantLive} Vacant</span>
              <span className="text-xs text-slate-500 font-normal">
                / {districtOverviewStats.bedsMonitoredLive} Total
              </span>
            </div>
            <div className="mt-1 text-[11px] text-indigo-700 font-medium">
              Across 167 rural public facilities
            </div>
          </div>
        </div>

        {/* Recharts Data Visualizations Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Referral Continuity & Drop-off Trend */}
          <div className="bg-white p-5 rounded border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Monthly Referral Volume & Drop-off Rate (%)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pre vs Post KAVACH CARE closed-loop deployment
                </p>
              </div>
              <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold">
                6-Month Trend
              </span>
            </div>

            <div className="h-64 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyContinuityTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Line
                    type="monotone"
                    dataKey="totalReferrals"
                    name="Total Referrals Logged"
                    stroke="#123B63"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="closedLoopCompleted"
                    name="Closed-Loop Verified"
                    stroke="#198754"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="dropOffRate"
                    name="Drop-Off % (Unreached)"
                    stroke="#C92A2A"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Block-Wise Referral Volume & Bed Vacancy */}
          <div className="bg-white p-5 rounded border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Block-Wise Referral Load & Resolution
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Taluka distribution in Gadchiroli pilot
                </p>
              </div>
              <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold">
                By Taluka
              </span>
            </div>

            <div className="h-64 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={blockReferralDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="block" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="referrals" name="Total Referred" fill="#123B63" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="completed" name="Completed Care" fill="#198754" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="urgent" name="Urgent / 108 Transit" fill="#C92A2A" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Facility Utilization Breakdown Table */}
        <div className="mt-6 bg-white p-5 rounded border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-3">
            Multi-Tier Healthcare Facility Bed Occupancy Registry (Live Telemetry)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-300">
                  <th className="p-2.5 font-bold">Facility Tier & Network Count</th>
                  <th className="p-2.5 font-bold text-center">Total Bed Capacity</th>
                  <th className="p-2.5 font-bold text-center">Occupied Beds</th>
                  <th className="p-2.5 font-bold text-center">Vacant Beds Available</th>
                  <th className="p-2.5 font-bold text-right">Occupancy Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {facilityUtilizationData.map((row, idx) => {
                  const pct = Math.round((row.occupied / row.totalBeds) * 100);
                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-2.5 font-semibold text-slate-900">{row.name}</td>
                      <td className="p-2.5 text-center font-mono">{row.totalBeds}</td>
                      <td className="p-2.5 text-center font-mono text-slate-700">{row.occupied}</td>
                      <td className="p-2.5 text-center font-mono font-bold text-emerald-700">{row.available}</td>
                      <td className="p-2.5 text-right font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <span>{pct}%</span>
                          <div className="w-16 h-2 bg-slate-200 rounded overflow-hidden">
                            <div
                              className={`h-full ${pct > 80 ? 'bg-red-600' : pct > 60 ? 'bg-amber-500' : 'bg-emerald-600'}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
