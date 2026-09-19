import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Monitor,
  Smartphone,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';

export interface ScreenSwitcherNavProps {
  currentScreen: number;
  onSelectScreen: (screenNumber: number) => void;
}

export const SCREEN_DEFINITIONS = [
  { id: 1, title: 'Landing Page', category: 'Public', badge: 'Main Web' },
  { id: 2, title: 'Multi-Role Login', category: 'Public', badge: 'Auth' },
  { id: 3, title: 'ASHA Dashboard', category: 'Provider', badge: 'Frontline' },
  { id: 4, title: 'AI Triage & Guidance', category: 'Patient', badge: 'AI Engine' },
  { id: 5, title: 'Find Care & Map', category: 'Patient', badge: 'GIS' },
  { id: 6, title: 'Referral Tracking', category: 'Clinical', badge: 'Timeline' },
  { id: 7, title: 'Appointment & Queue', category: 'Patient', badge: 'Token A-103' },
  { id: 8, title: 'Teleconsultation OPD', category: 'Clinical', badge: 'Live Video' },
  { id: 9, title: 'Patient EHR & Health Journey', category: 'Clinical', badge: 'ABHA / ABDM' },
  { id: 10, title: 'Diagnostics & Lab Tests', category: 'Clinical', badge: 'Free Govt.' },
  { id: 11, title: 'Medicine Stock Directory', category: 'Clinical', badge: 'Pharmacy' },
  { id: 12, title: 'Follow-ups & Outreach', category: 'Provider', badge: 'Post-Discharge' },
  { id: 13, title: 'Doctor / MO Console', category: 'Provider', badge: 'OPD Queue' },
  { id: 14, title: 'Facility In-Charge (CHC)', category: 'Admin', badge: 'Hospital Bed' },
  { id: 15, title: 'District CMO Analytics', category: 'Admin', badge: 'Recharts BI' },
  { id: 16, title: 'Mobile ASHA Smartphone App', category: 'Mobile', badge: 'Android Mockup' }
];

