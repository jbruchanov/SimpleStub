var express = require('express');
var router = express.Router();

var Tools = require(__base + "/src/Tools");
var Constants = require(__base + "/src/StubConstants");
var postgres = require(__base + "/src/PostgreSQLDB");

router.get('/', function (req, res, next) {
    postgres.Book.findAll()
        .then((items) => res.send(items))
        .catch((err) => Tools.sendError(err, res));
});

router.get('/:id', function (req, res, next) {
    postgres.Book.findById(parseInt(req.param("id")))
        .then((item) => {
            if (item) {
                res.send(item)
            } else {
                res.sendStatus(Constants.Status_NotFound);
            }
        })
        .catch((err) => Tools.sendError(err, res));
});

router.put('/', function (req, res, next) {
    Tools.assertContentType(req, Constants.ContentType_JSON);
    postgres.Book.create(req.body)
        .then((item) => res.send(item))
        .catch((err) => Tools.sendError(err, res));
});

router.post('/:id', function (req, res, next) {
    Tools.assertContentType(req, Constants.ContentType_JSON);
    postgres.Book.findById(parseInt(req.param("id")))
        .then((item) => {
            if (item) {
                item.update(req.body)
                    .then((item) => res.send(item));
            } else {
                res.sendStatus(Constants.Status_NotFound);
            }
        })
        .catch((err) => Tools.sendError(err, res));
});

router.delete('/:id', function (req, res, next) {
    postgres.Book.findById(parseInt(req.param("id")))
        .then((item) => {
            if (item) {
                item.destroy()
                    .then(() => res.send(item));
            } else {
                res.sendStatus(Constants.Status_NotFound);
            }
        })
        .catch((err) => Tools.sendError(err, res));
});

module.exports = router;
