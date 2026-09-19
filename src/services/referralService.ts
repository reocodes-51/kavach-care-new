import api from './api';

export type ReferralStatus =
  | 'CREATED'
  | 'ACCEPTED'
  | 'APPOINTMENT'
  | 'ARRIVED'
  | 'CONSULTATION'
  | 'DIAGNOSTICS'
  | 'TREATMENT'
  | 'FOLLOW_UP'
  | 'COMPLETED';

export interface ReferralTimelineStep {
  status: ReferralStatus;
  label: string;
  timestamp: string;
  actorName: string;
  notes?: string;
}

export interface ReferralRecord {
  _id: string;
  referralCode: string;
  patient: any;
  fromFacility?: any;
  toFacility: any;
  assignedDoctor?: any;
  referredBy: any;
  specialtyRequired: string;
  clinicalSummary: string;
  provisionalDiagnosis: string;
  priority: 'ROUTINE' | 'URGENT' | 'EMERGENCY';
  currentStatus: ReferralStatus;
  timeline: ReferralTimelineStep[];
  transportMode?: string;
  ambulanceContact?: string;
  isRestricted?: boolean;
  createdAt: string;
}

export const referralService = {
  getReferrals: async (params?: { status?: string; patientId?: string; priority?: string }) => {
    const response = await api.get<{ success: boolean; count: number; referrals: ReferralRecord[] }>('/referrals', {
      params
    });
    return response.data;
  },

  getReferralById: async (id: string) => {
    const response = await api.get<{ success: boolean; referral: ReferralRecord }>(`/referrals/${id}`);
    return response.data;
  },

  createReferral: async (data: any) => {
    const response = await api.post<{ success: boolean; message: string; referral: ReferralRecord }>('/referrals', data);
    return response.data;
  },

  updateStatus: async (id: string, update: { status: ReferralStatus; notes?: string }) => {
    const response = await api.put<{ success: boolean; message: string; referral: ReferralRecord }>(`/referrals/${id}/status`, update);
    return response.data;
  },

  trackReferral: async (code: string) => {
    const response = await api.get<{ success: boolean; isRestricted?: boolean; referral: ReferralRecord }>(`/referrals/track/${code}`);
    return response.data;
  }
};
