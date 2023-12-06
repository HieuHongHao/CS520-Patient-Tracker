import { Router } from 'express';
import MedicalHistoryRouter from './medicalHistory.js';
import DoctorRouter from './doctor.js';
import PatientRouter from './patient.js';
import UserRouter from './user.js';
const router = Router();

// Add routers from each model here.
router.use('/medicalHistory', MedicalHistoryRouter);
router.use('/doctor', DoctorRouter);
router.use('/patient', PatientRouter);
router.use('/user', UserRouter);

export default router;