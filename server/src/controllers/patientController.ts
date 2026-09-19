import { Response } from 'express';
import { Patient } from '../models/Patient.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

// @route   GET /api/patients
export const getPatients = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { search, village, risk } = req.query;
    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: String(search), $options: 'i' } },
        { abhaId: { $regex: String(search), $options: 'i' } },
        { kvcId: { $regex: String(search), $options: 'i' } },
        { phone: { $regex: String(search), $options: 'i' } }
      ];
    }

    if (village) {
      query.village = { $regex: String(village), $options: 'i' };
    }

    const patients = await Patient.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: patients.length,
      patients
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch patients' });
  }
};

// @route   GET /api/patients/:id
export const getPatientById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      res.status(404).json({ success: false, message: 'Patient not found' });
      return;
    }
    res.json({ success: true, patient });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch patient details' });
  }
};

// @route   POST /api/patients
export const createPatient = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, age, gender, phone, village, district, state, emergencyContact, bloodGroup, medicalHistory, chronicConditions } = req.body;

    if (!name || !age || !gender || !phone || !village) {
      res.status(400).json({ success: false, message: 'Please provide name, age, gender, phone, and village' });
      return;
    }

    // Generate unique ABHA and KVC IDs
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const abhaId = `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${randomSuffix}`;
    const kvcId = `KVC-${randomSuffix}`;

    const patient = await Patient.create({
      abhaId,
      kvcId,
      name,
      age: Number(age),
      gender,
      phone,
      village,
      district: district || 'Sehore',
      state: state || 'Madhya Pradesh',
      emergencyContact: emergencyContact || {},
      bloodGroup: bloodGroup || 'B+',
      registeredBy: req.user?._id,
      medicalHistory: medicalHistory || [],
      chronicConditions: chronicConditions || []
    });

    res.status(201).json({
      success: true,
      message: 'Patient registered successfully',
      patient
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to register patient' });
  }
};

// @route   PUT /api/patients/:id
export const updatePatient = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!patient) {
      res.status(404).json({ success: false, message: 'Patient not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Patient updated successfully',
      patient
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to update patient' });
  }
};
