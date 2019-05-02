'use strict';

const whitelist = ['http://localhost:3000', 'http://my-project.com'];

const originGenerator = function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
    } else {
        const error = new Error('Access denied');
        error.type = 'CORS';
        callback(error);
    }
};

module.exports = originGenerator;