import { registerUser, loginUser } from '../services/authService.js';

// Controller for user registration
export const register = async (req, res) => {
    try {
        // Debug log
        // console.log('Register Request Body:', req.body); 
        const user = await registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Register Error:', error.message); // Log the error
        res.status(400).json({ message: error.message });
    }
};

// Controller for user login
export const login = async (req, res) => {
    try {
        // Debug log
        // console.log('Login Request Body:', req.body); 
        if (!req.body) {
            throw new Error('Request body is empty');
        }

        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const result = await loginUser({ email, password });
        // Log the result from the service
        // console.log('Login Result:', result); 

        res.status(200).json({
            message: 'Login Succesful',
            success: true,
            result,

        });
    } catch (error) {
        console.error('Login Error:', error.message); // Log the error
        res.status(400).json({ message: error.message });
    }
};
