import api from './api';

export interface DistrictAnalyticsResponse {
  success: boolean;
  stats: {
    totalPatientsServed: number;
    totalReferrals: number;
    completedReferrals: number;
    pendingReferrals: number;
    completionRate: string;
    highRiskCases: number;
    completedFollowups: number;
    pendingFollowups: number;
    avgAmbulanceDispatchMins: number;
  };
  referralTrends: { month: string; referrals: number; completed: number }[];
  facilityLoad: { facility: string; load: number }[];
  bottlenecks: { facility: string; issue: string; severity: string; metric: string }[];
}

export const analyticsService = {
  getDistrictAnalytics: async (): Promise<DistrictAnalyticsResponse> => {
    const response = await api.get<DistrictAnalyticsResponse>('/analytics/district');
    return response.data;
  }
};
