"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LDP = require("./LDP");
var NS = require("./NS");
exports.RDF_CLASS = NS.C.Class.AccessPoint;
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return LDP.DirectContainer.Factory.is(object);
    };
    Factory.create = function (membershipResource, hasMemberRelation, isMemberOfRelation) {
        return Factory.createFrom({}, membershipResource, hasMemberRelation, isMemberOfRelation);
    };
    Factory.createFrom = function (object, membershipResource, hasMemberRelation, isMemberOfRelation) {
        return LDP.DirectContainer.Factory.createFrom(object, membershipResource, hasMemberRelation, isMemberOfRelation);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=AccessPoint.js.map
