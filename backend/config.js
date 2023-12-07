import dotenv from 'dotenv';

dotenv.config();

export const jwtSecret = process.env.JWT_SECRET || 'randomsecret';
export const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/patient-tracker';
export const PORT = process.env.PORT || 5001;
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173/';
