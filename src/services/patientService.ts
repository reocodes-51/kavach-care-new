import api from './api';

export interface PatientRecord {
  _id: string;
  abhaId: string;
  kvcId: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  phone: string;
  village: string;
  district: string;
  state: string;
  bloodGroup?: string;
  medicalHistory?: string[];
  chronicConditions?: string[];
  createdAt?: string;
}

export const patientService = {
  getPatients: async (params?: { search?: string; village?: string }) => {
    const response = await api.get<{ success: boolean; count: number; patients: PatientRecord[] }>('/patients', {
      params
    });
    return response.data;
  },

  getPatientById: async (id: string) => {
    const response = await api.get<{ success: boolean; patient: PatientRecord }>(`/patients/${id}`);
    return response.data;
  },

  createPatient: async (data: Partial<PatientRecord>) => {
    const response = await api.post<{ success: boolean; message: string; patient: PatientRecord }>('/patients', data);
    return response.data;
  },

  updatePatient: async (id: string, data: Partial<PatientRecord>) => {
    const response = await api.put<{ success: boolean; message: string; patient: PatientRecord }>(`/patients/${id}`, data);
    return response.data;
  }
};
