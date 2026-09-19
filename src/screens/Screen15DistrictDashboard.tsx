import React from 'react';
import { AlertTriangle, Building2 } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface Screen15DistrictDashboardProps {
  onNavigate: (screenNumber: number) => void;
}

export const Screen15DistrictDashboard: React.FC<Screen15DistrictDashboardProps> = ({ onNavigate }) => {
  const referralTrendsData = [
    { month: 'Apr', referrals: 1050 },
    { month: 'May', referrals: 1320 },
    { month: 'Jun', referrals: 1780 },
    { month: 'Jul', referrals: 2150 },
    { month: 'Aug', referrals: 2600 },
    { month: 'Sep', referrals: 3100 }
  ];

  const facilityLoadData = [
    { facility: 'PHC', load: 840 },
    { facility: 'CHC', load: 1620 },
    { facility: 'DH', load: 640 }
  ];

  const bottlenecks = [
    {
      facility: 'CHC Rampur',
      issue: 'High waiting time',
      severity: 'high',
      metric: 'Avg wait: 42 mins'
    },
    {
      facility: 'PHC Kalyanpur',
      issue: 'Diagnostic shortage',
      severity: 'medium',
      metric: 'CBC reagents low'
    },
    {
      facility: 'PHC Bairagarh',
      issue: 'Medicine low stock',
      severity: 'medium',
      metric: 'Metformin: 5 units'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* District Header Banner matching Screen 15 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">District Health Overview</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                CMO Console
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Sehore & Rampur Region, Madhya Pradesh • Live Health Oversight
            </p>
          </div>

          <span className="px-3 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs border border-slate-200">
            District Admin
          </span>
        </div>

        {/* 4 Stat Cards matching Screen 15 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">12,482</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Patients Served</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-blue-600">1,248</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Referrals</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-emerald-700">934</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Completed</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-emerald-700">75%</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Completion Rate</div>
          </div>
        </div>

        {/* Three Columns Grid matching Screen 15: Line Chart | Bar Chart | Bottlenecks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chart 1: Referral Trends Line Chart */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Referral Trends
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold">1k to 3k</span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={referralTrendsData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 2" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                  <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="referrals" stroke="#0F5B4E" strokeWidth={2.5} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Facility Load Bar Chart */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Facility Load
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold">By Tier</span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={facilityLoadData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 2" stroke="#f1f5f9" />
                  <XAxis dataKey="facility" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                  <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                  <Bar dataKey="load" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* List: Critical Bottlenecks */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Bottlenecks
              </h3>
              <span className="text-[10px] text-rose-600 font-bold">Action Required</span>
            </div>

            <div className="space-y-2.5">
              {bottlenecks.map((b, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate(14)}
                  className="p-2.5 rounded-xl border border-red-200 bg-red-50/40 space-y-1 cursor-pointer hover:bg-red-50/80 transition-colors"
                  title="Click to view facility dashboard"
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-900 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-600" />
                      {b.facility}
                    </span>
                    <span className="text-[10px] text-red-700 bg-red-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {b.issue}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {b.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
