import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReferralTracker } from '../components/home/ReferralTracker';
import type { ReferralRecord } from '../types';

interface TrackingPageProps {
  customReferrals: ReferralRecord[];
}

export const TrackingPage: React.FC<TrackingPageProps> = ({ customReferrals }) => {
  const [searchParams] = useSearchParams();
  const refFromQuery = searchParams.get('ref') || undefined;

  return (
    <div className="py-4 bg-white">
      <ReferralTracker
        initialReferralId={refFromQuery}
        customReferrals={customReferrals}
      />
    </div>
  );
};
