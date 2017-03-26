"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = require("./../Utils");
var ValueTypes = (function () {
    function ValueTypes() {
    }
    Object.defineProperty(ValueTypes, "URI", {
        get: function () { return "uri"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueTypes, "LITERAL", {
        get: function () { return "literal"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueTypes, "BNODE", {
        get: function () { return "bnode"; },
        enumerable: true,
        configurable: true
    });
    return ValueTypes;
}());
exports.ValueTypes = ValueTypes;
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (value) {
        return (Utils.hasPropertyDefined(value, "head"));
    };
    Factory.is = function (value) {
        return (Utils.isObject(value) &&
            Factory.hasClassProperties(value));
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=RawResults.js.map
