var JsonDB = require(__base + "/src/JsonDB");
var assert = require('assert');
var _ = require("lodash");

class SimpleObjectJsonDB extends JsonDB {

    //_file path
    //_data object

    /**
     * Add item into collection
     * @param key
     * @param item
     */
    addItem(key, item) {
        assert.ok(key, "key is invalid");
        assert.ok(item !== undefined, "item is undefined");
        this.assertIsObject();
        this._data[key] = item;
    }

    /**
     *
     * @param item
     * @returns {Array} of removed items
     */
    removeItem(key) {
        assert.ok(key, "key is invalid");
        this.assertIsObject();
        let item = this._data[key];
        delete this._data[key];
        return item
    }

    assertIsObject() {
        assert.ok(typeof(this._data) === 'object', "Loaded object is not an object");
    }
}

module.exports = SimpleObjectJsonDB;