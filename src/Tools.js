"use strict";

var Constants = require(__dirname + '/StubConstants');
var assert = require('assert');

var Tools = {
    /**
     * Send generic error in common format
     * @param err - error
     * @param res - response
     * @return Promise
     */
    sendError: function (err, res) {
        assert.ok(err, "err is invalid");
        assert.ok(res, "res is invalid");
        res.status(err.status || Constants.Status_ServerError);
        res.send({
            message: err.message,
            err: err,
            stack: err.stack
        });
    },

    /**
     * Assert content type in request
     * @param req - request
     * @param type - string value of contentType header
     * @throws AssertionException if not found
     */
    assertContentType(req, type) {
        assert.ok(req, "req is invalid");
        assert.ok(type, "type is invalid");
        type = type.toLowerCase();
        let header = req.header(Constants.Header_ContentType);
        header = "" || header.toLowerCase();
        assert.ok(header.indexOf(type) !== -1, "Invalid ContentType, expected:'" + type + "' and was:'" + header + "'");
    }
};

module.exports = Tools;