import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Stethoscope,
  RotateCcw,
  Building,
  QrCode,
  WifiOff,
  Languages,
  CalendarCheck,
  ActivitySquare,
  ShieldCheck
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Stethoscope className="w-5 h-5 text-[#123B63]" />,
      title: t('feat1Title'),
      desc: t('feat1Desc'),
      badge: 'ICMR STG Aligned'
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-health-green" />,
      title: t('feat2Title'),
      desc: t('feat2Desc'),
      badge: 'Zero Drop-off Audit'
    },
    {
      icon: <Building className="w-5 h-5 text-indigo-700" />,
      title: t('feat3Title'),
      desc: t('feat3Desc'),
      badge: 'Live Bed & USG Registry'
    },
    {
      icon: <QrCode className="w-5 h-5 text-blue-700" />,
      title: t('feat4Title'),
      desc: t('feat4Desc'),
      badge: 'ABDM M1-M3 Ready'
    },
    {
      icon: <WifiOff className="w-5 h-5 text-amber-700" />,
      title: t('feat5Title'),
      desc: t('feat5Desc'),
      badge: 'Low-Bandwidth Tribal Ready'
    },
    {
      icon: <Languages className="w-5 h-5 text-teal-700" />,
      title: t('feat6Title'),
      desc: t('feat6Desc'),
      badge: 'English • हिन्दी • मराठी'
    },
    {
      icon: <CalendarCheck className="w-5 h-5 text-purple-700" />,
      title: t('feat7Title'),
      desc: t('feat7Desc'),
      badge: 'ASHA Mobile Task List'
    },
    {
      icon: <ActivitySquare className="w-5 h-5 text-red-700" />,
      title: t('feat8Title'),
      desc: t('feat8Desc'),
      badge: 'District CMO Command'
    }
  ];

  return (
    <section id="features" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-[#123B63] border border-blue-200 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>National Health Mission Architectural Principles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#123B63] tracking-tight">
            {t('featuresTitle')}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {t('featuresSub')}
          </p>
        </div>

        {/* Features 8-Box Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-5 rounded border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded bg-white border border-slate-200 shadow-2xs">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-bold text-[#123B63] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Public Health Spec</span>
                <span className="text-[#123B63] font-bold">Standard 2.0</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
