var Utils = require("./Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.prototype.is = function (value) {
        return !!(Utils.isObject(value) &&
            Utils.hasProperty(value, "id") &&
            Utils.hasFunction(value, "resolve"));
    };
    return Factory;
})();
exports.Factory = Factory;
exports.factory = new Factory();
var Util = (function () {
    function Util() {
    }
    Util.getIDs = function (pointers) {
        var ids = [];
        for (var _i = 0; _i < pointers.length; _i++) {
            var pointer = pointers[_i];
            ids.push(pointer.id);
        }
        return ids;
    };
    return Util;
})();
exports.Util = Util;

//# sourceMappingURL=Pointer.js.map
