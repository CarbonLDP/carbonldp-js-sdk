"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CS_1 = require("../Vocabularies/CS");
var XSD_1 = require("../Vocabularies/XSD");
var Document_1 = require("./../Document");
var IllegalArgumentError_1 = require("./../Errors/IllegalArgumentError");
var Utils = require("./../Utils");
exports.RDF_CLASS = CS_1.CS.Role;
exports.SCHEMA = {
    "name": {
        "@id": CS_1.CS.name,
        "@type": XSD_1.XSD.string,
    },
    "description": {
        "@id": CS_1.CS.description,
        "@type": XSD_1.XSD.string,
    },
    "parentRole": {
        "@id": CS_1.CS.parentRole,
        "@type": "@id",
    },
    "childRoles": {
        "@id": CS_1.CS.childRole,
        "@type": "@id",
        "@container": "@set",
    },
    "users": {
        "@id": CS_1.CS.user,
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
            && Document_1.Document.is(object);
    };
    Factory.create = function (name, description) {
        return Factory.createFrom({}, name, description);
    };
    Factory.createFrom = function (object, name, description) {
        if (!Document_1.Document.isDecorated(object))
            object = Document_1.Document.createFrom(object);
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
