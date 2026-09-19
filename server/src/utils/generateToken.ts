import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export const generateToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, ENV.JWT_SECRET, {
    expiresIn: '7d'
  });
};
