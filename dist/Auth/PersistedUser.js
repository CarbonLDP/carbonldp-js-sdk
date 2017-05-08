"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = require("./User");
var PersistedProtectedDocument = require("./../PersistedProtectedDocument");
var Utils = require("./../Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "name")
            && Utils.hasPropertyDefined(object, "email")
            && Utils.hasPropertyDefined(object, "enabled")
            && Utils.hasFunction(object, "enable")
            && Utils.hasFunction(object, "disable");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && PersistedProtectedDocument.Factory.is(object)
            && object.hasType(User.RDF_CLASS);
    };
    Factory.decorate = function (object) {
        var user = object;
        if (Factory.hasClassProperties(user))
            return user;
        if (!PersistedProtectedDocument.Factory.hasClassProperties(user))
            PersistedProtectedDocument.Factory.decorate(user);
        Object.defineProperties(user, {
            "enable": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: enable,
            },
            "disable": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: disable,
            },
        });
        return user;
    };
    return Factory;
}());
exports.Factory = Factory;
function enable() {
    this.enabled = true;
    return this.save();
}
function disable() {
    this.enabled = false;
    return this.save();
}

//# sourceMappingURL=PersistedUser.js.map
