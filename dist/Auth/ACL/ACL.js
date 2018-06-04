"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vocabularies_1 = require("../../Vocabularies");
exports.ACL = {
    TYPE: Vocabularies_1.CS.AccessControlList,
    SCHEMA: {
        "protectedDocument": {
            "@id": Vocabularies_1.CS.protectedDocument,
            "@type": "@id",
        },
        "inherits": {
            "@id": Vocabularies_1.CS.inherits,
            "@type": "@id",
        },
        "directACEntries": {
            "@id": Vocabularies_1.CS.directACEntry,
            "@type": "@id",
            "@container": "@set",
        },
        "immediateDescendantsACEntries": {
            "@id": Vocabularies_1.CS.immediateDescendantsACEntry,
            "@type": "@id",
            "@container": "@set",
        },
        "allDescendantsACEntries": {
            "@id": Vocabularies_1.CS.allDescendantsACEntry,
            "@type": "@id",
            "@container": "@set",
        },
    },
};

//# sourceMappingURL=ACL.js.map
