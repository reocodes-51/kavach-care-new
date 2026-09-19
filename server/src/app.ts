import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import screeningRoutes from './routes/screeningRoutes.js';
import facilityRoutes from './routes/facilityRoutes.js';
import referralRoutes from './routes/referralRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import followupRoutes from './routes/followupRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

export const createApp = (): Application => {
  const app = express();

  // Middleware
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Health Check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'HEALTHY',
      service: 'KAVACH CARE Public Healthcare API',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime())
    });
  });

  // REST API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/patients', patientRoutes);
  app.use('/api/screenings', screeningRoutes);
  app.use('/api/facilities', facilityRoutes);
  app.use('/api/referrals', referralRoutes);
  app.use('/api/appointments', appointmentRoutes);
  app.use('/api/followups', followupRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/analytics', analyticsRoutes);

  // Error Handling
  app.use(errorHandler);

  return app;
};
