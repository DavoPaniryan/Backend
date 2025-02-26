const { borrowBook, returnBook } = require('../services/borrowService');

async function borrowBookController(req, res) {
    try {
        const { userId, bookId } = req.body;
        const borrow = await borrowBook(userId, bookId);
        res.status(201).json(borrow);
    } catch (error) {
        res.status(500).json({
            message: 'Error borrowing book',
            error: error.message,
        });
    }
}

async function returnBookController(req, res) {
    try {
        const { borrowId } = req.body;
        const borrow = await returnBook(borrowId);
        res.status(200).json(borrow);
    } catch (error) {
        res.status(500).json({
            message: 'Error returning book',
            error: error.message,
        });
    }
}

module.exports = { borrowBookController, returnBookController };
