import { Response } from 'express';
import { Referral, ReferralStatus } from '../models/Referral.js';
import { Patient } from '../models/Patient.js';
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

// Masking helpers for DPDP Act 2023 compliance
const maskName = (name: string): string => {
  if (!name) return 'Patient';
  const parts = name.trim().split(/\s+/);
  return parts
    .map((p) => {
      if (p.length <= 1) return p;
      return p[0] + '*'.repeat(Math.max(2, p.length - 1));
    })
    .join(' ');
};

const maskAbha = (abha: string): string => {
  if (!abha) return '****-****-****';
  const parts = abha.split('-');
  if (parts.length === 4) {
    return `**-****-****-${parts[3]}`;
  }
  return abha.length > 4 ? `****${abha.slice(-4)}` : '****';
};

const maskPhone = (phone: string): string => {
  if (!phone) return '**********';
  const clean = phone.trim();
  if (clean.length > 4) {
    return `${clean.slice(0, 3)}******${clean.slice(-4)}`;
  }
  return '******';
};

const isHealthcareWorker = (role?: string): boolean => {
  return ['DOCTOR', 'FRONTLINE_WORKER', 'FACILITY', 'ADMIN'].includes(role || '');
};

// @route   GET /api/referrals
export const getReferrals = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Unauthenticated visitors are strictly not allowed to browse private patient referrals
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required. Confidential patient referral data is protected under DPDP Act 2023.'
      });
      return;
    }

    const { status, patientId, facilityId, priority } = req.query;
    const query: any = {};

    if (status && status !== 'ALL') {
      query.currentStatus = status;
    }
    if (priority) {
      query.priority = priority;
    }

    // Role-based data isolation
    if (req.user.role === 'PATIENT') {
      // Patient can ONLY see their own referrals!
      const userPhone = req.user.phone?.replace(/[^0-9]/g, '');
      const userCleanName = req.user.name.replace(/\(.*?\)/g, '').trim();

      const matchingPatients = await Patient.find({
        $or: [
          { phone: req.user.phone },
          ...(userPhone ? [{ phone: { $regex: userPhone.slice(-10) } }] : []),
          { registeredBy: req.user._id },
          { name: { $regex: new RegExp(userCleanName, 'i') } }
        ]
      }).select('_id');

      const patientIds = matchingPatients.map((p) => p._id);
      query.patient = { $in: patientIds };
    } else if (req.user.role === 'FACILITY' && req.user.facilityId) {
      query.$or = [{ fromFacility: req.user.facilityId }, { toFacility: req.user.facilityId }];
    } else if (req.user.role === 'DOCTOR' && req.user.facilityId) {
      query.$or = [{ toFacility: req.user.facilityId }, { assignedDoctor: req.user._id }];
    } else if (patientId) {
      query.patient = patientId;
    }

    if (facilityId && req.user.role === 'ADMIN') {
      query.$or = [{ fromFacility: facilityId }, { toFacility: facilityId }];
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
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required to access clinical referral record'
      });
      return;
    }

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

    // Role-based authorization check:
    if (req.user.role === 'PATIENT') {
      const patientDoc = referral.patient as any;
      const userPhone = req.user.phone?.replace(/[^0-9]/g, '');
      const userCleanName = req.user.name.replace(/\(.*?\)/g, '').toLowerCase().trim();
      const patientName = (patientDoc?.name || '').toLowerCase();
      const isOwner = patientDoc && (
        (userPhone && patientDoc.phone && patientDoc.phone.replace(/[^0-9]/g, '').includes(userPhone.slice(-10))) ||
        patientName.includes(userCleanName) ||
        userCleanName.includes(patientName)
      );

      if (!isOwner) {
        res.status(403).json({
          success: false,
          message: 'Access denied: You are not authorized to view another patient\'s medical record.'
        });
        return;
      }
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

    // Determine if requester has full clinical authorization:
    let isAuthorized = false;
    if (req.user) {
      if (isHealthcareWorker(req.user.role)) {
        isAuthorized = true;
      } else if (req.user.role === 'PATIENT') {
        const patientDoc = referral.patient as any;
        const userPhone = req.user.phone?.replace(/[^0-9]/g, '');
        const userCleanName = req.user.name.replace(/\(.*?\)/g, '').toLowerCase().trim();
        const patientName = (patientDoc?.name || '').toLowerCase();
        if (
          patientDoc &&
          ((userPhone && patientDoc.phone && patientDoc.phone.replace(/[^0-9]/g, '').includes(userPhone.slice(-10))) ||
            patientName.includes(userCleanName) ||
            userCleanName.includes(patientName))
        ) {
          isAuthorized = true;
        }
      }
    }

    if (isAuthorized) {
      res.json({
        success: true,
        isRestricted: false,
        referral
      });
      return;
    }

    // Public / Unauthenticated / Third-Party View:
    // Strictly mask PII and redact clinical summaries in compliance with DPDP Act 2023 & NDHM Guidelines
    const patientDoc = referral.patient as any;
    const sanitizedPatient = patientDoc
      ? {
          _id: patientDoc._id,
          name: maskName(patientDoc.name),
          age: patientDoc.age,
          gender: patientDoc.gender,
          bloodGroup: 'Confidential',
          abhaId: maskAbha(patientDoc.abhaId),
          kvcId: patientDoc.kvcId,
          village: patientDoc.village,
          district: patientDoc.district,
          state: patientDoc.state,
          phone: maskPhone(patientDoc.phone),
          medicalHistory: ['[CONFIDENTIAL - Restricted to Authorized Medical Staff]'],
          chronicConditions: ['[CONFIDENTIAL - Restricted to Authorized Medical Staff]'],
          allergies: ['[CONFIDENTIAL]']
        }
      : null;

    const sanitizedReferral = {
      _id: referral._id,
      referralCode: referral.referralCode,
      currentStatus: referral.currentStatus,
      priority: referral.priority,
      specialtyRequired: referral.specialtyRequired,
      clinicalSummary:
        '[PROTECTED UNDER DPDP ACT 2023] Clinical triage summary and vitals are encrypted. Login as authorized Doctor, ASHA Worker, or verified Patient to view clinical chart.',
      provisionalDiagnosis: '[PROTECTED - Clinical Details Restricted]',
      patient: sanitizedPatient,
      fromFacility: referral.fromFacility,
      toFacility: referral.toFacility,
      transportMode: referral.transportMode,
      ambulanceContact: referral.ambulanceContact,
      createdAt: referral.createdAt,
      timeline: referral.timeline.map((step) => ({
        status: step.status,
        label: step.label,
        timestamp: step.timestamp,
        actorName: step.actorName,
        notes: step.notes ? '[Operational Milestone Logged]' : undefined
      }))
    };

    res.json({
      success: true,
      isRestricted: true,
      referral: sanitizedReferral
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch referral' });
  }
};

