"use strict";
var Document = require("./../Document");
var Errors = require("./../Errors");
var NS = require("./../NS");
var Pointer = require("./../Pointer");
var Resource = require("./../Resource");
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
            && Resource.Util.hasType(object, exports.RDF_CLASS)
            && Document.Factory.is(object));
    };
    Factory.create = function (membershipResource, hasMemberRelation, memberOfRelation) {
        return Factory.createFrom({}, membershipResource, hasMemberRelation, memberOfRelation);
    };
    Factory.createFrom = function (object, membershipResource, hasMemberRelation, memberOfRelation) {
        if (Factory.is(object))
            throw new Errors.IllegalArgumentError("The base object is already a DirectContainer");
        if (!membershipResource)
            throw new Errors.IllegalArgumentError("The membershipResource cannot be null");
        var container = object;
        if (!Document.Factory.is(object))
            container = Document.Factory.createFrom(object);
        container.types.push(NS.LDP.Class.Container);
        container.types.push(NS.LDP.Class.DirectContainer);
        container.membershipResource = membershipResource;
        if (!!hasMemberRelation) {
            container.hasMemberRelation = Pointer.Factory.is(hasMemberRelation) ? hasMemberRelation : Pointer.Factory.create(hasMemberRelation);
        }
        if (!!memberOfRelation) {
            container.memberOfRelation = Pointer.Factory.is(memberOfRelation) ? memberOfRelation : Pointer.Factory.create(memberOfRelation);
        }
        return container;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=DirectContainer.js.map
