"use strict";
var ACL = require("./ACL");
var Utils = require("./../Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "accessTo");
    };
    Factory.decorate = function (document) {
        var acl = ACL.Factory.decorate(document);
        if (Factory.hasClassProperties(acl))
            return acl;
        return acl;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedACL.js.map
