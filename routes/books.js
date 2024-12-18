import express from 'express';
import { addBook, listBooks } from '../controllers/bookController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validationMiddleware.js';
import { bookSchema } from '../validation/schemas.js';

const router = express.Router();

// Route to add a new book (Admin only)
router.post('/', authenticate, authorize(['admin']), validateRequest(bookSchema), addBook);

// Route to list all books
router.get('/', authenticate, listBooks);

export default router;
