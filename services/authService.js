import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const register = async ({ name, email, password, role }) => {
  if (await User.findOne({ email })) {
    throw new Error('Email already registered');
  }
  const user = new User({ name, email, password, role });
  await user.save();
  return { id: user._id, name: user.name, email: user.email, role: user.role };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid Credentials');
  }
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
