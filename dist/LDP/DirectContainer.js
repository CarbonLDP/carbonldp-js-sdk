"use strict";
var Document = require("./../Document");
var Errors = require("./../Errors");
var NS = require("./../NS");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.LDP.Class.DirectContainer;
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "membershipResource"));
    };
    Factory.is = function (object) {
        return (Factory.hasClassProperties(object)
            && Document.Factory.is(object)
            && object.hasType(exports.RDF_CLASS));
    };
    Factory.create = function (membershipResource, hasMemberRelation, isMemberOfRelation) {
        return Factory.createFrom({}, membershipResource, hasMemberRelation, isMemberOfRelation);
    };
    Factory.createFrom = function (object, membershipResource, hasMemberRelation, isMemberOfRelation) {
        if (Factory.is(object))
            throw new Errors.IllegalArgumentError("The base object is already a DirectContainer.");
        if (!membershipResource)
            throw new Errors.IllegalArgumentError("The property membershipResource cannot be null.");
        if (!hasMemberRelation)
            throw new Errors.IllegalArgumentError("The property hasMemberRelation cannot be empty.");
        if (!isMemberOfRelation && Utils.isDefined(isMemberOfRelation))
            throw new Errors.IllegalArgumentError("The property isMemberOfRelation cannot be empty.");
        var container = object;
        if (!Document.Factory.is(object))
            container = Document.Factory.createFrom(object);
        container.types.push(NS.LDP.Class.Container);
        container.types.push(NS.LDP.Class.DirectContainer);
        container.membershipResource = membershipResource;
        container.hasMemberRelation = hasMemberRelation;
        container.isMemberOfRelation = isMemberOfRelation;
        return container;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=DirectContainer.js.map
