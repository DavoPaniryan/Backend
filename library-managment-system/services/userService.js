const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/config');

async function createUser(userData) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error('User already exists with that email');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({ ...userData, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: '1h' },
    );

    return { user: newUser, token };
}

async function getUserByEmail(email) {
    return await User.findOne({ email });
}

async function authenticateUser(email, password) {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h',
    });
    return { user, token };
}

module.exports = { createUser, getUserByEmail, authenticateUser };
