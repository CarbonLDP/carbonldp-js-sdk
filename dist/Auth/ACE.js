"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransientFragment_1 = require("../TransientFragment");
var CS_1 = require("../Vocabularies/CS");
var XSD_1 = require("../Vocabularies/XSD");
var SCHEMA = {
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
exports.ACE = {
    TYPE: CS_1.CS.AccessControlEntry,
    SCHEMA: SCHEMA,
    is: function (object) {
        return TransientFragment_1.TransientFragment.is(object)
            && object.hasOwnProperty("granting")
            && object.hasOwnProperty("permissions")
            && object.hasOwnProperty("subjects")
            && object.hasOwnProperty("subjectsClass");
    },
    create: function (granting, subjects, subjectClass, permissions) {
        return exports.ACE.createFrom({}, granting, subjects, subjectClass, permissions);
    },
    createFrom: function (object, granting, subjects, subjectClass, permissions) {
        var ace = object;
        TransientFragment_1.TransientFragment.decorate(ace);
        ace.addType(exports.ACE.TYPE);
        ace.granting = granting;
        ace.subjects = subjects;
        ace.subjectsClass = subjectClass;
        ace.permissions = permissions;
        return ace;
    },
};

//# sourceMappingURL=ACE.js.map
