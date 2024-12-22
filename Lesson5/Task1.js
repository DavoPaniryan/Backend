const http = require('http');
const PORT = 3000;

function sendJsonResponse(res, statusCode, message) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message }));
}

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (url === '/') {
        switch (method) {
            case 'GET':
                sendJsonResponse(res, 200, 'Welcome to the backend server');
                break;
            case 'POST':
            case 'PUT':
            case 'PATCH':
            case 'DELETE':
            case 'OPTIONS':
                sendJsonResponse(res, 200, `You sent a ${method} request`);
                break;
            default:
                sendJsonResponse(res, 405, 'Method Not Allowed');
                break;
        }
    } else {
        sendJsonResponse(res, 404, 'Route Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});