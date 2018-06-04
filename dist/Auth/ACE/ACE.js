"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vocabularies_1 = require("../../Vocabularies");
var TransientACE_1 = require("./TransientACE");
exports.ACE = {
    TYPE: TransientACE_1.TransientACE.TYPE,
    SCHEMA: {
        "permissions": {
            "@id": Vocabularies_1.CS.permission,
            "@type": "@id",
            "@container": "@set",
        },
        "subject": {
            "@id": Vocabularies_1.CS.subject,
            "@type": "@id",
        },
    },
    create: TransientACE_1.TransientACE.create,
    createFrom: TransientACE_1.TransientACE.createFrom,
};

//# sourceMappingURL=ACE.js.map
