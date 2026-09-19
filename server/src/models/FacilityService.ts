import mongoose, { Document, Schema } from 'mongoose';

export interface IFacilityService extends Document {
  facilityId: Schema.Types.ObjectId;
  serviceName: string;
  category: 'DIAGNOSTIC' | 'CLINICAL' | 'EMERGENCY' | 'PHARMACY';
  isAvailable: boolean;
  currentWaitMinutes: number;
  cost: string;
  details?: string;
}

const FacilityServiceSchema = new Schema<IFacilityService>(
  {
    facilityId: { type: Schema.Types.ObjectId, ref: 'Facility', required: true },
    serviceName: { type: String, required: true },
    category: {
      type: String,
      enum: ['DIAGNOSTIC', 'CLINICAL', 'EMERGENCY', 'PHARMACY'],
      default: 'CLINICAL'
    },
    isAvailable: { type: Boolean, default: true },
    currentWaitMinutes: { type: Number, default: 15 },
    cost: { type: String, default: '₹ Free (Govt.)' },
    details: { type: String }
  },
  { timestamps: true }
);

export const FacilityService = mongoose.model<IFacilityService>('FacilityService', FacilityServiceSchema);
