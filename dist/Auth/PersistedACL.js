"use strict";
var ACL = require("./ACL");
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var PersistedDocument = require("./../PersistedDocument");
var Utils = require("./../Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "accessTo");
    };
    Factory.decorate = function (document) {
        if (!PersistedDocument.Factory.is(document))
            throw new IllegalArgumentError_1.default("The object provided must be a PersistedDocument.");
        if (!ACL.Factory.hasClassProperties(document))
            throw new IllegalArgumentError_1.default("The object provided must contains the form of an ACL.");
        var acl = ACL.Factory.decorate(document);
        if (Factory.hasClassProperties(acl))
            return acl;
        return acl;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedACL.js.map
