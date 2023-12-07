import express from 'express';
import { bookAppointment, checkAvailability, getPatientAppointments, getMedicalHistoriesByPatientId } from '../controllers/patientController.js';
import { authenticate } from '../middlewares/authentication.js';

const router = express.Router();

router.get('/:patientId/medicalHistories', authenticate, getMedicalHistoriesByPatientId);
router.get('/:patientId/appointments', authenticate, getPatientAppointments);
router.post('/:doctorId/book-appointment', authenticate, bookAppointment);
router.post('/:doctorId/check-availability', authenticate, checkAvailability);

export default router;