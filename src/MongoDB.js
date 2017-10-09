var Constants = require(__base + "/src/StubConstants");
var mongoose = require('mongoose');
mongoose.connect(Constants.MongooseURI, {
    useMongoClient: true,
    socketTimeoutMS: 2000,
    connectTimeoutMS: 2000
});
mongoose.connection.on('error',(err) => {
    console.error(err.message);
    console.error(err.stack);
});
mongoose.Promise = global.Promise;

var DeviceSchema = mongoose.Schema({
    id: Number,
    name: String,
    enabled: Boolean,
    registered: Date,
    updated: {type: Date, default: Date.now},
    details: [{
        detail: String,
        author: String,
    }]
});

module.exports = {
    DeviceSchema: DeviceSchema,
    mongoose: mongoose
};