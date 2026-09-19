import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Link2, Shield, Radio, Layers, Database } from 'lucide-react';

export const EcosystemSection: React.FC = () => {
  const { t } = useLanguage();

  const ecosystemComponents = [
    {
      name: 'ABHA (Ayushman Bharat Health Account)',
      subtitle: 'Universal 14-Digit Health ID',
      icon: <Shield className="w-5 h-5 text-[#123B63]" />,
      desc: 'Enables every citizen to hold a portable, longitudinal health record across primary, secondary, and tertiary public health facilities without duplicate registrations.',
      readiness: 'Integration-Ready (M1 Standard)',
      techDetails: 'Supports OTP/Aadhaar demo-auth and QR-scan ABDM token generation.',
      colorBorder: 'border-blue-300'
    },
    {
      name: 'ABDM (Ayushman Bharat Digital Mission)',
      subtitle: 'Health Facility & Worker Registry (HFR/HPR)',
      icon: <Layers className="w-5 h-5 text-indigo-700" />,
      desc: 'Standardized FHIR/NDHM compliant interoperability for Health Information Provider (HIP) and Health Information User (HIU) referral slip and discharge exchange.',
      readiness: 'FHIR M2 & M3 Ready',
      techDetails: 'Standardized Diagnostic Report & CarePlan resource schemas.',
      colorBorder: 'border-indigo-300'
    },
    {
      name: 'eSanjeevani Telemedicine',
      subtitle: 'Doctor-to-Doctor Tele-Consultation',
      icon: <Radio className="w-5 h-5 text-teal-700" />,
      desc: 'Connects Community Health Officers (CHOs) at Ayushman Arogya Mandirs with medical specialists at District Hospitals before initiating physical patient transport.',
      readiness: 'Protocol Interoperable',
      techDetails: 'Enables pre-referral stabilization advice and avoids unnecessary transfers.',
      colorBorder: 'border-teal-300'
    },
    {
      name: 'National Health Mission (NHM)',
      subtitle: 'Public Health Infrastructure & Transport',
      icon: <Database className="w-5 h-5 text-emerald-700" />,
      desc: 'Aligned with Ayushman Arogya Mandir service delivery standards, Janani Shishu Suraksha Karyakram (JSSK), and the 108/102 rural ambulance dispatch matrix.',
      readiness: 'Public Health Aligned',
      techDetails: 'Synchronized with District Health Society (DHS) governance workflows.',
      colorBorder: 'border-emerald-300'
    }
  ];

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
            <Link2 className="w-3.5 h-3.5" />
            <span>National Digital Health Architecture Compatibility</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#123B63] tracking-tight">
            {t('ecoTitle')}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {t('ecoSub')}
          </p>
        </div>

        {/* Integration Readiness Notice */}
        <div className="mt-6 p-3.5 bg-blue-50/70 border border-blue-200 rounded text-xs text-[#123B63] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#123B63] flex-shrink-0" />
            <span className="font-medium">
              <strong className="font-bold">Integration Architecture Notice:</strong> KAVACH CARE is designed to integrate with established Government of India digital public infrastructure (DPI) platforms through open ABDM/NHA APIs.
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[10px] bg-white text-[#123B63] px-2 py-0.5 rounded border border-blue-300 font-bold">
            OPEN API SPEC 2.1
          </span>
        </div>

        {/* 4 Ecosystem Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {ecosystemComponents.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white p-5 rounded border ${item.colorBorder} shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded bg-slate-50 border border-slate-200">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-none">
                        {item.name}
                      </h3>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {item.readiness}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Data Standard:</span>
                <span className="text-slate-800 font-semibold">{item.techDetails}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
