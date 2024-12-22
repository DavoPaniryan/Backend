const http = require('node:http');
const PORT = 3000;

function sendJsonResponse(res, statusCode, message) {
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(message);
}

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (url === '/') {
        if (method === 'GET') {
            sendJsonResponse(
                res,
                200,
                `<title>Title</title>
                <h1>Welcome to My HTTP Server</h1>
                <p>the server functionality</p>
                `,
            );
        }
    }
});
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
