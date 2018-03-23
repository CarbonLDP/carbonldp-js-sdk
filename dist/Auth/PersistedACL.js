"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PersistedDocument_1 = require("../PersistedDocument");
var Utils = require("../Utils");
var ACL_1 = require("./ACL");
exports.PersistedACL = {
    isDecorated: function (object) {
        return Utils.hasPropertyDefined(object, "accessTo")
            && object["_parsePointer"] === parsePointer;
    },
    decorate: function (object, documents) {
        if (exports.PersistedACL.isDecorated(object))
            return object;
        ACL_1.ACL.decorate(object);
        PersistedDocument_1.PersistedDocument.decorate(object, documents);
        var acl = object;
        Object.defineProperties(acl, {
            "_parsePointer": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: parsePointer,
            },
        });
        var removeInvalidACE = function (ace) {
            if (!ace.subjects)
                acl._removeFragment(ace);
            return !!ace.subjects;
        };
        if (acl.entries)
            acl.entries = acl.entries.filter(removeInvalidACE);
        if (acl.inheritableEntries)
            acl.inheritableEntries = acl.inheritableEntries.filter(removeInvalidACE);
        return acl;
    },
};
function parsePointer(element) {
    return Utils.isObject(element) ? element : this.getPointer(element);
}

//# sourceMappingURL=PersistedACL.js.map
