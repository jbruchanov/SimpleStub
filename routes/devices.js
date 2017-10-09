var express = require('express');
var router = express.Router();

var MongoSchemas = require(__base + "/src/MongoDB");
var Tools = require(__base + "/src/Tools");
var Constants = require(__base + "/src/StubConstants");

var Device = MongoSchemas.mongoose.model('Device', MongoSchemas.DeviceSchema);

router.get('/', function (req, res, next) {
    Device.find()
        .then((result) => res.send(result))
        .catch((err) => Tools.sendError(err, res));
});

router.get('/:id', function (req, res, next) {
    Device.findOne({_id: req.param("id")})
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
    var d = new Device(req.body);
    d.save()
        .then(() => res.send(d))
        .catch((err) => Tools.sendError(err, res));
});

router.post('/', function (req, res, next) {
    Tools.assertContentType(req, Constants.ContentType_JSON);
    Device.findOneAndUpdate({_id: req.body._id}, req.body)
        .then(() => {
            return Device
                .findOne({_id: req.body._id})
                .then((result) => res.send(result))
        })
        .catch((err) => Tools.sendError(err, res));
});

module.exports = router;
