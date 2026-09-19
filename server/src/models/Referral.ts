import mongoose, { Document, Schema } from 'mongoose';

export type ReferralStatus =
  | 'CREATED'
  | 'ACCEPTED'
  | 'APPOINTMENT'
  | 'ARRIVED'
  | 'CONSULTATION'
  | 'DIAGNOSTICS'
  | 'TREATMENT'
  | 'FOLLOW_UP'
  | 'COMPLETED';

export interface ITimelineStep {
  status: ReferralStatus;
  label: string;
  timestamp: Date;
  actorName: string;
  notes?: string;
}

export interface IReferral extends Document {
  referralCode: string;
  patient: Schema.Types.ObjectId;
  screeningId?: Schema.Types.ObjectId;
  fromFacility?: Schema.Types.ObjectId;
  toFacility: Schema.Types.ObjectId;
  assignedDoctor?: Schema.Types.ObjectId;
  referredBy: Schema.Types.ObjectId;
  specialtyRequired: string;
  clinicalSummary: string;
  provisionalDiagnosis: string;
  priority: 'ROUTINE' | 'URGENT' | 'EMERGENCY';
  currentStatus: ReferralStatus;
  timeline: ITimelineStep[];
  transportMode?: string;
  ambulanceContact?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TimelineStepSchema = new Schema<ITimelineStep>(
  {
    status: {
      type: String,
      enum: [
        'CREATED',
        'ACCEPTED',
        'APPOINTMENT',
        'ARRIVED',
        'CONSULTATION',
        'DIAGNOSTICS',
        'TREATMENT',
        'FOLLOW_UP',
        'COMPLETED'
      ],
      required: true
    },
    label: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    actorName: { type: String, required: true },
    notes: { type: String }
  },
  { _id: false }
);

const ReferralSchema = new Schema<IReferral>(
  {
    referralCode: { type: String, required: true, unique: true, index: true },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    screeningId: { type: Schema.Types.ObjectId, ref: 'Screening' },
    fromFacility: { type: Schema.Types.ObjectId, ref: 'Facility' },
    toFacility: { type: Schema.Types.ObjectId, ref: 'Facility', required: true },
    assignedDoctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    referredBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    specialtyRequired: { type: String, required: true },
    clinicalSummary: { type: String, required: true },
    provisionalDiagnosis: { type: String, default: 'Pending specialist evaluation' },
    priority: {
      type: String,
      enum: ['ROUTINE', 'URGENT', 'EMERGENCY'],
      default: 'ROUTINE'
    },
    currentStatus: {
      type: String,
      enum: [
        'CREATED',
        'ACCEPTED',
        'APPOINTMENT',
        'ARRIVED',
        'CONSULTATION',
        'DIAGNOSTICS',
        'TREATMENT',
        'FOLLOW_UP',
        'COMPLETED'
      ],
      default: 'CREATED'
    },
    timeline: [TimelineStepSchema],
    transportMode: { type: String, default: '108 Emergency Ambulance' },
    ambulanceContact: { type: String, default: '108 / +91 98260 12345' }
  },
  { timestamps: true }
);

export const Referral = mongoose.model<IReferral>('Referral', ReferralSchema);
