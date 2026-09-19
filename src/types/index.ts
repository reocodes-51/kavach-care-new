export type Language = 'en' | 'hi' | 'mr';

export type UrgencyLevel = 'URGENT' | 'HIGH' | 'ROUTINE';

export type ReferralStatus =
  | 'CREATED'
  | 'ACCEPTED'
  | 'APPOINTMENT'
  | 'ARRIVAL'
  | 'CONSULTATION'
  | 'TREATMENT'
  | 'FOLLOWUP'
  | 'COMPLETED';

export type FacilityType =
  | 'SubCentre'
  | 'AAM_PHC'
  | 'CHC'
  | 'SDH'
  | 'DH'
  | 'MedicalCollege';

export interface Vitals {
  bloodPressure?: string;
  pulse?: number;
  spO2?: number;
  temperature?: number;
  bloodSugar?: number;
  hemoglobin?: number;
  respiratoryRate?: number;
}

export interface ReferralTimelineStep {
  status: ReferralStatus;
  labelEn: string;
  labelHi: string;
  labelMr: string;
  timestamp: string;
  facility: string;
  actor: string;
  remarks: string;
  completed: boolean;
}

export interface ReferralRecord {
  id: string; // e.g. REF-2024-MH-8421
  abhaId: string; // e.g. 91-4234-8791-0023
  patientName: string;
  patientNameHi?: string;
  patientNameMr?: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  guardianName?: string;
  contactNumber: string;
  village: string;
  gramPanchayat: string;
  block: string;
  district: string;
  state: string;
  
  // Frontline worker info
  referringAsha: string;
  ashaContact: string;
  referringFacility: string;
  referringFacilityType: FacilityType;
  
  // Destination facility
  targetFacility: string;
  targetFacilityType: FacilityType;
  specialtyRequired: string;
  targetDoctorName?: string;
  
  urgency: UrgencyLevel;
  symptoms: string[];
  provisionalDiagnosis: string;
  clinicalSummary: string;
  vitals: Vitals;
  
  status: ReferralStatus;
  tokenNumber: string;
  appointmentDate: string;
  transportArranged: boolean;
  transportType?: '108 Ambulance' | '102 Janani Shishu' | 'Local Bus' | 'Private/Family';
  ashaAccompanied: boolean;
  
  // Closed-loop verification
  treatmentProvided?: string;
  dischargeAdvice?: string;
  followUpDueDate?: string;
  followUpTasks?: string[];
  ashaVisitCompleted?: boolean;
  
  timeline: ReferralTimelineStep[];
}

export interface HealthcareFacility {
  id: string;
  name: string;
  type: FacilityType;
  level: string; // e.g., "Tier 1", "Tier 2", "Tier 3"
  block: string;
  district: string;
  distanceKm: number;
  totalBeds: number;
  vacantBeds: number;
  icuBedsAvailable: number;
  specialistsOnDuty: string[];
  diagnosticsAvailable: string[];
  emergency24x7: boolean;
  teleconsultAvailable: boolean;
  contactPhone: string;
  ambulanceAvailable: boolean;
}

export interface ScreeningIntakeForm {
  abhaId: string;
  patientName: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  contactNumber: string;
  village: string;
  block: string;
  district: string;
  chiefComplaint: string;
  symptoms: string[];
  vitals: Vitals;
  pregnancyWeek?: number;
  redFlags: string[];
  notes: string;
}
