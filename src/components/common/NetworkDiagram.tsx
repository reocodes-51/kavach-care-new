import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, Home, Building, Stethoscope, Landmark, GraduationCap, CheckCircle2, RotateCcw, AlertCircle } from 'lucide-react';

interface TierDetail {
  id: string;
  name: string;
  cadre: string;
  role: string;
  services: string[];
  equipment: string[];
  kavachRole: string;
  icon: React.ReactNode;
}

export const NetworkDiagram: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeTierIndex, setActiveTierIndex] = useState<number>(0);

  const tiers: TierDetail[] = [
    {
      id: 'village',
      name: language === 'mr' ? 'गाव / उपकेंद्र' : language === 'hi' ? 'गांव / उप-केंद्र' : 'Village / Sub-Centre',
      cadre: 'ASHA / ANM / AWW',
      role: 'Doorstep health screening, vital signs logging & emergency risk identification',
      services: ['Antenatal Checkups (ANC)', 'Infant immunization & IMNCI', 'NCD screening (BP/Sugar)', 'Malaria RDT & TB sputum collection'],
      equipment: ['Digital BP Monitor', 'Pulse Oximeter', 'Infrared Thermometer', 'Dipstick Urine Kit', 'Smartphone with KAVACH Offline App'],
      kavachRole: 'Collects offline vitals, generates immediate ABHA triage token, tags RED/AMBER emergency flags.',
      icon: <Home className="w-5 h-5 text-emerald-600" />
    },
    {
      id: 'phc',
      name: language === 'mr' ? 'आयुष्मान आरोग्य मंदिर (PHC)' : language === 'hi' ? 'आयुष्मान आरोग्य मंदिर (PHC)' : 'Ayushman Arogya Mandir (PHC)',
      cadre: 'CHO / MBBS Medical Officer',
      role: 'First formal clinical gatekeeping, diagnostic confirmation & tele-consultation',
      services: ['Outpatient consultation', 'Basic 14 diagnostic tests', 'eSanjeevani tele-medicine with DH', 'Free essential medicine dispensing'],
      equipment: ['12-Lead ECG Machine', 'Semi-auto Biochemistry Analyzer', 'Centrifuge & Microscope', 'Oxygen Concentrators'],
      kavachRole: 'Reviews ASHA triage slips, conducts tele-consultation, issues signed digital referral with bed slot reservation.',
      icon: <Stethoscope className="w-5 h-5 text-[#123B63]" />
    },
    {
      id: 'chc',
      name: language === 'mr' ? 'समुदाय आरोग्य केंद्र (CHC / FRU)' : language === 'hi' ? 'सामुदायिक स्वास्थ्य केंद्र (CHC / FRU)' : 'Community Health Centre (CHC / FRU)',
      cadre: 'Surgeon, Ob/Gyn, Pediatrician, Physician',
      role: 'First Referral Unit (FRU) for emergency obstetric care, general surgery & hospitalization',
      services: ['Emergency C-sections & Normal Deliveries', 'Elective General Surgery', 'Pediatric Inpatient Care', '24x7 Casualty & Blood Storage'],
      equipment: ['Obstetric Ultrasound (USG)', 'Digital X-Ray (300mA)', 'Operation Theatre Suite', 'Labor Room (LaQshya certified)'],
      kavachRole: 'Receives pre-arrival alert with patient vitals; reserves surgical/maternity bed; preps emergency team.',
      icon: <Building className="w-5 h-5 text-indigo-700" />
    },
    {
      id: 'dh',
      name: language === 'mr' ? 'जिल्हा रुग्णालय (DH / SDH)' : language === 'hi' ? 'जिला अस्पताल (DH / SDH)' : 'District Hospital (DH / SDH)',
      cadre: 'Multi-Specialty Consultants & Intensivists',
      role: 'District apex secondary and tertiary trauma, ICU, neonatal intensive care & dialysis',
      services: ['10-Bed Intensive Care Unit (ICU)', '12-Bed Special Newborn Care Unit (SNCU)', 'Trauma & Orthopedic Surgery', 'Regional Blood Bank with Components'],
      equipment: ['Multi-slice CT Scan', 'Color Doppler Echocardiography', 'Dialysis Machines (PMNDP)', 'Automated Chemiluminescence Analyzers'],
      kavachRole: 'Direct intake of critical transfers; logs definitive e-discharge summary with follow-up directives for ASHA.',
      icon: <Landmark className="w-5 h-5 text-blue-900" />
    },
    {
      id: 'specialist',
      name: language === 'mr' ? 'सर्वोच्च मेडिकल कॉलेज / एम्स' : language === 'hi' ? 'शीर्ष मेडिकल कॉलेज / एम्स' : 'Apex Medical College / AIIMS',
      cadre: 'Super-Specialists (DM / MCh)',
      role: 'Advanced quaternary surgical and medical care (Cardiology, Oncology, Neuro, Nephro)',
      services: ['Interventional Cath Lab & Angioplasty', 'Comprehensive Cancer Care / Chemotherapy', 'Neurosurgical Trauma Care', 'Complex Pediatric Surgery'],
      equipment: ['1.5T MRI Scanner', 'High-energy Linear Accelerator', 'Cardiovascular Cath Lab', 'Apheresis Unit'],
      kavachRole: 'Receives statewide referred cohort with unbroken longitudinal health records linked via ABHA.',
      icon: <GraduationCap className="w-5 h-5 text-amber-700" />
    }
  ];

  const currentTier = tiers[activeTierIndex];

  return (
    <div className="w-full bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
      {/* Header Banner */}
      <div className="bg-[#123B63] text-white px-5 py-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#0d2a47]">
        <div>
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
            {t('diagramTitle')}
          </span>
          <h3 className="text-base font-bold">
            {t('diagramSub')}
          </h3>
        </div>
        <div className="flex items-center gap-2 bg-[#0B2540] px-3 py-1 rounded border border-[#1e4e7c] text-xs">
          <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-emerald-300">Closed-Loop Continuum</span>
        </div>
      </div>

      {/* Interactive Pathway Bar */}
      <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 relative">
          {tiers.map((tier, idx) => {
            const isSelected = activeTierIndex === idx;
            return (
              <button
                key={tier.id}
                onClick={() => setActiveTierIndex(idx)}
                className={`text-left p-3 rounded border transition-all relative ${
                  isSelected
                    ? 'bg-white border-[#123B63] shadow-md ring-2 ring-[#123B63]/20'
                    : 'bg-white/80 border-slate-200 hover:border-slate-400 hover:bg-white'
                }`}
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-[#123B63] text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    Tier {idx + 1}
                  </span>
                  {tier.icon}
                </div>

                <div className="text-xs font-bold text-slate-900 line-clamp-1 mb-0.5">
                  {tier.name}
                </div>
                <div className="text-[11px] font-medium text-slate-500 line-clamp-1">
                  {tier.cadre}
                </div>

                {/* Arrow indicator for next tier */}
                {idx < tiers.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-slate-200 text-slate-600 items-center justify-center pointer-events-none shadow-xs">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Closed loop reverse arrow callout */}
        <div className="mt-3 flex items-center justify-between text-xs px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-900">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-health-green" />
            <span className="font-semibold">
              KAVACH Closed-Loop Verification:
            </span>
            <span className="hidden sm:inline text-emerald-800">
              When patient is treated at CHC/DH, discharge directives flow BACK to village ASHA for home recovery visits.
            </span>
          </div>
          <span className="font-bold text-health-green-dark whitespace-nowrap">
            100% Audit Trail
          </span>
        </div>
      </div>

      {/* Selected Tier Capability Detail Inspector */}
      <div className="p-5 sm:p-6 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-slate-100 border border-slate-200">
              {currentTier.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 bg-[#123B63] text-white rounded">
                  Tier {activeTierIndex + 1}
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  {currentTier.name}
                </h4>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Responsible Cadre: <span className="text-[#123B63] font-semibold">{currentTier.cadre}</span>
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-[#123B63] border border-blue-200 rounded">
            Click any tier above to inspect
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
          {/* Clinical Role */}
          <div className="bg-slate-50 p-3.5 rounded border border-slate-200">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1.5">
              Core Clinical Mandate
            </span>
            <p className="text-slate-800 leading-relaxed font-medium mb-3">
              {currentTier.role}
            </p>
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
              Standard Services
            </span>
            <ul className="space-y-1 text-slate-600">
              {currentTier.services.map((srv, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-health-green flex-shrink-0 mt-0.5" />
                  <span>{srv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Equipment & Diagnostics */}
          <div className="bg-slate-50 p-3.5 rounded border border-slate-200">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1.5">
              Available Diagnostics & Equipment
            </span>
            <ul className="space-y-1 text-slate-700 font-medium">
              {currentTier.equipment.map((eq, i) => (
                <li key={i} className="flex items-center gap-1.5 py-1 border-b border-slate-200 last:border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#123B63]" />
                  <span>{eq}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* KAVACH CARE Platform Role */}
          <div className="bg-[#F4F7FB] p-3.5 rounded border border-[#BACDE2]">
            <div className="flex items-center gap-1.5 mb-1.5 text-[#123B63]">
              <AlertCircle className="w-4 h-4 text-emerald-600" />
              <span className="font-bold uppercase tracking-wider text-[10px]">
                KAVACH System Integration
              </span>
            </div>
            <p className="text-slate-800 font-medium leading-relaxed mb-3">
              {currentTier.kavachRole}
            </p>
            <div className="p-2 bg-white rounded border border-slate-200 text-[11px] text-slate-600">
              <span className="font-semibold text-health-green">Guaranteed Rule:</span> Every transfer from this tier is registered with an ABHA identifier, reserving destination bed capacity before patient departure.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
