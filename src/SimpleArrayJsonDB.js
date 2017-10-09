var JsonDB = require(__base + '/src/JsonDB');
var assert = require('assert');
var _ = require("lodash");

class SimpleArrayJsonDB extends JsonDB {

    //_file path
    //_data object

    /**
     * Add item into collection
     * @param item
     */
    addItem(item) {
        assert.ok(item, "item is invalid");
        this.assertIsArray();
        this._data.push(item);
    }

    /**
     *
     * @param item
     * @returns {Array} of removed items
     */
    removeItem(item) {
        assert.ok(item, "item is invalid");
        this.assertIsArray();
        return _.remove(this._data, (i) => i === item);
    }

    assertIsArray() {
        assert.ok(Array.isArray(this._data), "Loaded object is not an array");
    }
}

module.exports = SimpleArrayJsonDB;