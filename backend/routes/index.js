import { Router } from 'express';
import MedicalHistoryRouter from './medicalHistory.js';
import UserRouter from './user.js';
const router = Router();

// Add routers from each model here.
router.use('/medicalHistory', MedicalHistoryRouter);
router.use('/user', UserRouter);

export default router;