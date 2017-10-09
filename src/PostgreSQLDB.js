"use strict";

var Constants = require(__base + "/src/StubConstants");
const Sequelize = require('sequelize');
const sequelize = new Sequelize(Constants.PostgresSQLURI);

sequelize
    .authenticate()
    .then(() => {

    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        console.error(err.message);
        console.error(err.stack);
    });

const Book = sequelize.define('book', {
    name: {type: Sequelize.STRING},
    price: {type: Sequelize.INTEGER},
    published: {type: Sequelize.DATE},
});

Book
    .sync({force: false/*delete&create again*/})
    .catch(err => {
        console.error('Unable to sync Book scheme:');
        console.error(err.message);
        console.error(err.stack);
    });

module.exports = {
    Book: Book,
    sequelize: sequelize
};