export const ScreenSwitcherNav: React.FC<ScreenSwitcherNavProps> = ({
  currentScreen,
  onSelectScreen
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Public', 'Patient', 'Clinical', 'Provider', 'Admin', 'Mobile'];

  const filteredScreens = SCREEN_DEFINITIONS.filter(
    (s) => filterCategory === 'All' || s.category === filterCategory
  );

  const activeItem = SCREEN_DEFINITIONS.find((s) => s.id === currentScreen) || SCREEN_DEFINITIONS[0];

  const handlePrev = () => {
    if (currentScreen > 1) {
      onSelectScreen(currentScreen - 1);
    }
  };

  const handleNext = () => {
    if (currentScreen < SCREEN_DEFINITIONS.length) {
      onSelectScreen(currentScreen + 1);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B3D34] text-white border-b-2 border-emerald-500 shadow-md">
      {/* Top Main Ribbon Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2">
        {/* Left: Branding & Current Screen Tag */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => onSelectScreen(1)}
            className="flex items-center gap-2 cursor-pointer group"
            title="Return to Screen 1: Landing Page"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-slate-900 shadow-xs group-hover:scale-105 transition-transform">
              KC
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-sm tracking-wide text-white group-hover:text-emerald-300 transition-colors">
                KAVACH CARE
              </span>
              <span className="block text-[9px] text-emerald-300 font-medium tracking-wider uppercase">
                16-Screen System
              </span>
            </div>
          </div>

          <div className="h-6 w-px bg-emerald-800/80 hidden md:block" />

          {/* Active Screen Indicator Pill */}
          <div className="flex items-center gap-1.5 bg-black/30 border border-emerald-700/60 px-3 py-1 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 font-mono">Screen {activeItem.id}/16:</span>
            <span className="text-white truncate max-w-[130px] sm:max-w-xs">{activeItem.title}</span>
            <span className="hidden lg:inline-block px-1.5 py-0.2 bg-emerald-900/90 text-emerald-200 text-[10px] rounded border border-emerald-600/50">
              {activeItem.badge}
            </span>
          </div>
        </div>

        {/* Center/Right: Quick Nav Controls */}
        <div className="flex items-center gap-2">
          {/* Prev / Next Buttons */}
          <div className="flex items-center bg-black/20 rounded-lg p-0.5 border border-emerald-800/70">
            <button
              onClick={handlePrev}
              disabled={currentScreen <= 1}
              className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
                currentScreen <= 1
                  ? 'opacity-40 cursor-not-allowed text-emerald-500'
                  : 'hover:bg-emerald-800 text-white'
              }`}
              title="Previous Screen (Left)"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px]">Prev</span>
            </button>
            <span className="text-[11px] font-mono px-2 text-emerald-300">
              {currentScreen} / 16
            </span>
            <button
              onClick={handleNext}
              disabled={currentScreen >= 16}
              className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
                currentScreen >= 16
                  ? 'opacity-40 cursor-not-allowed text-emerald-500'
                  : 'hover:bg-emerald-800 text-white'
              }`}
              title="Next Screen (Right)"
            >
              <span className="hidden sm:inline text-[11px]">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick toggle to Mobile Screen 16 */}
          <button
            onClick={() => onSelectScreen(16)}
            className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
              currentScreen === 16
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                : 'bg-emerald-900/60 border-emerald-700/60 hover:bg-emerald-800 text-emerald-200'
            }`}
            title="View Screen 16: Mobile ASHA App Mockup"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11px]">Mobile App</span>
          </button>

          {/* Expand/Collapse Screen Drawer Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
          >
            {isExpanded ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span className="text-[11px] hidden sm:inline">
              {isExpanded ? 'Close Switcher' : 'All 16 Screens'}
            </span>
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Quick-Jump Pills (Always accessible on desktop/tablet) */}
      <div className="bg-[#093129] px-3 sm:px-6 py-1.5 border-t border-emerald-900/60 overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-1.5 min-w-max">
          <span className="text-[10px] uppercase font-bold text-emerald-400/80 mr-1 flex items-center gap-1">
            <Monitor className="w-3 h-3" /> Quick Switch:
          </span>
          {SCREEN_DEFINITIONS.map((screen) => {
            const isSelected = screen.id === currentScreen;
            return (
              <button
                key={screen.id}
                onClick={() => {
                  onSelectScreen(screen.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isSelected
                    ? 'bg-emerald-400 text-slate-950 font-bold shadow-xs scale-102 ring-2 ring-white/40'
                    : 'bg-emerald-950/80 hover:bg-emerald-800/80 text-emerald-100/90 border border-emerald-800/50'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                    isSelected ? 'bg-slate-900 text-emerald-300' : 'bg-emerald-900 text-emerald-300'
                  }`}
                >
                  {screen.id}
                </span>
                <span>{screen.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded Modal / Drawer for In-depth Exploration */}
      {isExpanded && (
        <div className="bg-[#0B3D34] border-t border-emerald-700/80 px-4 sm:px-8 py-5 shadow-2xl animate-fadeIn">
          <div className="max-w-7xl mx-auto space-y-4">
            {/* Header + Category Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Interactive 16-Screen System Directory</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                    Collage Specification
                  </span>
                </h3>
                <p className="text-[11px] text-emerald-300/80">
                  Click any screen to jump directly to its full interactive UI implementation.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold transition-colors ${
                      filterCategory === cat
                        ? 'bg-emerald-400 text-slate-900'
                        : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 16 Screen Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredScreens.map((screen) => {
                const isSelected = screen.id === currentScreen;
                return (
                  <div
                    key={screen.id}
                    onClick={() => {
                      onSelectScreen(screen.id);
                      setIsExpanded(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 border-white shadow-lg ring-2 ring-emerald-300 font-bold'
                        : 'bg-[#093129] border-emerald-800 hover:border-emerald-500 text-white hover:bg-emerald-950/90'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                            isSelected
                              ? 'bg-slate-900 text-emerald-300'
                              : 'bg-emerald-900 text-emerald-300'
                          }`}
                        >
                          Screen {screen.id}
                        </span>
                        <span
                          className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded ${
                            isSelected
                              ? 'bg-emerald-900 text-white'
                              : 'bg-emerald-900/60 text-emerald-300'
                          }`}
                        >
                          {screen.category}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold leading-snug">{screen.title}</h4>
                    </div>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-emerald-800/40 text-[10px]">
                      <span className={isSelected ? 'text-slate-900 font-semibold' : 'text-emerald-300/80'}>
                        {screen.badge}
                      </span>
                      {isSelected ? (
                        <CheckCircle className="w-3.5 h-3.5 text-slate-950" />
                      ) : (
                        <span className="text-emerald-400 group-hover:underline">Open →</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
