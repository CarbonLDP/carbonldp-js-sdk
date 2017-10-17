"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("./../NS");
var Utils_1 = require("../Utils");
exports.SCHEMA = {
    "target": {
        "@id": NS.C.Predicate.target,
        "@type": "@id",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils_1.hasProperty(object, "target");
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=Message.js.map
