const fs = require('fs');

const fd = fs.openSync('data.txt', 'r');

const stats = fs.fstatSync(fd);
const fileSize = stats.size;

const middlePosition = Math.floor(fileSize / 2);

const buffer = Buffer.alloc(10);

fs.readSync(fd, buffer, 0, 10, middlePosition);

console.log(buffer.toString('utf8'));

fs.closeSync(fd);
