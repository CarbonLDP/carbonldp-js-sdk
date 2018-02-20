"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var C_1 = require("../Vocabularies/C");
exports.SCHEMA = {
    "target": {
        "@id": C_1.C.target,
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
