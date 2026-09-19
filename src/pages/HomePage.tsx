import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ReferralTracker } from '../components/home/ReferralTracker';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { HealthcareNetworkSection } from '../components/home/HealthcareNetworkSection';
import { AISafetySection } from '../components/home/AISafetySection';
import { TriageWizardModal } from '../components/modals/TriageWizardModal';
import { ReferralSlipModal } from '../components/modals/ReferralSlipModal';
import type { ReferralRecord } from '../types';

interface HomePageProps {
  triageModalOpen: boolean;
  setTriageModalOpen: (open: boolean) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  triageModalOpen,
  setTriageModalOpen
}) => {
  const [activeCreatedReferral, setActiveCreatedReferral] = useState<ReferralRecord | null>(null);
  const [slipModalOpen, setSlipModalOpen] = useState(false);

  const handleReferralCreated = (newRef: ReferralRecord) => {
    setActiveCreatedReferral(newRef);
    setSlipModalOpen(true);
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-0">
      {/* 1. Official National Hero Banner (#home) */}
      <HeroSection
        onOpenTriageModal={() => setTriageModalOpen(true)}
        onExploreClick={scrollToHowItWorks}
      />

      {/* 2. Primary Public Citizen Service: Referral Tracking & Care Journey (#care-journey) */}
      <ReferralTracker />

      {/* 3. Operational Protocol: 4-Tier Healthcare Continuum (#how-it-works) */}
      <HowItWorksSection />

      {/* 4. Public Healthcare Network & Hospital Bed Registry (#healthcare-network) */}
      <HealthcareNetworkSection />

      {/* 5. Clinical Safety & Legal Governance (#about) */}
      <AISafetySection />

      {/* Triage Wizard Modal */}
      <TriageWizardModal
        isOpen={triageModalOpen}
        onClose={() => setTriageModalOpen(false)}
        onReferralCreated={handleReferralCreated}
      />

      {/* Generated Referral Slip Modal */}
      {activeCreatedReferral && (
        <ReferralSlipModal
          referral={activeCreatedReferral}
          isOpen={slipModalOpen}
          onClose={() => setSlipModalOpen(false)}
        />
      )}
    </div>
  );
};
