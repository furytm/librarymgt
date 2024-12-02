import express from 'express';
import { addBook } from '../controllers/bookController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, authorize(['admin']), addBook);

export default router;
