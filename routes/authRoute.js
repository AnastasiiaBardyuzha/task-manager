import express from 'express';
import { login, registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/auth/register', registerUser);
router.post('/auth/login', login);

export default router;
