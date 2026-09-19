import React from 'react';
import {
  Building
} from 'lucide-react';

interface Screen14FacilityDashboardProps {
  onNavigate: (screenNumber: number) => void;
}

export const Screen14FacilityDashboard: React.FC<Screen14FacilityDashboardProps> = ({ onNavigate }) => {
  const services = [
    { name: 'General Medicine', status: 'Available', color: 'emerald' },
    { name: 'Laboratory', status: 'Available', color: 'emerald' },
    { name: 'Emergency Services (24x7)', status: 'Available', color: 'emerald' },
    { name: 'Cardiology (Specialist)', status: 'Unavailable', color: 'red' },
    { name: 'Radiology (Digital X-Ray)', status: 'Limited', color: 'amber' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header matching Screen 14 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0F5B4E] text-white flex items-center justify-center font-bold">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">CHC Rampur</h2>
              <p className="text-xs text-slate-500">Community Health Centre • First Referral Unit (FRU)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs border border-slate-200">
              Facility Admin Console
            </span>
          </div>
        </div>

        {/* 4 Overview Stat Cards matching Screen 14 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">128</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Patients Arrived</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-blue-600">18</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Referrals Inward</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-amber-600">42</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Currently Waiting</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-emerald-700">87%</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Medicine Stock Level</div>
          </div>
        </div>

        {/* Two Columns: Services Status + Medicine Stock Donut Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Services Status Table */}
          <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-sm">Services Status & Capacity</h3>
              <span className="text-[11px] text-emerald-700 font-bold">Live Telemetry</span>
            </div>

            <div className="divide-y divide-slate-100">
              {services.map((srv, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{srv.name}</span>
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                    srv.color === 'emerald'
                      ? 'bg-emerald-100 text-emerald-800'
                      : srv.color === 'red'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {srv.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Medicine Stock Gauge Box matching Screen 14 */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-sm">Medicine Stock</h3>
              <button onClick={() => onNavigate(11)} className="text-[11px] font-bold text-[#0F5B4E] hover:underline">
                View Pharmacy
              </button>
            </div>

            {/* Visual Stock Ring */}
            <div className="flex flex-col items-center justify-center p-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* SVG Donut Circle */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-600"
                    strokeDasharray="82, 100"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-900">82%</span>
                  <span className="text-[9px] font-bold text-emerald-700 uppercase">Available</span>
                </div>
              </div>
            </div>

            {/* Legend Breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span className="text-slate-600">Available</span>
                </div>
                <span className="font-bold text-slate-900">82%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-slate-600">Low Stock</span>
                </div>
                <span className="font-bold text-amber-700">12%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="text-slate-600">Out of Stock</span>
                </div>
                <span className="font-bold text-red-700">6%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
