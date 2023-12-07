import express from 'express';
import { addOne, getOne, updateOne } from '../controllers/medicalHistoryController.js';
import { authenticate } from '../middlewares/authentication.js';
const router = express.Router();

// ONLY DOCTOR CREATE/UPDATE???
router.post('/', authenticate, addOne);
router.get('/:id', authenticate, getOne);
router.put('/:id', authenticate, updateOne);

export default router;