require('dotenv').config();

module.exports = {
    DB_URI: process.env.DB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT || 5000,
};
