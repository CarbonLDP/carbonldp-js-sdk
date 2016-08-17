"use strict";
var Document = require("./Document");
var NS = require("./NS");
var Utils = require("./Utils");
var IllegalArgumentError_1 = require("./Errors/IllegalArgumentError");
var PersistedRole = require("./App/PersistedRole");
exports.PersistedRole = PersistedRole;
var Role = require("./App/Role");
exports.Role = Role;
var Roles = require("./App/Roles");
exports.Roles = Roles;
var Context_1 = require("./App/Context");
exports.Context = Context_1.default;
exports.RDF_CLASS = NS.CS.Class.Application;
exports.SCHEMA = {
    "name": {
        "@id": NS.CS.Predicate.namae,
        "@type": NS.XSD.DataType.string,
    },
    "description": {
        "@id": NS.CS.Predicate.description,
        "@type": NS.XSD.DataType.string,
    },
    "rootContainer": {
        "@id": NS.CS.Predicate.rootContainer,
        "@type": "@id",
    },
    "allowsOrigins": {
        "@id": NS.CS.Predicate.allowsOrigin,
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return Utils.hasPropertyDefined(resource, "name");
    };
    Factory.is = function (object) {
        return Document.Factory.hasClassProperties(object)
            && Factory.hasClassProperties(object)
            && object.types.indexOf(NS.CS.Class.Application) !== -1;
    };
    Factory.create = function (name, description) {
        return Factory.createFrom({}, name, description);
    };
    Factory.createFrom = function (object, name, description) {
        if (!Document.Factory.hasClassProperties(object))
            object = Document.Factory.createFrom(object);
        if (!Utils.isString(name) || !name)
            throw new IllegalArgumentError_1.default("The name cannot be empty.");
        var app = object;
        app.name = name;
        app.types.push(NS.CS.Class.Application);
        if (!!description)
            app.description = description;
        return app;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=App.js.map
