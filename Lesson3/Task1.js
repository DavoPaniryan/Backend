class PathAnalyzer {
    constructor() {
        this.path = require('node:path');
    }

    getBaseName(filePath) {
        return this.path.basename(filePath);
    }
    getDirName(filePath) {
        return this.path.dirname(filePath);
    }

    getExtension(filePath) {
        return this.path.extname(filePath);
    }

    isAbsolutePath(filePath) {
        return this.path.isAbsolute(filePath);
    }
}
const obj = new PathAnalyzer();
console.log(obj.getBaseName('/home/user/documents/report.pdf'));
console.log(obj.getDirName('/home/user/documents/report.pdf'));
console.log(obj.getExtension('/home/user/documents/report.pdf'));
console.log(obj.isAbsolutePath('/home/user/documents/report.pdf'));
