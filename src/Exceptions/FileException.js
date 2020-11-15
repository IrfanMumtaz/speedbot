'use strict';

class FileException{

    static notFound() {
        this.message = 'File does not exists';
        this.code = 404;
        
        console.log(`Logged Response: ${this.code}   ${this.message}`);
        return this;
    }
}

module.exports = FileException;