import React from 'react';
import { Stethoscope, WifiOff, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WorkersPage: React.FC = () => {
  return (
    <div className="py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="bg-white p-6 sm:p-8 rounded border border-slate-200 shadow-xs mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-[#123B63] border border-blue-200 text-xs font-bold mb-2">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Frontline Health Cadre Standard Operating Procedures</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#123B63]">
            Operational Guide for ASHA, ANM & Community Health Officers (CHO)
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
            Equipping rural frontline workers with low-bandwidth offline digital screening tools, ICMR standard clinical decision support, and closed-loop follow-up verification checklists.
          </p>
        </div>

        {/* 3 Core Workflow Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs mb-8">
          <div className="bg-white p-5 rounded border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2">
              <WifiOff className="w-4 h-4 text-amber-600" />
              <span>1. Offline-First Mobile Screening</span>
            </div>
            <p className="text-slate-600 leading-relaxed mb-3">
              Capture vitals, symptoms, and ABHA IDs even in zero-network remote hamlets. The application locally caches all triage algorithms and automatically syncs when reaching an internet zone.
            </p>
            <span className="text-[10px] font-bold text-[#123B63] bg-blue-50 px-2 py-0.5 rounded">
              Sync protocol: SQLite local cache
            </span>
          </div>

          <div className="bg-white p-5 rounded border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>2. ICMR Danger Sign Thresholds</span>
            </div>
            <p className="text-slate-600 leading-relaxed mb-3">
              Automatic RED TAG alerts for maternal BP ≥ 160/100, pediatric SpO2 &lt; 92%, chest indrawing, severe dehydration, or uncontrolled trauma, ensuring immediate 108/102 dispatch.
            </p>
            <span className="text-[10px] font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded">
              Standard Treatment Guidelines 2024
            </span>
          </div>

          <div className="bg-white p-5 rounded border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2">
              <CheckCircle2 className="w-4 h-4 text-health-green" />
              <span>3. Post-Discharge Home Visit Loop</span>
            </div>
            <p className="text-slate-600 leading-relaxed mb-3">
              Receive automated notifications when a referred patient is discharged from the CHC or District Hospital. Complete the post-treatment checklist to mark the referral loop closed.
            </p>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              Audit loop completion mandatory
            </span>
          </div>
        </div>

        {/* Action button to Portals */}
        <div className="bg-[#123B63] p-6 rounded text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold">Access Frontline Mobile Simulator</h3>
            <p className="text-xs text-slate-300 mt-1">
              Experience the offline-capable screening and home visit task interface.
            </p>
          </div>
          <Link
            to="/portals"
            className="px-4 py-2 bg-health-green hover:bg-health-green-dark text-white font-bold rounded text-xs"
          >
            Open Frontline Portal
          </Link>
        </div>
      </div>
    </div>
  );
};
