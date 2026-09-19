import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { User } from './models/User.js';
import { Patient } from './models/Patient.js';
import { Facility } from './models/Facility.js';
import { Doctor } from './models/Doctor.js';
import { FacilityService } from './models/FacilityService.js';
import { Screening } from './models/Screening.js';
import { Referral } from './models/Referral.js';
import { Appointment } from './models/Appointment.js';
import { FollowUp } from './models/FollowUp.js';
import { Notification } from './models/Notification.js';

const seedDatabase = async () => {
  console.log('--- [KAVACH CARE SEEDING STARTED: DEMO DATA ONLY] ---');
  await connectDB();

  // Clear existing demo collections
  await Promise.all([
    User.deleteMany({}),
    Patient.deleteMany({}),
    Facility.deleteMany({}),
    Doctor.deleteMany({}),
    FacilityService.deleteMany({}),
    Screening.deleteMany({}),
    Referral.deleteMany({}),
    Appointment.deleteMany({}),
    FollowUp.deleteMany({}),
    Notification.deleteMany({})
  ]);

  console.log('Cleared existing collections.');

  // 1. Seed 5 Public Healthcare Facilities (Sehore / Rampur Region, MP)
  const facilitiesData = [
    {
      name: 'CHC Rampur (FRU)',
      code: 'FAC-CHC-001',
      type: 'CHC',
      tier: 'Tier 3 - First Referral Unit',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      address: 'Main Highway Road, Rampur Taluka, Sehore, MP 466001',
      distanceKm: 8.2,
      contactPhone: '+91 7562 251020',
      services: ['General Medicine', 'Maternity HDU', 'Digital X-Ray', 'Clinical Pathology', 'Emergency 24x7', 'Pediatrics'],
      bedCapacity: { total: 40, occupied: 26, available: 14, icuAvailable: 2, maternityHduAvailable: 4 },
      queue: { currentlyWaiting: 22, avgWaitMinutes: 18 },
      availability: 'Moderate',
      teleconsultation: true,
      status: 'OPERATIONAL'
    },
    {
      name: 'PHC Kalyanpur',
      code: 'FAC-PHC-002',
      type: 'PHC',
      tier: 'Tier 2 - Primary Health Centre',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      address: 'Village Chowk, Kalyanpur, Sehore, MP 466002',
      distanceKm: 5.1,
      contactPhone: '+91 7562 254110',
      services: ['Outpatient Care', 'Maternal Immunization', 'Basic Lab (CBC, Sugar)', 'Pharmacy'],
      bedCapacity: { total: 6, occupied: 3, available: 3, icuAvailable: 0, maternityHduAvailable: 1 },
      queue: { currentlyWaiting: 9, avgWaitMinutes: 12 },
      availability: 'High',
      teleconsultation: true,
      status: 'OPERATIONAL'
    },
    {
      name: 'District Hospital Sehore',
      code: 'FAC-DH-003',
      type: 'DISTRICT_HOSPITAL',
      tier: 'Tier 4 - Secondary Care District Hospital',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      address: 'Civil Lines, District HQ, Sehore, MP 466001',
      distanceKm: 14.7,
      contactPhone: '+91 7562 222100',
      services: ['General Surgery', 'Obstetrics & Gynaecology', 'ICU / Critical Care', 'Blood Bank', 'Dialysis', 'Trauma Unit'],
      bedCapacity: { total: 150, occupied: 128, available: 22, icuAvailable: 4, maternityHduAvailable: 8 },
      queue: { currentlyWaiting: 48, avgWaitMinutes: 35 },
      availability: 'Moderate',
      teleconsultation: true,
      status: 'OPERATIONAL'
    },
    {
      name: 'Sub-Centre Bilkisganj',
      code: 'FAC-SC-004',
      type: 'SUB_CENTRE',
      tier: 'Tier 1 - Ayushman Arogya Mandir Sub-Centre',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      address: 'Panchayat Bhavan, Bilkisganj Village, Sehore, MP 466115',
      distanceKm: 2.8,
      contactPhone: '+91 7562 289012',
      services: ['Antenatal Care (ANC)', 'Childhood Vaccination', 'NCD Screening (BP/Sugar)', 'ASHA Medicine Depot'],
      bedCapacity: { total: 2, occupied: 0, available: 2, icuAvailable: 0, maternityHduAvailable: 0 },
      queue: { currentlyWaiting: 4, avgWaitMinutes: 8 },
      availability: 'High',
      teleconsultation: true,
      status: 'OPERATIONAL'
    },
    {
      name: 'PHC Bairagarh Chichali',
      code: 'FAC-PHC-005',
      type: 'PHC',
      tier: 'Tier 2 - Primary Health Centre',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      address: 'Chichali Road, Bairagarh Sector, Sehore, MP 466003',
      distanceKm: 9.4,
      contactPhone: '+91 7562 258940',
      services: ['General OPD', 'Maternal Delivery Care', 'Microscopy Lab', 'Emergency Stabilization'],
      bedCapacity: { total: 10, occupied: 8, available: 2, icuAvailable: 0, maternityHduAvailable: 1 },
      queue: { currentlyWaiting: 16, avgWaitMinutes: 22 },
      availability: 'Moderate',
      teleconsultation: true,
      status: 'OPERATIONAL'
    }
  ];

  const createdFacilities = await Facility.insertMany(facilitiesData);
  const [chcRampur, phcKalyanpur, dhSehore, scBilkisganj] = createdFacilities;
  console.log(`✓ Seeded ${createdFacilities.length} public healthcare facilities`);

  // 2. Seed 5 Frontline Workers (ASHA, ANM, CHO)
  const frontlineUsers = await User.create([
    {
      name: 'Sunita Madavi (ASHA)',
      email: 'asha.sunita@kavach.gov.in',
      phone: '+91 98261 11001',
      password: 'password123',
      role: 'FRONTLINE_WORKER',
      workerId: 'ASHA-MP-1042',
      assignedVillage: 'Bilkisganj'
    },
    {
      name: 'Rekha Devi (ANM)',
      email: 'anm.rekha@kavach.gov.in',
      phone: '+91 98261 11002',
      password: 'password123',
      role: 'FRONTLINE_WORKER',
      workerId: 'ANM-MP-2015',
      assignedVillage: 'Kalyanpur'
    },
    {
      name: 'Geeta Bai (ASHA)',
      email: 'asha.geeta@kavach.gov.in',
      phone: '+91 98261 11003',
      password: 'password123',
      role: 'FRONTLINE_WORKER',
      workerId: 'ASHA-MP-1088',
      assignedVillage: 'Rampur Rural'
    },
    {
      name: 'Meena Parmar (ASHA Sangini)',
      email: 'asha.meena@kavach.gov.in',
      phone: '+91 98261 11004',
      password: 'password123',
      role: 'FRONTLINE_WORKER',
      workerId: 'ASHA-MP-1120',
      assignedVillage: 'Bairagarh Chichali'
    },
    {
      name: 'Anita Verma (CHO)',
      email: 'cho.anita@kavach.gov.in',
      phone: '+91 98261 11005',
      password: 'password123',
      role: 'FRONTLINE_WORKER',
      workerId: 'CHO-MP-3004',
      assignedVillage: 'Bilkisganj Sub-Centre'
    }
  ]);
  console.log(`✓ Seeded ${frontlineUsers.length} frontline health workers`);

  // 3. Seed 5 Doctors & Medical Officers
  const doctorsData = [
    {
      name: 'Dr. Anand Sharma',
      specialization: 'General Medicine',
      qualification: 'MBBS, MD (Medicine)',
      registrationNumber: 'MCI-MP-41092',
      facilityId: chcRampur._id,
      phone: '+91 94250 22001',
      email: 'dr.sharma@kavach.gov.in',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opdTimings: '09:00 AM - 02:00 PM',
      currentQueueCount: 14
    },
    {
      name: 'Dr. Priya Verma',
      specialization: 'Obstetrics & Gynaecology',
      qualification: 'MBBS, MS (OBG)',
      registrationNumber: 'MCI-MP-48901',
      facilityId: chcRampur._id,
      phone: '+91 94250 22002',
      email: 'dr.priya@kavach.gov.in',
      availableDays: ['Monday', 'Wednesday', 'Friday'],
      opdTimings: '10:00 AM - 03:00 PM',
      currentQueueCount: 8
    },
    {
      name: 'Dr. Rajiv Kulkarni',
      specialization: 'Pediatrics',
      qualification: 'MBBS, DCH',
      registrationNumber: 'MCI-MP-33104',
      facilityId: dhSehore._id,
      phone: '+91 94250 22003',
      email: 'dr.rajiv@kavach.gov.in',
      availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      opdTimings: '09:30 AM - 01:30 PM',
      currentQueueCount: 12
    },
    {
      name: 'Dr. Suresh Patil',
      specialization: 'General Surgery & Trauma',
      qualification: 'MBBS, MS (Surgery)',
      registrationNumber: 'MCI-MP-29188',
      facilityId: dhSehore._id,
      phone: '+91 94250 22004',
      email: 'dr.suresh@kavach.gov.in',
      availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
      opdTimings: '09:00 AM - 04:00 PM',
      currentQueueCount: 6
    },
    {
      name: 'Dr. Neha Rao',
      specialization: 'Emergency Medicine',
      qualification: 'MBBS, FEM',
      registrationNumber: 'MCI-MP-51203',
      facilityId: phcKalyanpur._id,
      phone: '+91 94250 22005',
      email: 'dr.neha@kavach.gov.in',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opdTimings: '08:00 AM - 02:00 PM',
      currentQueueCount: 5
    }
  ];
  const createdDoctors = await Doctor.insertMany(doctorsData);
  console.log(`✓ Seeded ${createdDoctors.length} verified government medical officers`);

  // Create User accounts for Doctor, Facility Admin, District Admin, and Patient
  const demoAccounts = await User.create([
    {
      name: 'Dr. Anand Sharma',
      email: 'doctor.sharma@kavach.gov.in',
      phone: '+91 94250 22001',
      password: 'password123',
      role: 'DOCTOR',
      facilityId: chcRampur._id
    },
    {
      name: 'CHC Rampur Facility Admin',
      email: 'admin.chcrampur@kavach.gov.in',
      phone: '+91 7562 251020',
      password: 'password123',
      role: 'FACILITY',
      facilityId: chcRampur._id
    },
    {
      name: 'Dr. R.K. Saxena (Chief Medical Officer)',
      email: 'cmo.sehore@kavach.gov.in',
      phone: '+91 7562 224411',
      password: 'password123',
      role: 'ADMIN'
    },
    {
      name: 'Sita Sharma (Patient Demo)',
      email: 'patient.sita@kavach.gov.in',
      phone: '+91 98263 44001',
      password: 'password123',
      role: 'PATIENT'
    }
  ]);
  console.log(`✓ Seeded ${demoAccounts.length} core role accounts (Doctor, Facility Admin, District CMO, Patient)`);

  // 4. Seed 10 Fictional Indian Rural Patients
  const patientsData = [
    {
      abhaId: '91-4821-9920-1024',
      kvcId: 'KVC-1024',
      name: 'Sita Sharma',
      age: 42,
      gender: 'Female',
      phone: '+91 98263 44001',
      village: 'Bilkisganj',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      emergencyContact: { name: 'Manoj Sharma', relation: 'Husband', phone: '+91 98263 44099' },
      bloodGroup: 'B+',
      registeredBy: frontlineUsers[0]._id,
      medicalHistory: ['Hypertension (3 yrs)', 'Past C-Section (2018)'],
      chronicConditions: ['Stage 1 Essential Hypertension'],
      allergies: ['Penicillin']
    },
    {
      abhaId: '91-7210-4412-1025',
      kvcId: 'KVC-1025',
      name: 'Ramesh Patel',
      age: 58,
      gender: 'Male',
      phone: '+91 98263 44002',
      village: 'Kalyanpur',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      emergencyContact: { name: 'Kavita Patel', relation: 'Wife', phone: '+91 98263 44098' },
      bloodGroup: 'O+',
      registeredBy: frontlineUsers[1]._id,
      medicalHistory: ['Type 2 Diabetes Mellitus (6 yrs)'],
      chronicConditions: ['Type 2 Diabetes', 'Diabetic Neuropathy'],
      allergies: []
    },
    {
      abhaId: '91-3104-8841-1026',
      kvcId: 'KVC-1026',
      name: 'Sunita Devi',
      age: 26,
      gender: 'Female',
      phone: '+91 98263 44003',
      village: 'Bilkisganj',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      emergencyContact: { name: 'Dinesh Ahirwar', relation: 'Husband', phone: '+91 98263 44097' },
      bloodGroup: 'A+',
      registeredBy: frontlineUsers[0]._id,
      medicalHistory: ['Gravida 2 Para 1', 'Gestational Hypertension at 32 weeks'],
      chronicConditions: ['High-Risk Pregnancy (PIH)'],
      allergies: []
    },
    {
      abhaId: '91-5912-3304-1027',
      kvcId: 'KVC-1027',
      name: 'Bhikaji Shinde',
      age: 64,
      gender: 'Male',
      phone: '+91 98263 44004',
      village: 'Rampur Rural',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      emergencyContact: { name: 'Santosh Shinde', relation: 'Son', phone: '+91 98263 44096' },
      bloodGroup: 'AB+',
      registeredBy: frontlineUsers[2]._id,
      medicalHistory: ['Chronic Bronchitis / COPD', 'Smoking history 30 pack-years'],
      chronicConditions: ['COPD Gold Stage II'],
      allergies: ['Sulfa drugs']
    },
    {
      abhaId: '91-8841-2290-1028',
      kvcId: 'KVC-1028',
      name: 'Aarav Jadhav',
      age: 4,
      gender: 'Male',
      phone: '+91 98263 44005',
      village: 'Kalyanpur',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      emergencyContact: { name: 'Pooja Jadhav', relation: 'Mother', phone: '+91 98263 44095' },
      bloodGroup: 'O-',
      registeredBy: frontlineUsers[1]._id,
      medicalHistory: ['Recurrent upper respiratory tract infections'],
      chronicConditions: ['Severe Acute Malnutrition (borderline)'],
      allergies: []
    },
    {
      abhaId: '91-4410-7712-1029',
      kvcId: 'KVC-1029',
      name: 'Lakshmi Bai',
      age: 51,
      gender: 'Female',
      phone: '+91 98263 44006',
      village: 'Bairagarh Chichali',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      emergencyContact: { name: 'Babulal', relation: 'Husband', phone: '+91 98263 44094' },
      bloodGroup: 'B-',
      registeredBy: frontlineUsers[3]._id,
      medicalHistory: ['Osteoarthritis both knees', 'Anaemia Hb 9.2 g/dL'],
      chronicConditions: ['Moderate Nutritional Anaemia'],
      allergies: []
    },
    {
      abhaId: '91-6602-1194-1030',
      kvcId: 'KVC-1030',
      name: 'Ganesh Kodape',
      age: 34,
      gender: 'Male',
      phone: '+91 98263 44007',
      village: 'Bilkisganj',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      emergencyContact: { name: 'Sunita Kodape', relation: 'Wife', phone: '+91 98263 44093' },
      bloodGroup: 'A+',
      registeredBy: frontlineUsers[0]._id,
      medicalHistory: ['Agricultural farm worker', 'Past malaria vivax (2022)'],
      chronicConditions: [],
      allergies: []
    },
    {
      abhaId: '91-1190-8823-1031',
      kvcId: 'KVC-1031',
      name: 'Baby of Rekha',
      age: 1,
      gender: 'Female',
      phone: '+91 98263 44008',
      village: 'Rampur Rural',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      emergencyContact: { name: 'Rekha Ahirwar', relation: 'Mother', phone: '+91 98263 44092' },
      bloodGroup: 'B+',
      registeredBy: frontlineUsers[2]._id,
      medicalHistory: ['Full term normal delivery at CHC Rampur', 'Immunization up to date'],
      chronicConditions: [],
      allergies: []
    },
    {
      abhaId: '91-9941-5502-1032',
      kvcId: 'KVC-1032',
      name: 'Kamla Bai Sen',
      age: 68,
      gender: 'Female',
      phone: '+91 98263 44009',
      village: 'Kalyanpur',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      emergencyContact: { name: 'Deepak Sen', relation: 'Son', phone: '+91 98263 44091' },
      bloodGroup: 'O+',
      registeredBy: frontlineUsers[1]._id,
      medicalHistory: ['Bilateral immature senile cataract', 'Mild cognitive impairment'],
      chronicConditions: ['Senile Cataract'],
      allergies: []
    },
    {
      abhaId: '91-3312-9904-1033',
      kvcId: 'KVC-1033',
      name: 'Manoj Ahirwar',
      age: 29,
      gender: 'Male',
      phone: '+91 98263 44010',
      village: 'Bairagarh Chichali',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      emergencyContact: { name: 'Vijay Ahirwar', relation: 'Brother', phone: '+91 98263 44090' },
      bloodGroup: 'AB-',
      registeredBy: frontlineUsers[3]._id,
      medicalHistory: ['Road traffic accident with right tib-fib soft tissue trauma'],
      chronicConditions: [],
      allergies: []
    }
  ];

  const createdPatients = await Patient.insertMany(patientsData);
  console.log(`✓ Seeded ${createdPatients.length} rural patients with verifiable ABHA records`);

  // 5. Seed 10 Realistic Referrals across the 9 Status Milestones
  const referralsData = [
    {
      referralCode: 'REF-2024-MP-10482',
      patient: createdPatients[0]._id, // Sita Sharma
      fromFacility: scBilkisganj._id,
      toFacility: chcRampur._id,
      assignedDoctor: createdDoctors[0]._id,
      referredBy: frontlineUsers[0]._id,
      specialtyRequired: 'Internal Medicine / Cardiology',
      clinicalSummary: 'Severe persistent headache for 3 days with blood pressure 162/104 mmHg. Needs specialist evaluation and renal function tests.',
      provisionalDiagnosis: 'Severe Essential Hypertension Stage II (High Risk)',
      priority: 'URGENT',
      currentStatus: 'APPOINTMENT',
      timeline: [
        { status: 'CREATED', label: 'Referral Created & Issued', timestamp: new Date(Date.now() - 86400000 * 2), actorName: 'Sunita Madavi (ASHA)', notes: 'Identified during village home screening visit' },
        { status: 'ACCEPTED', label: 'Inward Referral Accepted by Facility', timestamp: new Date(Date.now() - 86400000 * 1.5), actorName: 'CHC Rampur Triage Desk', notes: 'Accepted under National Health Mission priority queue' },
        { status: 'APPOINTMENT', label: 'Specialist OPD Slot Reserved', timestamp: new Date(Date.now() - 86400000), actorName: 'Dr. Anand Sharma Desk', notes: 'Reserved token slot A-103 for General Medicine' }
      ]
    },
    {
      referralCode: 'REF-2024-MP-10483',
      patient: createdPatients[2]._id, // Sunita Devi (High Risk ANC)
      fromFacility: scBilkisganj._id,
      toFacility: chcRampur._id,
      assignedDoctor: createdDoctors[1]._id,
      referredBy: frontlineUsers[0]._id,
      specialtyRequired: 'Obstetrics & Gynaecology',
      clinicalSummary: 'Primi-gravida 32 weeks with pedal edema and protein 2+ on dipstick. BP 154/98 mmHg. Requires emergency HDU obstetric assessment.',
      provisionalDiagnosis: 'Preeclampsia with Severe Features',
      priority: 'EMERGENCY',
      currentStatus: 'ACCEPTED',
      timeline: [
        { status: 'CREATED', label: 'Referral Created & Issued', timestamp: new Date(Date.now() - 3600000 * 4), actorName: 'Sunita Madavi (ASHA)', notes: 'Emergency red flag alert triggered via ASHA app' },
        { status: 'ACCEPTED', label: 'Inward Referral Accepted by Facility', timestamp: new Date(Date.now() - 3600000 * 2), actorName: 'Dr. Priya Verma', notes: 'Maternity HDU bed 03 blocked. 108 ambulance dispatched.' }
      ]
    },
    {
      referralCode: 'REF-2024-MP-10484',
      patient: createdPatients[1]._id, // Ramesh Patel (Diabetic Foot)
      fromFacility: phcKalyanpur._id,
      toFacility: dhSehore._id,
      assignedDoctor: createdDoctors[3]._id,
      referredBy: frontlineUsers[1]._id,
      specialtyRequired: 'General Surgery & Diabetic Foot Care',
      clinicalSummary: 'Non-healing ulcer right great toe since 4 weeks. Slough present. RBS 284 mg/dL. Requires debridement and IV antibiotic coverage.',
      provisionalDiagnosis: 'Diabetic Foot Ulcer Wagner Grade II',
      priority: 'URGENT',
      currentStatus: 'CONSULTATION',
      timeline: [
        { status: 'CREATED', label: 'Referral Created & Issued', timestamp: new Date(Date.now() - 86400000 * 3), actorName: 'Rekha Devi (ANM)', notes: 'Referred from PHC Kalyanpur clinic' },
        { status: 'ACCEPTED', label: 'Inward Referral Accepted by Facility', timestamp: new Date(Date.now() - 86400000 * 2.5), actorName: 'DH Sehore Reception', notes: 'Assigned to Surgery Unit II' },
        { status: 'APPOINTMENT', label: 'Specialist OPD Slot Reserved', timestamp: new Date(Date.now() - 86400000 * 2), actorName: 'OPD System', notes: 'Token B-042 issued' },
        { status: 'ARRIVED', label: 'Patient Checked In at Facility Reception', timestamp: new Date(Date.now() - 86400000 * 1), actorName: 'Triage Nurse', notes: 'Vitals logged at triage counter' },
        { status: 'CONSULTATION', label: 'Clinical Consultation with Specialist', timestamp: new Date(Date.now() - 3600000 * 5), actorName: 'Dr. Suresh Patil', notes: 'Wound swab taken; ordered wound debridement' }
      ]
    },
    {
      referralCode: 'REF-2024-MP-10485',
      patient: createdPatients[4]._id, // Aarav Jadhav (SAM)
      fromFacility: phcKalyanpur._id,
      toFacility: dhSehore._id,
      assignedDoctor: createdDoctors[2]._id,
      referredBy: frontlineUsers[1]._id,
      specialtyRequired: 'Pediatrics / Nutritional Rehabilitation (NRC)',
      clinicalSummary: 'Weight-for-height below -3SD with bilateral bipedal edema. Refusing complementary feeding. Requires NRC admission.',
      provisionalDiagnosis: 'Severe Acute Malnutrition with Medical Complications',
      priority: 'URGENT',
      currentStatus: 'COMPLETED',
      timeline: [
        { status: 'CREATED', label: 'Referral Created & Issued', timestamp: new Date(Date.now() - 86400000 * 14), actorName: 'Rekha Devi (ANM)', notes: 'Identified at monthly Poshan Abhiyan day' },
        { status: 'ACCEPTED', label: 'Inward Referral Accepted by Facility', timestamp: new Date(Date.now() - 86400000 * 13), actorName: 'DH NRC In-charge', notes: 'NRC Bed 06 allocated' },
        { status: 'APPOINTMENT', label: 'Specialist OPD Slot Reserved', timestamp: new Date(Date.now() - 86400000 * 13), actorName: 'Dr. Rajiv Kulkarni', notes: 'Immediate admission ordered' },
        { status: 'ARRIVED', label: 'Patient Checked In at Facility Reception', timestamp: new Date(Date.now() - 86400000 * 12), actorName: 'NRC Sister', notes: 'Admitted with mother' },
        { status: 'CONSULTATION', label: 'Clinical Consultation with Specialist', timestamp: new Date(Date.now() - 86400000 * 12), actorName: 'Dr. Rajiv Kulkarni', notes: 'F-75 starter diet initiated' },
        { status: 'DIAGNOSTICS', label: 'Diagnostic Tests & Lab Investigations', timestamp: new Date(Date.now() - 86400000 * 11), actorName: 'DH Pathology', notes: 'Hb 8.4, Blood culture sterile' },
        { status: 'TREATMENT', label: 'Treatment Plan / Inpatient Care Initiated', timestamp: new Date(Date.now() - 86400000 * 7), actorName: 'NRC Team', notes: 'F-100 diet tolerated; weight gain 12g/kg/day' },
        { status: 'FOLLOW_UP', label: 'E-Discharge Issued & ASHA Follow-up Assigned', timestamp: new Date(Date.now() - 86400000 * 2), actorName: 'Dr. Rajiv Kulkarni', notes: 'Discharged on therapeutic nutrition; ASHA Rekha assigned 4 home visits' },
        { status: 'COMPLETED', label: 'Closed-Loop Care Journey Completed', timestamp: new Date(), actorName: 'KAVACH Portal Engine', notes: 'Target weight milestone reached' }
      ]
    },
    {
      referralCode: 'REF-2024-MP-10486',
      patient: createdPatients[3]._id, // Bhikaji Shinde (COPD)
      fromFacility: chcRampur._id,
      toFacility: dhSehore._id,
      assignedDoctor: createdDoctors[0]._id,
      referredBy: frontlineUsers[2]._id,
      specialtyRequired: 'Pulmonology / Chest Medicine',
      clinicalSummary: 'Exacerbation of chronic breathlessness with wheeze. SpO2 91% on room air. Requires Spirometry and specialist nebulizer regimen.',
      provisionalDiagnosis: 'Acute Exacerbation of COPD',
      priority: 'URGENT',
      currentStatus: 'DIAGNOSTICS',
      timeline: [
        { status: 'CREATED', label: 'Referral Created & Issued', timestamp: new Date(Date.now() - 86400000 * 3), actorName: 'Geeta Bai (ASHA)', notes: 'Home visit saturation drop detected' },
        { status: 'ACCEPTED', label: 'Inward Referral Accepted by Facility', timestamp: new Date(Date.now() - 86400000 * 2.5), actorName: 'DH Sehore Desk', notes: 'Accepted' },
        { status: 'APPOINTMENT', label: 'Specialist OPD Slot Reserved', timestamp: new Date(Date.now() - 86400000 * 2), actorName: 'DH Chest Clinic', notes: 'Reserved token slot C-019' },
        { status: 'ARRIVED', label: 'Patient Checked In at Facility Reception', timestamp: new Date(Date.now() - 86400000 * 1), actorName: 'Triage Desk', notes: 'Arrived via 108' },
        { status: 'CONSULTATION', label: 'Clinical Consultation with Specialist', timestamp: new Date(Date.now() - 3600000 * 6), actorName: 'Chest Specialist', notes: 'Examined; advised High-res chest X-ray and ABG' },
        { status: 'DIAGNOSTICS', label: 'Diagnostic Tests & Lab Investigations', timestamp: new Date(), actorName: 'Radiology Dept', notes: 'Digital X-ray chest PA completed' }
      ]
    },
    {
      referralCode: 'REF-2024-MP-10487',
      patient: createdPatients[5]._id, // Lakshmi Bai (Osteoarthritis)
      fromFacility: scBilkisganj._id,
      toFacility: chcRampur._id,
      assignedDoctor: createdDoctors[0]._id,
      referredBy: frontlineUsers[3]._id,
      specialtyRequired: 'Orthopedics / Physical Medicine',
      clinicalSummary: 'Severe bilateral knee crepitus with restriction of joint movement. Requires bilateral digital weight-bearing X-rays.',
      provisionalDiagnosis: 'Primary Osteoarthritis Knee Kellgren-Lawrence Grade III',
      priority: 'ROUTINE',
      currentStatus: 'CREATED',
      timeline: [
        { status: 'CREATED', label: 'Referral Created & Issued', timestamp: new Date(), actorName: 'Meena Parmar (ASHA Sangini)', notes: 'Created routine referral for Tuesday orthopedic clinic' }
      ]
    },
    {
      referralCode: 'REF-2024-MP-10488',
      patient: createdPatients[6]._id, // Ganesh Kodape (Trauma)
      fromFacility: scBilkisganj._id,
      toFacility: dhSehore._id,
      assignedDoctor: createdDoctors[3]._id,
      referredBy: frontlineUsers[0]._id,
      specialtyRequired: 'Orthopedics & Trauma Surgery',
      clinicalSummary: 'Blunt trauma right forearm from agricultural machinery. Gross swelling, deformity, and excruciating pain. Possible radius-ulna fracture.',
      provisionalDiagnosis: 'Closed Fracture Radius and Ulna Right',
      priority: 'EMERGENCY',
      currentStatus: 'ARRIVED',
      timeline: [
        { status: 'CREATED', label: 'Referral Created & Issued', timestamp: new Date(Date.now() - 3600000 * 3), actorName: 'Sunita Madavi (ASHA)', notes: 'Immobilized with splint and called 108' },
        { status: 'ACCEPTED', label: 'Inward Referral Accepted by Facility', timestamp: new Date(Date.now() - 3600000 * 2), actorName: 'DH Trauma In-charge', notes: 'Trauma Bay 02 readied' },
        { status: 'APPOINTMENT', label: 'Specialist OPD Slot Reserved', timestamp: new Date(Date.now() - 3600000 * 2), actorName: 'Dr. Suresh Patil', notes: 'Emergency slot reserved' },
        { status: 'ARRIVED', label: 'Patient Checked In at Facility Reception', timestamp: new Date(Date.now() - 3600000 * 1), actorName: 'Trauma Sister', notes: 'IV line placed, analgesics given' }
      ]
    },
    {
      referralCode: 'REF-2024-MP-10489',
      patient: createdPatients[7]._id, // Baby of Rekha
      fromFacility: chcRampur._id,
      toFacility: dhSehore._id,
      assignedDoctor: createdDoctors[2]._id,
      referredBy: frontlineUsers[2]._id,
      specialtyRequired: 'Pediatric Pulmonology',
      clinicalSummary: '1-year-old child presenting with severe chest indrawing, stridor, and respiratory rate 62/min. Requires pediatric nebulization and oxygen therapy.',
      provisionalDiagnosis: 'Severe Bronchiolitis with Impending Respiratory Failure',
      priority: 'EMERGENCY',
      currentStatus: 'TREATMENT',
      timeline: [
        { status: 'CREATED', label: 'Referral Created & Issued', timestamp: new Date(Date.now() - 86400000 * 2), actorName: 'Geeta Bai (ASHA)', notes: 'Emergency triage identified' },
        { status: 'ACCEPTED', label: 'Inward Referral Accepted by Facility', timestamp: new Date(Date.now() - 86400000 * 1.8), actorName: 'Pediatric ICU Desk', notes: 'PICU Bed 01 confirmed' },
        { status: 'APPOINTMENT', label: 'Specialist OPD Slot Reserved', timestamp: new Date(Date.now() - 86400000 * 1.8), actorName: 'Dr. Rajiv Kulkarni', notes: 'Emergency code white' },
        { status: 'ARRIVED', label: 'Patient Checked In at Facility Reception', timestamp: new Date(Date.now() - 86400000 * 1.5), actorName: 'PICU Staff', notes: 'High-flow nasal cannula started' },
        { status: 'CONSULTATION', label: 'Clinical Consultation with Specialist', timestamp: new Date(Date.now() - 86400000 * 1.5), actorName: 'Dr. Rajiv Kulkarni', notes: 'Diagnosed bronchiolitis' },
        { status: 'DIAGNOSTICS', label: 'Diagnostic Tests & Lab Investigations', timestamp: new Date(Date.now() - 86400000 * 1), actorName: 'DH Lab', notes: 'Chest X-ray hyperinflation noted' },
        { status: 'TREATMENT', label: 'Treatment Plan / Inpatient Care Initiated', timestamp: new Date(), actorName: 'PICU Team', notes: 'Child breathing comfortably, SpO2 98% on minimal oxygen' }
      ]
    },
    {
      referralCode: 'REF-2024-MP-10490',
      patient: createdPatients[8]._id, // Kamla Bai Sen
      fromFacility: phcKalyanpur._id,
      toFacility: chcRampur._id,
      assignedDoctor: createdDoctors[0]._id,
      referredBy: frontlineUsers[1]._id,
      specialtyRequired: 'Ophthalmology (National Blindness Control Programme)',
      clinicalSummary: 'Diminution of vision both eyes. Visual acuity counting fingers at 2 metres. Visual inspection shows dense nuclear cataract.',
      provisionalDiagnosis: 'Senile Nuclear Cataract Both Eyes (Left > Right)',
      priority: 'ROUTINE',
      currentStatus: 'FOLLOW_UP',
      timeline: [
        { status: 'CREATED', label: 'Referral Created & Issued', timestamp: new Date(Date.now() - 86400000 * 10), actorName: 'Rekha Devi (ANM)', notes: 'Screened at village eye camp' },
        { status: 'ACCEPTED', label: 'Inward Referral Accepted by Facility', timestamp: new Date(Date.now() - 86400000 * 9), actorName: 'Eye OPD Desk', notes: 'Accepted' },
        { status: 'APPOINTMENT', label: 'Specialist OPD Slot Reserved', timestamp: new Date(Date.now() - 86400000 * 8), actorName: 'Ophthalmologist', notes: 'Slot reserved' },
        { status: 'ARRIVED', label: 'Patient Checked In at Facility Reception', timestamp: new Date(Date.now() - 86400000 * 7), actorName: 'Eye OPD Sister', notes: 'A-Scan biometry performed' },
        { status: 'CONSULTATION', label: 'Clinical Consultation with Specialist', timestamp: new Date(Date.now() - 86400000 * 7), actorName: 'Eye Surgeon', notes: 'Approved for free IOL surgery under NPCB' },
        { status: 'DIAGNOSTICS', label: 'Diagnostic Tests & Lab Investigations', timestamp: new Date(Date.now() - 86400000 * 6), actorName: 'Pathology Lab', notes: 'FBS 108 mg/dL, ECG Normal' },
        { status: 'TREATMENT', label: 'Treatment Plan / Inpatient Care Initiated', timestamp: new Date(Date.now() - 86400000 * 4), actorName: 'Surgical Team', notes: 'SICS with Posterior Chamber IOL completed successfully' },
        { status: 'FOLLOW_UP', label: 'E-Discharge Issued & ASHA Follow-up Assigned', timestamp: new Date(), actorName: 'Dr. Anand Sharma Desk', notes: 'Discharged with eye drops; ASHA home visit scheduled for Day 7' }
      ]
    },
    {
      referralCode: 'REF-2024-MP-10491',
      patient: createdPatients[9]._id, // Manoj Ahirwar
      fromFacility: chcRampur._id,
      toFacility: dhSehore._id,
      assignedDoctor: createdDoctors[3]._id,
      referredBy: frontlineUsers[3]._id,
      specialtyRequired: 'Orthopedics / Rehabilitation',
      clinicalSummary: 'Post-cast removal review. Needs physical rehabilitation assessment and range-of-motion physiotherapy evaluation.',
      provisionalDiagnosis: 'Post-trauma joint stiffness right leg',
      priority: 'ROUTINE',
      currentStatus: 'COMPLETED',
      timeline: [
        { status: 'CREATED', label: 'Referral Created & Issued', timestamp: new Date(Date.now() - 86400000 * 20), actorName: 'Meena Parmar (ASHA Sangini)', notes: 'Created' },
        { status: 'COMPLETED', label: 'Closed-Loop Care Journey Completed', timestamp: new Date(), actorName: 'DH Physio Team', notes: 'Full ambulation restored with normal gait' }
      ]
    }
  ];

  const createdReferrals = await Referral.insertMany(referralsData);
  console.log(`✓ Seeded ${createdReferrals.length} referrals traversing the complete 9-status lifecycle`);

  // 6. Seed 10 Appointments with Live Queue Tokens
  const appointmentsData = [
    {
      patient: createdPatients[0]._id, // Sita Sharma
      doctor: createdDoctors[0]._id,
      facility: chcRampur._id,
      referral: createdReferrals[0]._id,
      date: 'Today, 19 Sep',
      time: '10:30 AM',
      queueNumber: 'A-103',
      status: 'WAITING',
      currentTokenServing: 'A-098',
      estimatedWaitMinutes: 18,
      consultationNotes: 'Token generated for Dr. Anand Sharma OPD'
    },
    {
      patient: createdPatients[1]._id,
      doctor: createdDoctors[3]._id,
      facility: dhSehore._id,
      referral: createdReferrals[2]._id,
      date: 'Today, 19 Sep',
      time: '11:15 AM',
      queueNumber: 'B-042',
      status: 'SERVING',
      currentTokenServing: 'B-042',
      estimatedWaitMinutes: 0
    },
    {
      patient: createdPatients[2]._id,
      doctor: createdDoctors[1]._id,
      facility: chcRampur._id,
      referral: createdReferrals[1]._id,
      date: 'Today, 19 Sep',
      time: '12:00 PM',
      queueNumber: 'M-008',
      status: 'SCHEDULED',
      currentTokenServing: 'M-005',
      estimatedWaitMinutes: 25
    },
    {
      patient: createdPatients[3]._id,
      doctor: createdDoctors[0]._id,
      facility: dhSehore._id,
      referral: createdReferrals[4]._id,
      date: 'Today, 19 Sep',
      time: '01:00 PM',
      queueNumber: 'C-019',
      status: 'WAITING',
      currentTokenServing: 'C-015',
      estimatedWaitMinutes: 15
    },
    {
      patient: createdPatients[4]._id,
      doctor: createdDoctors[2]._id,
      facility: dhSehore._id,
      referral: createdReferrals[3]._id,
      date: 'Yesterday',
      time: '10:00 AM',
      queueNumber: 'P-011',
      status: 'COMPLETED',
      currentTokenServing: 'P-020',
      estimatedWaitMinutes: 0
    },
    {
      patient: createdPatients[5]._id,
      doctor: createdDoctors[0]._id,
      facility: chcRampur._id,
      referral: createdReferrals[5]._id,
      date: 'Tomorrow, 20 Sep',
      time: '10:45 AM',
      queueNumber: 'A-115',
      status: 'SCHEDULED',
      currentTokenServing: 'A-001',
      estimatedWaitMinutes: 45
    },
    {
      patient: createdPatients[6]._id,
      doctor: createdDoctors[3]._id,
      facility: dhSehore._id,
      referral: createdReferrals[6]._id,
      date: 'Today, 19 Sep',
      time: '02:30 PM',
      queueNumber: 'T-004',
      status: 'WAITING',
      currentTokenServing: 'T-002',
      estimatedWaitMinutes: 10
    },
    {
      patient: createdPatients[7]._id,
      doctor: createdDoctors[2]._id,
      facility: dhSehore._id,
      referral: createdReferrals[7]._id,
      date: 'Today, 19 Sep',
      time: '03:15 PM',
      queueNumber: 'P-033',
      status: 'SCHEDULED',
      currentTokenServing: 'P-028',
      estimatedWaitMinutes: 20
    },
    {
      patient: createdPatients[8]._id,
      doctor: createdDoctors[0]._id,
      facility: chcRampur._id,
      referral: createdReferrals[8]._id,
      date: '22 Sep 2024',
      time: '09:30 AM',
      queueNumber: 'E-002',
      status: 'SCHEDULED',
      currentTokenServing: 'E-001',
      estimatedWaitMinutes: 10
    },
    {
      patient: createdPatients[9]._id,
      doctor: createdDoctors[3]._id,
      facility: dhSehore._id,
      referral: createdReferrals[9]._id,
      date: '18 Sep 2024',
      time: '11:00 AM',
      queueNumber: 'R-018',
      status: 'COMPLETED',
      currentTokenServing: 'R-025',
      estimatedWaitMinutes: 0
    }
  ];

  await Appointment.insertMany(appointmentsData);
  console.log(`✓ Seeded ${appointmentsData.length} appointments with real token numbers`);

  // 7. Seed 10 Follow-ups for ASHA Workers
  const followupsData = [
    {
      patient: createdPatients[0]._id, // Sita Sharma
      referral: createdReferrals[0]._id,
      assignedWorker: frontlineUsers[0]._id,
      title: 'High-risk pregnancy follow-up & BP check',
      reason: 'Home BP monitoring post-discharge',
      priority: 'High Priority',
      priorityColor: 'red',
      dueDate: 'Due today',
      status: 'PENDING',
      notes: 'Check for signs of headache, pedal edema, or visual disturbances.'
    },
    {
      patient: createdPatients[1]._id, // Ramesh Patel
      referral: createdReferrals[2]._id,
      assignedWorker: frontlineUsers[1]._id,
      title: 'Diabetic foot dressing & blood sugar check',
      reason: 'Wound healing compliance and fasting blood sugar',
      priority: 'Follow-up',
      priorityColor: 'amber',
      dueDate: 'Due today',
      status: 'PENDING',
      notes: 'Inspect dressing cleanliness and verify metformin compliance.'
    },
    {
      patient: createdPatients[7]._id, // Baby of Rekha
      referral: createdReferrals[7]._id,
      assignedWorker: frontlineUsers[2]._id,
      title: 'Child vaccination & post-bronchiolitis review',
      reason: 'Measles-Rubella MR-1 vaccine and chest recovery check',
      priority: 'Upcoming',
      priorityColor: 'emerald',
      dueDate: 'Due in 3 days',
      status: 'SCHEDULED',
      notes: 'Assess respiratory rate and ensure vaccination card is stamped.'
    },
    {
      patient: createdPatients[2]._id, // Sunita Devi
      referral: createdReferrals[1]._id,
      assignedWorker: frontlineUsers[0]._id,
      title: 'Postnatal preeclampsia surveillance',
      reason: 'Vitals tracking',
      priority: 'High Priority',
      priorityColor: 'red',
      dueDate: 'Due tomorrow',
      status: 'PENDING'
    },
    {
      patient: createdPatients[3]._id, // Bhikaji Shinde
      referral: createdReferrals[4]._id,
      assignedWorker: frontlineUsers[2]._id,
      title: 'COPD Inhaler technique validation',
      reason: 'Check MDI spacer compliance and dyspnoea score',
      priority: 'Follow-up',
      priorityColor: 'amber',
      dueDate: 'Due in 2 days',
      status: 'PENDING'
    },
    {
      patient: createdPatients[4]._id, // Aarav Jadhav
      referral: createdReferrals[3]._id,
      assignedWorker: frontlineUsers[1]._id,
      title: 'NRC discharge anthropometric measurement',
      reason: 'Weight-for-height and MUAC tape audit',
      priority: 'High Priority',
      priorityColor: 'red',
      dueDate: 'Due in 4 days',
      status: 'SCHEDULED'
    },
    {
      patient: createdPatients[5]._id, // Lakshmi Bai
      referral: createdReferrals[5]._id,
      assignedWorker: frontlineUsers[3]._id,
      title: 'Joint mobility & pain medication check',
      reason: 'Review paracetamol regimen and gentle knee flexion',
      priority: 'Upcoming',
      priorityColor: 'emerald',
      dueDate: 'Due in 5 days',
      status: 'SCHEDULED'
    },
    {
      patient: createdPatients[6]._id, // Ganesh Kodape
      referral: createdReferrals[6]._id,
      assignedWorker: frontlineUsers[0]._id,
      title: 'Post-splint limb perfusion check',
      reason: 'Check finger warmth, capillary refill, and sensation',
      priority: 'High Priority',
      priorityColor: 'red',
      dueDate: 'Due today',
      status: 'PENDING'
    },
    {
      patient: createdPatients[8]._id, // Kamla Bai Sen
      referral: createdReferrals[8]._id,
      assignedWorker: frontlineUsers[1]._id,
      title: 'Post-cataract eye drop compliance',
      reason: 'Check antibiotic steroid eye drop instillation hygiene',
      priority: 'Follow-up',
      priorityColor: 'amber',
      dueDate: 'Due in 6 days',
      status: 'SCHEDULED'
    },
    {
      patient: createdPatients[9]._id, // Manoj Ahirwar
      referral: createdReferrals[9]._id,
      assignedWorker: frontlineUsers[3]._id,
      title: 'Physiotherapy compliance home verification',
      reason: 'Home exercise log verification',
      priority: 'Upcoming',
      priorityColor: 'emerald',
      dueDate: 'Completed',
      status: 'COMPLETED',
      completedDate: '18 Sep 2024'
    }
  ];

  await FollowUp.insertMany(followupsData);
  console.log(`✓ Seeded ${followupsData.length} frontline follow-up visit tasks`);

  // 8. Seed Notifications
  const notificationsData = [
    {
      recipientRole: 'ALL',
      title: 'Referral Accepted: Sita Sharma (#REF-2024-MP-10482)',
      message: 'CHC Rampur has accepted the referral and assigned token slot A-103.',
      type: 'REFERRAL_ACCEPTED',
      read: false
    },
    {
      recipientRole: 'PATIENT',
      title: 'OPD Queue Alert: Token A-103',
      message: 'Currently serving A-098. Your estimated wait time is 18 minutes at CHC Rampur.',
      type: 'APPOINTMENT_REMINDER',
      read: false
    },
    {
      recipientRole: 'FRONTLINE_WORKER',
      title: 'High-Priority Follow-up Due Today',
      message: 'Sita Sharma requires home blood pressure check and pre-eclampsia review.',
      type: 'FOLLOWUP_DUE',
      read: false
    },
    {
      recipientRole: 'FACILITY',
      title: 'Emergency Inward Referral En Route',
      message: 'Sunita Devi (32w ANC, BP 154/98) dispatched via 108 Ambulance to CHC Rampur.',
      type: 'HIGH_RISK_ALERT',
      read: false
    }
  ];

  await Notification.insertMany(notificationsData);
  console.log(`✓ Seeded ${notificationsData.length} role-targeted live notifications`);

  console.log('--- [KAVACH CARE SEEDING COMPLETED SUCCESSFULLY] ---');
  process.exit(0);
};

seedDatabase().catch((err) => {
  console.error('Seeding Failed:', err);
  process.exit(1);
});
