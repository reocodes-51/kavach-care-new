import api from './api';

export interface FollowUpRecord {
  _id: string;
  patient: any;
  referral?: any;
  assignedWorker?: any;
  title: string;
  reason: string;
  priority: 'High Priority' | 'Follow-up' | 'Upcoming';
  priorityColor: 'red' | 'amber' | 'emerald';
  dueDate: string;
  status: 'PENDING' | 'SCHEDULED' | 'COMPLETED' | 'MISSED';
  notes?: string;
}

export const followupService = {
  getFollowUps: async (params?: { status?: string; priority?: string }) => {
    const response = await api.get<{ success: boolean; count: number; followups: FollowUpRecord[] }>('/followups', {
      params
    });
    return response.data;
  },

  createFollowUp: async (data: any) => {
    const response = await api.post<{ success: boolean; message: string; followup: FollowUpRecord }>('/followups', data);
    return response.data;
  },

  updateFollowUp: async (id: string, data: Partial<FollowUpRecord>) => {
    const response = await api.put<{ success: boolean; message: string; followup: FollowUpRecord }>(`/followups/${id}`, data);
    return response.data;
  }
};
