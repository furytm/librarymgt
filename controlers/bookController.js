import * as bookService from '../services/bookService.js';

export const addBook = async (req, res) => {
  try {
    const book = await bookService.addBook(req.body);
    res.status(201).json({ message: 'Book Added', book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
