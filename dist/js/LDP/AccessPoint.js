/// <reference path="../../typings/tsd.d.ts" />
var NS = require("./../NS");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.C.Class.AccessPoint;
exports.SCHEMA = {
    "membershipResource": {
        "@id": NS.LDP.Predicate.membershipResource,
        "@type": "@id",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.prototype.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "membershipResource"));
    };
    return Factory;
})();
exports.Factory = Factory;

//# sourceMappingURL=AccessPoint.js.map
