"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("../Resource");
var C_1 = require("../Vocabularies/C");
exports.RDF_CLASS = C_1.C.Map;
exports.SCHEMA = {
    "entries": {
        "@id": C_1.C.entry,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return Resource_1.Resource.is(object)
            && object.hasType(exports.RDF_CLASS)
            && object.hasOwnProperty("entries");
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=Map.js.map
