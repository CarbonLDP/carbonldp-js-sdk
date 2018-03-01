"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var PersistedProtectedDocument_1 = require("../PersistedProtectedDocument");
var Utils = __importStar(require("./../Utils"));
var PersistedUser = __importStar(require("./PersistedUser"));
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.isObject(object)
            && Utils.hasFunction(object, "enable")
            && Utils.hasFunction(object, "disable");
    };
    Factory.decorate = function (persistedDocument, documents) {
        var persistedCredentials = persistedDocument;
        if (Factory.hasClassProperties(persistedDocument))
            return persistedCredentials;
        PersistedProtectedDocument_1.PersistedProtectedDocument.decorate(persistedCredentials, documents);
        Object.defineProperties(persistedCredentials, {
            "enable": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: changeEnabled.bind(persistedCredentials, true),
            },
            "disable": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: changeEnabled.bind(persistedCredentials, false),
            },
        });
        if (persistedCredentials.user) {
            PersistedUser.Factory.decorate(persistedCredentials.user, documents);
            persistedCredentials.user.credentials = persistedCredentials;
        }
        return persistedCredentials;
    };
    return Factory;
}());
exports.Factory = Factory;
function changeEnabled(enabled, requestOptions) {
    var _this = this;
    var responses = [];
    var promise = this.isResolved() ? Promise.resolve([]) : this.resolve();
    return promise.then(function (_a) {
        var _credentials = _a[0], response = _a[1];
        if (response)
            responses.push(response);
        _this.enabled = enabled;
        return _this.save(requestOptions);
    }).then(function (_a) {
        var _credentials = _a[0], response = _a[1];
        if (response)
            responses.push(response);
        return [_this, responses];
    });
}

//# sourceMappingURL=PersistedCredentials.js.map
