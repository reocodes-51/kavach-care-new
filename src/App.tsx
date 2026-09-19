import React, { useState, useEffect } from 'react';
import { GovHeaderBar } from './components/common/GovHeaderBar';
import { ScreenSwitcherNav } from './components/common/ScreenSwitcherNav';
import { Footer } from './components/common/Footer';

// 16 Screens matching the UI Collage Reference
import { Screen01Landing } from './screens/Screen01Landing';
import { Screen02Login } from './screens/Screen02Login';
import { Screen03AshaDashboard } from './screens/Screen03AshaDashboard';
import { Screen04AITriage } from './screens/Screen04AITriage';
import { Screen05FindCare } from './screens/Screen05FindCare';
import { Screen06ReferralTracking } from './screens/Screen06ReferralTracking';
import { Screen07AppointmentQueue } from './screens/Screen07AppointmentQueue';
import { Screen08Teleconsultation } from './screens/Screen08Teleconsultation';
import { Screen09PatientEHR } from './screens/Screen09PatientEHR';
import { Screen10Diagnostics } from './screens/Screen10Diagnostics';
import { Screen11MedicineStock } from './screens/Screen11MedicineStock';
import { Screen12Followups } from './screens/Screen12Followups';
import { Screen13DoctorDashboard } from './screens/Screen13DoctorDashboard';
import { Screen14FacilityDashboard } from './screens/Screen14FacilityDashboard';
import { Screen15DistrictDashboard } from './screens/Screen15DistrictDashboard';
import { Screen16MobileAshaApp } from './screens/Screen16MobileAshaApp';

export const App: React.FC = () => {
  // Read initial screen from URL parameter if provided (e.g. ?screen=4)
  const getInitialScreen = (): number => {
    try {
      const params = new URLSearchParams(window.location.search);
      const screenParam = params.get('screen');
      if (screenParam) {
        const num = parseInt(screenParam, 10);
        if (num >= 1 && num <= 16) return num;
      }
    } catch {
      // ignore
    }
    return 1;
  };

  const [currentScreen, setCurrentScreen] = useState<number>(getInitialScreen);

  // Sync with browser URL search params for bookmarkable links
  const handleNavigate = (screenNumber: number) => {
    const clamped = Math.max(1, Math.min(16, screenNumber));
    setCurrentScreen(clamped);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('screen', clamped.toString());
    window.history.pushState({ screen: clamped }, '', newUrl.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to popstate (browser back/forward button)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const s = params.get('screen');
      if (s) {
        const n = parseInt(s, 10);
        if (n >= 1 && n <= 16) setCurrentScreen(n);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 1:
        return <Screen01Landing onNavigate={handleNavigate} />;
      case 2:
        return <Screen02Login onNavigate={handleNavigate} />;
      case 3:
        return <Screen03AshaDashboard onNavigate={handleNavigate} />;
      case 4:
        return <Screen04AITriage onNavigate={handleNavigate} />;
      case 5:
        return <Screen05FindCare onNavigate={handleNavigate} />;
      case 6:
        return <Screen06ReferralTracking onNavigate={handleNavigate} />;
      case 7:
        return <Screen07AppointmentQueue onNavigate={handleNavigate} />;
      case 8:
        return <Screen08Teleconsultation onNavigate={handleNavigate} />;
      case 9:
        return <Screen09PatientEHR onNavigate={handleNavigate} />;
      case 10:
        return <Screen10Diagnostics onNavigate={handleNavigate} />;
      case 11:
        return <Screen11MedicineStock onNavigate={handleNavigate} />;
      case 12:
        return <Screen12Followups onNavigate={handleNavigate} />;
      case 13:
        return <Screen13DoctorDashboard onNavigate={handleNavigate} />;
      case 14:
        return <Screen14FacilityDashboard onNavigate={handleNavigate} />;
      case 15:
        return <Screen15DistrictDashboard onNavigate={handleNavigate} />;
      case 16:
        return <Screen16MobileAshaApp onNavigate={handleNavigate} />;
      default:
        return <Screen01Landing onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#0F5B4E] selection:text-white">
      {/* 1. Official Government Header Micro-bar */}
      <GovHeaderBar />

      {/* 2. Interactive 16-Screen System Switcher Ribbon */}
      <ScreenSwitcherNav
        currentScreen={currentScreen}
        onSelectScreen={handleNavigate}
      />

      {/* 3. Screen View Area */}
      <main className="flex-grow">
        {renderActiveScreen()}
      </main>

      {/* 4. Official Institutional Footer */}
      <Footer />
    </div>
  );
};

export default App;
