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
var LDP_1 = require("../LDP");
var CS_1 = require("../Vocabularies/CS");
var XSD_1 = require("../Vocabularies/XSD");
var SCHEMA = {
    "username": {
        "@id": CS_1.CS.username,
        "@type": XSD_1.XSD.string,
    },
    "password": {
        "@id": CS_1.CS.password,
        "@type": XSD_1.XSD.string,
    },
};
exports.UsernameAndPasswordCredentials = {
    TYPE: CS_1.CS.UsernameAndPasswordCredentials,
    SCHEMA: SCHEMA,
    create: function (data) {
        return exports.UsernameAndPasswordCredentials.createFrom(__assign({}, data));
    },
    createFrom: function (object) {
        var credentials = LDP_1.VolatileResource.createFrom(object);
        credentials.addType(exports.UsernameAndPasswordCredentials.TYPE);
        return credentials;
    },
};

//# sourceMappingURL=UsernameAndPasswordCredentials.js.map
