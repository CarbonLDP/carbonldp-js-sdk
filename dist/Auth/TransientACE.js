"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fragment_1 = require("../Fragment");
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
exports.TransientACE = {
    TYPE: CS_1.CS.AccessControlEntry,
    SCHEMA: SCHEMA,
    is: function (object) {
        return Fragment_1.TransientFragment.is(object)
            && object.hasOwnProperty("granting")
            && object.hasOwnProperty("permissions")
            && object.hasOwnProperty("subjects")
            && object.hasOwnProperty("subjectsClass");
    },
    create: function (granting, subjects, subjectClass, permissions) {
        return exports.TransientACE.createFrom({}, granting, subjects, subjectClass, permissions);
    },
    createFrom: function (object, granting, subjects, subjectClass, permissions) {
        var ace = object;
        Fragment_1.TransientFragment.decorate(ace);
        ace.addType(exports.TransientACE.TYPE);
        ace.granting = granting;
        ace.subjects = subjects;
        ace.subjectsClass = subjectClass;
        ace.permissions = permissions;
        return ace;
    },
};

//# sourceMappingURL=TransientACE.js.map
