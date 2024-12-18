import { addBookService, listBooksService } from '../services/bookService.js';

// Controller to add a new book
export const addBook = async (req, res) => {
  try {
    const book = await addBookService(req.body);
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to list all books
export const listBooks = async (req, res) => {
  try {
    const books = await listBooksService();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
