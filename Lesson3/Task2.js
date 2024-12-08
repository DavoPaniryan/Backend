const { normalize } = require('node:path');

class PathNormalizer {
    constructor() {
        this.path = require('node:path');
    }

    normalizePath(filePath) {
        return this.path.normalize(filePath);
    }

    joinPaths(...paths) {
        return this.path.join(...paths);
    }
}

const normalizeObj = new PathNormalizer();
console.log(normalizeObj.joinPaths('/home', 'user', 'documents', 'file.txt'));
console.log(normalizeObj.normalizePath('./user/../user/documents//file.txt'));
