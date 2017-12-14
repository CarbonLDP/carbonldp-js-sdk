"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var PersistedProtectedDocument = require("./../PersistedProtectedDocument");
var User = require("./User");
function enable(requestOptions) {
    return changeAvailability.call(this, "enabled", requestOptions);
}
exports.enable = enable;
function disable(requestOptions) {
    return changeAvailability.call(this, "disabled", requestOptions);
}
exports.disable = disable;
function changeAvailability(flag, requestOptions) {
    var _this = this;
    var responses = [];
    return this
        .resolve()
        .then(function (_a) {
        var response = _a[1];
        if (response)
            responses.push(response);
        _this[flag] = true;
        var reverse = flag === "enabled" ? "disabled" : "enabled";
        delete _this[reverse];
        return _this.save(requestOptions);
    })
        .then(function (_a) {
        var response = _a[1];
        responses.push(response);
        return [_this, responses];
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
            && PersistedProtectedDocument.Factory.is(object);
    };
    Factory.decorate = function (object, documents) {
        if (Factory.hasClassProperties(object))
            return object;
        User.Factory.decorate(object);
        PersistedProtectedDocument.Factory.decorate(object, documents);
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
