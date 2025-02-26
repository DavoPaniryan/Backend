const Book = require('../models/bookModel');

async function createBook(bookData) {
    const newBook = new Book(bookData);
    await newBook.save();
    return newBook;
}

async function getAllBooks() {
    return await Book.find();
}

async function getBookById(id) {
    return await Book.findById(id);
}

module.exports = { createBook, getAllBooks, getBookById };
