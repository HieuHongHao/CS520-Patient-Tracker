import express from 'express';
import { getMedicalHistoriesByPatientId } from '../controllers/medicalHistoryController.js';
import { bookAppointment, checkAvailability } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id/medicalHistories', getMedicalHistoriesByPatientId);
router.post('/:id/book-appointment', bookAppointment);
router.post('/:id/check-availability', checkAvailability);
export default router;