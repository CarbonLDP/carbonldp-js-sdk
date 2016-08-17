"use strict";
var Role = require("./Role");
var Utils = require("./../Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "name");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && Role.Factory.is(object);
    };
    Factory.decorate = function (object) {
        var role = object;
        if (Factory.hasClassProperties(role))
            return role;
        return role;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedRole.js.map
