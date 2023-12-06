import express from 'express';
// import { addOne, getOneById, login, logout } from '../controllers/userController.js';
import { getMedicalHistoriesByPatientId } from '../controllers/medicalHistoryController.js';
import { bookAppointment } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authentication.js';
import { login, register } from '../controllers/authenticateController.js';

const router = express.Router();


// Authentication
router.post('/login', login);
router.post('/register', register);


router.get('/:id/medicalHistories', getMedicalHistoriesByPatientId);
router.post('/:id/book-appointment', bookAppointment);

router.get('/:id/medicalHistories', getMedicalHistoriesByPatientId)
export default router;