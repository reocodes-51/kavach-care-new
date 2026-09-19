import { Response } from 'express';
import { FollowUp, FollowUpStatus } from '../models/FollowUp.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

// @route   GET /api/followups
export const getFollowUps = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, priority, patientId, workerId } = req.query;
    const query: any = {};

    if (status && status !== 'ALL') query.status = status;
    if (priority && priority !== 'ALL') query.priority = priority;
    if (patientId) query.patient = patientId;
    if (workerId) query.assignedWorker = workerId;

    const followups = await FollowUp.find(query)
      .populate('patient')
      .populate('assignedWorker', 'name role phone')
      .populate('referral')
      .sort({ dueDate: 1 });

    res.json({
      success: true,
      count: followups.length,
      followups
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch follow-ups' });
  }
};

// @route   POST /api/followups
export const createFollowUp = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { patientId, referralId, title, reason, priority, dueDate, notes } = req.body;

    if (!patientId || !title || !dueDate) {
      res.status(400).json({ success: false, message: 'Patient, title, and due date are required' });
      return;
    }

    const priorityColor =
      priority === 'High Priority' ? 'red' : priority === 'Follow-up' ? 'amber' : 'emerald';

    const followup = await FollowUp.create({
      patient: patientId,
      referral: referralId,
      assignedWorker: req.user?._id,
      title,
      reason: reason || 'Post-discharge recovery check',
      priority: priority || 'Follow-up',
      priorityColor,
      dueDate,
      status: 'PENDING',
      notes
    });

    const populated = await FollowUp.findById(followup._id).populate('patient');

    res.status(201).json({
      success: true,
      message: 'Follow-up task created',
      followup: populated
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to create follow-up' });
  }
};

// @route   PUT /api/followups/:id
export const updateFollowUp = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, notes, vitalsObserved } = req.body;

    const validStatuses: FollowUpStatus[] = ['PENDING', 'SCHEDULED', 'COMPLETED', 'MISSED'];
    if (status && !validStatuses.includes(status)) {
      res.status(400).json({ success: false, message: `Invalid status. Valid values: ${validStatuses.join(', ')}` });
      return;
    }

    const updateData: any = { ...req.body };
    if (status === 'COMPLETED') {
      updateData.completedDate = new Date().toISOString().split('T')[0];
    }

    const followup = await FollowUp.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    }).populate('patient');

    if (!followup) {
      res.status(404).json({ success: false, message: 'Follow-up not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Follow-up updated successfully',
      followup
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to update follow-up' });
  }
};
