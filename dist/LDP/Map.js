"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("./../NS");
var Resource_1 = require("./../Resource");
exports.RDF_CLASS = NS.C.Class.Map;
exports.SCHEMA = {
    "entries": {
        "@id": NS.C.Predicate.entry,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return Resource_1.Factory.is(object)
            && object.hasType(exports.RDF_CLASS)
            && object.hasOwnProperty("entries");
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=Map.js.map
