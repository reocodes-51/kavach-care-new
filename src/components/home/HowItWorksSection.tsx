import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  UserCheck,
  Stethoscope,
  Building,
  CalendarCheck,
  FileText,
  UserCheck2,
  Bed,
  RotateCcw,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 1,
      title: t('step1'),
      desc: t('step1Desc'),
      icon: <UserCheck className="w-5 h-5 text-emerald-700" />,
      detail: 'The frontline ASHA or ANM visits the patient hamlet. Even without 3G/4G connectivity, she captures blood pressure, pulse, SpO2, blood sugar, and danger symptoms into the KAVACH offline mobile app.',
      output: 'Patient profile + preliminary vitals record'
    },
    {
      id: 2,
      title: t('step2'),
      desc: t('step2Desc'),
      icon: <Stethoscope className="w-5 h-5 text-[#123B63]" />,
      detail: 'The platform evaluates vitals against deterministic ICMR Standard Treatment Guidelines (STG). Flags the patient as RED (Urgent transfer needed), AMBER (Priority within 24-48 hrs), or GREEN (Routine PHC care).',
      output: 'Validated Triage Tag + Clinical reasoning'
    },
    {
      id: 3,
      title: t('step3'),
      desc: t('step3Desc'),
      icon: <Building className="w-5 h-5 text-indigo-700" />,
      detail: 'Instead of blind referrals, the algorithm scans the live district facility registry: confirming whether the CHC has a functional ultrasound, blood units, and an on-duty Ob/Gyn or Pediatrician today.',
      output: 'Optimal facility reservation (Zero rejection)'
    },
    {
      id: 4,
      title: t('step4'),
      desc: t('step4Desc'),
      icon: <CalendarCheck className="w-5 h-5 text-blue-700" />,
      detail: 'An OPD token and bed slot are pre-allocated at the destination hospital. If tagged RED, an automated alert is simultaneously dispatched to the 108/102 ambulance dispatch hub with GPS coordinates.',
      output: 'Confirmed OPD slot & ambulance reservation'
    },
    {
      id: 5,
      title: t('step5'),
      desc: t('step5Desc'),
      icon: <FileText className="w-5 h-5 text-amber-700" />,
      detail: 'A digital bilingual referral slip is created with a secure QR code. The patient receives an SMS token in Hindi or Marathi, and a printed or digital slip is given for verification at the reception counter.',
      output: 'Official Bilingual QR Referral Slip'
    },
    {
      id: 6,
      title: t('step6'),
      desc: t('step6Desc'),
      icon: <UserCheck2 className="w-5 h-5 text-teal-700" />,
      detail: 'Upon arrival at the CHC or District Hospital, the registration desk scans the QR code. The patient bypasses general queues and is routed directly to the designated specialist with their pre-consultation vitals.',
      output: 'Zero paperwork re-entry at hospital'
    },
    {
      id: 7,
      title: t('step7'),
      desc: t('step7Desc'),
      icon: <Bed className="w-5 h-5 text-red-700" />,
      detail: 'The patient receives specialized medical, surgical, or inpatient treatment. At discharge, the attending physician enters the e-discharge summary, prescribed drugs, wound dressing advice, and warning signs.',
      output: 'Digital E-Discharge Summary & Prescription'
    },
    {
      id: 8,
      title: t('step8'),
      desc: t('step8Desc'),
      icon: <RotateCcw className="w-5 h-5 text-health-green" />,
      detail: 'The referral is NOT closed until the loop is verified. The referring village ASHA receives an automated task on her mobile app to conduct a post-discharge home verification visit within 72 hours.',
      output: '100% Closed-Loop Verification & Audit'
    }
  ];

  return (
    <section id="how-it-works" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-200">
            Care Continuum Protocol
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#123B63] tracking-tight">
            {t('howTitle')}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {t('howSub')}
          </p>
        </div>

        {/* 8-Step Timeline Strip */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {steps.map((step, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`text-left p-3 rounded border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-white border-[#123B63] shadow-md ring-2 ring-[#123B63]/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isCurrent ? 'bg-[#123B63] text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      Step 0{step.id}
                    </span>
                    {step.icon}
                  </div>
                  <div className="text-xs font-bold text-slate-900 line-clamp-1 mb-1">
                    {step.title.split('. ')[1]}
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 line-clamp-2 mt-1">
                  {step.output}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep Dive Card */}
        <div className="mt-6 bg-white border border-slate-200 rounded p-6 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-100 rounded border border-slate-200">
                {steps[activeStep].icon}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Step {steps[activeStep].id} of 8
                </span>
                <h3 className="text-lg font-bold text-[#123B63]">
                  {steps[activeStep].title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded border border-emerald-200">
                System Output: {steps[activeStep].output}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="md:col-span-2 space-y-3">
              <h4 className="font-bold text-slate-800 text-sm">
                Detailed Workflow & Operational Standard:
              </h4>
              <p className="text-slate-700 leading-relaxed text-sm">
                {steps[activeStep].detail}
              </p>
              <div className="flex items-center gap-2 pt-2">
                <CheckCircle2 className="w-4 h-4 text-health-green" />
                <span className="font-semibold text-slate-800">
                  Government Standard Compliant:
                </span>
                <span className="text-slate-600">
                  Validated against MoHFW / NHM rural service delivery norms.
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Continuity Guarantee
                </span>
                <div className="font-bold text-slate-900 text-xs mb-1">
                  Unbroken Patient Audit Trail
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Every transition between screening, transport, and clinical care updates the central ABHA timeline with zero data re-entry.
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-200">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(prev => prev - 1)}
                  className="px-2.5 py-1 text-[11px] font-semibold border rounded bg-white disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  disabled={activeStep === steps.length - 1}
                  onClick={() => setActiveStep(prev => prev + 1)}
                  className="px-2.5 py-1 text-[11px] font-bold bg-[#123B63] text-white rounded disabled:opacity-40 flex items-center gap-1"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
