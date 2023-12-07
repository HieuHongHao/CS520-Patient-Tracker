import express from 'express';
import { getMedicalHistoriesByPatientId } from '../controllers/medicalHistoryController.js';
import { bookAppointment, checkAvailability, getPatientAppointments } from '../controllers/patientController.js';

const router = express.Router();

router.get('/:patientId/medicalHistories', getMedicalHistoriesByPatientId);
router.get('/:patientId/appointments', getPatientAppointments);
router.post('/:doctorId/book-appointment', bookAppointment);
router.post('/:doctorId/check-availability', checkAvailability);

export default router;