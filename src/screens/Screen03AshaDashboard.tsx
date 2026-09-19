import React from 'react';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Share2,
  Calendar,
  CalendarCheck,
  FileText,
  HelpCircle,
  Settings,
  UserPlus,
  Video
} from 'lucide-react';

interface Screen03AshaDashboardProps {
  onNavigate: (screenNumber: number) => void;
}

export const Screen03AshaDashboard: React.FC<Screen03AshaDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <aside className="w-full md:w-56 bg-[#0B3D34] text-slate-200 flex flex-col justify-between p-4 flex-shrink-0">
        <div>
          {/* Brand header */}
          <div className="flex items-center gap-2.5 mb-6 px-2 cursor-pointer" onClick={() => onNavigate(1)}>
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
              K
            </div>
            <div>
              <div className="font-bold text-white text-sm leading-tight">KAVACH CARE</div>
              <div className="text-[10px] text-emerald-300">ASHA Console</div>
            </div>
          </div>

          {/* Nav items */}
          <nav className="space-y-1 text-xs font-medium">
            <button
              onClick={() => onNavigate(3)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/10 text-white font-bold text-left"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => onNavigate(9)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white text-left"
            >
              <Users className="w-4 h-4 text-slate-400" />
              <span>Patients</span>
            </button>
            <button
              onClick={() => onNavigate(4)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white text-left"
            >
              <Stethoscope className="w-4 h-4 text-slate-400" />
              <span>Triage</span>
            </button>
            <button
              onClick={() => onNavigate(6)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white text-left"
            >
              <Share2 className="w-4 h-4 text-slate-400" />
              <span>Referrals</span>
            </button>
            <button
              onClick={() => onNavigate(7)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white text-left"
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Appointments</span>
            </button>
            <button
              onClick={() => onNavigate(12)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white text-left"
            >
              <CalendarCheck className="w-4 h-4 text-slate-400" />
              <span>Follow-ups</span>
            </button>
            <button
              onClick={() => onNavigate(15)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white text-left"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Reports</span>
            </button>
          </nav>
        </div>

        {/* Bottom utility links */}
        <div className="pt-4 border-t border-white/10 space-y-1 text-xs text-slate-400">
          <button className="w-full flex items-center gap-2 px-3 py-1.5 hover:text-white text-left">
            <HelpCircle className="w-4 h-4" />
            <span>Help & Guides</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-1.5 hover:text-white text-left">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top bar with offline indicator & profile */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-900 px-3 py-1 rounded-full border border-emerald-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Offline - Changes will sync automatically</span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right">
              <span className="font-bold text-slate-900 block">Sunita (ASHA)</span>
              <span className="text-[11px] text-slate-500">Village - Rampur</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-800 font-bold flex items-center justify-center border border-rose-300">
              S
            </div>
          </div>
        </div>

        {/* Greeting Banner */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Good morning, Sunita! 👋
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Here's your community health overview for Rampur village.
          </p>
        </div>

        {/* 4 Stat Cards matching Screen 3 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">48</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Total Patients</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-amber-600">6</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Pending Triage</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-red-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-red-600">3</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">High Risk</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-emerald-700">8</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Follow-ups Due</div>
          </div>
        </div>

        {/* Two Columns: Today's Tasks + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Today's Tasks */}
          <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Today's Tasks</h3>
              <button onClick={() => onNavigate(12)} className="text-xs text-[#0F5B4E] font-semibold hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Task 1 */}
              <div
                onClick={() => onNavigate(12)}
                className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900">High-risk pregnancy follow-up</div>
                    <div className="text-[11px] text-slate-500">Patient #KVC-1024 • Sita Sharma</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-red-100 text-red-800 text-[10px] font-bold">
                  High Priority
                </span>
              </div>

              {/* Task 2 */}
              <div
                onClick={() => onNavigate(12)}
                className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900">Child immunization due</div>
                    <div className="text-[11px] text-slate-500">Patient #KVC-1031 • Rahul</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                  Due Today
                </span>
              </div>

              {/* Task 3 */}
              <div
                onClick={() => onNavigate(6)}
                className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900">Referral follow-up</div>
                    <div className="text-[11px] text-slate-500">Patient #KVC-1027 • Bhikaji</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                  Pending
                </span>
              </div>

              {/* Task 4 */}
              <div
                onClick={() => onNavigate(9)}
                className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900">New patient registration</div>
                    <div className="text-[11px] text-slate-500">Village - Rampur • Anusuya Atram</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Complete
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Actions */}
          <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Quick Actions
            </h3>

            <div className="space-y-2.5 text-xs">
              <button
                onClick={() => onNavigate(9)}
                className="w-full py-2.5 px-3 bg-[#0F5B4E] hover:bg-[#0b3d34] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Register Patient</span>
              </button>

              <button
                onClick={() => onNavigate(4)}
                className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Start Triage</span>
              </button>

              <button
                onClick={() => onNavigate(6)}
                className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                <Share2 className="w-4 h-4 text-emerald-700" />
                <span>Create Referral</span>
              </button>

              <button
                onClick={() => onNavigate(8)}
                className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                <Video className="w-4 h-4 text-blue-600" />
                <span>Teleconsultation</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
