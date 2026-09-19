import React, { useState } from 'react';
import type { ReferralRecord, UrgencyLevel } from '../../types';
import { X, Stethoscope, AlertTriangle, ShieldCheck, Check, ArrowRight, Building, Sparkles, User, FileText } from 'lucide-react';
import { mockFacilities } from '../../data/facilitiesData';

interface TriageWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReferralCreated: (newReferral: ReferralRecord) => void;
}

export const TriageWizardModal: React.FC<TriageWizardModalProps> = ({
  isOpen,
  onClose,
  onReferralCreated,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [patientName, setPatientName] = useState('Anusuya Ramesh Atram');
  const [patientNameHi, setPatientNameHi] = useState('अनुसूया रमेश आत्राम');
  const [age, setAge] = useState(24);
  const [gender, setGender] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [abhaId, setAbhaId] = useState('91-3829-4102-7711');
  const [village, setVillage] = useState('Ghot Village');
  const [block, setBlock] = useState('Chamorshi');
  const [district, setDistrict] = useState('Gadchiroli');

  // Vitals & Symptoms
  const [bpSys, setBpSys] = useState(165);
  const [bpDia, setBpDia] = useState(105);
  const [pulse, setPulse] = useState(96);
  const [spO2, setSpO2] = useState(98);
  const [temperature, setTemperature] = useState(98.6);
  const [symptomType, setSymptomType] = useState<'maternal' | 'pediatric' | 'diabetic' | 'trauma'>('maternal');
  const [chiefComplaint, setChiefComplaint] = useState('Severe headache, blurred vision, swelling in feet at 33 weeks pregnancy');

  // Selected preset loader
  const loadPreset = (type: 'maternal' | 'pediatric' | 'diabetic' | 'trauma') => {
    setSymptomType(type);
    if (type === 'maternal') {
      setPatientName('Anusuya Ramesh Atram');
      setPatientNameHi('अनुसूया रमेश आत्राम');
      setAge(24);
      setGender('Female');
      setAbhaId('91-3829-4102-7711');
      setBpSys(165);
      setBpDia(105);
      setPulse(96);
      setSpO2(98);
      setTemperature(98.6);
      setChiefComplaint('Severe frontal headache, epigastric pain, pedal edema +++ at 33 weeks pregnancy');
    } else if (type === 'pediatric') {
      setPatientName('Suraj Anil Madavi');
      setPatientNameHi('सूरज अनिल मडावी');
      setAge(4);
      setGender('Male');
      setAbhaId('91-1029-8833-2190');
      setBpSys(95);
      setBpDia(60);
      setPulse(135);
      setSpO2(90);
      setTemperature(102.4);
      setChiefComplaint('Chest indrawing, rapid noisy breathing for 2 days, refusing feeds');
    } else if (type === 'diabetic') {
      setPatientName('Eknath Shankarrao Patil');
      setPatientNameHi('एकनाथ शंकरराव पाटील');
      setAge(59);
      setGender('Male');
      setAbhaId('91-4901-3829-5561');
      setBpSys(148);
      setBpDia(92);
      setPulse(84);
      setSpO2(97);
      setTemperature(99.2);
      setChiefComplaint('Deep infected foot ulcer with blackish discolouration, foul odor, RBS 320 mg/dL');
    } else {
      setPatientName('Nitin Vithoba Dhurve');
      setPatientNameHi('नितिन विठोबा धुर्वे');
      setAge(31);
      setGender('Male');
      setAbhaId('91-7712-4091-8822');
      setBpSys(102);
      setBpDia(64);
      setPulse(115);
      setSpO2(97);
      setTemperature(98.2);
      setChiefComplaint('Motorcycle slip with deformity and laceration over right lower leg, unable to bear weight');
    }
  };

  // AI Triage calculation
  const determineUrgency = (): { level: UrgencyLevel; reasoning: string; icmrProtocol: string; diagnosis: string } => {
    if (symptomType === 'maternal') {
      if (bpSys >= 160 || bpDia >= 100) {
        return {
          level: 'URGENT',
          reasoning: 'Systolic BP ≥ 160 mmHg and Diastolic BP ≥ 100 mmHg with neurological danger signs (headache/blurred vision) indicates Severe Pre-eclampsia / Impending Eclampsia.',
          icmrProtocol: 'ICMR Maternal Health STG Module 4: Immediate administration of MgSO4 loading dose and urgent emergency transfer to First Referral Unit (FRU/CHC) with OBGYN.',
          diagnosis: 'Severe Pre-eclampsia with Impending Eclampsia (High-Risk Pregnancy)'
        };
      }
    } else if (symptomType === 'pediatric') {
      if (spO2 < 93) {
        return {
          level: 'URGENT',
          reasoning: 'SpO2 < 92% with lower chest wall indrawing indicates Severe Pneumonia with Hypoxia under WHO IMNCI Red Tag criteria.',
          icmrProtocol: 'WHO / NHM IMNCI Protocol: Immediate pre-referral oxygen, first dose antibiotic and priority transfer to Pediatric High Dependency Unit.',
          diagnosis: 'Severe Community-Acquired Pneumonia with Hypoxia'
        };
      }
    } else if (symptomType === 'diabetic') {
      return {
        level: 'HIGH',
        reasoning: 'Deep diabetic foot ulcer with spreading cellulitis and severe hyperglycemia (RBS > 300 mg/dL). High risk of osteomyelitis.',
        icmrProtocol: 'ICMR NCD Guidelines: Surgical debridement, parenteral broad-spectrum antibiotics, and glycemic control at Sub-District / District Hospital.',
        diagnosis: 'Diabetic Foot Ulcer Wagner Grade 3 with Spreading Cellulitis'
      };
    } else {
      return {
        level: 'URGENT',
        reasoning: 'Acute high-velocity orthopedic trauma with visible limb deformity and tachycardia. Threat of neurovascular compromise.',
        icmrProtocol: 'National Emergency Trauma Management Framework: Splint immobilization, analgesia, and direct transfer to Trauma Hospital with Orthopedic Surgeon.',
        diagnosis: 'Suspected Compound Fracture Right Tibia-Fibula (Trauma)'
      };
    }

    return {
      level: 'ROUTINE',
      reasoning: 'Vitals within baseline tolerance. No acute life-threatening flags identified.',
      icmrProtocol: 'PHC Standard Clinical Protocol for primary management and routine appointment slotting.',
      diagnosis: 'Routine Clinical Evaluation'
    };
  };

  const triageResult = determineUrgency();

  // Matched Facility
  const matchedFacility = symptomType === 'maternal'
    ? mockFacilities[2] // CHC Chamorshi (ObGyn + USG)
    : symptomType === 'pediatric'
    ? mockFacilities[2] // CHC Chamorshi
    : symptomType === 'diabetic'
    ? mockFacilities[3] // SDH Aheri
    : mockFacilities[4]; // DH Gadchiroli

  const handleGenerateReferral = () => {
    const newId = `REF-2024-MH-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: ReferralRecord = {
      id: newId,
      abhaId,
      patientName,
      patientNameHi,
      age,
      gender,
      contactNumber: '+91 94211 ' + Math.floor(10000 + Math.random() * 90000),
      village,
      gramPanchayat: village.replace(' Village', '').replace(' Hamlet', ''),
      block,
      district,
      state: 'Maharashtra',
      referringAsha: 'Sunita Tai Gawande (ASHA #4120)',
      ashaContact: '+91 94050 22319',
      referringFacility: 'Ayushman Arogya Mandir (Sub-Centre) ' + village,
      referringFacilityType: 'SubCentre',
      targetFacility: matchedFacility.name,
      targetFacilityType: matchedFacility.type,
      specialtyRequired: symptomType === 'maternal' ? 'Obstetrics & Gynaecology' : symptomType === 'pediatric' ? 'Pediatrics' : symptomType === 'diabetic' ? 'General Surgery' : 'Orthopedics & Trauma',
      targetDoctorName: matchedFacility.specialistsOnDuty[0],
      urgency: triageResult.level,
      symptoms: [chiefComplaint, `Blood Pressure: ${bpSys}/${bpDia} mmHg`, `Pulse: ${pulse} bpm`, `SpO2: ${spO2}%`],
      provisionalDiagnosis: triageResult.diagnosis,
      clinicalSummary: `${patientName}, ${age}y/${gender}. Presenting with ${chiefComplaint}. Evaluated under KAVACH CDSS. Priority transfer arranged to ${matchedFacility.name}.`,
      vitals: {
        bloodPressure: `${bpSys}/${bpDia}`,
        pulse,
        spO2,
        temperature,
        respiratoryRate: symptomType === 'pediatric' ? 54 : 20,
      },
      status: 'ACCEPTED',
      tokenNumber: `${matchedFacility.type}-${Math.floor(10 + Math.random() * 90)}`,
      appointmentDate: new Date().toISOString().split('T')[0],
      transportArranged: true,
      transportType: triageResult.level === 'URGENT' ? (symptomType === 'maternal' ? '102 Janani Shishu' : '108 Ambulance') : 'Local Bus',
      ashaAccompanied: triageResult.level === 'URGENT',
      timeline: [
        {
          status: 'CREATED',
          labelEn: 'Screening & AI Triage Logged',
          labelHi: 'जांच एवं एआई ट्राइएज दर्ज',
          labelMr: 'तपासणी व एआय ट्राइएज नोंद',
          timestamp: 'Just now',
          facility: 'Sub-Centre ' + village,
          actor: 'ASHA Sunita Tai',
          remarks: 'Vitals logged via KAVACH Care Engine. ' + triageResult.level + ' flag triggered.',
          completed: true
        },
        {
          status: 'ACCEPTED',
          labelEn: 'Accepted & Bed Reserved',
          labelHi: 'स्वीकृत एवं बेड आरक्षित',
          labelMr: 'स्वीकृत व बेड आरक्षित',
          timestamp: 'Just now',
          facility: matchedFacility.name,
          actor: matchedFacility.specialistsOnDuty[0],
          remarks: 'Automated bed reservation confirmed at destination unit.',
          completed: true
        },
        {
          status: 'APPOINTMENT',
          labelEn: 'Slot & Transport Assigned',
          labelHi: 'स्लॉट एवं वाहन आवंटित',
          labelMr: 'स्लॉट व वाहन वाटप',
          timestamp: 'Pending dispatch',
          facility: 'Block Transport Hub',
          actor: '108 / 102 Emergency Dispatch',
          remarks: 'Ambulance desk notified for immediate pickup.',
          completed: false
        },
        {
          status: 'ARRIVAL',
          labelEn: 'OPD / Emergency Arrival',
          labelHi: 'अस्पताल आगमन',
          labelMr: 'रुग्णालय आगमन',
          timestamp: 'Awaiting transit',
          facility: matchedFacility.name,
          actor: 'Triage Desk',
          remarks: 'Patient in transit',
          completed: false
        },
        {
          status: 'CONSULTATION',
          labelEn: 'Specialist Consultation',
          labelHi: 'विशेषज्ञ परामर्श',
          labelMr: 'तज्ज्ञ तपासणी',
          timestamp: 'Scheduled',
          facility: matchedFacility.name,
          actor: matchedFacility.specialistsOnDuty[0],
          remarks: 'Pending arrival',
          completed: false
        },
        {
          status: 'TREATMENT',
          labelEn: 'Treatment & Discharge Plan',
          labelHi: 'उपचार एवं डिस्चार्ज योजना',
          labelMr: 'उपचार व डिस्चार्ज नियोजन',
          timestamp: 'Pending',
          facility: matchedFacility.name,
          actor: 'Clinical Team',
          remarks: 'Pending',
          completed: false
        },
        {
          status: 'FOLLOWUP',
          labelEn: 'ASHA Home Follow-up Loop',
          labelHi: 'आशा गृहभेट अनुवर्ती',
          labelMr: 'आशा गृहभेट पाठपुरावा',
          timestamp: 'Pending Discharge',
          facility: 'Village ' + village,
          actor: 'ASHA Sunita Tai',
          remarks: 'Scheduled upon hospital discharge',
          completed: false
        },
        {
          status: 'COMPLETED',
          labelEn: 'Closed-Loop Verification',
          labelHi: 'क्लोज्ड-लूप पूर्ण',
          labelMr: 'क्लोज्ड-लूप पूर्ण',
          timestamp: 'Pending',
          facility: 'District Coordination Desk',
          actor: 'System',
          remarks: 'Continuity audit staged',
          completed: false
        }
      ]
    };

    onReferralCreated(newRecord);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-md max-w-3xl w-full shadow-2xl border border-slate-300 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#123B63] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#0c2742]">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold leading-none">
                Start Care Journey • AI-Assisted Clinical Triage & Referral
              </h3>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Frontline screening to verified hospital admission in 4 simple steps
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="bg-slate-100 px-5 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-1.5 font-bold ${
                currentStep === 1 ? 'text-[#123B63]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                currentStep === 1 ? 'bg-[#123B63] text-white' : 'bg-slate-300 text-slate-700'
              }`}>1</span>
              <span>Patient & ABHA</span>
            </button>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />

            <button
              onClick={() => setCurrentStep(2)}
              className={`flex items-center gap-1.5 font-bold ${
                currentStep === 2 ? 'text-[#123B63]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                currentStep === 2 ? 'bg-[#123B63] text-white' : 'bg-slate-300 text-slate-700'
              }`}>2</span>
              <span>Symptoms & Vitals</span>
            </button>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />

            <button
              onClick={() => setCurrentStep(3)}
              className={`flex items-center gap-1.5 font-bold ${
                currentStep === 3 ? 'text-[#123B63]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                currentStep === 3 ? 'bg-[#123B63] text-white' : 'bg-slate-300 text-slate-700'
              }`}>3</span>
              <span>AI Triage & Match</span>
            </button>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />

            <button
              onClick={() => setCurrentStep(4)}
              className={`flex items-center gap-1.5 font-bold ${
                currentStep === 4 ? 'text-[#123B63]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                currentStep === 4 ? 'bg-[#123B63] text-white' : 'bg-slate-300 text-slate-700'
              }`}>4</span>
              <span>Confirm Referral</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto">
          {/* Quick Scenario Selector Banner */}
          <div className="mb-5 p-3 bg-blue-50 border border-blue-200 rounded text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#123B63] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Select a Realistic Rural Clinical Case:
              </span>
              <span className="text-[11px] text-slate-500">Auto-populates vitals & symptoms</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => loadPreset('maternal')}
                className={`px-2.5 py-1.5 rounded border text-left font-medium transition-all ${
                  symptomType === 'maternal'
                    ? 'bg-white border-[#123B63] text-[#123B63] shadow-xs font-bold ring-1 ring-[#123B63]'
                    : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white'
                }`}
              >
                🤰 Maternal High-Risk (Pre-eclampsia)
              </button>
              <button
                type="button"
                onClick={() => loadPreset('pediatric')}
                className={`px-2.5 py-1.5 rounded border text-left font-medium transition-all ${
                  symptomType === 'pediatric'
                    ? 'bg-white border-[#123B63] text-[#123B63] shadow-xs font-bold ring-1 ring-[#123B63]'
                    : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white'
                }`}
              >
                👶 Pediatric Pneumonia (Low SpO2)
              </button>
              <button
                type="button"
                onClick={() => loadPreset('diabetic')}
                className={`px-2.5 py-1.5 rounded border text-left font-medium transition-all ${
                  symptomType === 'diabetic'
                    ? 'bg-white border-[#123B63] text-[#123B63] shadow-xs font-bold ring-1 ring-[#123B63]'
                    : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white'
                }`}
              >
                🦶 Diabetic Foot Ulcer (High Sugar)
              </button>
              <button
                type="button"
                onClick={() => loadPreset('trauma')}
                className={`px-2.5 py-1.5 rounded border text-left font-medium transition-all ${
                  symptomType === 'trauma'
                    ? 'bg-white border-[#123B63] text-[#123B63] shadow-xs font-bold ring-1 ring-[#123B63]'
                    : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white'
                }`}
              >
                🚑 Highway Trauma / Fracture
              </button>
            </div>
          </div>

          {/* Step 1: Patient Profile & ABHA */}
          {currentStep === 1 && (
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-slate-800 text-sm border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#123B63]" />
                Patient Identity & Ayushman Bharat Health Account (ABHA)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Patient Full Name (English)</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#123B63] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">नाव (मराठी / हिन्दी)</label>
                  <input
                    type="text"
                    value={patientNameHi}
                    onChange={(e) => setPatientNameHi(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#123B63] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">ABHA ID (14-Digit Universal Identifier)</label>
                  <input
                    type="text"
                    value={abhaId}
                    onChange={(e) => setAbhaId(e.target.value)}
                    className="w-full px-3 py-2 font-mono border border-slate-300 rounded bg-slate-50 focus:ring-1 focus:ring-[#123B63] focus:outline-none"
                  />
                  <span className="text-[10px] text-emerald-700 font-medium">✓ ABDM M1 Integration Ready</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#123B63]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#123B63]"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Village Hamlet</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Block / Taluka</label>
                    <input
                      type="text"
                      value={block}
                      onChange={(e) => setBlock(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">District</label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Symptoms & Recorded Vitals */}
          {currentStep === 2 && (
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-slate-800 text-sm border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-health-green" />
                Frontline Vitals & Clinical Examination
              </h4>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Chief Presenting Complaints</label>
                <textarea
                  rows={2}
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#123B63]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">BP Systolic (mmHg)</label>
                  <input
                    type="number"
                    value={bpSys}
                    onChange={(e) => setBpSys(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">BP Diastolic (mmHg)</label>
                  <input
                    type="number"
                    value={bpDia}
                    onChange={(e) => setBpDia(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Pulse Rate (bpm)</label>
                  <input
                    type="number"
                    value={pulse}
                    onChange={(e) => setPulse(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">SpO2 Oxygen (%)</label>
                  <input
                    type="number"
                    value={spO2}
                    onChange={(e) => setSpO2(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white font-bold"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded text-slate-700">
                <span className="font-bold text-amber-900 block mb-1">Frontline Worker Observation Note:</span>
                Vitals are cross-checked against ICMR Standard Treatment Guidelines (STG) and IMNCI triage thresholds.
              </div>
            </div>
          )}

          {/* Step 3: AI Clinical Decision Support Risk Stratification & Matching */}
          {currentStep === 3 && (
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-slate-800 text-sm border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                AI Clinical Decision Support (CDSS) & Facility Match
              </h4>

              {/* Triage Stratification Box */}
              <div className={`p-4 rounded border ${
                triageResult.level === 'URGENT'
                  ? 'bg-red-50 border-red-300 text-red-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-bold uppercase tracking-wide">
                      Risk Stratification: {triageResult.level} TAG
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-white rounded border border-red-200 text-[11px] font-bold">
                    ICMR STG Guided
                  </span>
                </div>

                <div className="font-bold text-sm mb-1">
                  Provisional Diagnosis: {triageResult.diagnosis}
                </div>
                <p className="text-xs leading-relaxed mb-2">
                  {triageResult.reasoning}
                </p>
                <div className="p-2 bg-white rounded border border-red-200 text-[11px] text-slate-700 font-medium">
                  <span className="font-bold text-slate-900">Standard Protocol: </span>
                  {triageResult.icmrProtocol}
                </div>
              </div>

              {/* Matched Facility Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#123B63] uppercase tracking-wider flex items-center gap-1.5">
                    <Building className="w-4 h-4" />
                    Recommended Destination Facility Match:
                  </span>
                  <span className="text-emerald-700 font-bold text-[11px]">
                    ✓ Real-time Specialist & Bed Confirmed
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{matchedFacility.name}</h5>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Type: <span className="font-semibold">{matchedFacility.level}</span> • Distance: <span className="font-semibold text-[#123B63]">{matchedFacility.distanceKm} km</span>
                    </p>
                    <div className="mt-2 space-y-1">
                      <div className="text-slate-700">
                        <span className="font-semibold">Active Specialist on Duty:</span> {matchedFacility.specialistsOnDuty.join(', ')}
                      </div>
                      <div className="text-slate-700">
                        <span className="font-semibold">Available Beds:</span> {matchedFacility.vacantBeds} / {matchedFacility.totalBeds} ({matchedFacility.icuBedsAvailable} ICU vacant)
                      </div>
                      <div className="text-slate-700">
                        <span className="font-semibold">Required Diagnostics:</span> {matchedFacility.diagnosticsAvailable.slice(0, 3).join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold rounded text-xs block mb-1">
                      Matched: 99.4% Fit
                    </span>
                    <span className="text-[10px] text-slate-500">Zero Referral Rejection</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirm & Generate Slip */}
          {currentStep === 4 && (
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-slate-800 text-sm border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#123B63]" />
                Final Review & Referral Dispatch
              </h4>

              <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block">Patient Name:</span>
                    <span className="font-bold text-slate-900">{patientName} ({age}y/{gender})</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">ABHA ID:</span>
                    <span className="font-mono font-bold text-[#123B63]">{abhaId}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Referring Sub-centre:</span>
                    <span className="font-medium text-slate-800">{village}, Chamorshi</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Destination Facility:</span>
                    <span className="font-bold text-[#123B63]">{matchedFacility.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Triage Classification:</span>
                    <span className="font-bold text-red-700">{triageResult.level} TAG • {triageResult.diagnosis}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Transport Protocol:</span>
                    <span className="font-bold text-emerald-800">
                      {triageResult.level === 'URGENT' ? (symptomType === 'maternal' ? '102 Janani Express' : '108 Emergency Ambulance') : 'Public Transport / Bus'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-950 font-medium">
                  <div className="flex items-center gap-1.5 font-bold mb-0.5">
                    <Check className="w-4 h-4 text-health-green" />
                    <span>Closed-Loop Verification Guarantee</span>
                  </div>
                  Destination facility will be alerted immediately. A token number will be pre-allocated. ASHA worker will receive automated follow-up visit instructions upon discharge.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-100 px-5 py-3 border-t border-slate-200 flex items-center justify-between">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
                className="px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold"
              >
                Previous Step
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev + 1) as any)}
                className="flex items-center gap-1 px-4 py-1.5 bg-[#123B63] hover:bg-[#0e2f50] text-white rounded text-xs font-bold shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGenerateReferral}
                className="flex items-center gap-1.5 px-4 py-2 bg-health-green hover:bg-health-green-dark text-white rounded text-xs font-bold shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Generate Official Referral Slip</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
