"use strict";
var Document = require("./../Document");
var Errors = require("./../Errors");
var NS = require("./../NS");
var Pointer = require("./../Pointer");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.LDP.Class.DirectContainer;
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "membershipResource"));
    };
    Factory.hasRDFClass = function (resourceOrExpandedObject) {
        var types = [];
        if ("@type" in resourceOrExpandedObject) {
            types = resourceOrExpandedObject["@type"];
        }
        else if ("types" in resourceOrExpandedObject) {
            var resource = resourceOrExpandedObject;
            types = resource.types;
        }
        return types.indexOf(NS.LDP.Class.DirectContainer) !== -1;
    };
    Factory.is = function (object) {
        return (Document.Factory.is(object) &&
            Factory.hasClassProperties(object) &&
            Factory.hasRDFClass(object));
    };
    Factory.create = function (membershipResource, hasMemberRelation, memberOfRelation) {
        return Factory.createFrom({}, membershipResource, hasMemberRelation, memberOfRelation);
    };
    Factory.createFrom = function (object, membershipResource, hasMemberRelation, memberOfRelation) {
        if (Factory.is(object))
            throw new Errors.IllegalArgumentError("The base object is already a DirectContainer");
        if (!membershipResource)
            throw new Errors.IllegalArgumentError("membershipResource cannot be null");
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
