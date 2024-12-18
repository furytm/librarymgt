import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('user', 'admin').default('user'),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});

export const bookSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).required(),
  author: Joi.string().trim().min(3).max(50).required(),
  genre: Joi.string().trim().max(50).optional(),
  quantity: Joi.number().integer().min(1).required(),
});

// Joi schema for borrowing a book
export const borrowSchema = Joi.object({
  bookId: Joi.string().required(),
});

 

