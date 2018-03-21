"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("../Resource");
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
    create: function (username, password) {
        return exports.UsernameAndPasswordCredentials.createFrom({}, username, password);
    },
    createFrom: function (object, username, password) {
        var credentials = Resource_1.Resource.createFrom(object);
        credentials.addType(exports.UsernameAndPasswordCredentials.TYPE);
        if (username)
            credentials.username = username;
        if (password)
            credentials.password = password;
        return credentials;
    },
};

//# sourceMappingURL=UsernameAndPasswordCredentials.js.map
