import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, Search, UserCheck, Menu, X, Stethoscope } from 'lucide-react';

interface NavbarProps {
  onOpenTriageModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTriageModal }) => {
  const { language, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickTrackId, setQuickTrackId] = useState('');

  const navItems = [
    { label: t('home'), path: '/' },
    { label: t('howItWorks'), path: '/how-it-works' },
    { label: t('network'), path: '/network' },
    { label: t('forPatients'), path: '/patients' },
    { label: t('forHealthWorkers'), path: '/workers' },
    { label: 'District Preview', path: '/district' },
    { label: t('about'), path: '/about' },
  ];

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackId.trim()) {
      navigate(`/track?ref=${encodeURIComponent(quickTrackId.trim())}`);
      setQuickTrackId('');
    } else {
      navigate('/track');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm no-print">
      {/* Primary Brand Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 py-2">
          {/* Logo & Platform Name */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* National Health Emblem / Shield */}
            <div className="w-12 h-12 rounded bg-[#123B63] flex items-center justify-center text-white border-2 border-[#C88D00] shadow-sm flex-shrink-0">
              <div className="relative">
                <Shield className="w-7 h-7 text-white" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-black text-amber-300">KC</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#123B63] font-sans">
                  {language === 'mr' ? 'कवच केअर' : language === 'hi' ? 'कवच केयर' : 'KAVACH CARE'}
                </span>
                <span className="hidden sm:inline-block text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                  NHM Rural CDSS
                </span>
              </div>
              <span className="text-xs text-slate-600 font-medium tracking-tight line-clamp-1">
                {language === 'mr'
                  ? 'ग्रामीण रेफरल व रुग्ण सातत्य व्यासपीठ'
                  : language === 'hi'
                  ? 'एआई-सहायक ग्रामीण रेफरल एवं निरंतर देखभाल मंच'
                  : 'AI-Assisted Rural Care Navigation & Referral Continuity Platform'}
              </span>
            </div>
          </Link>

          {/* Right Header Controls (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Fast Referral Tracking Input */}
            <form onSubmit={handleQuickSearch} className="relative flex items-center">
              <input
                type="text"
                value={quickTrackId}
                onChange={(e) => setQuickTrackId(e.target.value)}
                placeholder="Enter Referral ID (e.g. REF-2024...)"
                className="w-56 pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#123B63] focus:border-[#123B63] text-slate-800 placeholder-slate-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <button
                type="submit"
                className="ml-1.5 px-2.5 py-1.5 text-xs font-semibold text-white bg-[#123B63] hover:bg-[#0e2f50] rounded transition-colors"
              >
                Track
              </button>
            </form>

            {/* Quick Action: Start Care Journey */}
            <button
              onClick={onOpenTriageModal}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-health-green hover:bg-health-green-dark rounded shadow-sm transition-colors"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Start Care Journey</span>
            </button>

            {/* Portal Login / Switcher */}
            <Link
              to="/portals"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#123B63] bg-[#EBF2F8] hover:bg-[#d9e6f3] border border-[#BACDE2] rounded transition-colors"
            >
              <UserCheck className="w-4 h-4 text-[#123B63]" />
              <span>{t('portals')}</span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenTriageModal}
              className="p-2 text-white bg-health-green rounded text-xs font-medium"
              title="Start Care Journey"
            >
              <Stethoscope className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 border border-slate-300 rounded"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Government Deep Blue) */}
      <nav className="bg-[#123B63] border-t border-[#0e2d4d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center space-x-1 py-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 text-xs font-medium tracking-wide transition-colors rounded ${
                      isActive
                        ? 'bg-[#0B2540] text-amber-300 font-bold border-b-2 border-amber-400'
                        : 'text-slate-100 hover:bg-[#1C5182] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-2 py-1 text-xs text-slate-200">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>NHM Referral Sandbox: Live</span>
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3">
          {/* Quick Track Input in mobile */}
          <form onSubmit={handleQuickSearch} className="flex gap-2 pb-2 border-b border-slate-100">
            <input
              type="text"
              value={quickTrackId}
              onChange={(e) => setQuickTrackId(e.target.value)}
              placeholder="Referral ID (e.g. REF-2024-MH-8421)"
              className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-[#123B63] text-white text-xs font-semibold rounded"
            >
              Track
            </button>
          </form>

          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 text-xs font-medium rounded ${
                    isActive ? 'bg-[#EBF2F8] text-[#123B63] font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
            <Link
              to="/portals"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold bg-[#123B63] text-white rounded"
            >
              <UserCheck className="w-4 h-4" />
              <span>{t('portals')}</span>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenTriageModal) onOpenTriageModal();
              }}
              className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold bg-health-green text-white rounded"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Start Care Journey</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
