import { RiskLevel } from '../models/Screening.js';

export interface TriageInput {
  symptoms: string[];
  duration?: string;
  vitals?: {
    bloodPressureSys?: number;
    bloodPressureDia?: number;
    pulseRate?: number;
    temperatureF?: number;
    spO2?: number;
    respiratoryRate?: number;
    randomBloodSugar?: number;
  };
  medicalHistory?: string[];
  age?: number;
}

export interface TriageResult {
  riskLevel: RiskLevel;
  recommendedFacilityType: 'SUB_CENTRE' | 'PHC' | 'CHC' | 'DISTRICT_HOSPITAL';
  aiSummary: {
    title: string;
    clinicalObservation: string;
    priorityNotice: string;
    recommendedFacilityType: string;
    suggestedActions: string[];
    disclaimer: string;
  };
}

export const analyzeTriage = (input: TriageInput): TriageResult => {
  const symptoms = (input.symptoms || []).map((s) => s.toLowerCase());
  const vitals = input.vitals || {};

  let score = 0;
  const criticalFindings: string[] = [];

  // Vitals red flags (ICMR standard triage rules)
  if (vitals.spO2 && vitals.spO2 < 92) {
    score += 5;
    criticalFindings.push(`Low SpO2: ${vitals.spO2}% (<92%)`);
  }
  if (vitals.bloodPressureSys && vitals.bloodPressureSys >= 160) {
    score += 4;
    criticalFindings.push(`Severe Systolic Hypertension: ${vitals.bloodPressureSys} mmHg`);
  }
  if (vitals.bloodPressureDia && vitals.bloodPressureDia >= 110) {
    score += 4;
    criticalFindings.push(`Severe Diastolic Hypertension: ${vitals.bloodPressureDia} mmHg`);
  }
  if (vitals.temperatureF && vitals.temperatureF >= 103) {
    score += 3;
    criticalFindings.push(`High Grade Pyrexia: ${vitals.temperatureF}°F`);
  }
  if (vitals.pulseRate && (vitals.pulseRate > 120 || vitals.pulseRate < 50)) {
    score += 3;
    criticalFindings.push(`Abnormal Pulse: ${vitals.pulseRate} bpm`);
  }

  // Symptom red flags
  const criticalKeywords = ['chest pain', 'unconscious', 'convulsion', 'heavy bleeding', 'breathless', 'shortness of breath'];
  const urgentKeywords = ['high fever', 'fever', 'vomiting', 'severe headache', 'blurred vision', 'dizziness'];

  for (const kw of criticalKeywords) {
    if (symptoms.some((s) => s.includes(kw))) {
      score += 5;
      criticalFindings.push(`Reported acute emergency symptom: ${kw}`);
    }
  }

  for (const kw of urgentKeywords) {
    if (symptoms.some((s) => s.includes(kw))) {
      score += 2;
    }
  }

  let riskLevel: RiskLevel = 'LOW';
  let recommendedFacilityType: 'SUB_CENTRE' | 'PHC' | 'CHC' | 'DISTRICT_HOSPITAL' = 'PHC';
  let priorityNotice = 'Standard Clinical Assessment: Routine Consultation';

  if (score >= 8) {
    riskLevel = 'CRITICAL';
    recommendedFacilityType = 'DISTRICT_HOSPITAL';
    priorityNotice = 'Emergency Care Pathway: Immediate stabilization and transport';
  } else if (score >= 4) {
    riskLevel = 'HIGH';
    recommendedFacilityType = 'CHC';
    priorityNotice = 'Risk Prioritization: Urgent First Referral Unit (FRU) evaluation';
  } else if (score >= 2) {
    riskLevel = 'MODERATE';
    recommendedFacilityType = 'CHC';
    priorityNotice = 'Risk Prioritization: Clinical review required within 24 hours';
  } else {
    riskLevel = 'LOW';
    recommendedFacilityType = 'PHC';
    priorityNotice = 'Primary Care Pathway: Local PHC / Ayushman Arogya Mandir review';
  }

  const actions: string[] = [];
  if (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
    actions.push('Dispatch 108 Emergency Ambulance service');
    actions.push('Reserve Inward Emergency / Specialist OPD token');
    actions.push('Alert receiving Medical Officer with pre-consult vitals telemetry');
  } else {
    actions.push('Book routine consultation appointment at nearest PHC / CHC');
    actions.push('Schedule ASHA home hydration and temperature tracking visit');
  }

  const observation = criticalFindings.length > 0
    ? `Patient presents with high-risk clinical markers: ${criticalFindings.join('; ')}.`
    : `Patient reports ${symptoms.slice(0, 3).join(', ') || 'general symptoms'}. Vitals remain in non-critical thresholds.`;

  return {
    riskLevel,
    recommendedFacilityType,
    aiSummary: {
      title: 'AI-assisted screening summary',
      clinicalObservation: observation,
      priorityNotice,
      recommendedFacilityType,
      suggestedActions: actions,
      disclaimer: 'AI assists healthcare workflows. Final clinical decisions remain strictly with healthcare professionals.'
    }
  };
};
