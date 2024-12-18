import {
  borrowBookService,
  returnBookService,
  listBorrowedBooksService,
} from '../services/borrowService.js';

// Controller to borrow a book
export const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user._id;
    const result = await borrowBookService(userId, bookId);
    res.status(200).json({ message: 'Book borrowed successfully', result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to return a borrowed book
export const returnBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user._id;
    const result = await returnBookService(userId, bookId);
    res.status(200).json({ message: 'Book returned successfully', result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to list all borrowed books
export const listBorrowedBooks = async (req, res) => {
  try {
    const books = await listBorrowedBooksService(req.user);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
