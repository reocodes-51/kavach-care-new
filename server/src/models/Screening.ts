import mongoose, { Document, Schema } from 'mongoose';

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface IScreening extends Document {
  patient: Schema.Types.ObjectId;
  screenedBy?: Schema.Types.ObjectId;
  symptoms: string[];
  duration: string;
  vitals: {
    bloodPressureSys?: number;
    bloodPressureDia?: number;
    pulseRate?: number;
    temperatureF?: number;
    spO2?: number;
    respiratoryRate?: number;
    randomBloodSugar?: number;
    weightKg?: number;
  };
  medicalHistory: string[];
  notes?: string;
  riskLevel: RiskLevel;
  aiSummary: {
    title: string;
    clinicalObservation: string;
    priorityNotice: string;
    recommendedFacilityType: string;
    suggestedActions: string[];
    disclaimer: string;
  };
  recommendedFacilityId?: Schema.Types.ObjectId;
  status: 'COMPLETED' | 'PENDING_REFERRAL' | 'REFERRED';
  createdAt: Date;
}

const ScreeningSchema = new Schema<IScreening>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    screenedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    symptoms: [{ type: String, required: true }],
    duration: { type: String, default: '3 days' },
    vitals: {
      bloodPressureSys: { type: Number },
      bloodPressureDia: { type: Number },
      pulseRate: { type: Number },
      temperatureF: { type: Number },
      spO2: { type: Number },
      respiratoryRate: { type: Number },
      randomBloodSugar: { type: Number },
      weightKg: { type: Number }
    },
    medicalHistory: [{ type: String }],
    notes: { type: String },
    riskLevel: {
      type: String,
      enum: ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'],
      default: 'MODERATE'
    },
    aiSummary: {
      title: { type: String, default: 'AI-assisted screening summary' },
      clinicalObservation: { type: String },
      priorityNotice: { type: String, default: 'Risk prioritization: Clinical review required' },
      recommendedFacilityType: { type: String, default: 'CHC' },
      suggestedActions: [{ type: String }],
      disclaimer: {
        type: String,
        default: 'AI assists healthcare workflows. Final clinical decisions remain strictly with healthcare professionals.'
      }
    },
    recommendedFacilityId: { type: Schema.Types.ObjectId, ref: 'Facility' },
    status: {
      type: String,
      enum: ['COMPLETED', 'PENDING_REFERRAL', 'REFERRED'],
      default: 'COMPLETED'
    }
  },
  { timestamps: true }
);

export const Screening = mongoose.model<IScreening>('Screening', ScreeningSchema);
