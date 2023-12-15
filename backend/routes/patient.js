import express from 'express';
// Import necessary controller functions and middleware
import { bookAppointment, checkAvailability, getPatientAppointments, getMedicalHistoriesByPatientId } from '../controllers/patientController.js';
import { authenticate } from '../middlewares/authentication.js';

// Create a router instance
const router = express.Router();

// Define routes and associate them with the corresponding controller functions and middleware

// Route to get a list of medical histories associated with a specific patient ID (authentication required)
router.get('/:patientId/medicalHistories', authenticate, getMedicalHistoriesByPatientId);

// Route to get a list of appointments for a specific patient ID (authentication required)
router.get('/:patientId/appointments', authenticate, getPatientAppointments);

// Route to allow a patient to book an appointment with a specific doctor (authentication required)
router.post('/:doctorId/book-appointment', authenticate, bookAppointment);

// Route to check the availability of a doctor for a specific date and time (authentication required)
router.post('/:doctorId/check-availability', authenticate, checkAvailability);

// Export the router for use in the main application
export default router;
