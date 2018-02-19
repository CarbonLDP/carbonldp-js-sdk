"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var NS = __importStar(require("./../NS"));
var PersistedProtectedDocument = __importStar(require("./../PersistedProtectedDocument"));
var Utils = __importStar(require("./../Utils"));
var PersistedCredentials = __importStar(require("./PersistedCredentials"));
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
            && PersistedProtectedDocument.Factory.is(object);
    };
    Factory.decorate = function (object, documents) {
        var persistedUser = object;
        if (Factory.hasClassProperties(persistedUser))
            return persistedUser;
        if (!PersistedProtectedDocument.Factory.hasClassProperties(persistedUser))
            PersistedProtectedDocument.Factory.decorate(persistedUser, documents);
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
    var promise = "credentials" in this ?
        Promise.resolve() : obtainCredentials(this);
    var responses = [];
    return promise.then(function (response) {
        if (response)
            responses.push(response);
        if (enabled)
            return _this.credentials.enable(requestOptions);
        return _this.credentials.disable(requestOptions);
    }).then(function (_a) {
        var _credentials = _a[0], credentialsResponses = _a[1];
        responses.push.apply(responses, credentialsResponses);
        return [_this, responses];
    });
}
function obtainCredentials(user) {
    return user
        .executeSELECTQuery("BASE<" + user.id + ">SELECT?c FROM<>WHERE{GRAPH<>{<><" + NS.CS.Predicate.credentials + ">?c}}")
        .then(function (_a) {
        var credentialsBinding = _a[0].bindings[0], response = _a[1];
        user.credentials = PersistedCredentials.Factory.decorate(credentialsBinding.credentials, user._documents);
        return response;
    });
}

//# sourceMappingURL=PersistedUser.js.map
