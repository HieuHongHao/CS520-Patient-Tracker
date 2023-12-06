import express from 'express';
// import { addOne, getOneById, login, logout } from '../controllers/userController.js';
import { getMedicalHistoriesByPatientId } from '../controllers/medicalHistoryController.js';
import { login, register } from '../controllers/authenticateController.js';
const router = express.Router();

router.get('/:id/medicalHistories', getMedicalHistoriesByPatientId)

// Authentication
router.post('/login', login);
router.post('/register', register);

export default router;