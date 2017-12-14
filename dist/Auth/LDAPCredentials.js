"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("./../NS");
exports.RDF_CLASS = NS.CS.Class.LDAPCredentials;
exports.SCHEMA = {
    "ldapServer": {
        "@id": NS.CS.Predicate.ldapServer,
        "@type": "@id",
    },
    "ldapUserDN": {
        "@id": NS.CS.Predicate.ldapUserDN,
        "@type": NS.XSD.DataType.string,
    },
};

//# sourceMappingURL=LDAPCredentials.js.map
