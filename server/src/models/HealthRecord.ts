import mongoose, { Document, Schema } from 'mongoose';

export interface IHealthRecord extends Document {
  patient: Schema.Types.ObjectId;
  title: string;
  type: 'PRESCRIPTION' | 'LAB_REPORT' | 'DISCHARGE_SUMMARY' | 'EHR_NOTE';
  date: string;
  facility?: Schema.Types.ObjectId;
  doctorName?: string;
  summary: string;
  diagnoses: string[];
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  fileUrl?: string;
  isAbhaVerified: boolean;
}

const HealthRecordSchema = new Schema<IHealthRecord>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['PRESCRIPTION', 'LAB_REPORT', 'DISCHARGE_SUMMARY', 'EHR_NOTE'],
      required: true
    },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] },
    facility: { type: Schema.Types.ObjectId, ref: 'Facility' },
    doctorName: { type: String, default: 'Dr. Sharma' },
    summary: { type: String, required: true },
    diagnoses: [{ type: String }],
    medications: [
      {
        name: { type: String },
        dosage: { type: String },
        frequency: { type: String },
        duration: { type: String }
      }
    ],
    fileUrl: { type: String },
    isAbhaVerified: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const HealthRecord = mongoose.model<IHealthRecord>('HealthRecord', HealthRecordSchema);
