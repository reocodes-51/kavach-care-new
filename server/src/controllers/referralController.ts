import { Response } from 'express';
import { Referral, ReferralStatus } from '../models/Referral.js';
import { Notification } from '../models/Notification.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

const STATUS_LABELS: Record<ReferralStatus, string> = {
  CREATED: 'Referral Created & Issued',
  ACCEPTED: 'Inward Referral Accepted by Facility',
  APPOINTMENT: 'Specialist OPD Slot Reserved',
  ARRIVED: 'Patient Checked In at Facility Reception',
  CONSULTATION: 'Clinical Consultation with Specialist',
  DIAGNOSTICS: 'Diagnostic Tests & Lab Investigations',
  TREATMENT: 'Treatment Plan / Inpatient Care Initiated',
  FOLLOW_UP: 'E-Discharge Issued & ASHA Follow-up Assigned',
  COMPLETED: 'Closed-Loop Care Journey Completed'
};

// @route   GET /api/referrals
export const getReferrals = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, patientId, facilityId, priority } = req.query;
    const query: any = {};

    if (status && status !== 'ALL') {
      query.currentStatus = status;
    }
    if (patientId) {
      query.patient = patientId;
    }
    if (facilityId) {
      query.$or = [{ fromFacility: facilityId }, { toFacility: facilityId }];
    }
    if (priority) {
      query.priority = priority;
    }

    const referrals = await Referral.find(query)
      .populate('patient')
      .populate('fromFacility')
      .populate('toFacility')
      .populate('assignedDoctor')
      .populate('referredBy', 'name role')
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      count: referrals.length,
      referrals
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch referrals' });
  }
};

// @route   GET /api/referrals/:id
export const getReferralById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const referral = await Referral.findById(req.params.id)
      .populate('patient')
      .populate('fromFacility')
      .populate('toFacility')
      .populate('assignedDoctor')
      .populate('referredBy', 'name role phone');

    if (!referral) {
      res.status(404).json({ success: false, message: 'Referral not found' });
      return;
    }

    res.json({ success: true, referral });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch referral' });
  }
};

// @route   POST /api/referrals
export const createReferral = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { patientId, toFacilityId, fromFacilityId, specialtyRequired, clinicalSummary, priority, transportMode, provisionalDiagnosis } = req.body;

    if (!patientId || !toFacilityId || !specialtyRequired || !clinicalSummary) {
      res.status(400).json({
        success: false,
        message: 'Patient, target facility, specialty, and clinical summary are required'
      });
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referralCode = `REF-2024-MP-${randomSuffix}`;

    const initialMilestone = {
      status: 'CREATED' as ReferralStatus,
      label: STATUS_LABELS.CREATED,
      timestamp: new Date(),
      actorName: req.user?.name || 'Frontline Health Worker',
      notes: 'Referral package created with vitals and provisional triage summary'
    };

    const referral = await Referral.create({
      referralCode,
      patient: patientId,
      toFacility: toFacilityId,
      fromFacility: fromFacilityId,
      referredBy: req.user?._id,
      specialtyRequired,
      clinicalSummary,
      provisionalDiagnosis: provisionalDiagnosis || 'Pending specialist evaluation',
      priority: priority || 'ROUTINE',
      currentStatus: 'CREATED',
      timeline: [initialMilestone],
      transportMode: transportMode || '108 Emergency Ambulance',
      ambulanceContact: '108 / +91 98260 12345'
    });

    // Create notification for receiving facility
    await Notification.create({
      recipientRole: 'FACILITY',
      title: `New Inward Referral (${priority || 'ROUTINE'})`,
      message: `Inward referral ${referralCode} initiated for ${specialtyRequired}`,
      type: 'REFERRAL_ACCEPTED',
      relatedId: referral._id.toString()
    });

    const populated = await Referral.findById(referral._id)
      .populate('patient')
      .populate('toFacility')
      .populate('fromFacility');

    res.status(201).json({
      success: true,
      message: 'Referral created successfully',
      referral: populated
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to create referral' });
  }
};

// @route   PUT /api/referrals/:id/status
export const updateReferralStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, notes, actorName } = req.body;

    const validStatuses: ReferralStatus[] = [
      'CREATED',
      'ACCEPTED',
      'APPOINTMENT',
      'ARRIVED',
      'CONSULTATION',
      'DIAGNOSTICS',
      'TREATMENT',
      'FOLLOW_UP',
      'COMPLETED'
    ];

    if (!validStatuses.includes(status)) {
      res.status(400).json({ success: false, message: `Invalid status. Valid values: ${validStatuses.join(', ')}` });
      return;
    }

    const referral = await Referral.findById(req.params.id);
    if (!referral) {
      res.status(404).json({ success: false, message: 'Referral not found' });
      return;
    }

    referral.currentStatus = status;
    referral.timeline.push({
      status,
      label: STATUS_LABELS[status as ReferralStatus],
      timestamp: new Date(),
      actorName: actorName || req.user?.name || 'Authorized Staff',
      notes: notes || `Status updated to ${status}`
    });

    await referral.save();

    // Notify patient and ASHA worker on milestone updates
    await Notification.create({
      recipientRole: 'ALL',
      title: `Referral Status: ${STATUS_LABELS[status as ReferralStatus]}`,
      message: `Referral ${referral.referralCode} has progressed to ${status}`,
      type: 'REFERRAL_ACCEPTED',
      relatedId: referral._id.toString()
    });

    const updated = await Referral.findById(referral._id)
      .populate('patient')
      .populate('toFacility')
      .populate('assignedDoctor');

    res.json({
      success: true,
      message: `Referral status updated to ${status}`,
      referral: updated
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to update referral status' });
  }
};

// @route   GET /api/referrals/track/:code
export const getReferralByCode = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const code = req.params.code;
    const referral = await Referral.findOne({ referralCode: code.toUpperCase() })
      .populate('patient')
      .populate('fromFacility')
      .populate('toFacility')
      .populate('assignedDoctor')
      .populate('referredBy', 'name role phone');

    if (!referral) {
      res.status(404).json({ success: false, message: `Referral code ${code} not found` });
      return;
    }

    res.json({ success: true, referral });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch referral' });
  }
};

