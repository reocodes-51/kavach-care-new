import api from './api';

export interface ScreeningRecord {
  _id: string;
  patient: any;
  screenedBy?: any;
  symptoms: string[];
  duration: string;
  vitals?: any;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  aiSummary: {
    title: string;
    clinicalObservation: string;
    priorityNotice: string;
    recommendedFacilityType: string;
    suggestedActions: string[];
    disclaimer: string;
  };
  recommendedFacilityId?: any;
  status: string;
  createdAt: string;
}

export const screeningService = {
  createScreening: async (data: {
    patientId: string;
    symptoms: string[];
    duration?: string;
    vitals?: any;
    medicalHistory?: string[];
    notes?: string;
  }) => {
    const response = await api.post<{ success: boolean; message: string; screening: ScreeningRecord }>('/screenings', data);
    return response.data;
  },

  getScreeningById: async (id: string) => {
    const response = await api.get<{ success: boolean; screening: ScreeningRecord }>(`/screenings/${id}`);
    return response.data;
  },

  getPatientScreenings: async (patientId: string) => {
    const response = await api.get<{ success: boolean; count: number; screenings: ScreeningRecord[] }>(`/screenings/patient/${patientId}`);
    return response.data;
  }
};
