"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vocabularies_1 = require("../Vocabularies");
exports.DetailedUserACReport = {
    TYPE: Vocabularies_1.CS.DetailedUserACReport,
    SCHEMA: {
        "protectedDocument": {
            "@id": Vocabularies_1.CS.protectedDocument,
            "@type": "@id",
        },
        "permissionReports": {
            "@id": Vocabularies_1.CS.permissionReport,
            "@type": "@id",
            "@container": "@set",
        },
    },
};

//# sourceMappingURL=DetailedUserACReport.js.map
