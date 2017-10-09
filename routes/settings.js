"use strict";

const FILE = "stub/static/settings.json";

var express = require('express');
var router = express.Router();

var Tools = require(__base + "/src/Tools");
var FileProvider = require(__base + "/src/FileProvider");
var SimpleObjectJsonDB = require(__base + "/src/SimpleObjectJsonDB");
var Constants = require(__base + "/src/StubConstants");

var fp = new FileProvider();

router.get('/', function (req, res, next) {
    fp.sendJSONFileRequest(res, FILE);
});

router.get('/:key', function (req, res, next) {
    res.header(Constants.Header_ContentType, Constants.ContentType_JSON);
    new SimpleObjectJsonDB()
        .loadJsonFile(FILE)
        .then((db) => {
            let key = req.param("key");
            var item = db.data[key];
            if (item !== undefined) {
                res.send({key: key, value: item});
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
    new SimpleObjectJsonDB()
        .loadJsonFile(FILE)
        .then((db) => {
            db.addItem(req.body["key"], req.body["value"]);
            return db.save();
        })
        .then(() => {
            res.send(req.body)
        })
        .catch((err) => {
            Tools.sendError(err, res);
        });
});

module.exports = router;
