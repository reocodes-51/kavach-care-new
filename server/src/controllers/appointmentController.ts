import { Response } from 'express';
import { Appointment } from '../models/Appointment.js';
import { Notification } from '../models/Notification.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

// @route   GET /api/appointments
export const getAppointments = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { patientId, doctorId, facilityId, status } = req.query;
    const query: any = {};

    if (patientId) query.patient = patientId;
    if (doctorId) query.doctor = doctorId;
    if (facilityId) query.facility = facilityId;
    if (status) query.status = status;

    const appointments = await Appointment.find(query)
      .populate('patient')
      .populate('doctor')
      .populate('facility')
      .populate('referral')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: appointments.length,
      appointments
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch appointments' });
  }
};

// @route   POST /api/appointments
export const createAppointment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { patientId, doctorId, facilityId, referralId, date, time } = req.body;

    if (!patientId || !doctorId || !facilityId || !date || !time) {
      res.status(400).json({ success: false, message: 'Patient, doctor, facility, date, and time are required' });
      return;
    }

    // Generate token number like A-103
    const tokenSeq = Math.floor(100 + Math.random() * 50);
    const queueNumber = `A-${tokenSeq}`;

    const appointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      facility: facilityId,
      referral: referralId,
      date,
      time,
      queueNumber,
      status: 'SCHEDULED',
      currentTokenServing: `A-0${Math.max(10, tokenSeq - 5)}`,
      estimatedWaitMinutes: 18
    });

    await Notification.create({
      recipientRole: 'PATIENT',
      title: 'Appointment Confirmed',
      message: `Token ${queueNumber} booked for ${date} at ${time}`,
      type: 'APPOINTMENT_REMINDER',
      relatedId: appointment._id.toString()
    });

    const populated = await Appointment.findById(appointment._id)
      .populate('patient')
      .populate('doctor')
      .populate('facility');

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      appointment: populated
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to book appointment' });
  }
};

// @route   PUT /api/appointments/:id
export const updateAppointment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate('patient')
      .populate('doctor')
      .populate('facility');

    if (!appointment) {
      res.status(404).json({ success: false, message: 'Appointment not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Appointment updated successfully',
      appointment
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to update appointment' });
  }
};
