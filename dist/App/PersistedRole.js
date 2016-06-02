"use strict";
var AppRole = require("./Role");
var PersistedRole = require("./../Auth/PersistedRole");
var Utils = require("./../Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.isObject(object);
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && AppRole.Factory.is(object);
    };
    Factory.decorate = function (object) {
        var role = object;
        if (Factory.hasClassProperties(role))
            return role;
        PersistedRole.Factory.decorate(role);
        return role;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedRole.js.map
