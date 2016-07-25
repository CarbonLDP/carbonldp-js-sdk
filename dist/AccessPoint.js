"use strict";
var LDP = require("./LDP");
var NS = require("./NS");
exports.RDF_CLASS = NS.C.Class.AccessPoint;
var Factory = (function () {
    function Factory() {
    }
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
