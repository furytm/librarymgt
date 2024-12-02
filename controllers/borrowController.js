import * as borrowService from '../services/borrowService.js';

export const borrowBook = async (req, res) => {
  try {
    const result = await borrowService.borrowBook(req.params.bookId, req.user);
    res.json({ message: 'Book Borrowed', result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const returnBook = async (req, res) => {
  try {
    const result = await borrowService.returnBook(req.params.bookId, req.user);
    res.json({ message: 'Book Returned', result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
