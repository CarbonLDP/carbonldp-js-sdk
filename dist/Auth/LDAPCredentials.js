"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vocabularies_1 = require("../Vocabularies");
var SCHEMA = {
    "ldapServer": {
        "@id": Vocabularies_1.CS.ldapServer,
        "@type": "@id",
    },
    "ldapUserDN": {
        "@id": Vocabularies_1.CS.ldapUserDN,
        "@type": Vocabularies_1.XSD.string,
    },
};
exports.LDAPCredentials = {
    TYPE: Vocabularies_1.CS.LDAPCredentials,
    SCHEMA: SCHEMA,
};

//# sourceMappingURL=LDAPCredentials.js.map
