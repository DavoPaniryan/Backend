const { createBook, getAllBooks } = require('../services/bookService');

async function createBookController(req, res) {
    try {
        const newBook = await createBook(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({
            message: 'Error creating book',
            error: error.message,
        });
    }
}

async function getAllBooksController(req, res) {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching books',
            error: error.message,
        });
    }
}

module.exports = { createBookController, getAllBooksController };
