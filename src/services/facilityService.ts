import api from './api';

export interface FacilityData {
  _id: string;
  name: string;
  code: string;
  type: string;
  tier: string;
  district: string;
  state: string;
  address: string;
  distanceKm: number;
  contactPhone: string;
  services: string[];
  bedCapacity: {
    total: number;
    occupied: number;
    available: number;
    icuAvailable: number;
    maternityHduAvailable: number;
  };
  queue: {
    currentlyWaiting: number;
    avgWaitMinutes: number;
  };
  availability: 'High' | 'Moderate' | 'Critical' | 'Full';
  teleconsultation: boolean;
  status: 'OPERATIONAL' | 'LIMITED' | 'EMERGENCY_ONLY';
}

export const facilityService = {
  getFacilities: async (params?: { type?: string; district?: string }) => {
    const response = await api.get<{ success: boolean; count: number; facilities: FacilityData[] }>('/facilities', {
      params
    });
    return response.data;
  },

  getFacilityById: async (id: string) => {
    const response = await api.get<{ success: boolean; facility: FacilityData; services: any[]; doctors: any[] }>(`/facilities/${id}`);
    return response.data;
  },

  matchFacilities: async (criteria: { requiredService?: string; facilityType?: string; maxDistanceKm?: number }) => {
    const response = await api.post<{ success: boolean; count: number; matches: any[] }>('/facilities/match', criteria);
    return response.data;
  }
};
