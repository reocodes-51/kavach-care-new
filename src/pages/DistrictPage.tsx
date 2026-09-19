import React from 'react';
import { DistrictAnalytics } from '../components/home/DistrictAnalytics';
import { Activity } from 'lucide-react';

export const DistrictPage: React.FC = () => {
  return (
    <div className="py-6 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="bg-white p-6 rounded border border-slate-200 shadow-xs">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-[#123B63] border border-blue-200 text-xs font-bold mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>District Health Intelligence Command</span>
          </div>
          <h1 className="text-2xl font-bold text-[#123B63]">
            District Health Society • Referral Attrition & Utilization Console
          </h1>
          <p className="mt-1 text-xs text-slate-600">
            Real-time analytics for the Chief Medical Officer (CMO), District Collector, and National Health Mission program officers.
          </p>
        </div>
      </div>

      <DistrictAnalytics />
    </div>
  );
};
