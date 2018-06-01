"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = require("../../Document");
var Utils_1 = require("../../Utils");
var Vocabularies_1 = require("../../Vocabularies");
var UsernameAndPasswordCredentials_1 = require("../UsernameAndPasswordCredentials");
exports.TransientUser = {
    TYPE: Vocabularies_1.CS.User,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && Utils_1.hasFunction(object, "updateCredentials");
    },
    is: function (value) {
        return Document_1.TransientDocument.is(value)
            && exports.TransientUser.isDecorated(value);
    },
    decorate: function (object) {
        if (exports.TransientUser.isDecorated(object))
            return object;
        Document_1.TransientDocument.decorate(object);
        return Object.defineProperties(object, {
            "updateCredentials": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: updateCredentials,
            },
        });
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientUser.createFrom(copy);
    },
    createFrom: function (object) {
        var user = exports.TransientUser.decorate(object);
        user._normalize();
        user.addType(exports.TransientUser.TYPE);
        return user;
    },
};
function updateCredentials(username, password) {
    var credentials = UsernameAndPasswordCredentials_1.UsernameAndPasswordCredentials
        .createFrom({ username: username, password: password });
    this.credentials = this.createFragment(credentials);
    return this.credentials;
}

//# sourceMappingURL=TransientUser.js.map
