const express = require('express');
const {
    borrowBookController,
    returnBookController,
} = require('../controllers/borrowController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/borrow', authenticateToken, borrowBookController);
router.post('/return', authenticateToken, returnBookController);

module.exports = router;
