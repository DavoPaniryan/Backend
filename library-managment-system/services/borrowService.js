const Borrow = require('../models/borrowModel');
const Book = require('../models/bookModel');
const User = require('../models/userModel');

async function borrowBook(userId, bookId) {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user) {
        throw new Error('User not found');
    }
    if (!book) {
        throw new Error('Book not found');
    }

    if (!book.availability) {
        throw new Error('Book is not available for borrowing');
    }

    const borrow = new Borrow({ user: userId, book: bookId });
    await borrow.save();

    book.availability = false;
    await book.save();

    return borrow;
}

async function returnBook(borrowId) {
    const borrow = await Borrow.findById(borrowId).populate('book');
    if (!borrow) {
        throw new Error('Borrow record not found');
    }

    borrow.status = 'returned';
    borrow.returnDate = new Date();
    await borrow.save();

    borrow.book.availability = true;
    await borrow.book.save();

    return borrow;
}

module.exports = { borrowBook, returnBook };
