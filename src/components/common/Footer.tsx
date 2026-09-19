import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-[#0B2540] text-slate-300 text-xs border-t-4 border-[#123B63] no-print">
      {/* Tricolor Ribbon */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Platform Overview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded bg-[#123B63] border border-[#C88D00] flex items-center justify-center text-white font-bold">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-base font-bold text-white tracking-tight leading-tight">
                  KAVACH CARE
                </div>
                <div className="text-[11px] text-amber-400 font-medium">
                  {language === 'mr' ? 'कवच केअर' : language === 'hi' ? 'कवच केयर' : 'कवच केयर • कवच केअर'}
                </div>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs">
              "One Patient. One Connected Journey."
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              An AI-assisted rural care navigation, facility registry, and closed-loop referral continuity platform designed to ensure no patient gets lost between primary and tertiary healthcare facilities.
            </p>

            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 rounded bg-[#123B63] text-amber-300 font-semibold text-[10px] border border-[#1f5080]">
                SIH Prototype / Demonstration Platform
              </span>
            </div>
          </div>

          {/* Column 2: Emergency Helplines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#1b446e] pb-2 mb-3">
              National Health Helplines
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between p-1.5 rounded bg-[#123B63]/60 border border-[#1d4b7a]">
                <span className="text-slate-200">Emergency Ambulance</span>
                <span className="font-mono font-bold text-amber-300">108</span>
              </li>
              <li className="flex items-center justify-between p-1.5 rounded bg-[#123B63]/60 border border-[#1d4b7a]">
                <span className="text-slate-200">Maternal & Neonate (Janani)</span>
                <span className="font-mono font-bold text-amber-300">102</span>
              </li>
              <li className="flex items-center justify-between p-1.5 rounded bg-[#123B63]/60 border border-[#1d4b7a]">
                <span className="text-slate-200">National Health Helpline</span>
                <span className="font-mono font-bold text-amber-300">104</span>
              </li>
              <li className="flex items-center justify-between p-1.5 rounded bg-[#123B63]/60 border border-[#1d4b7a]">
                <span className="text-slate-200">Tele-MANAS (Mental Health)</span>
                <span className="font-mono font-bold text-amber-300">14477</span>
              </li>
              <li className="flex items-center justify-between p-1.5 rounded bg-[#123B63]/60 border border-[#1d4b7a]">
                <span className="text-slate-200">National Childline</span>
                <span className="font-mono font-bold text-amber-300">1098</span>
              </li>
            </ul>
          </div>

          {/* Column 3: National Health Initiatives & Standards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#1b446e] pb-2 mb-3">
              Architecture Compatibility
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Ayushman Bharat Health Account (ABHA)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Ayushman Bharat Digital Mission (ABDM)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>eSanjeevani National Telemedicine</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Ayushman Arogya Mandir (HWC)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>ICMR Standard Treatment Guidelines (STG)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Digital Personal Data Protection (DPDP)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Clinical Disclaimer & Governance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#1b446e] pb-2 mb-3">
              Clinical Disclaimer
            </h4>
            <div className="p-3 bg-[#123B63] rounded border border-[#205183] text-[11px] text-slate-200 leading-relaxed">
              <p className="font-semibold text-amber-300 mb-1">
                Clinical Decision Support Notice:
              </p>
              KAVACH CARE AI tools assist triage prioritization and facility matching. Final clinical decisions, prescriptions, and emergency transfers remain with qualified Medical Officers, Specialists, and CHOs.
            </div>
            <div className="mt-3 text-[11px] text-slate-400">
              Designed for rural, tribal, and remote districts across India.
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Demonstration Note */}
        <div className="mt-10 pt-6 border-t border-[#1a426b] flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} KAVACH CARE • National Rural Care Navigation & Referral Continuity Platform • SIH Demonstration
          </div>
          <div className="flex items-center space-x-4">
            <span>Website Policies</span>
            <span>•</span>
            <span>Accessibility Statement</span>
            <span>•</span>
            <span>DPDP Compliance</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
