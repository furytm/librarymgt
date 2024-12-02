import Book from '../models/book.js';

export const addBook = async (bookData) => {
  const book = new Book(bookData);
  await book.save();
  return book;
};
