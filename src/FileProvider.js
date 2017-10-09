var fs = require('fs');
var Promise = require('promise');
var Constants = require(__dirname + '/StubConstants');
var Tools = require("../src/Tools");

class FileProvider {
    /**
     * Load file's content
     * @param file
     * @return Promise
     */
    loadFile(file) {
        return Promise.denodeify(fs.readFile)(file, Constants.UTF8);
    }

    /**
     * Save content into file
     * @param file
     */
    saveFile(file, data) {
        return Promise.denodeify(fs.writeFile)(file, data, Constants.UTF8);
    }

    /**
     * Load file's content
     * @param file
     * @return Promise
     */
    sendJSONFileRequest(res, file) {
        return this.sendFileRequest(res, file, Constants.ContentType_JSON);
    }

    /**
     * Load file's content
     * @param file
     * @return Promise
     */
    sendFileRequest(res, file, contentType) {
        res.setHeader(Constants.Header_ContentType, contentType);
        return this.loadFile(file)
            .then((fileContent) => {
                res.send(fileContent)
            })
            .catch((err) => {
                Tools.sendError(err, res);
            });
    }
}

module.exports = FileProvider;