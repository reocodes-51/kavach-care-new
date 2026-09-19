import mongoose, { Document, Schema } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  specialization: string;
  qualification: string;
  registrationNumber: string;
  facilityId: Schema.Types.ObjectId;
  phone: string;
  email: string;
  availableDays: string[];
  opdTimings: string;
  activeStatus: boolean;
  currentQueueCount: number;
}

const DoctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    qualification: { type: String, default: 'MBBS, MD' },
    registrationNumber: { type: String, required: true, unique: true },
    facilityId: { type: Schema.Types.ObjectId, ref: 'Facility', required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    availableDays: [{ type: String }],
    opdTimings: { type: String, default: '09:00 AM - 02:00 PM' },
    activeStatus: { type: Boolean, default: true },
    currentQueueCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Doctor = mongoose.model<IDoctor>('Doctor', DoctorSchema);
