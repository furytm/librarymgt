import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRequest } from '../middlewares/validationMiddleware.js';
import { registerSchema, loginSchema } from '../validation/schemas.js';

const router = express.Router();

// Route to register a new user
router.post('/register', validateRequest(registerSchema), register);
// Route to log in a user
router.post('/login', (req, res, next) => {
    console.log('Before Validation Middleware - Request Body:', req.body);
    next(); // Pass the request to the next middleware (validation middleware)
}, validateRequest(loginSchema), login);


export default router;
