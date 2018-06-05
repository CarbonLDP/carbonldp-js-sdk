"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vocabularies_1 = require("../Vocabularies");
exports.CompleteACReport = {
    TYPE: Vocabularies_1.CS.CompleteACReport,
    SCHEMA: {
        "protectedDocument": {
            "@id": Vocabularies_1.CS.protectedDocument,
            "@type": "@id",
        },
        "subjectReports": {
            "@id": Vocabularies_1.CS.subjectReport,
            "@type": "@id",
            "@container": "@set",
        },
    },
};

//# sourceMappingURL=CompleteACReport.js.map
