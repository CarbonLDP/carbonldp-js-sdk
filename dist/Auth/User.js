"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var Document = require("./../Document");
var NS = require("./../NS");
var UsernameAndPasswordCredentials = require("./UsernameAndPasswordCredentials");
exports.RDF_CLASS = NS.CS.Class.User;
exports.SCHEMA = {
    "name": {
        "@id": NS.CS.Predicate.namae,
        "@type": NS.XSD.DataType.string,
    },
    "credentials": {
        "@id": NS.CS.Predicate.credentials,
        "@type": "@id",
    },
    "enabled": {
        "@id": NS.CS.Predicate.enabled,
        "@type": NS.XSD.DataType.boolean,
    },
};
function setCredentials(email, password) {
    var credentials = UsernameAndPasswordCredentials
        .Factory.create(email, password);
    this.credentials = this.createFragment(credentials);
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
        Document.Factory.decorate(object);
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
