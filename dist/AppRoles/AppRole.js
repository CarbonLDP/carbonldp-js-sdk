"use strict";
var Utils = require("./../Utils");
var Document = require("./../Document");
var NS = require("./../NS");
var IllegalArgumentError_1 = require("./../Errors/IllegalArgumentError");
exports.RDF_CLASS = NS.CS.Class.AppRole;
exports.SCHEMA = {
    "name": {
        "@id": NS.CS.Predicate.name,
        "@type": NS.XSD.DataType.string,
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
            && object.types.indexOf(NS.CS.Class.AppRole) !== -1;
    };
    Factory.create = function (name) {
        return Factory.createFrom({}, name);
    };
    Factory.createFrom = function (object, name) {
        if (!Document.Factory.hasClassProperties(object))
            object = Document.Factory.createFrom(object);
        if (!name)
            throw new IllegalArgumentError_1.default("The name cannot be empty.");
        var app = object;
        app.name = name;
        app.types.push(NS.CS.Class.AppRole);
        return app;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=AppRole.js.map
