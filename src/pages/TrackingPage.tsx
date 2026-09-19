import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReferralTracker } from '../components/home/ReferralTracker';

export const TrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const refFromQuery = searchParams.get('ref') || undefined;

  return (
    <div className="py-4 bg-white">
      <ReferralTracker initialReferralCode={refFromQuery} />
    </div>
  );
};
