import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';

// Load environment variables from .env file
dotenv.config();

// Authentication Middleware: Verifies JWT token and attaches user to req object
export const authenticate = async (req, res, next) => {
  // Extract the token from the Authorization header (Bearer token)
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, return a 401 Unauthorized error
  if (!token) return res.status(401).send('Access Denied');

  try {
    // Verify the token using the JWT secret from environment variables
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user from the database using the user ID from the verified token
    req.user = await User.findById(verified.id);

    // Debugging: Log the user role
     console.log('Users role:',req.user.role);


    // If no user is found, send an error
    if (!req.user) {
      return res.status(404).send('User not found');
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If the token is invalid or expired, send a 400 Bad Request error
    res.status(400).send('Invalid Token');
  }
};

export const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).send('Access Forbidden');
  }
  next();
};
