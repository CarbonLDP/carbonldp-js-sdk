"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var Document = __importStar(require("./../Document"));
var IllegalArgumentError_1 = __importDefault(require("./../Errors/IllegalArgumentError"));
var NS = __importStar(require("../Vocabularies/index"));
var Utils = __importStar(require("./../Utils"));
exports.RDF_CLASS = NS.CS.Role;
exports.SCHEMA = {
    "name": {
        "@id": NS.CS.name,
        "@type": NS.XSD.string,
    },
    "description": {
        "@id": NS.CS.description,
        "@type": NS.XSD.string,
    },
    "parentRole": {
        "@id": NS.CS.parentRole,
        "@type": "@id",
    },
    "childRoles": {
        "@id": NS.CS.childRole,
        "@type": "@id",
        "@container": "@set",
    },
    "users": {
        "@id": NS.CS.user,
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
