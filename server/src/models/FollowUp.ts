import mongoose, { Document, Schema } from 'mongoose';

export type FollowUpStatus = 'PENDING' | 'SCHEDULED' | 'COMPLETED' | 'MISSED';

export interface IFollowUp extends Document {
  patient: Schema.Types.ObjectId;
  referral?: Schema.Types.ObjectId;
  assignedWorker?: Schema.Types.ObjectId;
  title: string;
  reason: string;
  priority: 'High Priority' | 'Follow-up' | 'Upcoming';
  priorityColor: 'red' | 'amber' | 'emerald';
  dueDate: string;
  status: FollowUpStatus;
  notes?: string;
  vitalsObserved?: {
    bloodPressure?: string;
    temperature?: number;
    spo2?: number;
    pulseRate?: number;
  };
  completedDate?: string;
}

const FollowUpSchema = new Schema<IFollowUp>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    referral: { type: Schema.Types.ObjectId, ref: 'Referral' },
    assignedWorker: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    reason: { type: String, required: true },
    priority: {
      type: String,
      enum: ['High Priority', 'Follow-up', 'Upcoming'],
      default: 'Follow-up'
    },
    priorityColor: {
      type: String,
      enum: ['red', 'amber', 'emerald'],
      default: 'amber'
    },
    dueDate: { type: String, required: true },
    status: {
      type: String,
      enum: ['PENDING', 'SCHEDULED', 'COMPLETED', 'MISSED'],
      default: 'PENDING'
    },
    notes: { type: String },
    vitalsObserved: {
      bloodPressure: { type: String },
      temperature: { type: Number },
      spo2: { type: Number },
      pulseRate: { type: Number }
    },
    completedDate: { type: String }
  },
  { timestamps: true }
);

export const FollowUp = mongoose.model<IFollowUp>('FollowUp', FollowUpSchema);
