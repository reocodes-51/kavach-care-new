import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, FileX, Clock, HelpCircle, UserX, AlertOctagon } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const { t } = useLanguage();

  const problems = [
    {
      number: '01',
      icon: <MapPin className="w-5 h-5 text-[#123B63]" />,
      title: t('prob1Title'),
      desc: t('prob1Desc'),
      metric: '40–80 km',
      metricLabel: 'Average rural transit over unpaved roads'
    },
    {
      number: '02',
      icon: <FileX className="w-5 h-5 text-red-700" />,
      title: t('prob2Title'),
      desc: t('prob2Desc'),
      metric: '74% Lost',
      metricLabel: 'Paper referral slips damaged or missing vitals'
    },
    {
      number: '03',
      icon: <Clock className="w-5 h-5 text-amber-700" />,
      title: t('prob3Title'),
      desc: t('prob3Desc'),
      metric: '4.8 Hours',
      metricLabel: 'Average inter-facility referral transit lag'
    },
    {
      number: '04',
      icon: <HelpCircle className="w-5 h-5 text-purple-700" />,
      title: t('prob4Title'),
      desc: t('prob4Desc'),
      metric: '68% Blind',
      metricLabel: 'Patients arrive without prior bed reservation'
    },
    {
      number: '05',
      icon: <UserX className="w-5 h-5 text-slate-700" />,
      title: t('prob5Title'),
      desc: t('prob5Desc'),
      metric: '62% Lost',
      metricLabel: 'Patients discharged with zero frontline follow-up'
    }
  ];

  return (
    <section id="problem" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-50 text-red-800 border border-red-200 text-xs font-bold mb-2">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Structural Bottlenecks in Rural Healthcare</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#123B63] tracking-tight">
            {t('problemTitle')}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {t('problemSub')}
          </p>
        </div>

        {/* Problem Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((prob, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded p-5 hover:border-slate-300 transition-shadow hover:shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded bg-white border border-slate-200 shadow-2xs">
                    {prob.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    PROBLEM #{prob.number}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {prob.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {prob.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-baseline justify-between">
                <div>
                  <div className="font-bold text-sm text-[#123B63]">{prob.metric}</div>
                  <div className="text-[10px] text-slate-500">{prob.metricLabel}</div>
                </div>
                <span className="text-[10px] uppercase font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                  Critical Gap
                </span>
              </div>
            </div>
          ))}

          {/* Solution Contrast Box */}
          <div className="bg-[#123B63] text-white rounded p-5 border border-[#0d2e4f] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block mb-2">
                KAVACH CARE INTERVENTION
              </span>
              <h3 className="text-lg font-bold mb-2 text-white">
                Closing the Gap with Automated Continuity
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                By replacing paper referral chits with an ABHA-linked digital token, verifying bed and doctor availability in real-time, and routing discharge summaries directly back to the village ASHA, KAVACH CARE prevents rural patients from falling through the cracks.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#1e4e7c] flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-bold">Target Metric:</span>
              <span className="text-white font-semibold">Under 10% Referral Attrition</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
