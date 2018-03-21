"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = require("../Document");
var Utils_1 = require("../Utils");
var C_1 = require("../Vocabularies/C");
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
    "enabled": {
        "@id": CS_1.CS.enabled,
        "@type": XSD_1.XSD.boolean,
    },
};
exports.User = {
    TYPE: CS_1.CS.User,
    SCHEMA: SCHEMA,
    isDecorated: function (object) {
        return Utils_1.hasFunction(object, "setCredentials");
    },
    is: function (value) {
        return Document_1.Document.is(value)
            && exports.User.isDecorated(value);
    },
    decorate: function (object) {
        if (exports.User.isDecorated(object))
            return object;
        Document_1.Document.decorate(object);
        return Object.defineProperties(object, {
            "setCredentials": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: setCredentials,
            },
        });
    },
    create: function (disabled) {
        return exports.User.createFrom({}, disabled);
    },
    createFrom: function (object, disabled) {
        var user = exports.User.decorate(object);
        if (Utils_1.isBoolean(disabled))
            user.disabled = disabled;
        return user;
    },
};
function setCredentials(email, password) {
    var credentials = UsernameAndPasswordCredentials_1.UsernameAndPasswordCredentials.create(email, password);
    this.credentials = this.createFragment(credentials);
    this.credentials.addType(C_1.C.VolatileResource);
    return this.credentials;
}

//# sourceMappingURL=User.js.map
