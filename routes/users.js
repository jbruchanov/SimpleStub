"use strict";

const FILE = "stub/static/users.json";

var express = require('express');
var router = express.Router();

var Tools = require(__base + "/src/Tools");
var FileProvider = require(__base + "/src/FileProvider");
var SimpleArrayJsonDB = require(__base + "/src/SimpleArrayJsonDB");
var Constants = require(__base + "/src/StubConstants");
var _ = require("lodash");

var fp = new FileProvider();

/* GET users listing. */
router.get('/', function (req, res, next) {
    fp.sendJSONFileRequest(res, FILE);
});

router.get('/:id', function (req, res, next) {
    res.header(Constants.Header_ContentType, Constants.ContentType_JSON);
    new SimpleArrayJsonDB()
        .loadJsonFile(FILE)
        .then((db) => {
            var itemIndex = _.findIndex(db.data, ['id', parseInt(req.param("id"))]);
            if (itemIndex !== -1) {
                res.send(db.data[itemIndex]);
            } else {
                res.sendStatus(Constants.Status_NotFound);
            }
        })
        .catch((err) => {
            Tools.sendError(err, res);
        });
});

router.put('/', function (req, res, next) {
    res.header(Constants.Header_ContentType, Constants.ContentType_JSON);
    Tools.assertContentType(req, Constants.ContentType_JSON);
    new SimpleArrayJsonDB()
        .loadJsonFile(FILE)
        .then((db) => {
            db.addItem(req.body);
            return db.save();
        })
        .then(() => {
            res.send(req.body)
        })
        .catch((err) => {
            Tools.sendError(err, res);
        });
});

router.post('/:id', function (req, res, next) {
    res.header(Constants.Header_ContentType, Constants.ContentType_JSON);
    Tools.assertContentType(req, Constants.ContentType_JSON);
    new SimpleArrayJsonDB()
        .loadJsonFile(FILE)
        .then((db) => {
            let itemId = parseInt(req.param("id"));
            let item = _.find(db.data, (item) => item.id === itemId);
            if (item) {
                db.removeItem(item);
                db.addItem(req.body);
                return db.save();
            } else {
                return Promise.reject({
                    status: Constants.Status_NotFound,
                    message: "Not found item for param: " + itemId
                });

            }
        })
        .then(() => {
            res.send(req.body)
        })
        .catch((err) => {
            Tools.sendError(err, res);
        });
});

router.delete('/:id', function (req, res, next) {
    res.header(Constants.Header_ContentType, Constants.ContentType_JSON);
    new SimpleArrayJsonDB()
        .loadJsonFile(FILE)
        .then((db) => {
            let itemId = parseInt(req.param("id"));
            let item = _.find(db.data, (item) => item.id === itemId);
            if (item) {
                db.removeItem(item);
            } else {
                return Promise.reject({
                    status: Constants.Status_NotFound,
                    message: "Not found item for param: " + itemId
                });
            }
            return db
                .save()
                .then(() => Promise.resolve(item));
        })
        .then((item) => {
            res.send(item);
        })
        .catch((err) => {
            Tools.sendError(err, res);
        });
});

module.exports = router;
