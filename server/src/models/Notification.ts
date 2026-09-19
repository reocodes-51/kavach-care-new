import mongoose, { Document, Schema } from 'mongoose';

export type NotificationType =
  | 'REFERRAL_ACCEPTED'
  | 'APPOINTMENT_REMINDER'
  | 'FOLLOWUP_DUE'
  | 'REFERRAL_DELAYED'
  | 'HIGH_RISK_ALERT'
  | 'GENERAL';

export interface INotification extends Document {
  recipientUser?: Schema.Types.ObjectId;
  recipientRole?: 'PATIENT' | 'FRONTLINE_WORKER' | 'DOCTOR' | 'FACILITY' | 'ADMIN' | 'ALL';
  title: string;
  message: string;
  type: NotificationType;
  linkUrl?: string;
  relatedId?: string;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    recipientUser: { type: Schema.Types.ObjectId, ref: 'User' },
    recipientRole: {
      type: String,
      enum: ['PATIENT', 'FRONTLINE_WORKER', 'DOCTOR', 'FACILITY', 'ADMIN', 'ALL'],
      default: 'ALL'
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: [
        'REFERRAL_ACCEPTED',
        'APPOINTMENT_REMINDER',
        'FOLLOWUP_DUE',
        'REFERRAL_DELAYED',
        'HIGH_RISK_ALERT',
        'GENERAL'
      ],
      default: 'GENERAL'
    },
    linkUrl: { type: String },
    relatedId: { type: String },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
