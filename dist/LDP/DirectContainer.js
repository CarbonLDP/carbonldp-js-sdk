"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var LDP_1 = require("../Vocabularies/LDP");
var Document_1 = require("./../Document");
var Errors = __importStar(require("./../Errors"));
var Utils = __importStar(require("./../Utils"));
exports.RDF_CLASS = LDP_1.LDP.DirectContainer;
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return Utils.hasPropertyDefined(resource, "membershipResource");
    };
    Factory.is = function (object) {
        return Document_1.Document.is(object)
            && object.hasType(exports.RDF_CLASS)
            && Factory.hasClassProperties(object);
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
        if (!Document_1.Document.is(object))
            container = Document_1.Document.createFrom(object);
        container.types.push(LDP_1.LDP.Container);
        container.types.push(LDP_1.LDP.DirectContainer);
        container.membershipResource = membershipResource;
        container.hasMemberRelation = hasMemberRelation;
        container.isMemberOfRelation = isMemberOfRelation;
        return container;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=DirectContainer.js.map
