import React from 'react';
import type { ReferralRecord } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { X, Printer, ShieldCheck, QrCode, Phone } from 'lucide-react';
import { UrgencyBadge } from '../common/Badge';

interface ReferralSlipModalProps {
  referral: ReferralRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReferralSlipModal: React.FC<ReferralSlipModalProps> = ({ referral, isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen || !referral) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-md max-w-3xl w-full shadow-2xl border border-slate-300 overflow-hidden my-6">
        {/* Modal Top Control Bar (Non-printed) */}
        <div className="bg-[#123B63] text-white px-5 py-3 flex items-center justify-between no-print border-b border-[#0b243d]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">
              Official Bilingual Referral Slip • National Health Mission
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-xs font-semibold shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t('printSlip')}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Container */}
        <div className="printable-referral-slip p-6 sm:p-8 bg-white text-slate-900 font-sans text-xs">
          {/* Official Document Header */}
          <div className="border-b-2 border-[#123B63] pb-4 mb-4">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Emblem text */}
              <div>
                <div className="text-[10px] font-bold tracking-widest text-[#123B63] uppercase">
                  Government of India • Ministry of Health & Family Welfare
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#123B63] leading-tight">
                  NATIONAL RURAL HEALTH MISSION • KAVACH CARE
                </h2>
                <div className="text-[11px] font-semibold text-slate-700">
                  अंतर-अस्पताल क्लोज्ड-लूप रेफरल पर्ची | Inter-Facility Closed-Loop Referral Slip
                </div>
              </div>

              {/* Right: Barcode & Token */}
              <div className="text-right border-l pl-4 border-slate-300">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Referral Token ID</div>
                <div className="text-sm font-mono font-black text-[#123B63] bg-slate-100 px-2 py-0.5 rounded border border-slate-300 inline-block">
                  {referral.id}
                </div>
                <div className="text-[10px] text-slate-600 mt-0.5">Date: {referral.appointmentDate}</div>
              </div>
            </div>

            {/* Urgency Notification Banner */}
            <div className="mt-3 flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[11px] text-slate-700">Clinical Triage Priority:</span>
                <UrgencyBadge urgency={referral.urgency} />
              </div>
              <div className="text-[11px] font-bold text-[#123B63]">
                OPD Priority Token: <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">{referral.tokenNumber}</span>
              </div>
            </div>
          </div>

          {/* Section 1: Patient Identity & ABHA */}
          <div className="mb-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#123B63] bg-slate-100 px-2.5 py-1 rounded mb-2 border border-slate-200">
              1. Patient Demographics & Ayushman Bharat Health Account (ABHA)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 border border-slate-200 rounded">
              <div>
                <div className="text-[10px] text-slate-500 font-medium">Patient Full Name</div>
                <div className="font-bold text-slate-900 text-sm">{referral.patientName}</div>
                {referral.patientNameHi && (
                  <div className="text-xs text-slate-600 font-medium">{referral.patientNameHi}</div>
                )}
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-medium">ABHA ID (14-Digit)</div>
                <div className="font-mono font-bold text-[#123B63]">{referral.abhaId}</div>
                <div className="text-[10px] text-emerald-700 font-semibold">✓ ABDM Verified</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-medium">Age / Gender</div>
                <div className="font-semibold text-slate-900">{referral.age} Yrs / {referral.gender}</div>
                <div className="text-[10px] text-slate-500">{referral.guardianName || 'Self'}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-medium">Location & Hamlet</div>
                <div className="font-semibold text-slate-900">{referral.village}</div>
                <div className="text-[10px] text-slate-600">{referral.block}, {referral.district}</div>
              </div>
            </div>
          </div>

          {/* Section 2: Clinical Vitals & Triage Summary */}
          <div className="mb-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#123B63] bg-slate-100 px-2.5 py-1 rounded mb-2 border border-slate-200">
              2. Frontline Clinical Triage & Recorded Vitals (ICMR STG Guideline)
            </h3>
            <div className="bg-white p-3 border border-slate-200 rounded space-y-2.5">
              {/* Vitals row */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
                <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                  <div className="text-[10px] text-slate-500">BP (mmHg)</div>
                  <div className={`font-bold text-xs ${referral.vitals.bloodPressure?.startsWith('16') ? 'text-red-700' : 'text-slate-900'}`}>
                    {referral.vitals.bloodPressure || 'N/A'}
                  </div>
                </div>
                <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                  <div className="text-[10px] text-slate-500">Pulse (bpm)</div>
                  <div className="font-bold text-xs text-slate-900">{referral.vitals.pulse || 'N/A'}</div>
                </div>
                <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                  <div className="text-[10px] text-slate-500">SpO2 (%)</div>
                  <div className={`font-bold text-xs ${(referral.vitals.spO2 || 100) < 94 ? 'text-red-700' : 'text-slate-900'}`}>
                    {referral.vitals.spO2 ? `${referral.vitals.spO2}%` : 'N/A'}
                  </div>
                </div>
                <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                  <div className="text-[10px] text-slate-500">Temp (°F)</div>
                  <div className="font-bold text-xs text-slate-900">{referral.vitals.temperature || '98.6'}°F</div>
                </div>
                <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                  <div className="text-[10px] text-slate-500">Resp Rate</div>
                  <div className="font-bold text-xs text-slate-900">{referral.vitals.respiratoryRate ? `${referral.vitals.respiratoryRate}/min` : 'N/A'}</div>
                </div>
                <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                  <div className="text-[10px] text-slate-500">Blood Sugar</div>
                  <div className="font-bold text-xs text-slate-900">{referral.vitals.bloodSugar ? `${referral.vitals.bloodSugar} mg/dL` : 'N/A'}</div>
                </div>
              </div>

              {/* Symptoms & Diagnosis */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <div className="text-[10px] font-bold text-slate-700 uppercase">Chief Presenting Symptoms:</div>
                  <ul className="list-disc list-inside text-[11px] text-slate-800 mt-0.5 space-y-0.5">
                    {referral.symptoms.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-700 uppercase">Provisional CDSS Diagnosis:</div>
                  <div className="font-semibold text-slate-900 mt-0.5 p-2 bg-amber-50 rounded border border-amber-200 text-[11px]">
                    {referral.provisionalDiagnosis}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-700 border-t border-slate-100 pt-2">
                <span className="font-bold text-slate-800">Clinical Narrative: </span>
                {referral.clinicalSummary}
              </div>
            </div>
          </div>

          {/* Section 3: Facility Referral Destination & Transport */}
          <div className="mb-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#123B63] bg-slate-100 px-2.5 py-1 rounded mb-2 border border-slate-200">
              3. Referral Routing & Facility Logistics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3 border border-slate-200 rounded">
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold text-slate-500 uppercase">From (Referring Unit):</div>
                <div className="font-bold text-slate-900">{referral.referringFacility}</div>
                <div className="text-slate-600">Frontline Worker: {referral.referringAsha}</div>
                <div className="text-slate-600 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{referral.ashaContact}</span>
                </div>
              </div>

              <div className="space-y-1.5 bg-blue-50/50 p-2.5 rounded border border-blue-100">
                <div className="text-[10px] font-bold text-[#123B63] uppercase">To (Destination Facility):</div>
                <div className="font-bold text-[#123B63] text-sm">{referral.targetFacility}</div>
                <div className="text-slate-700 font-medium">Department: {referral.specialtyRequired}</div>
                <div className="text-slate-600 text-[11px]">Assigned Specialist: {referral.targetDoctorName || 'Duty Medical Officer'}</div>
                <div className="text-slate-700 text-[11px] font-semibold flex items-center gap-1 mt-1">
                  <span className="text-emerald-700">Transport:</span> {referral.transportType || 'Self'}
                  {referral.ashaAccompanied && <span className="text-indigo-700 ml-1">(ASHA Accompanied)</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Closed-Loop Verification QR Code & Official Seal */}
          <div className="border-t-2 border-dashed border-slate-300 pt-4 mt-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Visual QR Code box */}
                <div className="w-20 h-20 bg-slate-900 text-white rounded p-1.5 flex flex-col items-center justify-center text-center shadow-inner flex-shrink-0">
                  <QrCode className="w-12 h-12 text-white" />
                  <span className="text-[8px] font-mono mt-0.5 tracking-tighter">SCAN AT OPD</span>
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">
                    ABDM M2 Verification Token
                  </div>
                  <p className="text-[10px] text-slate-600 leading-tight max-w-sm mt-0.5">
                    Present this slip at CHC/DH reception. Scanning this QR loads patient vitals, provisional diagnosis, and reserves inpatient bed automatically without re-queuing.
                  </p>
                  <div className="text-[10px] text-health-green font-bold mt-1">
                    ✓ Closed-Loop Audit: Referring ASHA will be alerted upon discharge.
                  </div>
                </div>
              </div>

              {/* Signature / Stamp box */}
              <div className="text-center border-2 border-slate-300 rounded p-2.5 w-44 bg-slate-50">
                <div className="text-[9px] text-slate-500 uppercase font-bold">Authorized Signatory</div>
                <div className="h-7 border-b border-slate-300 my-1 flex items-center justify-center">
                  <span className="font-mono text-[10px] text-[#123B63] font-bold">DIGITALLY SIGNED</span>
                </div>
                <div className="text-[9px] text-slate-700 font-semibold">CHO / Medical Officer</div>
                <div className="text-[8px] text-slate-500">KAVACH Reg #91-7712</div>
              </div>
            </div>

            {/* Micro footer disclaimer */}
            <div className="text-[9px] text-slate-400 text-center mt-4 border-t border-slate-200 pt-2">
              KAVACH CARE Platform • Aligned with Ministry of Health and Family Welfare (MoHFW) guidelines • SIH Demonstration Prototype
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between no-print">
          <div className="text-xs text-slate-600">
            Status: <span className="font-bold text-[#123B63]">{referral.status}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#123B63] hover:bg-[#0f2e4d] text-white rounded text-xs font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 rounded text-xs font-semibold"
            >
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
