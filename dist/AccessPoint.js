"use strict";
var LDP = require("./LDP");
var NS = require("./NS");
var Utils = require("./Utils");
exports.RDF_CLASS = NS.C.Class.AccessPoint;
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "membershipResource"));
    };
    Factory.create = function (membershipResource, hasMemberRelation, memberOfRelation) {
        return Factory.createFrom({}, membershipResource, hasMemberRelation, memberOfRelation);
    };
    Factory.createFrom = function (object, membershipResource, hasMemberRelation, memberOfRelation) {
        return LDP.DirectContainer.Factory.createFrom(object, membershipResource, hasMemberRelation, memberOfRelation);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=AccessPoint.js.map
