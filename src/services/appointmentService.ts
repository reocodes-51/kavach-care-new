import api from './api';

export interface AppointmentRecord {
  _id: string;
  patient: any;
  doctor: any;
  facility: any;
  referral?: any;
  date: string;
  time: string;
  queueNumber: string;
  status: 'SCHEDULED' | 'WAITING' | 'SERVING' | 'COMPLETED' | 'CANCELLED';
  currentTokenServing?: string;
  estimatedWaitMinutes?: number;
  consultationNotes?: string;
}

export const appointmentService = {
  getAppointments: async (params?: { patientId?: string; status?: string }) => {
    const response = await api.get<{ success: boolean; count: number; appointments: AppointmentRecord[] }>('/appointments', {
      params
    });
    return response.data;
  },

  createAppointment: async (data: any) => {
    const response = await api.post<{ success: boolean; message: string; appointment: AppointmentRecord }>('/appointments', data);
    return response.data;
  },

  updateAppointment: async (id: string, data: any) => {
    const response = await api.put<{ success: boolean; message: string; appointment: AppointmentRecord }>(`/appointments/${id}`, data);
    return response.data;
  }
};
