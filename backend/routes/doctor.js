import express from 'express';
// Import necessary controller functions and middleware
import { getAll, getOne, updateOne, getDoctorAppointments } from '../controllers/doctorController.js';
import { authenticate } from '../middlewares/authentication.js';

// Create a router instance
const router = express.Router();

// Define routes and associate them with the corresponding controller functions and middleware

// Route to get a list of all doctors (authentication required)
router.get("/", authenticate, getAll);

// Route to get details of a specific doctor by ID (authentication required)
router.get("/:id", authenticate, getOne);

// Route to update details of a specific doctor by ID (authentication required)
router.put("/:id", authenticate, updateOne);

// Route to get appointments for a specific doctor by ID (authentication required)
router.get("/:id/appointments", authenticate, getDoctorAppointments);

// Export the router for use in the main application
export default router;
