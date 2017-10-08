var fs = require('fs');
var Promise = require('promise');
var Constants = require(__dirname + '/stubconstants');

module.exports = class FileProvider {
    /**
     * Load file's content
     * @param file
     * @return Promise
     */
    loadFile(file) {
        return Promise.denodeify(fs.readFile)(file, 'utf-8');
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
                res.send(err)
            });
    }
};