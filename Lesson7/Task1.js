const express = require('express');

const app = express();
const PORT = 3000;

const validateUser = (req, res, next) => {
    const { username, password, email } = req.body;
};
