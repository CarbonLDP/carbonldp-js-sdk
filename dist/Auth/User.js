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
};
exports.User = {
    TYPE: CS_1.CS.User,
    SCHEMA: SCHEMA,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && Utils_1.hasFunction(object, "updateCredentials");
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
        return exports.User.createFrom(copy);
    },
    createFrom: function (object) {
        var user = exports.User.decorate(object);
        user._normalize();
        user.addType(exports.User.TYPE);
        return user;
    },
};
function updateCredentials(username, password) {
    var credentials = UsernameAndPasswordCredentials_1.UsernameAndPasswordCredentials.create(username, password);
    this.credentials = this.createFragment(credentials);
    this.credentials.addType(C_1.C.VolatileResource);
    return this.credentials;
}

//# sourceMappingURL=User.js.map
