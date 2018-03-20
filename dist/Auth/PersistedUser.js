"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var PersistedProtectedDocument_1 = require("../PersistedProtectedDocument");
var User = __importStar(require("./User"));
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
            && User.Factory.hasClassProperties(object)
            && PersistedProtectedDocument_1.PersistedProtectedDocument.is(object);
    };
    Factory.decorate = function (object, documents) {
        if (Factory.hasClassProperties(object))
            return object;
        User.Factory.decorate(object);
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
