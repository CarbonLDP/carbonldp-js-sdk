"use strict";
var AppRole = require("./Role");
var PersistedRole = require("./../Auth/PersistedRole");
var Utils = require("./../Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "_roles");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && AppRole.Factory.is(object);
    };
    Factory.decorate = function (object, roles) {
        var role = object;
        if (Factory.hasClassProperties(role))
            return role;
        PersistedRole.Factory.decorate(role, roles);
        return role;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedRole.js.map
