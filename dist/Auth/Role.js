"use strict";
var Utils = require("./../Utils");
var Document = require("./../Document");
var NS = require("./../NS");
var IllegalArgumentError_1 = require("./../Errors/IllegalArgumentError");
exports.SCHEMA = {
    "name": {
        "@id": NS.CS.Predicate.namae,
        "@type": NS.XSD.DataType.string,
    },
    "agents": {
        "@id": NS.CS.Predicate.agent,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "name");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && Document.Factory.is(object);
    };
    Factory.create = function (name) {
        return Factory.createFrom({}, name);
    };
    Factory.createFrom = function (object, name) {
        if (!Document.Factory.hasClassProperties(object))
            object = Document.Factory.createFrom(object);
        if (!name)
            throw new IllegalArgumentError_1.default("The name cannot be empty.");
        var role = object;
        role.name = name;
        return role;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=Role.js.map
