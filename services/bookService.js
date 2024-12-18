import Book from '../models/book.js';

export const addBookService = async (bookData) => {
  const book = new Book(bookData);
  await book.save();
  return book;
};

export const listBooksService = async () => {
  return await Book.find();
};
