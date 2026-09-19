import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Heart, Phone, FileCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PatientsPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="bg-white p-6 sm:p-8 rounded border border-slate-200 shadow-xs mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
            <Heart className="w-3.5 h-3.5" />
            <span>Citizen & Family Healthcare Guide</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#123B63]">
            {language === 'mr' ? 'रुग्ण आणि कुटुंबासाठी मार्गदर्शक' : language === 'hi' ? 'मरीजों एवं परिवारों के लिए मार्गदर्शिका' : 'Guide for Patients & Families: Rights, Referrals & Care Continuity'}
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
            KAVACH CARE ensures that every rural patient referred from their village receives pre-booked hospital admission, free government transport, and post-discharge home care.
          </p>
        </div>

        {/* 4 Entitlement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs mb-10">
          <div className="bg-white p-5 rounded border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-sm font-bold text-[#123B63] mb-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>1. Your Digital Referral Slip with QR Code</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              When your ASHA worker or CHO refers you, you receive an official QR-coded referral slip and an SMS with your OPD token number. Show this at the hospital reception counter to bypass regular lines.
            </p>
          </div>

          <div className="bg-white p-5 rounded border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-sm font-bold text-[#123B63] mb-2">
              <Phone className="w-4 h-4 text-amber-600" />
              <span>2. Free Government Emergency Transport</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              For pregnant mothers and neonates, <strong>102 Janani Shishu Express</strong> is 100% free under National Health Mission. For trauma and acute emergencies, <strong>108 Ambulance</strong> is assigned immediately.
            </p>
          </div>

          <div className="bg-white p-5 rounded border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-sm font-bold text-[#123B63] mb-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>3. Guaranteed Bed & Doctor on Duty</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              You will never be sent to a hospital where the machine is broken or the doctor is away. KAVACH CARE only routes referrals to facilities with verified active bed and specialist capacity.
            </p>
          </div>

          <div className="bg-white p-5 rounded border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-sm font-bold text-[#123B63] mb-2">
              <CheckCircle2 className="w-4 h-4 text-health-green" />
              <span>4. Frontline ASHA Home Visit After Discharge</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              When you return to your village after hospital treatment, your local ASHA worker receives a digital copy of your recovery instructions and visits your house to verify healing and medicines.
            </p>
          </div>
        </div>

        {/* Emergency Contacts Banner */}
        <div className="bg-[#123B63] text-white p-6 rounded shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold">Need Immediate Help or Medical Advice?</h3>
            <p className="text-xs text-slate-300 mt-1">
              National Health Helpline (104) is free and available 24 hours a day in all regional languages.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/track"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-xs"
            >
              Track Active Referral
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
