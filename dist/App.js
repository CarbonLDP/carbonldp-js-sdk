"use strict";
var Document = require("./Document");
var NS = require("./NS");
var Utils = require("./Utils");
var Errors_1 = require("./Errors");
var Context_1 = require("./App/Context");
exports.Context = Context_1.default;
exports.RDF_CLASS = NS.CS.Class.Application;
exports.SCHEMA = {
    "name": {
        "@id": NS.CS.Predicate.name,
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
    "allowsOrigin": {
        "@id": NS.CS.Predicate.allowsOrigin,
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return Utils.hasPropertyDefined(resource, "name")
            && Utils.hasPropertyDefined(resource, "description");
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
            throw new Errors_1.IllegalArgumentError("The name cannot be empty.");
        if (!Utils.isString(description) || !description)
            throw new Errors_1.IllegalArgumentError("The description cannot be empty.");
        var app = object;
        app.name = name;
        app.description = description;
        app.types.push(NS.CS.Class.Application);
        return app;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=App.js.map
