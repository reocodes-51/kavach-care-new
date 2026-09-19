import React from 'react';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { NetworkDiagram } from '../components/common/NetworkDiagram';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Banner */}
        <div className="bg-white p-6 sm:p-8 rounded border border-slate-200 shadow-xs mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-[#123B63] border border-blue-200 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-health-green" />
            <span>End-to-End Operational Blueprint</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#123B63]">
            How KAVACH CARE Works: The Closed-Loop Continuum
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
            From the moment an ASHA worker checks vital signs in a remote hamlet to the patient's formal discharge and subsequent home recovery verification visit, discover every step of India's first closed-loop rural referral continuity system.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              to="/network"
              className="px-4 py-2 bg-[#123B63] text-white rounded text-xs font-bold hover:bg-[#0e2d4d]"
            >
              Explore Healthcare Tiers
            </Link>
            <Link
              to="/track"
              className="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded text-xs font-bold hover:bg-slate-50"
            >
              Track Active Patient Slip
            </Link>
          </div>
        </div>

        {/* 8-Step Interactive Section */}
        <HowItWorksSection />

        {/* Multi-tier Network Diagram */}
        <div className="mt-10">
          <NetworkDiagram />
        </div>
      </div>
    </div>
  );
};
