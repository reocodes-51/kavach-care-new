import mongoose, { Document, Schema } from 'mongoose';

export interface IPatient extends Document {
  abhaId: string;
  kvcId: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  phone: string;
  village: string;
  district: string;
  state: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  bloodGroup: string;
  registeredBy: Schema.Types.ObjectId;
  medicalHistory: string[];
  chronicConditions: string[];
  allergies: string[];
  activeStatus: boolean;
  createdAt: Date;
}

const PatientSchema = new Schema<IPatient>(
  {
    abhaId: { type: String, required: true, unique: true, index: true },
    kvcId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Female', 'Male', 'Other'], required: true },
    phone: { type: String, required: true },
    village: { type: String, required: true },
    district: { type: String, required: true, default: 'Sehore' },
    state: { type: String, required: true, default: 'Madhya Pradesh' },
    emergencyContact: {
      name: { type: String, default: '' },
      relation: { type: String, default: '' },
      phone: { type: String, default: '' }
    },
    bloodGroup: { type: String, default: 'B+' },
    registeredBy: { type: Schema.Types.ObjectId, ref: 'User' },
    medicalHistory: [{ type: String }],
    chronicConditions: [{ type: String }],
    allergies: [{ type: String }],
    activeStatus: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Patient = mongoose.model<IPatient>('Patient', PatientSchema);
