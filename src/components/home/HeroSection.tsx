import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Stethoscope, ArrowRight, ShieldCheck, CheckCircle2, HeartHandshake, Building2 } from 'lucide-react';
interface HeroSectionProps {
  onOpenTriageModal: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTriageModal, onExploreClick }) => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative bg-[#F4F7FB] border-b border-slate-200 pt-8 pb-12 overflow-hidden">
      {/* Subtle Background Pattern (Clean Government Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Official Banner Tag */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white text-[#123B63] border border-[#BACDE2] text-xs font-bold shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-health-green" />
            <span>{t('heroBadge', 'National Rural Health Continuity Initiative')}</span>
          </span>
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
            • Ayushman Bharat Digital Mission (ABDM) Architecture Aligned
          </span>
        </div>

        {/* 2-Column Hero Grid: Left Content + Right Healthcare Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column (Content, CTAs, Trust Statement) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-extrabold text-[#123B63] tracking-tight leading-[1.2]">
                {t('heroTitle', 'KAVACH CARE – AI-Assisted Rural Healthcare Navigation & Referral Continuity Platform')}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
                {t(
                  'heroSubtitle',
                  'Connecting rural citizens, frontline ASHA workers, Ayushman Arogya Mandirs, Primary & Community Health Centres, and District Hospitals into a reliable, closed-loop referral network.'
                )}
              </p>
            </div>

            {/* Action Buttons & Non-Numeric Trust Statement */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
              <button
                onClick={onOpenTriageModal}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded text-sm font-bold text-white bg-[#198754] hover:bg-[#157347] shadow-sm transition-all focus:ring-2 focus:ring-[#198754] focus:ring-offset-2"
              >
                <Stethoscope className="w-4 h-4" />
                <span>{t('btnStartCare', 'Start Care Navigation')}</span>
              </button>

              <button
                onClick={onExploreClick}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded text-sm font-bold text-[#123B63] bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors"
              >
                <span>{t('btnExploreHow', 'Explore How It Works')}</span>
                <ArrowRight className="w-4 h-4 text-[#123B63]" />
              </button>
            </div>

            {/* Non-Numeric Trust / Value Statement (Replaces fake stats) */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-lg border border-slate-200 text-xs font-semibold text-[#123B63] shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span>
                {t('trustStatement', 'Connected care from village to referral hospital')}
              </span>
            </div>

            {/* Highlight Callout Box: Continuity of Care */}
            <div className="p-4 bg-white rounded-lg border-l-4 border-l-health-green border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2 rounded bg-emerald-50 text-health-green flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-[#123B63]">
                      {t('highlightTag', 'Continuity of Care Guarantee')}
                    </h2>
                    <p className="text-xs text-slate-600 mt-0.5 max-w-2xl">
                      {t(
                        'highlightDesc',
                        'Every patient referral carries verified clinical context, vitals history, destination facility readiness, and transport coordination.'
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 self-start sm:self-center">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-900 rounded border border-emerald-300">
                    <HeartHandshake className="w-3 h-3 text-emerald-700" />
                    <span>Continuity Protocol</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Realistic Rural Healthcare Photo Card) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md lg:max-w-none bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-100">
                <img
                  src="/images/rural-healthcare-hero.jpg"
                  alt="Rural healthcare consultation at Ayushman Arogya Mandir with frontline ASHA worker and patient"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-[#123B63]/90 backdrop-blur-xs text-white text-[10px] font-bold flex items-center gap-1.5 shadow-xs">
                  <Building2 className="w-3 h-3 text-emerald-400" />
                  <span>Ayushman Arogya Mandir</span>
                </div>
              </div>
              <div className="pt-2.5 px-1.5 pb-1 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-medium">
                  Frontline ASHA Worker & Patient Navigation
                </span>
                <span className="font-semibold text-[#123B63] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Public Care</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Official Institutional Initiative Ribbon */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <span className="text-[11px] font-bold text-[#123B63] uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>National Digital Health Interoperability:</span>
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] text-slate-600">
            <span className="px-2.5 py-1 bg-white rounded border border-slate-200 shadow-2xs font-semibold">
              National Health Mission (NHM)
            </span>
            <span className="px-2.5 py-1 bg-white rounded border border-slate-200 shadow-2xs font-semibold">
              Ayushman Bharat Digital Mission (ABDM)
            </span>
            <span className="px-2.5 py-1 bg-white rounded border border-slate-200 shadow-2xs font-semibold">
              e-Sanjeevani Tele-Consultation
            </span>
            <span className="px-2.5 py-1 bg-white rounded border border-slate-200 shadow-2xs font-semibold">
              108 / 102 Emergency Dispatch
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

