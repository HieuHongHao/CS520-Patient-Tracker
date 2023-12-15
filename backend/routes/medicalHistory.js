import express from 'express';
// Import necessary controller functions and middleware
import { addOne, getAll, getOne, updateOne } from '../controllers/medicalHistoryController.js';
import { authenticate } from '../middlewares/authentication.js';

// Create a router instance
const router = express.Router();

// Define routes and associate them with the corresponding controller functions and middleware

// Route to add a new medical history record (authentication required)
router.post('/', authenticate, addOne);

// Route to get a list of all medical histories (authentication required)
router.get('/', authenticate, getAll);

// Route to get details of a specific medical history by ID (authentication required)
router.get('/:id', authenticate, getOne);

// Route to update details of a specific medical history by ID (authentication required)
router.put('/:id', authenticate, updateOne);

// Export the router for use in the main application
export default router;
