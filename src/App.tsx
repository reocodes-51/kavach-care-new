import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GovHeaderBar } from './components/common/GovHeaderBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Real Role-Based Dashboards
import { PatientDashboard } from './pages/dashboards/PatientDashboard';
import { FrontlineDashboard } from './pages/dashboards/FrontlineDashboard';
import { DoctorDashboard } from './pages/dashboards/DoctorDashboard';
import { FacilityDashboard } from './pages/dashboards/FacilityDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';

export const App: React.FC = () => {
  const [triageModalOpen, setTriageModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#0F5B4E] selection:text-white">
      {/* 1. Official Government Micro-bar (Helplines, A11y, Language) */}
      <GovHeaderBar />

      {/* 2. Official Single Main Navbar */}
      <Navbar onOpenTriage={() => setTriageModalOpen(true)} />

      {/* 3. Main Page Body & Application Routes */}
      <main className="flex-grow">
        <Routes>
          {/* Unified Landing Page with Sections */}
          <Route
            path="/"
            element={
              <HomePage
                triageModalOpen={triageModalOpen}
                setTriageModalOpen={setTriageModalOpen}
              />
            }
          />

          {/* Authentication Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Role-Based Connected Dashboards */}
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/frontline" element={<FrontlineDashboard />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/facility" element={<FacilityDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Fallback Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 4. Official Institutional Footer */}
      <Footer />
    </div>
  );
};

export default App;
