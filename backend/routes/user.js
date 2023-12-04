import express from 'express';
// import { addOne, getOneById, login, logout } from '../controllers/userController.js';
import { getMedicalHistoriesByUserId } from '../controllers/medicalHistoryController.js';
import { authenticate } from '../middlewares/authentication.js';
const router = express.Router();

router.get('/:id/medicalHistories', getMedicalHistoriesByUserId)

export default router;