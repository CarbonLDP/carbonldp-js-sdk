"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var CS_1 = require("../Vocabularies/CS");
var XSD_1 = require("../Vocabularies/XSD");
var Utils = __importStar(require("./../Utils"));
exports.RDF_CLASS = CS_1.CS.AccessControlEntry;
exports.SCHEMA = {
    "granting": {
        "@id": CS_1.CS.granting,
        "@type": XSD_1.XSD.boolean,
    },
    "permissions": {
        "@id": CS_1.CS.permission,
        "@type": "@id",
        "@container": "@set",
    },
    "subjects": {
        "@id": CS_1.CS.subject,
        "@type": "@id",
        "@container": "@set",
    },
    "subjectsClass": {
        "@id": CS_1.CS.subjectClass,
        "@type": "@id",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "granting")
            && Utils.hasPropertyDefined(object, "permissions")
            && Utils.hasPropertyDefined(object, "subjects")
            && Utils.hasPropertyDefined(object, "subjectsClass");
    };
    Factory.createFrom = function (object, granting, subjects, subjectClass, permissions) {
        var ace = object;
        if (!ace.types)
            ace.types = [];
        ace.types.push(exports.RDF_CLASS);
        ace.granting = granting;
        ace.subjects = subjects;
        ace.subjectsClass = subjectClass;
        ace.permissions = permissions;
        return ace;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=ACE.js.map
