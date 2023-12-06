import express from 'express';
// import { addOne, getOneById, login, logout } from '../controllers/userController.js';
import { getMedicalHistoriesByPatientId } from '../controllers/medicalHistoryController.js';
import { bookAppointment } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authentication.js';
const router = express.Router();

router.get('/:id/medicalHistories', getMedicalHistoriesByPatientId);
router.post('/:id/book-appointment', bookAppointment);
export default router;