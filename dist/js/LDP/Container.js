/// <reference path="../../typings/tsd.d.ts" />
var NS = require("./../NS");
var Pointer = require("./../Pointer");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.LDP.Class.Container;
exports.SCHEMA = {
    "memberOfRelation": {
        "@id": NS.LDP.Predicate.memberOfRelation,
        "@type": "@id",
    },
    "hasMemberRelation": {
        "@id": NS.LDP.Predicate.hasMemberRelation,
        "@type": "@id",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.prototype.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "memberOfRelation") &&
            Utils.hasPropertyDefined(resource, "hasMemberRelation"));
    };
    Factory.prototype.hasRDFClass = function (pointerOrExpandedObject) {
        var types = [];
        if ("@type" in pointerOrExpandedObject) {
            types = pointerOrExpandedObject["@type"];
        }
        else if ("types" in pointerOrExpandedObject) {
            // TODO: Use proper class
            var resource = pointerOrExpandedObject;
            types = Pointer.Util.getIDs(resource.types);
        }
        return (types.indexOf(exports.RDF_CLASS) !== -1 ||
            types.indexOf(NS.LDP.Class.BasicContainer) !== -1 ||
            types.indexOf(NS.LDP.Class.DirectContainer) !== -1 ||
            types.indexOf(NS.LDP.Class.IndirectContainer) !== -1);
    };
    return Factory;
})();
exports.Factory = Factory;
exports.factory = new Factory();

//# sourceMappingURL=Container.js.map
