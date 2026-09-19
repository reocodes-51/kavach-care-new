import type { ReferralRecord } from '../types';

export const mockReferrals: ReferralRecord[] = [
  {
    id: 'REF-2024-MH-8421',
    abhaId: '91-4234-8791-0023',
    patientName: 'Sunita Devendra Madavi',
    patientNameHi: 'सुनीता देवेन्द्र मडावी',
    patientNameMr: 'सुनिता देवेंद्र मडावी',
    age: 26,
    gender: 'Female',
    guardianName: 'Devendra Madavi (Husband)',
    contactNumber: '+91 94231 87291',
    village: 'Ghot Hamlet',
    gramPanchayat: 'Ghot',
    block: 'Chamorshi',
    district: 'Gadchiroli',
    state: 'Maharashtra',

    referringAsha: 'Laxmi bai Atram (ASHA #3204)',
    ashaContact: '+91 94032 11984',
    referringFacility: 'Ayushman Arogya Mandir Sub-Centre Ghot',
    referringFacilityType: 'SubCentre',

    targetFacility: 'Community Health Centre (CHC) Chamorshi',
    targetFacilityType: 'CHC',
    specialtyRequired: 'Obstetrics & Gynaecology / Emergency Maternal Care',
    targetDoctorName: 'Dr. Pallavi Meshram (MD Ob/Gyn)',

    urgency: 'URGENT',
    symptoms: [
      'Severe headache and blurred vision',
      'Blood pressure 168/104 mmHg (Severe Pre-eclampsia)',
      'Pedal edema (+++) in bilateral lower limbs',
      'Gestational age 34 weeks 3 days',
      'Albumin in urine: 2+ by dipstick'
    ],
    provisionalDiagnosis: 'Severe Pre-eclampsia with impending Eclampsia (High-Risk Pregnancy)',
    clinicalSummary: '26-year-old primigravida at 34w 3d gestation presents with epigastric distress, acute headache and elevated BP of 168/104 mmHg. Loading dose of Magnesium Sulfate (MgSO4) administered under CHO tele-direction. Immediate transfer via 102 Janani Shishu ambulance to CHC Chamorshi.',
    vitals: {
      bloodPressure: '168/104',
      pulse: 98,
      spO2: 97,
      temperature: 98.4,
      hemoglobin: 9.8,
      respiratoryRate: 22
    },

    status: 'TREATMENT',
    tokenNumber: 'CHC-OBG-04',
    appointmentDate: '2024-09-19',
    transportArranged: true,
    transportType: '102 Janani Shishu',
    ashaAccompanied: true,

    treatmentProvided: 'Admitted to CHC Chamorshi High Dependency Maternity Unit. Maintenance MgSO4 IV protocol administered. Labetalol 100mg orally twice daily initiated. Continuous fetal heart monitoring (142 bpm reactive). Obstetric ultrasound scheduled.',
    dischargeAdvice: 'Target delivery planned at District Hospital Gadchiroli if BP remains labile. Frontline ASHA instructed for daily home BP check upon discharge.',
    followUpDueDate: '2024-09-24',
    followUpTasks: [
      'Daily morning BP monitoring by ASHA Laxmi bai',
      'Check for dangerous visual disturbances or epigastric pain',
      'Ensure strict compliance with Tab. Labetalol',
      'Verify iron folic acid and calcium intake'
    ],
    ashaVisitCompleted: false,

    timeline: [
      {
        status: 'CREATED',
        labelEn: 'Screening & Referral Created',
        labelHi: 'जांच एवं रेफरल सृजित',
        labelMr: 'तपासणी व रेफरल तयार',
        timestamp: '19 Sep 2024, 08:30 AM',
        facility: 'Sub-Centre Ghot',
        actor: 'Laxmi bai Atram (ASHA)',
        remarks: 'Vitals entered in offline app; Red flag pre-eclampsia triggered',
        completed: true
      },
      {
        status: 'ACCEPTED',
        labelEn: 'Accepted by Facility',
        labelHi: 'अस्पताल द्वारा स्वीकृत',
        labelMr: 'रुग्णालयाने स्वीकारले',
        timestamp: '19 Sep 2024, 08:42 AM',
        facility: 'CHC Chamorshi',
        actor: 'Dr. Pallavi Meshram (Duty Ob/Gyn)',
        remarks: 'Maternity bed #04 and emergency MgSO4 drip pre-arranged',
        completed: true
      },
      {
        status: 'APPOINTMENT',
        labelEn: 'Slot Reserved & Ambulance Dispatched',
        labelHi: 'स्लॉट आरक्षित एवं एम्बुलेंस रवाना',
        labelMr: 'स्लॉट आरक्षित व रुग्णवाहिका रवाना',
        timestamp: '19 Sep 2024, 08:50 AM',
        facility: 'Chamorshi Block Transport Desk',
        actor: '102 Janani Express Dispatch',
        remarks: 'Ambulance vehicle MH-33-T-4029 dispatched with paramedic',
        completed: true
      },
      {
        status: 'ARRIVAL',
        labelEn: 'Patient Arrived at CHC',
        labelHi: 'मरीज सीएचसी पहुंची',
        labelMr: 'रुग्ण सीएचसीमध्ये दाखल',
        timestamp: '19 Sep 2024, 09:35 AM',
        facility: 'CHC Chamorshi Emergency OPD',
        actor: 'Staff Nurse Rekha K.',
        remarks: 'Token CHC-OBG-04 scanned; immediate admission to HDU',
        completed: true
      },
      {
        status: 'CONSULTATION',
        labelEn: 'Specialist Consultation Completed',
        labelHi: 'विशेषज्ञ परामर्श पूर्ण',
        labelMr: 'तज्ज्ञ डॉक्टरांनी तपासले',
        timestamp: '19 Sep 2024, 09:50 AM',
        facility: 'CHC Chamorshi HDU',
        actor: 'Dr. Pallavi Meshram',
        remarks: 'Clinical examination conducted; FHR 142 bpm stable; Labs ordered',
        completed: true
      },
      {
        status: 'TREATMENT',
        labelEn: 'Inpatient Active Treatment',
        labelHi: 'सक्रिय भर्ती उपचार जारी',
        labelMr: 'दाखल करून उपचार सुरू',
        timestamp: '19 Sep 2024, 11:15 AM',
        facility: 'CHC Chamorshi HDU Bed #04',
        actor: 'Clinical Care Team',
        remarks: 'BP stabilized to 142/90 mmHg; under 24-hour observation',
        completed: true
      },
      {
        status: 'FOLLOWUP',
        labelEn: 'Frontline ASHA Home Follow-up',
        labelHi: 'आशा कार्यकर्ता गृहभेट अनुवर्ती',
        labelMr: 'आशा सेविकेची गृहभेट',
        timestamp: 'Pending Post-Discharge',
        facility: 'Village Ghot Hamlet',
        actor: 'Laxmi bai Atram (ASHA)',
        remarks: 'Automated notification staged for home visit upon discharge',
        completed: false
      },
      {
        status: 'COMPLETED',
        labelEn: 'Closed-Loop Verification Completed',
        labelHi: 'क्लोज्ड-लूप पूर्ण',
        labelMr: 'क्लोज्ड-लूप पूर्ण झाले',
        timestamp: 'Pending Final Signoff',
        facility: 'CHC & Sub-Centre Coordination Desk',
        actor: 'System / CHO',
        remarks: 'Pending resolution of follow-up protocol',
        completed: false
      }
    ]
  },

  {
    id: 'REF-2024-MH-4192',
    abhaId: '91-1182-9023-4412',
    patientName: 'Aarav Rahul Valvi',
    patientNameHi: 'आरव राहुल वळवी',
    patientNameMr: 'आरव राहुल वळवी',
    age: 3,
    gender: 'Male',
    guardianName: 'Suman Valvi (Mother)',
    contactNumber: '+91 97654 32189',
    village: 'Bilgaon Pada',
    gramPanchayat: 'Bilgaon',
    block: 'Dhadgaon (Akrani)',
    district: 'Nandurbar',
    state: 'Maharashtra',

    referringAsha: 'Kamala Tai Naik (ASHA #1108)',
    ashaContact: '+91 98221 44550',
    referringFacility: 'Sub-Centre Bilgaon',
    referringFacilityType: 'SubCentre',

    targetFacility: 'Rural Hospital / CHC Dhadgaon',
    targetFacilityType: 'CHC',
    specialtyRequired: 'Pediatrics / Acute Respiratory Infection',
    targetDoctorName: 'Dr. Suresh B. Rathod (DCH Pediatrics)',

    urgency: 'URGENT',
    symptoms: [
      'Rapid breathing (respiratory rate 56/min)',
      'Subcostal chest indrawing',
      'High grade fever (102.6°F) for 3 days',
      'Low SpO2: 91% on room air',
      'Inability to drink fluids / lethargy'
    ],
    provisionalDiagnosis: 'Severe Community-Acquired Pneumonia with Hypoxia (WHO IMNCI Red Tag)',
    clinicalSummary: '3-year-old male child brought with acute respiratory distress, severe chest retractions and lethargy. SpO2 91%. First dose of oral Amoxicillin given at Sub-centre as per IMNCI protocol. Priority oxygen bed reserved at CHC Dhadgaon.',
    vitals: {
      temperature: 102.6,
      pulse: 138,
      spO2: 91,
      respiratoryRate: 56
    },

    status: 'COMPLETED',
    tokenNumber: 'CHC-PED-12',
    appointmentDate: '2024-09-17',
    transportArranged: true,
    transportType: '108 Ambulance',
    ashaAccompanied: true,

    treatmentProvided: 'Nebulization with Salbutamol given. IV Ceftriaxone for 3 days. Moist oxygen via nasal prongs administered for 36 hours. SpO2 recovered to 98% on room air. Fever subsided.',
    dischargeAdvice: 'Syrup Amoxyclav 5ml thrice daily for 5 days. Paracetamol SOS for fever. Nutritional counseling provided to mother.',
    followUpDueDate: '2024-09-20',
    followUpTasks: [
      'ASHA home visit on Day 3 post discharge',
      'Count respiratory rate (must be < 40/min)',
      'Verify full course completion of antibiotic syrup',
      'Check weight gain and infant complementary feeding'
    ],
    ashaVisitCompleted: true,

    timeline: [
      {
        status: 'CREATED',
        labelEn: 'Screening & Referral Created',
        labelHi: 'जांच एवं रेफरल सृजित',
        labelMr: 'तपासणी व रेफरल तयार',
        timestamp: '17 Sep 2024, 10:15 AM',
        facility: 'Sub-Centre Bilgaon',
        actor: 'Kamala Tai Naik (ASHA)',
        remarks: 'Pediatric red flag triggered (chest indrawing, SpO2 91%)',
        completed: true
      },
      {
        status: 'ACCEPTED',
        labelEn: 'Accepted by Pediatric Ward',
        labelHi: 'बालरोग वार्ड द्वारा स्वीकृत',
        labelMr: 'बालरोग कक्षाने स्वीकारले',
        timestamp: '17 Sep 2024, 10:22 AM',
        facility: 'CHC Dhadgaon',
        actor: 'Dr. Suresh B. Rathod',
        remarks: 'Pediatric oxygen bed #02 reserved immediately',
        completed: true
      },
      {
        status: 'APPOINTMENT',
        labelEn: 'Emergency Transport Assigned',
        labelHi: 'आपातकालीन वाहन रवाना',
        labelMr: 'आपत्कालीन वाहन रवाना',
        timestamp: '17 Sep 2024, 10:28 AM',
        facility: '108 Ambulance Hub Nandurbar',
        actor: 'Ambulance Pilot Ramesh',
        remarks: 'Vehicle MH-39-A-108 reached hamlet within 22 minutes',
        completed: true
      },
      {
        status: 'ARRIVAL',
        labelEn: 'Arrival at CHC Dhadgaon',
        labelHi: 'सीएचसी धडगाव में आगमन',
        labelMr: 'सीएचसी धडगाव येथे आगमन',
        timestamp: '17 Sep 2024, 11:10 AM',
        facility: 'CHC Dhadgaon Emergency',
        actor: 'Emergency Nurse Sunita P.',
        remarks: 'Triage token CHC-PED-12 verified; oxygen started',
        completed: true
      },
      {
        status: 'CONSULTATION',
        labelEn: 'Pediatrician Evaluation',
        labelHi: 'बालरोग विशेषज्ञ मूल्यांकन',
        labelMr: 'बालरोग तज्ज्ञांकडून तपासणी',
        timestamp: '17 Sep 2024, 11:20 AM',
        facility: 'CHC Dhadgaon',
        actor: 'Dr. Suresh B. Rathod',
        remarks: 'Severe bronchopneumonia confirmed; chest X-ray logged',
        completed: true
      },
      {
        status: 'TREATMENT',
        labelEn: 'Inpatient Oxygen & Antibiotic Therapy',
        labelHi: 'भर्ती ऑक्सीजन एवं एंटीबायोटिक उपचार',
        labelMr: 'ऑक्सिजन व प्रतिजैविक उपचार पूर्ण',
        timestamp: '17-19 Sep 2024',
        facility: 'CHC Dhadgaon Pediatric Bed #02',
        actor: 'Clinical Nursing Staff',
        remarks: '72-hour clinical stabilization; discharged stable on 19 Sep',
        completed: true
      },
      {
        status: 'FOLLOWUP',
        labelEn: 'ASHA Home Verification Visit',
        labelHi: 'आशा कार्यकर्ता गृहभेट सत्यापन',
        labelMr: 'आशा सेविकेची गृहभेट पडताळणी',
        timestamp: '20 Sep 2024, 09:30 AM',
        facility: 'Bilgaon Pada',
        actor: 'Kamala Tai Naik (ASHA)',
        remarks: 'Home visit completed. Child active, RR 34/min, taking feeds well',
        completed: true
      },
      {
        status: 'COMPLETED',
        labelEn: 'Closed-Loop Successfully Verified',
        labelHi: 'क्लोज्ड-लूप सफलतापूर्वक संपन्न',
        labelMr: 'क्लोज्ड-लूप यशस्वीरित्या पूर्ण',
        timestamp: '20 Sep 2024, 11:00 AM',
        facility: 'KAVACH CARE Platform Auto-Audit',
        actor: 'District Health Officer Nandurbar',
        remarks: 'Case marked closed with 100% adherence to clinical pathway',
        completed: true
      }
    ]
  },

  {
    id: 'REF-2024-MH-9034',
    abhaId: '91-8821-3312-9901',
    patientName: 'Bhikaji Pandurang Shinde',
    patientNameHi: 'भीकाजी पांडुरंग शिंदे',
    patientNameMr: 'भिकाजी पांडुरंग शिंदे',
    age: 64,
    gender: 'Male',
    guardianName: 'Sanjay Shinde (Son)',
    contactNumber: '+91 98234 56789',
    village: 'Vadalibhoi',
    gramPanchayat: 'Vadalibhoi',
    block: 'Chandwad',
    district: 'Nashik',
    state: 'Maharashtra',

    referringAsha: 'Mangala Shinde (ASHA #2210)',
    ashaContact: '+91 94222 78901',
    referringFacility: 'Ayushman Arogya Mandir Vadalibhoi',
    referringFacilityType: 'AAM_PHC',

    targetFacility: 'Sub-District Hospital (SDH) Malegaon / DH Nashik',
    targetFacilityType: 'SDH',
    specialtyRequired: 'General Surgery & Diabetic Foot Management',
    targetDoctorName: 'Dr. Vivek Kulkarni (MS General Surgery)',

    urgency: 'HIGH',
    symptoms: [
      'Non-healing ulcer on right plantar foot for 4 weeks',
      'Foul-smelling purulent discharge with spreading cellulitis',
      'Random Blood Sugar (RBS): 348 mg/dL (Severe Uncontrolled Diabetes)',
      'Absent dorsalis pedis pulse on right side (Peripheral arterial check)'
    ],
    provisionalDiagnosis: 'Diabetic Foot Ulcer (Wagner Grade 3) with secondary spreading cellulitis and uncontrolled Type-2 Diabetes',
    clinicalSummary: '64-year-old male with long-standing poorly controlled diabetes presents with deep foot ulcer with tendon exposure. Needs urgent surgical debridement, glycemic stabilization via sliding scale insulin, and wound vacuum therapy.',
    vitals: {
      bloodPressure: '150/92',
      pulse: 88,
      bloodSugar: 348,
      temperature: 99.8,
      spO2: 96
    },

    status: 'CONSULTATION',
    tokenNumber: 'SDH-SURG-19',
    appointmentDate: '2024-09-19',
    transportArranged: true,
    transportType: 'Local Bus',
    ashaAccompanied: false,

    treatmentProvided: 'OPD evaluation completed by Dr. Kulkarni. Blood sent for HbA1c, renal profile and culture sensitivity. Regular insulin sliding scale initiated. Admitted for surgical debridement scheduled for tomorrow morning.',
    dischargeAdvice: 'Strict daily aseptic dressings, offloading footwear, dietary modification, and daily blood sugar log.',
    followUpDueDate: '2024-09-28',
    followUpTasks: [
      'Alternate day dressing check at PHC Vadalibhoi',
      'Weekly fasting blood sugar testing via glucometer by ASHA',
      'Check for spreading erythema or fever'
    ],
    ashaVisitCompleted: false,

    timeline: [
      {
        status: 'CREATED',
        labelEn: 'Screening & Referral Created',
        labelHi: 'जांच एवं रेफरल सृजित',
        labelMr: 'तपासणी व रेफरल तयार',
        timestamp: '18 Sep 2024, 02:30 PM',
        facility: 'AAM Vadalibhoi',
        actor: 'CHO Priyanka Patil',
        remarks: 'Wagner Grade 3 ulcer flagged with RBS 348 mg/dL',
        completed: true
      },
      {
        status: 'ACCEPTED',
        labelEn: 'Accepted by Surgical Dept',
        labelHi: 'शल्य विभाग द्वारा स्वीकृत',
        labelMr: 'शस्त्रक्रिया विभागाने स्वीकारले',
        timestamp: '18 Sep 2024, 03:15 PM',
        facility: 'SDH Malegaon',
        actor: 'Dr. Vivek Kulkarni',
        remarks: 'Slot reserved for next morning surgical clinic',
        completed: true
      },
      {
        status: 'APPOINTMENT',
        labelEn: 'Slot Confirmed with QR Pass',
        labelHi: 'क्यूआर पास के साथ स्लॉट पुष्ट',
        labelMr: 'क्यूआर पाससह स्लॉट निश्चित',
        timestamp: '18 Sep 2024, 03:20 PM',
        facility: 'KAVACH CARE Notification Hub',
        actor: 'Automated SMS Gateway',
        remarks: 'Marathi SMS with token SDH-SURG-19 delivered to patient son',
        completed: true
      },
      {
        status: 'ARRIVAL',
        labelEn: 'Arrival at SDH Malegaon',
        labelHi: 'एसडीएच मालेगांव में आगमन',
        labelMr: 'एसडीएच मालेगाव येथे आगमन',
        timestamp: '19 Sep 2024, 09:15 AM',
        facility: 'SDH Malegaon Reception Counter',
        actor: 'Registration Clerk Anil',
        remarks: 'ABHA barcode scanned; routed directly to Room #06',
        completed: true
      },
      {
        status: 'CONSULTATION',
        labelEn: 'Consultation & Pre-Op Labs',
        labelHi: 'परामर्श एवं ऑपरेशन पूर्व जांच',
        labelMr: 'तपासणी व शस्त्रक्रियेपूर्वीच्या चाचण्या',
        timestamp: '19 Sep 2024, 10:45 AM',
        facility: 'SDH Malegaon Surgical OPD',
        actor: 'Dr. Vivek Kulkarni',
        remarks: 'Admission slip generated; scheduled for surgical debridement',
        completed: true
      },
      {
        status: 'TREATMENT',
        labelEn: 'Surgical Debridement & Ward Care',
        labelHi: 'शल्यक्रिया एवं वार्ड देखभाल',
        labelMr: 'शस्त्रक्रिया व वॉर्ड काळजी',
        timestamp: 'Scheduled 20 Sep 2024',
        facility: 'SDH Malegaon Minor OT',
        actor: 'Surgical Unit',
        remarks: 'Awaiting OT list execution',
        completed: false
      },
      {
        status: 'FOLLOWUP',
        labelEn: 'PHC / ASHA Wound Dressing Loop',
        labelHi: 'पीएचसी / आशा ड्रेसिंग फॉलोअप',
        labelMr: 'पीएचसी / आशा मलमपट्टी पाठपुरावा',
        timestamp: 'Pending Discharge',
        facility: 'Village Vadalibhoi',
        actor: 'ASHA Mangala Shinde',
        remarks: 'Pending procedure completion',
        completed: false
      },
      {
        status: 'COMPLETED',
        labelEn: 'Closed-Loop Verification',
        labelHi: 'क्लोज्ड-लूप पूर्ण',
        labelMr: 'क्लोज्ड-लूप पूर्ण',
        timestamp: 'Pending Final Signoff',
        facility: 'District Coordination Desk',
        actor: 'System',
        remarks: 'Case active in clinical trajectory',
        completed: false
      }
    ]
  },

  {
    id: 'REF-2024-MH-3105',
    abhaId: '91-9943-2210-6712',
    patientName: 'Ganesh Shriram Kodape',
    patientNameHi: 'गणेश श्रीराम कोडापे',
    patientNameMr: 'गणेश श्रीराम कोडापे',
    age: 29,
    gender: 'Male',
    guardianName: 'Shriram Kodape (Father)',
    contactNumber: '+91 94055 12398',
    village: 'Mul Rural Outskirts',
    gramPanchayat: 'Mul',
    block: 'Mul',
    district: 'Chandrapur',
    state: 'Maharashtra',

    referringAsha: 'Savita Tai Gedam (ANM #4412)',
    ashaContact: '+91 94211 90812',
    referringFacility: 'CHC Mul Emergency Unit',
    referringFacilityType: 'CHC',

    targetFacility: 'District Hospital (DH) Chandrapur',
    targetFacilityType: 'DH',
    specialtyRequired: 'Orthopedic Trauma & Advanced Radiography',
    targetDoctorName: 'Dr. Sachin Bhoyar (MS Orthopedics)',

    urgency: 'URGENT',
    symptoms: [
      'Road traffic accident on highway with compound fracture right tibia/fibula',
      'Active external bleeding controlled with pressure tourniquet',
      'Severe pain (10/10) with bone fragment visible',
      'Distal pulses feeble'
    ],
    provisionalDiagnosis: 'Open Grade IIIA Fracture Right Leg (Tibia-Fibula) with hemorrhagic shock threat',
    clinicalSummary: '29-year-old motor vehicle crash victim with open compound leg fracture. Splint applied, IV access established with 500ml Ringer Lactate, Inj. Tramadol given. Emergency 108 transfer initiated to District Hospital Chandrapur for definitive orthopedic reduction and external fixation.',
    vitals: {
      bloodPressure: '100/68',
      pulse: 112,
      spO2: 98,
      temperature: 98.2,
      hemoglobin: 11.2
    },

    status: 'ACCEPTED',
    tokenNumber: 'DH-TRAUMA-01',
    appointmentDate: '2024-09-19',
    transportArranged: true,
    transportType: '108 Ambulance',
    ashaAccompanied: false,

    timeline: [
      {
        status: 'CREATED',
        labelEn: 'Emergency Trauma Triage Logged',
        labelHi: 'आपातकालीन ट्रॉमा ट्राइएज दर्ज',
        labelMr: 'आपत्कालीन अपघात ट्राइएज नोंद',
        timestamp: '19 Sep 2024, 01:10 PM',
        facility: 'CHC Mul Emergency Desk',
        actor: 'Dr. Nitin Meshram (MBBS MO)',
        remarks: 'Red tag trauma referral generated directly to DH Chandrapur',
        completed: true
      },
      {
        status: 'ACCEPTED',
        labelEn: 'Accepted by DH Trauma Center',
        labelHi: 'जिला अस्पताल ट्रॉमा द्वारा स्वीकृत',
        labelMr: 'जिल्हा रुग्णालय ट्रॉमा सेंटरने स्वीकारले',
        timestamp: '19 Sep 2024, 01:15 PM',
        facility: 'DH Chandrapur Trauma ICU',
        actor: 'Dr. Sachin Bhoyar (On-Call Ortho)',
        remarks: 'Trauma OT notified; 2 units O+ blood kept on crossmatch standby',
        completed: true
      },
      {
        status: 'APPOINTMENT',
        labelEn: '108 Ambulance in Transit',
        labelHi: '108 एम्बुलेंस रास्ते में',
        labelMr: '१०८ रुग्णवाहिका प्रवासात',
        timestamp: '19 Sep 2024, 01:25 PM',
        facility: 'Chandrapur Highway Corridor',
        actor: '108 ALS Ambulance #MH-34-E-1080',
        remarks: 'Patient loaded with splint and IV fluid infusion running',
        completed: true
      },
      {
        status: 'ARRIVAL',
        labelEn: 'Expected Arrival at DH Trauma Bay',
        labelHi: 'जिला अस्पताल आगमन अनुमानित',
        labelMr: 'जिल्हा रुग्णालयात आगमन अपेक्षित',
        timestamp: 'ETA: 19 Sep 2024, 02:10 PM',
        facility: 'DH Chandrapur Trauma Red Bay',
        actor: 'Trauma Receiving Team',
        remarks: 'Red bay prepared with monitor and portable X-ray unit',
        completed: false
      },
      {
        status: 'CONSULTATION',
        labelEn: 'Orthopedic Surgical Assessment',
        labelHi: 'हड्डी रोग शल्य परीक्षण',
        labelMr: 'अस्थिरोग शल्यचिकित्सा तपासणी',
        timestamp: 'Pending Arrival',
        facility: 'DH Chandrapur',
        actor: 'Dr. Sachin Bhoyar',
        remarks: 'Trauma bay assessment pending',
        completed: false
      },
      {
        status: 'TREATMENT',
        labelEn: 'Emergency Debridement & Fixation',
        labelHi: 'आपातकालीन शल्यक्रिया एवं फिक्सेशन',
        labelMr: 'आपत्कालीन शस्त्रक्रिया व फिक्सेशन',
        timestamp: 'Pending OT slot',
        facility: 'DH Chandrapur OT #02',
        actor: 'Surgical Trauma Team',
        remarks: 'Pending surgery',
        completed: false
      },
      {
        status: 'FOLLOWUP',
        labelEn: 'Post-op Rehabilitation & Pin Site Care',
        labelHi: 'ऑपरेशन उपरांत पुनर्वास देखभाल',
        labelMr: 'शस्त्रक्रियेनंतरचा पाठपुरावा',
        timestamp: 'Pending Discharge',
        facility: 'Mul Block Health Team',
        actor: 'ANM Savita Gedam',
        remarks: 'Pending discharge',
        completed: false
      },
      {
        status: 'COMPLETED',
        labelEn: 'Closed-Loop Verification',
        labelHi: 'क्लोज्ड-लूप पूर्ण',
        labelMr: 'क्लोज्ड-लूप पूर्ण',
        timestamp: 'Pending',
        facility: 'District Health Command',
        actor: 'System',
        remarks: 'Emergency case active',
        completed: false
      }
    ]
  }
];
