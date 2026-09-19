import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Calendar,
  Building,
  Bell,
  RotateCcw
} from 'lucide-react';

interface Screen07AppointmentQueueProps {
  onNavigate: (screenNumber: number) => void;
}

export const Screen07AppointmentQueue: React.FC<Screen07AppointmentQueueProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        {/* Top Back & Status */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate(6)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#0F5B4E]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Confirmed</span>
          </span>
        </div>

        {/* Header Title */}
        <div>
          <h2 className="text-xl font-bold text-slate-900">Your Appointment</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Token reserved at Community Health Centre
          </p>
        </div>

        {/* Facility Info Card */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0F5B4E] text-white flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">CHC Rampur</h3>
              <p className="text-slate-500 text-[11px]">General Medicine • Room 04</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate(5)}
            className="text-xs font-bold text-[#0F5B4E] hover:underline flex items-center gap-1"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>View on Map</span>
          </button>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-2.5 text-xs text-slate-700 bg-emerald-50/50 p-3 rounded-xl border border-emerald-200 font-semibold">
          <Calendar className="w-4 h-4 text-emerald-700" />
          <span>24 September 2024, 10:30 AM</span>
        </div>

        {/* Token Callout Box matching Screen 7 */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50/50 to-white border-2 border-emerald-200 text-center space-y-3 shadow-inner">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Your Token
          </span>

          <div className="text-5xl font-black font-mono text-[#0F5B4E] tracking-tight">
            A-103
          </div>

          <div className="pt-3 border-t border-emerald-100 flex items-center justify-around text-xs">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-medium block">
                Currently Serving
              </span>
              <span className="font-mono font-bold text-slate-800 text-sm">
                A-098
              </span>
            </div>
            <div className="h-6 w-px bg-emerald-200" />
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-medium block">
                Estimated Wait Time
              </span>
              <span className="font-bold text-[#0F5B4E] text-sm">
                18 minutes
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <button
            onClick={() => onNavigate(5)}
            className="py-2.5 bg-[#0F5B4E] hover:bg-[#0b3d34] text-white font-bold rounded-lg shadow-sm transition-colors text-center"
          >
            View Facility
          </button>
          <button
            onClick={() => alert('Appointment reschedule request forwarded to CHC desk.')}
            className="py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold rounded-lg transition-colors text-center flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reschedule</span>
          </button>
        </div>

        {/* Footer Reminder */}
        <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5 pt-1">
          <Bell className="w-3.5 h-3.5 text-emerald-600" />
          <span>You will be notified by SMS when your turn is near.</span>
        </div>
      </div>
    </div>
  );
};
