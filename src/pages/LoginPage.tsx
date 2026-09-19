import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Lock, Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, loading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('patient.sita@kavach.gov.in');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);

  const demoAccounts = [
    { label: 'Patient (Sita Sharma)', email: 'patient.sita@kavach.gov.in', role: 'PATIENT', path: '/patient' },
    { label: 'ASHA Worker (Sunita)', email: 'asha.sunita@kavach.gov.in', role: 'FRONTLINE_WORKER', path: '/frontline' },
    { label: 'Medical Officer (Dr. Sharma)', email: 'doctor.sharma@kavach.gov.in', role: 'DOCTOR', path: '/doctor' },
    { label: 'Facility Admin (CHC Rampur)', email: 'admin.chcrampur@kavach.gov.in', role: 'FACILITY', path: '/facility' },
    { label: 'District CMO (Sehore)', email: 'cmo.sehore@kavach.gov.in', role: 'ADMIN', path: '/admin' }
  ];

  const handleQuickFill = (acc: typeof demoAccounts[0]) => {
    setEmail(acc.email);
    setPassword('password123');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await login({ email, password });
      if (res.user) {
        // Redirect to corresponding role dashboard
        switch (res.user.role) {
          case 'FRONTLINE_WORKER':
            navigate('/frontline');
            break;
          case 'DOCTOR':
            navigate('/doctor');
            break;
          case 'FACILITY':
            navigate('/facility');
            break;
          case 'ADMIN':
            navigate('/admin');
            break;
          case 'PATIENT':
          default:
            navigate('/patient');
            break;
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        {/* Header Badge */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#0F5B4E] text-white flex items-center justify-center mx-auto shadow-md">
            <Shield className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {t('loginTitle', 'Sign In to KAVACH CARE')}
          </h2>
          <p className="text-xs text-slate-500">
            {t('loginSubtitle', 'Official National Public Healthcare & Referral Continuity Portal')}
          </p>
        </div>

        {/* Quick Role Fillers */}
        <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl space-y-2 text-xs">
          <div className="font-bold text-emerald-950 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Quick Fill Verified Role Credentials:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                type="button"
                onClick={() => handleQuickFill(acc)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold border transition-colors ${
                  email === acc.email
                    ? 'bg-[#0F5B4E] text-white border-[#0F5B4E]'
                    : 'bg-white text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                }`}
              >
                {acc.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                {t('email', 'Email Address')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  placeholder="name@kavach.gov.in"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                {t('password', 'Password')}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#0F5B4E] hover:bg-[#0B3D34] text-white text-sm font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <span>{loading ? 'Authenticating...' : t('login', 'Sign In')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>{t('dontHaveAccount', "Don't have an account?")} </span>
            <Link to="/register" className="font-bold text-[#0F5B4E] hover:underline">
              {t('registerNow', 'Register here')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
