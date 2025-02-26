function logRequests(req, res, next) {
    const { method, path } = req;
    console.log(`${method} ${path} - ${new Date().toISOString()}`);
    next();
}

module.exports = { logRequests };
