"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var C_1 = require("../Vocabularies/C");
var CS_1 = require("../Vocabularies/CS");
var XSD_1 = require("../Vocabularies/XSD");
var Document_1 = require("./../Document");
var UsernameAndPasswordCredentials = __importStar(require("./UsernameAndPasswordCredentials"));
exports.RDF_CLASS = CS_1.CS.User;
exports.SCHEMA = {
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
function setCredentials(email, password) {
    var credentials = UsernameAndPasswordCredentials
        .Factory.create(email, password);
    this.credentials = this.createFragment(credentials);
    this.credentials.addType(C_1.C.VolatileResource);
    return this.credentials;
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils_1.isObject(object)
            && Utils_1.hasFunction(object, "setCredentials");
    };
    Factory.create = function (disabled) {
        return Factory.createFrom({}, disabled);
    };
    Factory.createFrom = function (object, disabled) {
        var user = Factory.decorate(object);
        if (Utils_1.isBoolean(disabled))
            user.disabled = disabled;
        return user;
    };
    Factory.decorate = function (object) {
        if (Factory.hasClassProperties(object))
            return object;
        Document_1.Document.decorate(object);
        var user = Object.defineProperties(object, {
            "setCredentials": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: setCredentials,
            },
        });
        return user;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=User.js.map
