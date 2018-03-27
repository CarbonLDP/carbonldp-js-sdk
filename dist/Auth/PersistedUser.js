"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PersistedProtectedDocument_1 = require("../PersistedProtectedDocument");
var Utils_1 = require("../Utils");
var User_1 = require("./User");
exports.PersistedUser = {
    isDecorated: function (value) {
        return Utils_1.isObject(value)
            && Utils_1.hasFunction(value, "enable")
            && Utils_1.hasFunction(value, "disable");
    },
    is: function (value) {
        return exports.PersistedUser.isDecorated(value)
            && User_1.User.isDecorated(value)
            && PersistedProtectedDocument_1.PersistedProtectedDocument.is(value);
    },
    decorate: function (object, documents) {
        if (exports.PersistedUser.isDecorated(object))
            return object;
        User_1.User.decorate(object);
        PersistedProtectedDocument_1.PersistedProtectedDocument.decorate(object, documents);
        return Object.defineProperties(object, {
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
    },
};
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

//# sourceMappingURL=PersistedUser.js.map
