"use strict";
var NS = require("./../NS");
var Role = require("./../Auth/Role");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.CS.Class.AppRole;
exports.SCHEMA = {
    "parentRole": {
        "@id": NS.CS.Predicate.parentRole,
        "@type": "@id",
    },
    "childRoles": {
        "@id": NS.CS.Predicate.childRole,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return Utils.isObject(resource);
    };
    Factory.is = function (object) {
        return Role.Factory.is(object)
            && object.types.indexOf(exports.RDF_CLASS) !== -1;
    };
    Factory.create = function (name) {
        return Factory.createFrom({}, name);
    };
    Factory.createFrom = function (object, name) {
        var role = Role.Factory.createFrom(object, name);
        role.types.push(NS.CS.Class.AppRole);
        return role;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=Role.js.map