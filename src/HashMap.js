define(["require", "exports"], function (require, exports) {
    // TODO: Create a hashing system
    var HashMap = (function () {
        function HashMap() {
            this.keys = [];
            this.values = [];
        }
        HashMap.prototype.isEmpty = function () {
            return this.keys.length === 0;
        };
        HashMap.prototype.hasKey = function (key) {
            return this.keys.indexOf(key) !== -1;
        };
        HashMap.prototype.hasValue = function (value) {
            return this.values.indexOf(value) !== -1;
        };
        HashMap.prototype.get = function (key) {
            return this.getValue(key);
        };
        HashMap.prototype.getValue = function (key) {
            var index = this.keys.indexOf(key);
            if (index === -1)
                throw new Error("The key doesn't exist.");
            return this.values[index];
        };
        HashMap.prototype.getKeys = function (value) {
            var keys = [];
            var index = this.values.indexOf(value);
            while (index !== -1) {
                keys.push(this.keys[index]);
                index = this.values.indexOf(value, index + 1);
            }
            return keys;
        };
        HashMap.prototype.getAllKeys = function () {
            return this.keys.slice();
        };
        HashMap.prototype.getValues = function () {
            return this.values.slice();
        };
        HashMap.prototype.size = function () {
            return this.keys.length;
        };
        HashMap.prototype.put = function (key, value) {
            if (this.hasKey(key))
                this.remove(key);
            this.keys.push(key);
            this.values.push(value);
        };
        HashMap.prototype.remove = function (key) {
            var index = this.keys.indexOf(key);
            if (index === -1)
                throw new Error("The key doesn't exist.");
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
        };
        HashMap.prototype.clear = function () {
            this.keys = [];
            this.values = [];
        };
        HashMap.fromObject = function (object) {
            var map = new HashMap();
            for (var name in object) {
                if (object.hasOwnProperty(name)) {
                    var value = object[name];
                    map.put(name, value);
                }
            }
            return map;
        };
        return HashMap;
    })();
    exports.default = HashMap;
});
//# sourceMappingURL=HashMap.js.map