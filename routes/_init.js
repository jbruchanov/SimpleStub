
"use strict";

module.exports = (app) => {
    app.use('/', require('./index'));
    app.use('/users', require('./users'));
    app.use('/settings', require('./settings'));
    app.use('/devices', require('./devices'));
};