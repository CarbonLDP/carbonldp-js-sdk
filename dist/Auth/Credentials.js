"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CS_1 = require("../Vocabularies/CS");
var VCARD_1 = require("../Vocabularies/VCARD");
var XSD_1 = require("../Vocabularies/XSD");
var Document_1 = require("./../Document");
var Errors_1 = require("../Errors");
exports.RDF_CLASS = CS_1.CS.Credentials;
exports.SCHEMA = {
    "email": {
        "@id": VCARD_1.VCARD.email,
        "@type": XSD_1.XSD.string,
    },
    "password": {
        "@id": CS_1.CS.password,
        "@type": XSD_1.XSD.string,
    },
    "enabled": {
        "@id": CS_1.CS.enabled,
        "@type": XSD_1.XSD.boolean,
    },
    "user": {
        "@id": CS_1.CS.credentialsOf,
        "@type": "@id",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.create = function (email, password) {
        return Factory.createFrom({}, email, password);
    };
    Factory.createFrom = function (object, email, password) {
        var credentials = Document_1.Document.createFrom(object);
        if (!email)
            throw new Errors_1.IllegalArgumentError("The email cannot be empty.");
        if (!password)
            throw new Errors_1.IllegalArgumentError("The password cannot be empty.");
        credentials.addType(exports.RDF_CLASS);
        credentials.email = email;
        credentials.password = password;
        return credentials;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=Credentials.js.map
