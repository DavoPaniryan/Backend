const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./database/mongoClient');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const borrowRoutes = require('./routes/borrowRoutes');

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/borrows', borrowRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
