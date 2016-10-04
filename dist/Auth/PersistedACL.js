"use strict";
var ACL = require("./ACL");
var Pointer = require("./../Pointer");
var Utils = require("./../Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "accessTo");
    };
    Factory.decorate = function (document) {
        var acl = ACL.Factory.decorate(document);
        Object.defineProperties(acl, {
            "_parsePointer": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: parsePointer,
            },
        });
        return acl;
    };
    return Factory;
}());
exports.Factory = Factory;
function parsePointer(element) {
    return Pointer.Factory.is(element) ? element : this.getPointer(element);
}

//# sourceMappingURL=PersistedACL.js.map
