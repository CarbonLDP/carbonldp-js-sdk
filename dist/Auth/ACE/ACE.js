"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fragment_1 = require("../../Fragment");
var Vocabularies_1 = require("../../Vocabularies");
var TransientACE_1 = require("./TransientACE");
exports.ACE = {
    TYPE: TransientACE_1.TransientACE.TYPE,
    SCHEMA: {
        "granting": {
            "@id": Vocabularies_1.CS.granting,
            "@type": Vocabularies_1.XSD.boolean,
        },
        "permissions": {
            "@id": Vocabularies_1.CS.permission,
            "@type": "@id",
            "@container": "@set",
        },
        "subjects": {
            "@id": Vocabularies_1.CS.subject,
            "@type": "@id",
            "@container": "@set",
        },
        "subjectsClass": {
            "@id": Vocabularies_1.CS.subjectClass,
            "@type": "@id",
        },
    },
    is: function (value) {
        return Fragment_1.Fragment.is(value)
            && value.hasType(exports.ACE.TYPE);
    },
    create: TransientACE_1.TransientACE.create,
    createFrom: TransientACE_1.TransientACE.createFrom,
};

//# sourceMappingURL=ACE.js.map
