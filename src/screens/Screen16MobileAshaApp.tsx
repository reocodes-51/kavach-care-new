import React, { useState } from 'react';
import {
  Home,
  Users,
  Stethoscope,
  MoreHorizontal,
  UserPlus,
  Shield,
  Wifi,
  Battery,
  Signal
} from 'lucide-react';

interface Screen16MobileAshaAppProps {
  onNavigate: (screenNumber: number) => void;
}

export const Screen16MobileAshaApp: React.FC<Screen16MobileAshaAppProps> = ({ onNavigate }) => {
  const [activeBottomNav, setActiveBottomNav] = useState('Home');

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8 flex items-center justify-center">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 max-w-4xl w-full">
        {/* Smartphone Bezel Mockup */}
        <div className="w-[320px] sm:w-[350px] h-[680px] bg-slate-900 rounded-[44px] p-3.5 shadow-2xl border-4 border-slate-700 relative flex flex-col justify-between overflow-hidden">
          {/* Top Speaker & Camera Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-full z-30 flex items-center justify-center">
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mb-1" />
          </div>

          {/* Inner Phone Screen */}
          <div className="w-full h-full bg-[#F8FAFC] rounded-[34px] overflow-hidden flex flex-col justify-between relative text-slate-800">
            {/* Phone Status Bar */}
            <div className="bg-white px-5 pt-3 pb-1 flex items-center justify-between text-[11px] font-bold text-slate-600 border-b border-slate-100">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Mobile App Header */}
            <div className="bg-white px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#0F5B4E] flex items-center justify-center text-white font-bold text-xs">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-none">KAVACH CARE</div>
                  <div className="text-[9px] text-slate-500">ASHA Mobile</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-800 block">Sunita (ASHA)</span>
                <span className="text-[9px] text-slate-500">Rampur</span>
              </div>
            </div>

            {/* Scrollable App Body */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 text-xs">
              {/* Greeting */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Good morning, Sunita!</h3>
                  <span className="text-[10px] text-slate-500">Offline Sync Active</span>
                </div>
              </div>

              {/* Quick Action Pills */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onNavigate(9)}
                  className="p-2 bg-[#0F5B4E] text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 shadow-xs"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Register Patient</span>
                </button>
                <button
                  onClick={() => onNavigate(4)}
                  className="p-2 bg-emerald-600 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 shadow-xs"
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Start Triage</span>
                </button>
              </div>

              {/* Mini Stat Cards */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <div className="font-black text-slate-900 text-base">48</div>
                  <div className="text-[9px] text-slate-500">Total</div>
                </div>
                <div className="bg-white p-2 rounded-xl border border-amber-200">
                  <div className="font-black text-amber-600 text-base">6</div>
                  <div className="text-[9px] text-slate-500">Pending</div>
                </div>
                <div className="bg-white p-2 rounded-xl border border-red-200">
                  <div className="font-black text-red-600 text-base">3</div>
                  <div className="text-[9px] text-slate-500">High Risk</div>
                </div>
              </div>

              {/* Today's Tasks in Mobile */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                  <span>Today's Tasks</span>
                  <span className="text-emerald-700 text-[10px]">4 tasks</span>
                </div>

                <div
                  onClick={() => onNavigate(12)}
                  className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-[11px]">High-risk pregnancy</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-800">
                      Due today
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500">Sita Sharma • BP Check</div>
                </div>

                <div
                  onClick={() => onNavigate(12)}
                  className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-[11px]">Child immunization</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                      Due today
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500">Rahul • Polio Dose 3</div>
                </div>

                <div
                  onClick={() => onNavigate(6)}
                  className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-[11px]">Desired Follow-up</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                      Pending
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500">Post-Discharge Recovery</div>
                </div>
              </div>
            </div>

            {/* Mobile Bottom App Navigation Bar */}
            <div className="bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-around text-[10px] font-semibold text-slate-500">
              <button
                onClick={() => setActiveBottomNav('Home')}
                className={`flex flex-col items-center ${activeBottomNav === 'Home' ? 'text-[#0F5B4E] font-bold' : ''}`}
              >
                <Home className="w-4 h-4 mb-0.5" />
                <span>Home</span>
              </button>
              <button
                onClick={() => { setActiveBottomNav('Patients'); onNavigate(9); }}
                className={`flex flex-col items-center ${activeBottomNav === 'Patients' ? 'text-[#0F5B4E] font-bold' : ''}`}
              >
                <Users className="w-4 h-4 mb-0.5" />
                <span>Patients</span>
              </button>
              <button
                onClick={() => { setActiveBottomNav('Triage'); onNavigate(4); }}
                className={`flex flex-col items-center ${activeBottomNav === 'Triage' ? 'text-[#0F5B4E] font-bold' : ''}`}
              >
                <Stethoscope className="w-4 h-4 mb-0.5" />
                <span>Triage</span>
              </button>
              <button
                onClick={() => { setActiveBottomNav('More'); onNavigate(12); }}
                className={`flex flex-col items-center ${activeBottomNav === 'More' ? 'text-[#0F5B4E] font-bold' : ''}`}
              >
                <MoreHorizontal className="w-4 h-4 mb-0.5" />
                <span>More</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Branding from Reference Image */}
        <div className="text-center lg:text-left space-y-4 max-w-sm">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-[#0F5B4E] font-bold text-xs">
            Screen 16 • Mobile Experience
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            Rural Health <br />
            <span className="text-[#0F5B4E]">Stronger India</span>
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Frontline ASHA & ANM workers carry KAVACH CARE into the most remote tribal hamlets with complete offline functionality, instant risk tagging, and closed-loop follow-up verification.
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={() => onNavigate(3)}
              className="px-4 py-2 bg-[#0F5B4E] hover:bg-[#0b3d34] text-white text-xs font-bold rounded-lg transition-colors"
            >
              Open Desktop ASHA View
            </button>
            <button
              onClick={() => onNavigate(1)}
              className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50"
            >
              Back to Landing Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
