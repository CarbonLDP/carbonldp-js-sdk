"use strict";
var Utils = require("./../Utils");
var Document = require("./../Document");
var NS = require("./../NS");
var IllegalArgumentError_1 = require("./../Errors/IllegalArgumentError");
exports.RDF_CLASS = NS.CS.Class.Agent;
exports.SCHEMA = {
    "name": {
        "@id": NS.CS.Predicate.name,
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
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return Utils.hasPropertyDefined(resource, "name")
            && Utils.hasPropertyDefined(resource, "email")
            && Utils.hasPropertyDefined(resource, "password");
    };
    Factory.is = function (object) {
        return Document.Factory.hasClassProperties(object)
            && Factory.hasClassProperties(object)
            && object.types.indexOf(NS.CS.Class.Agent) !== -1;
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
