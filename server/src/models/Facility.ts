import mongoose, { Document, Schema } from 'mongoose';

export type FacilityType = 'SUB_CENTRE' | 'PHC' | 'CHC' | 'DISTRICT_HOSPITAL' | 'MEDICAL_COLLEGE';

export interface IFacility extends Document {
  name: string;
  code: string;
  type: FacilityType;
  tier: string;
  district: string;
  state: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceKm?: number;
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

const FacilitySchema = new Schema<IFacility>(
  {
    name: { type: String, required: true, index: true },
    code: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ['SUB_CENTRE', 'PHC', 'CHC', 'DISTRICT_HOSPITAL', 'MEDICAL_COLLEGE'],
      required: true
    },
    tier: { type: String, required: true },
    district: { type: String, default: 'Sehore' },
    state: { type: String, default: 'Madhya Pradesh' },
    address: { type: String, required: true },
    coordinates: {
      lat: { type: Number, default: 23.2 },
      lng: { type: Number, default: 77.08 }
    },
    distanceKm: { type: Number, default: 5.0 },
    contactPhone: { type: String, required: true },
    services: [{ type: String }],
    bedCapacity: {
      total: { type: Number, default: 30 },
      occupied: { type: Number, default: 18 },
      available: { type: Number, default: 12 },
      icuAvailable: { type: Number, default: 2 },
      maternityHduAvailable: { type: Number, default: 4 }
    },
    queue: {
      currentlyWaiting: { type: Number, default: 15 },
      avgWaitMinutes: { type: Number, default: 25 }
    },
    availability: {
      type: String,
      enum: ['High', 'Moderate', 'Critical', 'Full'],
      default: 'Moderate'
    },
    teleconsultation: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ['OPERATIONAL', 'LIMITED', 'EMERGENCY_ONLY'],
      default: 'OPERATIONAL'
    }
  },
  { timestamps: true }
);

export const Facility = mongoose.model<IFacility>('Facility', FacilitySchema);
