import type { HealthcareFacility } from '../types';

export const mockFacilities: HealthcareFacility[] = [
  {
    id: 'FAC-SC-01',
    name: 'Ayushman Arogya Mandir (Sub-Centre) Ghot',
    type: 'SubCentre',
    level: 'Tier 1 (Frontline Hamlet)',
    block: 'Chamorshi',
    district: 'Gadchiroli',
    distanceKm: 0,
    totalBeds: 2,
    vacantBeds: 2,
    icuBedsAvailable: 0,
    specialistsOnDuty: ['CHO Sujata Meshram', 'ASHA Laxmi bai Atram'],
    diagnosticsAvailable: ['Dipstick Albumin', 'RDT Malaria', 'Pregnancy Test (Nishchay)', 'Hemoglobinometer', 'RBS Glucometer'],
    emergency24x7: false,
    teleconsultAvailable: true,
    contactPhone: '+91 7135 241011',
    ambulanceAvailable: false
  },
  {
    id: 'FAC-PHC-02',
    name: 'Primary Health Centre (PHC) Ashti',
    type: 'AAM_PHC',
    level: 'Tier 1 (Primary Hub)',
    block: 'Chamorshi',
    district: 'Gadchiroli',
    distanceKm: 14,
    totalBeds: 6,
    vacantBeds: 3,
    icuBedsAvailable: 0,
    specialistsOnDuty: ['Dr. Rameshwar Rao (MBBS MO)'],
    diagnosticsAvailable: ['CBC Counter', 'Sputum Microscopy (TB)', 'ECG (12-Lead)', 'Basic Biochemistry', 'Urine Routine'],
    emergency24x7: true,
    teleconsultAvailable: true,
    contactPhone: '+91 7135 252044',
    ambulanceAvailable: true
  },
  {
    id: 'FAC-CHC-03',
    name: 'Community Health Centre (CHC / FRU) Chamorshi',
    type: 'CHC',
    level: 'Tier 2 (First Referral Unit - FRU)',
    block: 'Chamorshi',
    district: 'Gadchiroli',
    distanceKm: 28,
    totalBeds: 30,
    vacantBeds: 8,
    icuBedsAvailable: 2,
    specialistsOnDuty: [
      'Dr. Pallavi Meshram (MD Ob/Gyn)',
      'Dr. Anand Deshmukh (MS General Surgery)',
      'Dr. Nilesh Gaikwad (MD Pediatrics)'
    ],
    diagnosticsAvailable: [
      'Obstetric Ultrasound (USG)',
      'Digital X-Ray',
      'CBNAAT (Tuberculosis)',
      'Automated Blood Analyzer',
      'Blood Storage Centre (BSU)'
    ],
    emergency24x7: true,
    teleconsultAvailable: true,
    contactPhone: '+91 7135 233100',
    ambulanceAvailable: true
  },
  {
    id: 'FAC-SDH-04',
    name: 'Sub-District Hospital (SDH) Aheri',
    type: 'SDH',
    level: 'Tier 2 (Sub-District Multi-Specialty)',
    block: 'Aheri',
    district: 'Gadchiroli',
    distanceKm: 46,
    totalBeds: 50,
    vacantBeds: 14,
    icuBedsAvailable: 4,
    specialistsOnDuty: [
      'Dr. Rajeshwar K. (MD Medicine)',
      'Dr. Shalini Telang (MD Anesthesiology)',
      'Dr. Milind Borkar (MS Ortho)'
    ],
    diagnosticsAvailable: [
      'USG Doppler',
      'Digital Radiography',
      'Blood Bank (Whole Blood + Components)',
      'SNCU (Special Newborn Care Unit)',
      'Hemodialysis Unit (3 machines)'
    ],
    emergency24x7: true,
    teleconsultAvailable: true,
    contactPhone: '+91 7133 272200',
    ambulanceAvailable: true
  },
  {
    id: 'FAC-DH-05',
    name: 'District Hospital (DH) Gadchiroli',
    type: 'DH',
    level: 'Tier 3 (District Apex Hospital)',
    block: 'Gadchiroli Sadar',
    district: 'Gadchiroli',
    distanceKm: 58,
    totalBeds: 250,
    vacantBeds: 42,
    icuBedsAvailable: 8,
    specialistsOnDuty: [
      'Dr. Pramod Khandare (Civil Surgeon)',
      'Dr. Smita Wankhede (MD Ob/Gyn, HOD)',
      'Dr. Vivek Kulkarni (MS General Surgery)',
      'Dr. Ajay Chaudhari (MD Pediatrics & Neonatology)',
      'Dr. Nitin Meshram (Critical Care Intensivist)'
    ],
    diagnosticsAvailable: [
      'CT Scan (32-Slice)',
      'Color Doppler Ultrasound',
      'Fully Automated Biochemistry & Electrolyte Panel',
      'Regional Blood Transfusion Centre (RBTC)',
      '12-Bed Neonatal ICU (NICU)',
      'Trauma Care Bay & Orthopedic OT'
    ],
    emergency24x7: true,
    teleconsultAvailable: true,
    contactPhone: '+91 7132 222155',
    ambulanceAvailable: true
  },
  {
    id: 'FAC-MC-06',
    name: 'Government Medical College & Hospital (GMC) Chandrapur',
    type: 'MedicalCollege',
    level: 'Tier 4 (Tertiary Academic Centre)',
    block: 'Chandrapur',
    district: 'Chandrapur',
    distanceKm: 85,
    totalBeds: 600,
    vacantBeds: 88,
    icuBedsAvailable: 22,
    specialistsOnDuty: [
      'Prof. Dr. Ashok Shinde (Dean & Head of Surgery)',
      'Prof. Dr. Meena Rathod (Head of Pediatrics)',
      'Cardiothoracic Surgery On-Call Unit',
      'Neurosurgery Trauma Unit'
    ],
    diagnosticsAvailable: [
      'MRI (1.5 Tesla)',
      '64-Slice CT Angiography',
      'Cath Lab (Interventional Cardiology)',
      'Component Blood Bank with Apheresis',
      'Advanced Dialysis & Nephrology Suite'
    ],
    emergency24x7: true,
    teleconsultAvailable: true,
    contactPhone: '+91 7172 255200',
    ambulanceAvailable: true
  }
];
