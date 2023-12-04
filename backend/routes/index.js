import { Router } from 'express';
import MedicalHistoryRouter from './medicalHistory.js';
const router = Router();

// Add routers from each model here.
router.use('/medicalHistory', MedicalHistoryRouter);

export default router;