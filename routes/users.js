"use strict";

var express = require('express');
var router = express.Router();
var FileProvider = require('../src/fileprovider');
var fp = new FileProvider();
var Constants = require('../src/stubconstants');
var _ = require("lodash");

/* GET users listing. */
router.get('/', function (req, res, next) {
    fp.sendJSONFileRequest(res, "stub/static/users.json");
});

router.get('/:id', function (req, res, next) {
    res.header(Constants.Header_ContentType, Constants.ContentType_JSON);
    fp.loadFile("stub/static/users.json")
        .then((content) => {
            var obj = JSON.parse(content);
            var itemIndex = _.findIndex(obj, ['id', parseInt(req.param("id"))]);
            if (itemIndex !== -1) {
                res.send(obj[itemIndex]);
            } else {
                res.sendStatus(Constants.Status_NotFound);
            }
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;
