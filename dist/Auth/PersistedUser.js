"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PersistedProtectedDocument_1 = require("../PersistedProtectedDocument");
var Utils_1 = require("../Utils");
var User_1 = require("./User");
function enable(requestOptions) {
    return changeAvailability(this, "enabled", requestOptions);
}
exports.enable = enable;
function disable(requestOptions) {
    return changeAvailability(this, "disabled", requestOptions);
}
exports.disable = disable;
function changeAvailability(user, flag, requestOptions) {
    return user
        .resolve()
        .then(function () {
        user[flag] = true;
        var reverse = flag === "enabled" ? "disabled" : "enabled";
        delete user[reverse];
        return user.save(requestOptions);
    });
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils_1.isObject(object)
            && Utils_1.hasFunction(object, "enable")
            && Utils_1.hasFunction(object, "disable");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && User_1.User.isDecorated(object)
            && PersistedProtectedDocument_1.PersistedProtectedDocument.is(object);
    };
    Factory.decorate = function (object, documents) {
        if (Factory.hasClassProperties(object))
            return object;
        User_1.User.decorate(object);
        PersistedProtectedDocument_1.PersistedProtectedDocument.decorate(object, documents);
        var persistedUser = Object.defineProperties(object, {
            "enable": {
                configurable: true,
                writable: true,
                value: enable,
            },
            "disable": {
                configurable: true,
                writable: true,
                value: disable,
            },
        });
        return persistedUser;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedUser.js.map
