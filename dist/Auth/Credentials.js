"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document = require("./../Document");
var NS = require("./../NS");
var Errors_1 = require("./../Errors");
exports.RDF_CLASS = NS.CS.Class.Credentials;
exports.SCHEMA = {
    "email": {
        "@id": NS.VCARD.Predicate.email,
        "@type": NS.XSD.DataType.string,
    },
    "password": {
        "@id": NS.CS.Predicate.password,
        "@type": NS.XSD.DataType.string,
    },
    "enabled": {
        "@id": NS.CS.Predicate.enabled,
        "@type": NS.XSD.DataType.boolean,
    },
    "user": {
        "@id": NS.CS.Predicate.credentialsOf,
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
        var credentials = Document.Factory.createFrom(object);
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
