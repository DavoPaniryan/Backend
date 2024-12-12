const fs = require('fs');

const fd = fs.openSync('example.txt', 'w+');

fs.writeSync(fd, '0123456789');

fs.writeSync(fd, 'AB', 0, 2, 5);

fs.closeSync(fd); 
const content = fs.readFileSync('example.txt', 'utf8');

console.log(content);  

fs.closeSync(fd);
