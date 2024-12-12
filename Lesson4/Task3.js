const fs = require('fs');

const srcFd = fs.openSync('data.txt', 'r');

const destFd = fs.openSync('copy.txt', 'w');

const buffer = Buffer.alloc(16);

let bytesRead;

do {
    bytesRead = fs.readSync(srcFd, buffer, 0, buffer.length, null);

    if (bytesRead > 0) {
        fs.writeSync(destFd, buffer, 0, bytesRead);
    }
} while (bytesRead > 0);

fs.closeSync(srcFd);
fs.closeSync(destFd);
