"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("../../NS");
var VolatileResource = require("../../LDP/VolatileResource");
exports.RDF_CLASS = NS.C.Class.QueryMetadata;
exports.SCHEMA = {
    "target": {
        "@id": NS.C.Predicate.target,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return VolatileResource.Factory.is(object)
            && object.hasType(exports.RDF_CLASS);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=QueryMetadata.js.map
