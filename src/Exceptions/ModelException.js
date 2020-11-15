'use strict';

class ModelException{

    static notFound() {
        this.message = 'Data not found!';
        this.code = 400;
        
        console.log(`Logged Response: ${this.code}   ${this.message}`);
        return this;
    }
}

module.exports = ModelException;