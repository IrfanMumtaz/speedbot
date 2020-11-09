'use strict';

class TimeStampHelper {

    static getCurrentTimeStamp(){
        const now = new Date();
        return now.getTime();
    }
}

module.exports = TimeStampHelper;