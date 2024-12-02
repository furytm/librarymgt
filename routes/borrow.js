import express from 'express';
import { borrowBook, returnBook } from '../controllers/borrowController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/:bookId', authenticate, borrowBook);
router.post('/return/:bookId', authenticate, returnBook);

export default router;
