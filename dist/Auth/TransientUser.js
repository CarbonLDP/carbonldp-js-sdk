"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = require("../Document");
var Utils_1 = require("../Utils");
var CS_1 = require("../Vocabularies/CS");
var XSD_1 = require("../Vocabularies/XSD");
var UsernameAndPasswordCredentials_1 = require("./UsernameAndPasswordCredentials");
var SCHEMA = {
    "name": {
        "@id": CS_1.CS.name,
        "@type": XSD_1.XSD.string,
    },
    "credentials": {
        "@id": CS_1.CS.credentials,
        "@type": "@id",
    },
};
exports.TransientUser = {
    TYPE: CS_1.CS.User,
    SCHEMA: SCHEMA,
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
        return exports.TransientUser.createFrom(__assign({}, data));
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