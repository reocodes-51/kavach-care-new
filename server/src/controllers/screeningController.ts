import { Response } from 'express';
import { Screening } from '../models/Screening.js';
import { Patient } from '../models/Patient.js';
import { Facility } from '../models/Facility.js';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { analyzeTriage } from '../services/aiTriageService.js';

// @route   POST /api/screenings
export const createScreening = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { patientId, symptoms, duration, vitals, medicalHistory, notes } = req.body;

    if (!patientId || !symptoms || symptoms.length === 0) {
      res.status(400).json({ success: false, message: 'Patient ID and at least one symptom are required' });
      return;
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      res.status(404).json({ success: false, message: 'Patient not found' });
      return;
    }

    // Run clinical safety-aligned AI triage rules
    const triageResult = analyzeTriage({
      symptoms,
      duration,
      vitals,
      medicalHistory,
      age: patient.age
    });

    // Auto-match nearest facility of recommended type
    const recommendedFacility = await Facility.findOne({
      type: triageResult.recommendedFacilityType,
      status: 'OPERATIONAL'
    });

    const screening = await Screening.create({
      patient: patientId,
      screenedBy: req.user?._id,
      symptoms,
      duration: duration || '3 days',
      vitals: vitals || {},
      medicalHistory: medicalHistory || patient.medicalHistory,
      notes,
      riskLevel: triageResult.riskLevel,
      aiSummary: triageResult.aiSummary,
      recommendedFacilityId: recommendedFacility?._id,
      status: 'COMPLETED'
    });

    const populatedScreening = await Screening.findById(screening._id)
      .populate('patient')
      .populate('recommendedFacilityId');

    res.status(201).json({
      success: true,
      message: 'Screening created successfully',
      screening: populatedScreening
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to create screening' });
  }
};

// @route   GET /api/screenings/:id
export const getScreeningById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const screening = await Screening.findById(req.params.id)
      .populate('patient')
      .populate('recommendedFacilityId')
      .populate('screenedBy', 'name role phone');

    if (!screening) {
      res.status(404).json({ success: false, message: 'Screening record not found' });
      return;
    }

    res.json({ success: true, screening });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch screening' });
  }
};

// @route   GET /api/screenings/patient/:patientId
export const getPatientScreenings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const screenings = await Screening.find({ patient: req.params.patientId })
      .populate('recommendedFacilityId')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: screenings.length, screenings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch patient screenings' });
  }
};
