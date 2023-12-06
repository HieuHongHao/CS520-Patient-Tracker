import { Router } from 'express';
import MedicalHistoryRouter from './medicalHistory.js';
import DoctorRouter from './doctor.js';
import PatientRouter from './user.js';
const router = Router();

// Add routers from each model here.
router.use('/medicalHistory', MedicalHistoryRouter);
router.use('/doctor', DoctorRouter);
router.use('/user', PatientRouter);
export default router;