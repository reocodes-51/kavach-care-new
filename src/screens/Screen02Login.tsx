import React, { useState } from 'react';
import { Shield, User, HeartHandshake, Stethoscope, Building, Activity, Lock, Phone } from 'lucide-react';

interface Screen02LoginProps {
  onNavigate: (screenNumber: number) => void;
}

export const Screen02Login: React.FC<Screen02LoginProps> = ({ onNavigate }) => {
  const [identifier, setIdentifier] = useState('sunita.asha@kavach.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<'patient' | 'asha' | 'doctor' | 'facility' | 'admin'>('asha');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'asha') onNavigate(3);
    else if (selectedRole === 'doctor') onNavigate(13);
    else if (selectedRole === 'facility') onNavigate(14);
    else if (selectedRole === 'admin') onNavigate(15);
    else onNavigate(9);
  };

  const handleRoleQuickLogin = (role: 'patient' | 'asha' | 'doctor' | 'facility' | 'admin', targetScreen: number) => {
    setSelectedRole(role);
    onNavigate(targetScreen);
  };

  return (
    <div className="min-h-[85vh] bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
      {/* Container Card */}
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-[#0F5B4E] flex items-center justify-center text-white shadow-sm border border-emerald-600 mb-2">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold text-[#0F5B4E] tracking-tight">KAVACH CARE</h2>
          <span className="text-xs text-slate-500 font-medium">Care Beyond Distance</span>
        </div>

        {/* Title */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-900">Welcome Back</h3>
          <p className="text-xs text-slate-500 mt-0.5">Login to continue your journey</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Mobile / Email</label>
            <div className="relative">
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter 10-digit mobile or email"
                className="w-full pl-8 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F5B4E] focus:outline-none bg-slate-50"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-8 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F5B4E] focus:outline-none bg-slate-50"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-[#0F5B4E] focus:ring-[#0F5B4E]" />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="text-[#0F5B4E] font-semibold hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#0F5B4E] hover:bg-[#0b3d34] text-white font-bold rounded-lg shadow-sm transition-all"
          >
            Login
          </button>
        </form>

        {/* or Login as Role Selector */}
        <div className="pt-2 border-t border-slate-100">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block text-center mb-3">
            or Login as
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-xs">
            {/* Patient */}
            <button
              type="button"
              onClick={() => handleRoleQuickLogin('patient', 9)}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all flex flex-col items-center"
            >
              <User className="w-4 h-4 text-[#0F5B4E] mb-1" />
              <span className="font-bold text-slate-900 text-[11px]">Patient</span>
              <span className="text-[9px] text-slate-500">For your health</span>
            </button>

            {/* ASHA Worker - Highlighted */}
            <button
              type="button"
              onClick={() => handleRoleQuickLogin('asha', 3)}
              className="p-2.5 rounded-xl border-2 border-rose-400 bg-rose-50/50 hover:bg-rose-50 transition-all flex flex-col items-center shadow-xs"
            >
              <HeartHandshake className="w-4 h-4 text-rose-600 mb-1" />
              <span className="font-bold text-rose-900 text-[11px]">ASHA Worker</span>
              <span className="text-[9px] text-rose-700 font-medium">For community</span>
            </button>

            {/* Doctor */}
            <button
              type="button"
              onClick={() => handleRoleQuickLogin('doctor', 13)}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all flex flex-col items-center"
            >
              <Stethoscope className="w-4 h-4 text-blue-700 mb-1" />
              <span className="font-bold text-slate-900 text-[11px]">Doctor</span>
              <span className="text-[9px] text-slate-500">For better care</span>
            </button>

            {/* Facility Staff */}
            <button
              type="button"
              onClick={() => handleRoleQuickLogin('facility', 14)}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all flex flex-col items-center"
            >
              <Building className="w-4 h-4 text-indigo-700 mb-1" />
              <span className="font-bold text-slate-900 text-[11px]">Facility Staff</span>
              <span className="text-[9px] text-slate-500">For operations</span>
            </button>

            {/* District Admin */}
            <button
              type="button"
              onClick={() => handleRoleQuickLogin('admin', 15)}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all flex flex-col items-center col-span-2 sm:col-span-1"
            >
              <Activity className="w-4 h-4 text-emerald-700 mb-1" />
              <span className="font-bold text-slate-900 text-[11px]">District Admin</span>
              <span className="text-[9px] text-slate-500">For oversight</span>
            </button>
          </div>
        </div>

        {/* Footer Motto */}
        <div className="text-center pt-2 text-[10px] text-slate-400 font-medium border-t border-slate-100">
          Together for a healthier, stronger India
        </div>
      </div>
    </div>
  );
};
