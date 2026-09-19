import api from './api';

export interface AuthResponse {
  success: boolean;
  message?: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'PATIENT' | 'FRONTLINE_WORKER' | 'DOCTOR' | 'FACILITY' | 'ADMIN';
    facilityId?: string;
    workerId?: string;
    assignedVillage?: string;
  };
}

export const authService = {
  login: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('kavach_token', response.data.token);
      localStorage.setItem('kavach_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (userData: any): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('kavach_token', response.data.token);
      localStorage.setItem('kavach_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('kavach_token');
    localStorage.removeItem('kavach_user');
  }
};
