import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Stethoscope, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { NetworkDiagram } from '../common/NetworkDiagram';

interface HeroSectionProps {
  onOpenTriageModal: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTriageModal, onExploreClick }) => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-[#F4F7FB] border-b border-slate-200 pt-8 pb-12 overflow-hidden">
      {/* Subtle Background Pattern (Clean Government Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Official Banner Tag */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white text-[#123B63] border border-[#BACDE2] text-xs font-bold shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-health-green" />
            <span>{t('heroBadge')}</span>
          </span>
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
            • Ayushman Bharat Digital Mission (ABDM) Architecture Aligned
          </span>
        </div>

        {/* Hero Headlines */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#123B63] tracking-tight leading-[1.15]">
            {t('heroTitle')}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-700 font-normal leading-relaxed max-w-3xl">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Action Buttons & Fast Stats */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenTriageModal}
            className="flex items-center gap-2 px-5 py-3 rounded text-sm font-bold text-white bg-health-green hover:bg-health-green-dark shadow-sm transition-all focus:ring-2 focus:ring-health-green focus:ring-offset-2"
          >
            <Stethoscope className="w-4 h-4" />
            <span>{t('btnStartCare')}</span>
          </button>

          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 px-5 py-3 rounded text-sm font-bold text-[#123B63] bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors"
          >
            <span>{t('btnExploreHow')}</span>
            <ArrowRight className="w-4 h-4 text-[#123B63]" />
          </button>

          <div className="hidden sm:flex items-center gap-4 ml-auto text-xs text-slate-600 bg-white px-3.5 py-2 rounded border border-slate-200 shadow-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-semibold text-slate-800">14,820+</span> Referrals Audited
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-emerald-700">8.7%</span> Drop-off Rate (Down from 61.4%)
            </div>
          </div>
        </div>

        {/* Highlight Callout Box: "No Patient Gets Lost Between Facilities." */}
        <div className="mt-8 p-4 bg-white rounded border-l-4 border-l-health-green border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2 rounded bg-emerald-50 text-health-green flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#123B63]">
                  {t('highlightTag')}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
                  {t('highlightDesc')}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-block px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 rounded border border-emerald-300">
                100% Closed-Loop
              </span>
            </div>
          </div>
        </div>

        {/* Network Diagram Showcase */}
        <div className="mt-8">
          <NetworkDiagram />
        </div>
      </div>
    </section>
  );
};
