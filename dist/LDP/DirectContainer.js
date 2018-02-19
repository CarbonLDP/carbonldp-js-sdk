"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Document = __importStar(require("./../Document"));
var Errors = __importStar(require("./../Errors"));
var NS = __importStar(require("./../NS"));
var Utils = __importStar(require("./../Utils"));
exports.RDF_CLASS = NS.LDP.Class.DirectContainer;
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return Utils.hasPropertyDefined(resource, "membershipResource");
    };
    Factory.is = function (object) {
        return Document.Factory.is(object)
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
