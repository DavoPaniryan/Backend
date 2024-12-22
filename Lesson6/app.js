const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const users = [];
const products = [];
const orders = [];

function validateEmail(email) {
    return /^[\w.-]+@[\w.-]+\.\w+$/.test(email);
}

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
});

app.post('/users/register', (req, res) => {
    const { username, email, password, is_admin = false } = req.body;

    if (!username || username.length < 3) {
        return res
            .status(400)
            .json({ message: 'Username must be at least 3 characters long.' });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }
    if (users.some((user) => user.email === email)) {
        return res.status(400).json({ message: 'Email already exists.' });
    }
    if (!password || password.length < 6) {
        return res
            .status(400)
            .json({ message: 'Password must be at least 6 characters long.' });
    }

    const newUser = { username, email, is_admin };
    users.push({ ...newUser, password });

    res.status(201).json(newUser);
});

app.post('/users/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        (u) => u.email === email && u.password === password,
    );
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    res.status(200).json({
        message: 'Login successful.',
        user: {
            username: user.username,
            email: user.email,
            is_admin: user.is_admin,
        },
    });
});

app.post('/products', (req, res) => {
    const {
        name,
        description,
        price,
        category,
        image_url,
        is_active = true,
    } = req.body;

    if (!name || name.length < 1) {
        return res.status(400).json({
            message: 'Product name must be at least 1 character long.',
        });
    }
    if (!price || price <= 0) {
        return res
            .status(400)
            .json({ message: 'Price must be greater than 0.' });
    }

    const newProduct = {
        name,
        description,
        price,
        category,
        image_url,
        is_active,
    };
    products.push(newProduct);

    res.status(201).json(newProduct);
});

app.get('/products', (req, res) => {
    res.status(200).json(products);
});

app.post('/orders', (req, res) => {
    const { user_id, products, total_price, status = 'PENDING' } = req.body;

    const user = users.find((u) => u.email === user_id);
    if (!user) {
        return res.status(400).json({ message: 'Invalid user ID.' });
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
        return res
            .status(400)
            .json({ message: 'Products must be a non-empty array.' });
    }

    for (const item of products) {
        const product = products.find((p) => p.name === item.name);
        if (!product) {
            return res
                .status(400)
                .json({ message: `Product ${item.name} does not exist.` });
        }
        if (!item.quantity || item.quantity <= 0) {
            return res.status(400).json({
                message: `Invalid quantity for product ${item.name}.`,
            });
        }
    }

    if (!total_price || total_price <= 0) {
        return res
            .status(400)
            .json({ message: 'Total price must be greater than 0.' });
    }

    const newOrder = {
        id: orders.length + 1,
        user_id,
        products,
        total_price,
        status,
        created_at: new Date(),
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
});

app.get('/orders', (req, res) => {
    res.status(200).json(orders);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
