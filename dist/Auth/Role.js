"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document = require("./../Document");
var IllegalArgumentError_1 = require("./../Errors/IllegalArgumentError");
var NS = require("./../NS");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.CS.Class.Role;
exports.SCHEMA = {
    "name": {
        "@id": NS.CS.Predicate.namae,
        "@type": NS.XSD.DataType.string,
    },
    "description": {
        "@id": NS.CS.Predicate.description,
        "@type": NS.XSD.DataType.string,
    },
    "users": {
        "@id": NS.CS.Predicate.user,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "name");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && Document.Factory.is(object);
    };
    Factory.create = function (name, description) {
        return Factory.createFrom({}, name, description);
    };
    Factory.createFrom = function (object, name, description) {
        if (!Document.Factory.hasClassProperties(object))
            object = Document.Factory.createFrom(object);
        if (!name)
            throw new IllegalArgumentError_1.default("The name cannot be empty.");
        var role = object;
        role.name = name;
        role.description = description;
        return role;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=Role.js.map
