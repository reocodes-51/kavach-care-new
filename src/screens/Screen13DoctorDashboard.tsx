import React from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Share2,
  Video,
  FileText
} from 'lucide-react';

interface Screen13DoctorDashboardProps {
  onNavigate: (screenNumber: number) => void;
}

export const Screen13DoctorDashboard: React.FC<Screen13DoctorDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <aside className="w-full md:w-56 bg-[#0B3D34] text-slate-200 flex flex-col justify-between p-4 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2.5 mb-6 px-2 cursor-pointer" onClick={() => onNavigate(1)}>
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
              K
            </div>
            <div>
              <div className="font-bold text-white text-sm">KAVACH CARE</div>
              <div className="text-[10px] text-emerald-300">Doctor Console</div>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-medium">
            <button
              onClick={() => onNavigate(13)}
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
              onClick={() => onNavigate(7)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white text-left"
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Appointments</span>
            </button>
            <button
              onClick={() => onNavigate(6)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white text-left"
            >
              <Share2 className="w-4 h-4 text-slate-400" />
              <span>Referrals</span>
            </button>
            <button
              onClick={() => onNavigate(8)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white text-left"
            >
              <Video className="w-4 h-4 text-slate-400" />
              <span>Teleconsults</span>
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

        <div className="pt-4 border-t border-white/10 text-xs text-slate-400">
          <span className="block font-semibold text-white">OPD Room #04</span>
          <span className="text-[10px]">CHC Rampur • General Medicine</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Doctor Header Banner */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Good morning, Dr. Sharma!</h2>
            <p className="text-xs text-slate-500">General Medicine • CHC Rampur</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200">
              Active Duty (OPD)
            </span>
          </div>
        </div>

        {/* 4 Stats Cards matching Screen 13 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">24</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Patients Today</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-blue-600">5</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Referrals</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">3</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Teleconsults</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-slate-700">4</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Reports</div>
          </div>
        </div>

        {/* Two Columns: Appointments Table + Pending Referrals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Today's Appointments Table */}
          <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-sm">Today's Appointments</h3>
              <span className="text-[11px] text-slate-400 font-medium">Auto-synced token queue</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 pb-2">
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Patient</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 font-mono text-slate-500">10:00</td>
                    <td className="py-2.5 font-bold">Patient A (Ramesh)</td>
                    <td className="py-2.5">General Medicine</td>
                    <td className="py-2.5"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">Completed</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 font-mono text-slate-500">10:18</td>
                    <td className="py-2.5 font-bold">Patient B (Sita Sharma)</td>
                    <td className="py-2.5">Follow-up</td>
                    <td className="py-2.5"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded text-[10px]">Waiting</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 font-mono text-slate-500">10:30</td>
                    <td className="py-2.5 font-bold">Patient C (Ganesh K.)</td>
                    <td className="py-2.5">Referral Transfer</td>
                    <td className="py-2.5"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded text-[10px]">Waiting</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Referrals List */}
          <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-sm">Pending Referrals</h3>
              <button onClick={() => onNavigate(6)} className="text-[11px] font-bold text-[#0F5B4E] hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-2">
              <div
                onClick={() => onNavigate(6)}
                className="p-2.5 rounded-lg border border-red-200 bg-red-50/40 flex items-center justify-between cursor-pointer hover:bg-red-50"
              >
                <div>
                  <span className="font-mono font-bold text-slate-900">#KVC-1021</span>
                  <div className="text-[11px] text-slate-500">High-Risk Pregnancy</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px]">
                  Urgent
                </span>
              </div>

              <div
                onClick={() => onNavigate(6)}
                className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/40 flex items-center justify-between cursor-pointer hover:bg-emerald-50"
              >
                <div>
                  <span className="font-mono font-bold text-slate-900">#KVC-1024</span>
                  <div className="text-[11px] text-slate-500">Sita Sharma • Fever</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px]">
                  Routine
                </span>
              </div>

              <div
                onClick={() => onNavigate(6)}
                className="p-2.5 rounded-lg border border-red-200 bg-red-50/40 flex items-center justify-between cursor-pointer hover:bg-red-50"
              >
                <div>
                  <span className="font-mono font-bold text-slate-900">#KVC-1028</span>
                  <div className="text-[11px] text-slate-500">Compound Fracture</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px]">
                  Urgent
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
