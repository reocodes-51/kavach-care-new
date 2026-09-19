import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ProblemSection } from '../components/home/ProblemSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { EcosystemSection } from '../components/home/EcosystemSection';
import { RolePortalsSection } from '../components/home/RolePortalsSection';
import { ReferralTracker } from '../components/home/ReferralTracker';
import { DistrictAnalytics } from '../components/home/DistrictAnalytics';
import { AISafetySection } from '../components/home/AISafetySection';
import { TriageWizardModal } from '../components/modals/TriageWizardModal';
import { ReferralSlipModal } from '../components/modals/ReferralSlipModal';
import type { ReferralRecord } from '../types';

interface HomePageProps {
  triageModalOpen: boolean;
  setTriageModalOpen: (open: boolean) => void;
  customReferrals: ReferralRecord[];
  onReferralCreated: (newRef: ReferralRecord) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  triageModalOpen,
  setTriageModalOpen,
  customReferrals,
  onReferralCreated,
}) => {
  const [activeCreatedReferral, setActiveCreatedReferral] = useState<ReferralRecord | null>(null);
  const [slipModalOpen, setSlipModalOpen] = useState(false);

  const handleCreated = (newRef: ReferralRecord) => {
    onReferralCreated(newRef);
    setActiveCreatedReferral(newRef);
    setSlipModalOpen(true);
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Hero Section with Network Diagram */}
      <HeroSection
        onOpenTriageModal={() => setTriageModalOpen(true)}
        onExploreClick={scrollToHowItWorks}
      />

      {/* 1. The Healthcare Problem */}
      <ProblemSection />

      {/* 2. How KAVACH CARE Works (8 Steps) */}
      <HowItWorksSection />

      {/* 3. Key Features */}
      <FeaturesSection />

      {/* 4. Healthcare Ecosystem (ABHA, ABDM, eSanjeevani, NHM) */}
      <EcosystemSection />

      {/* 5. Role-Based Dashboards */}
      <RolePortalsSection />

      {/* 6. Referral Tracking (Live interactive tracker) */}
      <ReferralTracker customReferrals={customReferrals} />

      {/* 7. District Dashboard Preview (Recharts statistics) */}
      <DistrictAnalytics />

      {/* 8. AI Safety & Clinical Governance */}
      <AISafetySection />

      {/* Interactive Triage Generator Modal */}
      <TriageWizardModal
        isOpen={triageModalOpen}
        onClose={() => setTriageModalOpen(false)}
        onReferralCreated={handleCreated}
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
