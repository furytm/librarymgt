import Book from '../models/book.js';
import Borrow from '../models/borrow.js';

export const borrowBookService = async (bookId, user) => {
  const book = await Book.findById(bookId);
  if (!book || book.quantity < 1) {
    throw new Error('Book unavailable');
  }

  book.quantity -= 1;
  book.borrowedBy.push(user._id);

  const borrow = new Borrow({ user: user._id, book: bookId });
  await Promise.all([book.save(), borrow.save()]);
  return borrow;
};

export const returnBookService = async (bookId, user) => {
  const borrow = await Borrow.findOne({ book: bookId, user: user._id, returnDate: null });
  if (!borrow) {
    throw new Error('No borrowed record found');
  }

  const book = await Book.findById(bookId);
  if (book) {
    book.quantity += 1;
    book.borrowedBy = book.borrowedBy.filter((id) => id.toString() !== user._id.toString());
    await book.save();
  }

  borrow.returnDate = new Date();
  await borrow.save();

  return borrow;
};
export const listBorrowedBooksService = async (user) => {
  const borrowedBooks = await Borrow.find({ userId: user.id, returned: false }).populate('bookId');
  return borrowedBooks;
};
