import React from 'react';
import { Shield, Award, Database, Lock } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="bg-white p-6 sm:p-8 rounded border border-slate-200 shadow-xs mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Smart India Hackathon (SIH) Prototype Demonstration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#123B63]">
            About KAVACH CARE (कवच केयर)
          </h1>
          <p className="mt-2 text-base font-semibold text-emerald-800">
            "One Patient. One Connected Journey."
          </p>
          <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
            KAVACH CARE is an institutional public healthcare innovation designed to solve India's rural referral crisis. By connecting frontline ASHA/ANM workers, Ayushman Arogya Mandirs (PHCs), Community Health Centres (CHCs), and District Hospitals into one closed-loop digital pathway, the platform guarantees that no patient is lost in transit.
          </p>
        </div>

        {/* Institutional Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs mb-8">
          <div className="bg-white p-5 rounded border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2">
              <Shield className="w-4 h-4 text-[#123B63]" />
              <span>Public Health, Not an AI Startup</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Designed from first principles as a government digital public good. Built with clean high-contrast typography, official colors, zero hype, and 100% adherence to MoHFW rural health service standards.
            </p>
          </div>

          <div className="bg-white p-5 rounded border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2">
              <Database className="w-4 h-4 text-emerald-600" />
              <span>ABDM Ecosystem Ready</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Engineered for seamless interoperability with open national standards: 14-digit ABHA IDs, Health Facility Registry (HFR), Health Professional Registry (HPR), and FHIR care summaries.
            </p>
          </div>

          <div className="bg-white p-5 rounded border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2">
              <Lock className="w-4 h-4 text-indigo-600" />
              <span>Clinical Safety & Ethics</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Strictly non-generative, deterministic clinical triage. AI assists healthcare workflows while final medical decisions remain solely with qualified medical officers under India's DPDP Act 2023.
            </p>
          </div>
        </div>

        {/* SIH Demonstration Note */}
        <div className="bg-[#123B63] text-white p-6 sm:p-8 rounded border border-[#0e2d4d]">
          <h3 className="text-base font-bold mb-2">
            Smart India Hackathon (SIH) Prototype Notice
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed max-w-3xl">
            This demonstration platform models the rural referral continuum using realistic field data from the Gadchiroli, Nandurbar, and Nashik tribal and rural blocks in Maharashtra. It demonstrates the technical feasibility of zero-rejection facility matching, low-bandwidth offline mobile intake, and automated ASHA post-discharge follow-up auditing.
          </p>
        </div>
      </div>
    </div>
  );
};
