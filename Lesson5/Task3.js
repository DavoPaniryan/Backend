const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

function sendJsonResponse(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.parse(data));
}

function readUsersFile(callback) {
    fs.readFile(USERS_FILE, 'utf8', (data) => {
        const users = JSON.stringify(data);
        callback(users);
    });
}

function writeUsersFile(users, callback) {
    fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8', callback);
}

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (url === '/users') {
        switch (method) {
            case 'GET':
                readUsersFile((users) => {
                    sendJsonResponse(res, 200, users);
                });
                break;
            case 'POST':
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    try {
                        const newUser = JSON.parse(body);
                        readUsersFile((err, users) => {
                            if (err) {
                                sendJsonResponse(res, 500, {
                                    message: 'Error reading users file',
                                });
                            } else {
                                users.push(newUser);
                                writeUsersFile(users, (writeErr) => {
                                    if (writeErr) {
                                        sendJsonResponse(res, 500, {
                                            message: 'Error writing users file',
                                        });
                                    } else {
                                        sendJsonResponse(res, 201, {
                                            message: 'User added successfully',
                                        });
                                    }
                                });
                            }
                        });
                    } catch (parseErr) {
                        sendJsonResponse(res, 400, {
                            message: 'Invalid JSON format',
                        });
                    }
                });
                break;
            default:
                sendJsonResponse(res, 405, { message: 'Method Not Allowed' });
                break;
        }
    } else {
        sendJsonResponse(res, 404, { message: 'Route Not Found' });
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
