
"use strict";

module.exports = (app) => {
    app.use('/', require('./index'));
    app.use('/books', require('./books'));//SQL DB
    app.use('/users', require('./users'));//simple JSON array
    app.use('/settings', require('./settings'));//simple JSON object
    app.use('/devices', require('./devices'));//noSQL DB
};