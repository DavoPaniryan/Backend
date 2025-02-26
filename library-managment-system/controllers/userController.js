const { createUser, authenticateUser } = require('../services/userService');

async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        const { user, token } = await createUser({ username, email, password });
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({
            message: 'Error registering user',
            error: error.message,
        });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const { user, token } = await authenticateUser(email, password);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(401).json({
            message: 'Invalid credentials',
            error: error.message,
        });
    }
}

module.exports = { register, login };
