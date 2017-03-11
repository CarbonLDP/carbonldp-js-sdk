"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("./../NS");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.LDP.Class.IndirectContainer;
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "insertedContentRelation"));
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=IndirectContainer.js.map
