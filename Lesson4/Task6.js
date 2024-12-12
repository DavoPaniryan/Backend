const fs = require('node:fs');

const fd1 = fs.openSync('file1.txt', 'w+');
const fd2 = fs.openSync('file2.txt', 'w+');

fs.writeSync(fd1, 'Content of the first file.\n');
fs.writeSync(fd2, 'Content of the second file.\n');

fs.closeSync(fd1);
fs.closeSync(fd2);

const file1Content = fs.readFileSync('file1.txt');
const file2Content = fs.readFileSync('file2.txt');

const fd = fs.openSync('merged.txt', 'w');

fs.writeSync(fd, file1Content);
fs.writeSync(fd, file2Content);

fs.closeSync(fd);

console.log('Files merged successfully');
