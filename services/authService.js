import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const registerUser  = async ({ name, email, password, role }) => {
  if (await User.findOne({ email })) {
    throw new Error('Email already registered');
  }


  const user = new User({ name, email,password, role });
  await user.save();
  return { id: user._id, name: user.name, email: user.email, role: user.role };
};
export const  loginUser = async ({ email, password }) => {

  
  console.log('Service Email:', email);
  console.log('Service Password:', password);

  if (!email || !password) {
      throw new Error('Missing email or password');
  }
    try {
    // Find the user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    // Check if the user exists
    if (!user) {
      throw new Error('Invalid user');
    }
    
    // Compare the hashed password with the user input password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Generate JWT token with user id and role
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;

  } catch (err) {
    // Handle error and throw a new error with a custom message
    throw new Error(`Login failed: ${err.message || 'Unknown error'}`);
  }
};
