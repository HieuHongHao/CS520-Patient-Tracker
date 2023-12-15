import express from 'express';
// Import necessary controller functions and middleware
import { authenticate } from '../middlewares/authentication.js';
import { login, register, logout } from '../controllers/authenticateController.js';

// Create a router instance
const router = express.Router();

// Define routes and associate them with the corresponding controller functions and middleware

// Route to handle user login
router.post('/login', login);

// Route to handle user registration
router.post('/register', register);

// Route to handle user logout (authentication required)
router.post('/logout', authenticate, logout);

// Export the router for use in the main application
export default router;
