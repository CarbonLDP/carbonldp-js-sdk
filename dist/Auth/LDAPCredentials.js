"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var NS = __importStar(require("./../NS"));
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
