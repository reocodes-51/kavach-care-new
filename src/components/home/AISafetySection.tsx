import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, UserCheck, Scale, FileCode, CheckCircle2, Lock } from 'lucide-react';

export const AISafetySection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Institutional Safety Banner */}
        <div className="bg-[#0B2540] text-white p-6 sm:p-8 rounded border-l-4 border-l-health-green shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1b436e] pb-6 mb-6">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-[#123B63] rounded border border-[#205285] text-health-green flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mb-1">
                  Ethical AI & Clinical Governance Mandate
                </span>
                <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                  {t('safetyTitle', 'Institutional Clinical Safety & Ethical AI Governance')}
                </h2>
              </div>
            </div>

            <div className="bg-[#123B63] px-3.5 py-2 rounded border border-[#23588f] text-xs font-semibold text-emerald-300 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>DPDP Act 2023 Compliant</span>
            </div>
          </div>

          {/* Primary Safety Statement */}
          <div className="p-4 bg-[#123B63] rounded border border-[#255b91] mb-6">
            <p className="text-sm sm:text-base font-bold text-amber-300 italic tracking-wide">
              "{t('safetyNotice', 'AI assists healthcare workflows with symptom prioritization. All final clinical diagnosis and treatment decisions remain strictly with licensed medical professionals.')}"
            </p>
          </div>

          {/* 3 Core Clinical Governance Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-200">
            <div className="bg-[#0e2f50] p-4 rounded border border-[#194b7c]">
              <div className="flex items-center gap-2 font-bold text-white text-sm mb-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>Deterministic ICMR Protocols</span>
              </div>
              <p className="leading-relaxed text-slate-300">
                {t('safetyP1', 'Algorithmic prioritization adheres to deterministic Indian Council of Medical Research (ICMR) Standard Treatment Guidelines without speculative reasoning.')}
              </p>
              <div className="mt-3 pt-2 border-t border-[#1b4e80] text-[11px] text-emerald-300 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero black-box hallucination</span>
              </div>
            </div>

            <div className="bg-[#0e2f50] p-4 rounded border border-[#194b7c]">
              <div className="flex items-center gap-2 font-bold text-white text-sm mb-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Mandatory Human-in-the-Loop</span>
              </div>
              <p className="leading-relaxed text-slate-300">
                {t('safetyP2', 'Every referral slip, emergency triage tag, and transfer order requires clinical verification and authorization by a registered medical practitioner.')}
              </p>
              <div className="mt-3 pt-2 border-t border-[#1b4e80] text-[11px] text-emerald-300 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Signed by Medical Officer</span>
              </div>
            </div>

            <div className="bg-[#0e2f50] p-4 rounded border border-[#194b7c]">
              <div className="flex items-center gap-2 font-bold text-white text-sm mb-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span>Data Privacy & Consent</span>
              </div>
              <p className="leading-relaxed text-slate-300">
                {t('safetyP3', 'Built in compliance with the Digital Personal Data Protection (DPDP) Act 2023. Patient records and health data are sovereign, encrypted, and require explicit consent.')}
              </p>
              <div className="mt-3 pt-2 border-t border-[#1b4e80] text-[11px] text-emerald-300 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Encrypted longitudinal records</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
