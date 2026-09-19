import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ProblemSection } from '../components/home/ProblemSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { ReferralTracker } from '../components/home/ReferralTracker';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { HealthcareNetworkSection } from '../components/home/HealthcareNetworkSection';
import { EcosystemSection } from '../components/home/EcosystemSection';
import { DistrictAnalytics } from '../components/home/DistrictAnalytics';
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
      {/* 1. #home */}
      <HeroSection
        onOpenTriageModal={() => setTriageModalOpen(true)}
        onExploreClick={scrollToHowItWorks}
      />

      {/* 2. #problem */}
      <ProblemSection />

      {/* 3. #how-it-works */}
      <HowItWorksSection />

      {/* 4. #care-journey */}
      <ReferralTracker />

      {/* 5. #features */}
      <FeaturesSection />

      {/* 6. #healthcare-network */}
      <HealthcareNetworkSection />

      {/* 7. #ecosystem */}
      <EcosystemSection />

      {/* 8. #impact */}
      <DistrictAnalytics />

      {/* 9. #about */}
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
