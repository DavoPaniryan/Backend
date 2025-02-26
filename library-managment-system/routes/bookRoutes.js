const express = require('express');
const {
    createBookController,
    getAllBooksController,
} = require('../controllers/bookController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authenticateToken, createBookController);
router.get('/', getAllBooksController);

module.exports = router;
