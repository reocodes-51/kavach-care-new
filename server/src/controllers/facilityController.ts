import { Request, Response } from 'express';
import { Facility } from '../models/Facility.js';
import { FacilityService } from '../models/FacilityService.js';
import { Doctor } from '../models/Doctor.js';
import { matchFacilities } from '../services/facilityMatchService.js';

// @route   GET /api/facilities
export const getFacilities = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, district, teleconsultation } = req.query;
    const query: any = {};

    if (type && type !== 'ALL') {
      query.type = type;
    }
    if (district) {
      query.district = { $regex: String(district), $options: 'i' };
    }
    if (teleconsultation === 'true') {
      query.teleconsultation = true;
    }

    const facilities = await Facility.find(query).sort({ distanceKm: 1 });

    res.json({
      success: true,
      count: facilities.length,
      facilities
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch facilities' });
  }
};

// @route   GET /api/facilities/:id
export const getFacilityById = async (req: Request, res: Response): Promise<void> => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      res.status(404).json({ success: false, message: 'Facility not found' });
      return;
    }

    // Fetch related services and doctors
    const services = await FacilityService.find({ facilityId: facility._id });
    const doctors = await Doctor.find({ facilityId: facility._id });

    res.json({
      success: true,
      facility,
      services,
      doctors
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch facility details' });
  }
};

// @route   POST /api/facilities/match
export const matchFacilitiesEndpoint = async (req: Request, res: Response): Promise<void> => {
  try {
    const { requiredService, facilityType, maxDistanceKm, emergencyOnly } = req.body;

    const matches = await matchFacilities({
      requiredService,
      facilityType,
      maxDistanceKm,
      emergencyOnly
    });

    res.json({
      success: true,
      count: matches.length,
      matches
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to match facilities' });
  }
};
