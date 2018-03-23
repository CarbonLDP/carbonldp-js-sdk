"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PersistedProtectedDocument_1 = require("../PersistedProtectedDocument");
var CS_1 = require("../Vocabularies/CS");
var Utils = require("./../Utils");
var PersistedCredentials = require("./PersistedCredentials");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.isObject(object)
            && Utils.hasFunction(object, "enableCredentials")
            && Utils.hasFunction(object, "disableCredentials");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && PersistedProtectedDocument_1.PersistedProtectedDocument.is(object);
    };
    Factory.decorate = function (object, documents) {
        var persistedUser = object;
        if (Factory.hasClassProperties(persistedUser))
            return persistedUser;
        if (!PersistedProtectedDocument_1.PersistedProtectedDocument.isDecorated(persistedUser))
            PersistedProtectedDocument_1.PersistedProtectedDocument.decorate(persistedUser, documents);
        Object.defineProperties(persistedUser, {
            "enableCredentials": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: changeEnabledCredentials.bind(persistedUser, true),
            },
            "disableCredentials": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: changeEnabledCredentials.bind(persistedUser, false),
            },
        });
        if (persistedUser.credentials)
            PersistedCredentials.Factory.decorate(persistedUser.credentials, documents);
        return persistedUser;
    };
    return Factory;
}());
exports.Factory = Factory;
function changeEnabledCredentials(enabled, requestOptions) {
    var _this = this;
    return ensureCredentials(this)
        .then(function () {
        if (enabled)
            return _this.credentials.enable(requestOptions);
        return _this.credentials.disable(requestOptions);
    }).then(function () {
        return _this;
    });
}
function ensureCredentials(user) {
    if (PersistedCredentials.Factory.hasClassProperties(user.credentials))
        return Promise.resolve();
    return user
        .executeSELECTQuery("BASE<" + user.id + ">SELECT?c FROM<>WHERE{GRAPH<>{<><" + CS_1.CS.credentials + ">?c}}")
        .then(function (_a) {
        var credentialsBinding = _a.bindings[0];
        user.credentials = PersistedCredentials.Factory.decorate(credentialsBinding.credentials, user._documents);
    });
}

//# sourceMappingURL=PersistedUser.js.map
