"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("./../NS");
var VolatileResource_1 = require("./VolatileResource");
exports.RDF_CLASS = NS.C.Class.BNodesMapping;
exports.SCHEMA = {
    "resource": {
        "@id": NS.C.Predicate.resource,
        "@type": "@id",
    },
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
        return VolatileResource_1.Factory.is(object)
            && object.hasType(exports.RDF_CLASS);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=BNodesMapping.js.map
