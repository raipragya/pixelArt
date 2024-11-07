import { Router } from 'express';
import { registerUser, loginUser, updateUserProgress } from '../controllers/userController';
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/progress', updateUserProgress);

export default router;
