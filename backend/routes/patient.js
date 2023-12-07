import express from 'express';
import { bookAppointment, checkAvailability, getPatientAppointments, getMedicalHistoriesByPatientId } from '../controllers/patientController.js';

const router = express.Router();

router.get('/:patientId/medicalHistories', getMedicalHistoriesByPatientId);
router.get('/:patientId/appointments', getPatientAppointments);
router.post('/:doctorId/book-appointment', bookAppointment);
router.post('/:doctorId/check-availability', checkAvailability);

export default router;