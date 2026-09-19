export const districtOverviewStats = {
  districtName: 'Gadchiroli & Nandurbar Rural Pilot Districts',
  totalReferralsLogged: 14820,
  activeReferrals: 412,
  completedClosedLoop: 13988,
  dropOffRateCurrent: '8.7%',
  dropOffRateBaseline: '61.4%',
  averageTransitTimeMinutes: 44,
  ashaFollowUpCompletionRate: '94.2%',
  bedsMonitoredLive: 1240,
  bedsVacantLive: 298
};

export const monthlyContinuityTrends = [
  { month: 'Apr 2024', totalReferrals: 1120, closedLoopCompleted: 448, dropOffRate: 60.0 },
  { month: 'May 2024', totalReferrals: 1280, closedLoopCompleted: 614, dropOffRate: 52.0 },
  { month: 'Jun 2024', totalReferrals: 1450, closedLoopCompleted: 986, dropOffRate: 32.0 },
  { month: 'Jul 2024', totalReferrals: 1720, closedLoopCompleted: 1393, dropOffRate: 19.0 },
  { month: 'Aug 2024', totalReferrals: 1980, closedLoopCompleted: 1742, dropOffRate: 12.0 },
  { month: 'Sep 2024', totalReferrals: 2150, closedLoopCompleted: 1963, dropOffRate: 8.7 }
];

export const blockReferralDistribution = [
  { block: 'Chamorshi', referrals: 480, urgent: 68, completed: 452, bedsVacant: 18 },
  { block: 'Aheri', referrals: 395, urgent: 52, completed: 366, bedsVacant: 22 },
  { block: 'Kurkheda', referrals: 310, urgent: 41, completed: 294, bedsVacant: 12 },
  { block: 'Dhanora', referrals: 290, urgent: 38, completed: 271, bedsVacant: 14 },
  { block: 'Etapalli', referrals: 360, urgent: 59, completed: 332, bedsVacant: 9 },
  { block: 'Bhamragad', referrals: 315, urgent: 54, completed: 248, bedsVacant: 7 }
];

export const clinicalCategories = [
  { name: 'Maternal & High-Risk Obstetric', count: 4620, color: '#123B63' },
  { name: 'Pediatric Acute & IMNCI', count: 3410, color: '#198754' },
  { name: 'NCDs (Hypertension / Diabetic Foot)', count: 2890, color: '#0C6E85' },
  { name: 'Emergency Trauma & Orthopedics', count: 2140, color: '#C92A2A' },
  { name: 'Infectious Diseases / TB / Malaria', count: 1760, color: '#B86A04' }
];

export const facilityUtilizationData = [
  { name: 'Sub-Centres (112)', totalBeds: 224, occupied: 78, available: 146 },
  { name: 'AAM / PHCs (38)', totalBeds: 228, occupied: 154, available: 74 },
  { name: 'CHCs / FRUs (12)', totalBeds: 360, occupied: 292, available: 68 },
  { name: 'Sub-District Hosps (4)', totalBeds: 200, occupied: 168, available: 32 },
  { name: 'District Hospital (1)', totalBeds: 250, occupied: 222, available: 28 }
];
