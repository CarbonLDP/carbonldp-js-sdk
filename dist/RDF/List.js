"use strict";
var Utils = require("./../Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (value) {
        return Utils.isObject(value)
            && Utils.hasProperty(value, "@list")
            && Utils.isArray(value["@list"]);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=List.js.map
