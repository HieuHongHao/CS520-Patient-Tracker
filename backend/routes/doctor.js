import express from 'express';
// import { addOne, getOneById, login, logout } from '../controllers/userController.js';
import { getAll, getOne, updateOne, getDoctorAppointments } from '../controllers/doctorController.js';
import { authenticate } from '../middlewares/authentication.js';
const router = express.Router();

router.get("/", authenticate, getAll);
router.get("/:id", authenticate, getOne);
router.put("/:id", authenticate, updateOne);

router.get("/:id/appointments", authenticate, getDoctorAppointments);

export default router;