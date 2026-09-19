import mongoose, { Document, Schema } from 'mongoose';

export type AppointmentStatus = 'SCHEDULED' | 'WAITING' | 'SERVING' | 'COMPLETED' | 'CANCELLED';

export interface IAppointment extends Document {
  patient: Schema.Types.ObjectId;
  doctor: Schema.Types.ObjectId;
  facility: Schema.Types.ObjectId;
  referral?: Schema.Types.ObjectId;
  date: string;
  time: string;
  queueNumber: string;
  status: AppointmentStatus;
  currentTokenServing?: string;
  estimatedWaitMinutes?: number;
  consultationNotes?: string;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    facility: { type: Schema.Types.ObjectId, ref: 'Facility', required: true },
    referral: { type: Schema.Types.ObjectId, ref: 'Referral' },
    date: { type: String, required: true },
    time: { type: String, required: true },
    queueNumber: { type: String, required: true },
    status: {
      type: String,
      enum: ['SCHEDULED', 'WAITING', 'SERVING', 'COMPLETED', 'CANCELLED'],
      default: 'SCHEDULED'
    },
    currentTokenServing: { type: String, default: 'A-098' },
    estimatedWaitMinutes: { type: Number, default: 20 },
    consultationNotes: { type: String }
  },
  { timestamps: true }
);

export const Appointment = mongoose.model<IAppointment>('Appointment', AppointmentSchema);
