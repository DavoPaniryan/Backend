const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: 'user' },
        borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }], 
    },
    { timestamps: true },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
