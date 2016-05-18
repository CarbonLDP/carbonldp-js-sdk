"use strict";
var NS = require("./../NS");
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
    "subject": {
        "@id": NS.CS.Predicate.subject,
        "@type": "@id",
    },
    "subjectClass": {
        "@id": NS.CS.Predicate.subjectClass,
        "@type": "@id",
    },
};

//# sourceMappingURL=ACE.js.map
