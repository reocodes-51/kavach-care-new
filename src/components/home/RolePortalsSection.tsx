import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  User,
  HeartHandshake,
  Stethoscope,
  Building,
  Activity,
  Phone,
  QrCode,
  Bus
} from 'lucide-react';

export const RolePortalsSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<'patient' | 'asha' | 'doctor' | 'hospital' | 'cmo'>('patient');

  return (
    <section id="role-dashboards" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-[#123B63] border border-blue-200 text-xs font-bold mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Stakeholder Portals & Workspaces</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#123B63] tracking-tight">
            {t('portalTitle')}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {t('portalSub')}
          </p>
        </div>

        {/* Role Tab Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-slate-300 pb-3">
          <button
            onClick={() => setSelectedRole('patient')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded text-xs font-bold transition-all ${
              selectedRole === 'patient'
                ? 'bg-[#123B63] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t('rolePatient')}</span>
          </button>

          <button
            onClick={() => setSelectedRole('asha')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded text-xs font-bold transition-all ${
              selectedRole === 'asha'
                ? 'bg-[#123B63] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <span>{t('roleAsha')}</span>
          </button>

          <button
            onClick={() => setSelectedRole('doctor')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded text-xs font-bold transition-all ${
              selectedRole === 'doctor'
                ? 'bg-[#123B63] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-blue-600" />
            <span>{t('roleDoctor')}</span>
          </button>

          <button
            onClick={() => setSelectedRole('hospital')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded text-xs font-bold transition-all ${
              selectedRole === 'hospital'
                ? 'bg-[#123B63] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Building className="w-4 h-4 text-indigo-600" />
            <span>{t('roleHospital')}</span>
          </button>

          <button
            onClick={() => setSelectedRole('cmo')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded text-xs font-bold transition-all ${
              selectedRole === 'cmo'
                ? 'bg-[#123B63] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-4 h-4 text-red-600" />
            <span>{t('roleCmo')}</span>
          </button>
        </div>

        {/* Active Role Dashboard Preview Display */}
        <div className="mt-6 bg-white border border-slate-300 rounded shadow-sm overflow-hidden">
          {/* Top simulated browser/app chrome */}
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="font-mono text-[11px] text-slate-500 ml-2">
                kavach.gov.in/portal/{selectedRole}
              </span>
            </div>
            <span className="font-semibold text-[#123B63] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Interactive Role Simulator
            </span>
          </div>

          <div className="p-6">
            {/* 1. Patient Portal View */}
            {selectedRole === 'patient' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-blue-50/70 p-4 rounded border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#123B63] text-white rounded flex items-center justify-center font-bold text-base">
                      SM
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Sunita Devendra Madavi</h3>
                      <p className="text-xs text-slate-600">
                        ABHA: <strong className="font-mono text-[#123B63]">91-4234-8791-0023</strong> • Village Ghot, Chamorshi
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-xs font-bold">
                      Active Referral Confirmed
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                  {/* Digital Pass / Token */}
                  <div className="bg-slate-50 p-4 rounded border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                        My OPD Priority Pass
                      </span>
                      <QrCode className="w-4 h-4 text-[#123B63]" />
                    </div>
                    <div className="p-3 bg-white rounded border border-slate-200 text-center">
                      <div className="text-[10px] text-slate-500">Destination OPD Token</div>
                      <div className="text-2xl font-bold font-mono text-[#123B63] my-1">
                        CHC-OBG-04
                      </div>
                      <div className="text-[11px] font-semibold text-slate-800">
                        CHC Chamorshi • Room 12
                      </div>
                      <div className="text-[10px] text-emerald-700 font-medium mt-1">
                        ✓ Bed Reserved (HDU #04)
                      </div>
                    </div>
                  </div>

                  {/* Travel & Transport Guide */}
                  <div className="bg-slate-50 p-4 rounded border border-slate-200">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-2">
                      Transport & Route Guide
                    </span>
                    <div className="space-y-2 text-slate-700">
                      <div className="flex items-start gap-2">
                        <Bus className="w-4 h-4 text-[#123B63] mt-0.5" />
                        <div>
                          <span className="font-bold">Janani Express (102):</span> MH-33-T-4029
                          <div className="text-[11px] text-slate-500">Pilot: Shrikant (Mob: 94231 00011)</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 text-emerald-700 mt-0.5" />
                        <div>
                          <span className="font-bold">Village ASHA:</span> Laxmi bai Atram
                          <div className="text-[11px] text-slate-500">Accompanying to CHC facility</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Multilingual SMS Log */}
                  <div className="bg-slate-50 p-4 rounded border border-slate-200">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-2">
                      SMS Updates (मराठी)
                    </span>
                    <div className="p-2.5 bg-white rounded border border-slate-200 text-[11px] text-slate-700 leading-relaxed font-sans">
                      "नमस्कार सुनिता, आपला रेफरल टोकन CHC-OBG-04 आहे. सीएचसी चामोर्शी येथे प्रसूती कक्षात डॉक्टर हजर आहेत. १०२ रुग्णवाहिका निघाली आहे."
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. ASHA / ANM Frontline View */}
            {selectedRole === 'asha' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50 p-4 rounded border border-emerald-200 text-xs">
                  <div>
                    <h3 className="text-sm font-bold text-emerald-950">
                      ASHA Laxmi bai Atram (ID #3204)
                    </h3>
                    <p className="text-emerald-800">
                      Sub-Centre Ghot • Population: 1,420 • Chamorshi Block
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-white rounded border border-emerald-300 font-bold text-emerald-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Offline Mode: Sync Ready (2 records)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  {/* High Risk Cases */}
                  <div className="bg-slate-50 p-4 rounded border border-slate-200">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-2">
                      Active Flagged High-Risk Cases
                    </span>
                    <div className="space-y-2">
                      <div className="p-2.5 bg-white rounded border border-red-300 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-red-900">Sunita Madavi (26y)</div>
                          <div className="text-[11px] text-slate-600">Severe Pre-eclampsia (BP 168/104)</div>
                        </div>
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded font-bold text-[10px]">
                          AT CHC
                        </span>
                      </div>
                      <div className="p-2.5 bg-white rounded border border-amber-300 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-amber-900">Baby of Rekha (8mo)</div>
                          <div className="text-[11px] text-slate-600">SAM (Severe Acute Malnutrition)</div>
                        </div>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold text-[10px]">
                          NRC REFERRED
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Post-Discharge Follow-up Tasks */}
                  <div className="bg-slate-50 p-4 rounded border border-slate-200">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-2">
                      Post-Discharge Home Visit Queue
                    </span>
                    <div className="space-y-2">
                      <div className="p-2.5 bg-white rounded border border-slate-200">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">Aarav Valvi (3y)</span>
                          <span className="text-[10px] text-emerald-700 font-bold">✓ Visit Completed</span>
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1">
                          Post-pneumonia recovery: RR 34/min, feeding well. Verified in system.
                        </div>
                      </div>
                      <div className="p-2.5 bg-white rounded border border-slate-200 opacity-75">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">Bhikaji Shinde (64y)</span>
                          <span className="text-[10px] text-orange-700 font-bold">Due 28 Sep</span>
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1">
                          Post-op diabetic foot wound dressing check scheduled.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Doctor / CHO View */}
            {selectedRole === 'doctor' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-blue-50 p-4 rounded border border-blue-200 text-xs">
                  <div>
                    <h3 className="text-sm font-bold text-blue-950">
                      Dr. Pallavi Meshram (MD Ob/Gyn)
                    </h3>
                    <p className="text-blue-800">
                      Community Health Centre (CHC) Chamorshi • Maternity HDU Unit
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-white rounded border border-blue-300 font-bold text-[#123B63]">
                      Duty: Active (24x7 FRU)
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded border border-slate-200 text-xs">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">
                    Incoming Pre-Triage Queue (Pre-Arrival Alerts)
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-300 text-slate-600 pb-1">
                          <th className="pb-2">Token</th>
                          <th className="pb-2">Patient</th>
                          <th className="pb-2">Diagnosis / Vitals</th>
                          <th className="pb-2">Origin Sub-Centre</th>
                          <th className="pb-2">Transport</th>
                          <th className="pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-800">
                        <tr>
                          <td className="py-2.5 font-mono font-bold text-[#123B63]">CHC-OBG-04</td>
                          <td className="py-2.5 font-bold">Sunita Madavi (26y)</td>
                          <td className="py-2.5 text-red-700 font-semibold">Pre-eclampsia (BP 168/104)</td>
                          <td className="py-2.5">Sub-Centre Ghot</td>
                          <td className="py-2.5">102 Janani</td>
                          <td className="py-2.5"><span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded">IN BED #04</span></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-mono font-bold text-[#123B63]">CHC-PED-12</td>
                          <td className="py-2.5 font-bold">Aarav Valvi (3y)</td>
                          <td className="py-2.5 text-slate-600">Severe Pneumonia (Resolved)</td>
                          <td className="py-2.5">Sub-Centre Bilgaon</td>
                          <td className="py-2.5">108 Ambulance</td>
                          <td className="py-2.5"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">DISCHARGED</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Hospital Bed / Registry View */}
            {selectedRole === 'hospital' && (
              <div className="space-y-6 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-indigo-50 p-4 rounded border border-indigo-200">
                  <div>
                    <h3 className="text-sm font-bold text-indigo-950">
                      Community Health Centre (CHC / FRU) Chamorshi
                    </h3>
                    <p className="text-indigo-800">
                      First Referral Unit (FRU) • Total 30 Inpatient Beds • Operational OT & USG
                    </p>
                  </div>
                  <span className="font-bold text-indigo-900 bg-white px-3 py-1 rounded border border-indigo-300">
                    Live Bed Registry
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded text-center">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Maternity HDU</div>
                    <div className="text-xl font-bold text-slate-900 mt-1">6 / 8 Occupied</div>
                    <span className="text-emerald-700 font-semibold text-[10px]">2 Beds Vacant</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded text-center">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">General Ward</div>
                    <div className="text-xl font-bold text-slate-900 mt-1">12 / 16 Occupied</div>
                    <span className="text-emerald-700 font-semibold text-[10px]">4 Beds Vacant</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded text-center">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Pediatric Ward</div>
                    <div className="text-xl font-bold text-slate-900 mt-1">4 / 6 Occupied</div>
                    <span className="text-emerald-700 font-semibold text-[10px]">2 Beds Vacant</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded text-center">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Ultrasound (USG)</div>
                    <div className="text-base font-bold text-emerald-700 mt-2">Operational</div>
                    <span className="text-[10px] text-slate-500">Dr. Meshram on Duty</span>
                  </div>
                </div>
              </div>
            )}

            {/* 5. District CMO View */}
            {selectedRole === 'cmo' && (
              <div className="space-y-6 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-100 p-4 rounded border border-slate-300">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Chief Medical Officer (CMO) Command Console
                    </h3>
                    <p className="text-slate-600">
                      District Health Society Gadchiroli • Tele-Governance Matrix
                    </p>
                  </div>
                  <span className="font-bold text-[#123B63] bg-white px-3 py-1 rounded border border-slate-300">
                    District Integrity: 99.1%
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3.5 bg-slate-50 rounded border border-slate-200">
                    <div className="text-slate-500 font-bold uppercase text-[10px]">Referral Drop-off Rate</div>
                    <div className="text-2xl font-bold text-emerald-700 mt-1">8.7%</div>
                    <div className="text-slate-600 text-[11px] mt-0.5">Pre-deployment was 61.4%</div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded border border-slate-200">
                    <div className="text-slate-500 font-bold uppercase text-[10px]">Average 108 Dispatch Time</div>
                    <div className="text-2xl font-bold text-[#123B63] mt-1">18 Mins</div>
                    <div className="text-slate-600 text-[11px] mt-0.5">GPS route optimization active</div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded border border-slate-200">
                    <div className="text-slate-500 font-bold uppercase text-[10px]">ASHA Follow-up Audit</div>
                    <div className="text-2xl font-bold text-slate-900 mt-1">94.2%</div>
                    <div className="text-slate-600 text-[11px] mt-0.5">Visits completed within 72h</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
