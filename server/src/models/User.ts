import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export type UserRole = 'PATIENT' | 'FRONTLINE_WORKER' | 'DOCTOR' | 'FACILITY' | 'ADMIN';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  facilityId?: Schema.Types.ObjectId;
  workerId?: string;
  assignedVillage?: string;
  createdAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['PATIENT', 'FRONTLINE_WORKER', 'DOCTOR', 'FACILITY', 'ADMIN'],
      default: 'PATIENT'
    },
    facilityId: { type: Schema.Types.ObjectId, ref: 'Facility' },
    workerId: { type: String },
    assignedVillage: { type: String }
  },
  { timestamps: true }
);

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);
