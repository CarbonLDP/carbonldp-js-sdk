"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = require("./../Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (value) {
        return Utils.hasPropertyDefined(value, "@list");
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=List.js.map
