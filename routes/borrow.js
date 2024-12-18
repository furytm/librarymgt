import express from 'express';
import { borrowBook, returnBook, listBorrowedBooks } from '../controllers/borrowController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to borrow a book
router.post('/borrow', authenticate, borrowBook);

// Route to return a book
router.post('/return', authenticate, returnBook);

// Route to list all borrowed books
router.get('/', authenticate, listBorrowedBooks);

export default router;
