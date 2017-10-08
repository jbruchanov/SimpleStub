var FileProvider = require(__dirname + '/FileProvider');
var fp = new FileProvider();
var assert = require('assert');
var _ = require("lodash");

class SimpleArrayJsonDB {

    //_file path
    //_data object

    /**
     * Load json file
     * @param file
     * @return Promise
     */
    loadJsonFile(file) {
        this._file = file;
        var thiz = this;
        return fp.loadFile(file)
            .then((content) => {
                this.loadJson(content);
                return Promise.resolve(thiz);
            })
    }

    /**
     * Load data as json string
     * @param json string
     */
    loadJson(json) {
        this._data = JSON.parse(json)
    }

    /**
     * Save actual data into file
     * @returns {Promise}
     */
    save() {
        assert.ok(this._file !== null, "file is null");
        return fp.saveFile(this._file, JSON.stringify(this._data, null, 2));
    }

    get file() {
        return this._file;
    }

    set file(value) {
        this._file = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    /**
     * Add item into collection
     * @param item
     */
    addItem(item) {
        this.assertIsArray();
        this._data.push(item);
    }

    /**
     *
     * @param item
     * @returns {Array} of removed items
     */
    removeItem(item) {
        this.assertIsArray();
        return _.remove(this._data, (i) => i === item);
    }

    assertIsArray() {
        assert.ok(Array.isArray(this._data), "Loaded object is not an array");
    }
}

module.exports = SimpleArrayJsonDB;