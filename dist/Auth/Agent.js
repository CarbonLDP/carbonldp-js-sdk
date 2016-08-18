"use strict";
var Document = require("./../Document");
var IllegalArgumentError_1 = require("./../Errors/IllegalArgumentError");
var NS = require("./../NS");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.CS.Class.Agent;
exports.SCHEMA = {
    "name": {
        "@id": NS.CS.Predicate.namae,
        "@type": NS.XSD.DataType.string,
    },
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
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "name")
            && Utils.hasPropertyDefined(object, "email")
            && Utils.hasPropertyDefined(object, "password");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && Document.Factory.hasClassProperties(object)
            && object.hasType(exports.RDF_CLASS);
    };
    Factory.create = function (name, email, password) {
        return Factory.createFrom({}, name, email, password);
    };
    Factory.createFrom = function (object, name, email, password) {
        if (!Document.Factory.hasClassProperties(object))
            object = Document.Factory.createFrom(object);
        if (!name)
            throw new IllegalArgumentError_1.default("The name cannot be empty.");
        if (!email)
            throw new IllegalArgumentError_1.default("The email cannot be empty.");
        if (!password)
            throw new IllegalArgumentError_1.default("The password cannot be empty.");
        var app = object;
        app.name = name;
        app.email = email;
        app.password = password;
        app.types.push(NS.CS.Class.Agent);
        return app;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=Agent.js.map
