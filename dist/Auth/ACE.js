"use strict";
var NS = require("./../NS");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.CS.Class.AccessControlEntry;
exports.SCHEMA = {
    "granting": {
        "@id": NS.CS.Predicate.granting,
        "@type": NS.XSD.DataType.boolean,
    },
    "permissions": {
        "@id": NS.CS.Predicate.permission,
        "@type": "@id",
        "@container": "@set",
    },
    "subjects": {
        "@id": NS.CS.Predicate.subject,
        "@type": "@id",
        "@container": "@set",
    },
    "subjectsClass": {
        "@id": NS.CS.Predicate.subjectClass,
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
    Factory.decorate = function (object, granting, subjects, subjectClass, permissions) {
        if (Factory.hasClassProperties(object))
            return object;
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
