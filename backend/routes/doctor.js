import express from 'express';
// import { addOne, getOneById, login, logout } from '../controllers/userController.js';
import { getAll, getOne } from '../controllers/doctorController.js';
import { authenticate } from '../middlewares/authentication.js';
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);

export default router;