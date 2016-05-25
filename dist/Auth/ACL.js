"use strict";
var ACE = require("./ACE");
var NS = require("./../NS");
var Pointer = require("./../Pointer");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.CS.Class.AccessControlList;
exports.SCHEMA = {
    "accessControlEntries": {
        "@id": NS.CS.Predicate.accessControlEntry,
        "@type": "@id",
        "@container": "@set",
    },
    "accessTo": {
        "@id": NS.CS.Predicate.accessTo,
        "@type": "@id",
    },
    "inheritableEntries": {
        "@id": NS.CS.Predicate.inheritableEntry,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "accessTo")
            && Utils.hasFunction(object, "grant")
            && Utils.hasFunction(object, "deny")
            && Utils.hasFunction(object, "configureChildInheritance")
            && Utils.hasFunction(object, "grants")
            && Utils.hasFunction(object, "denies")
            && Utils.hasFunction(object, "getChildInheritance")
            && Utils.hasFunction(object, "remove")
            && Utils.hasFunction(object, "removeChildInheritance");
    };
    Factory.decorate = function (object) {
        var acl = object;
        if (Factory.hasClassProperties(acl))
            return acl;
        Object.defineProperties(acl, {
            "grant": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: grant,
            },
            "deny": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: deny,
            },
            "configureChildInheritance": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: configureChildInheritance,
            },
            "grants": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: grants,
            },
            "denies": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: denies,
            },
            "getChildInheritance": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: getChildInheritance,
            },
            "remove": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: remove,
            },
            "removeChildInheritance": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: removeChildInheritance,
            },
        });
        return acl;
    };
    return Factory;
}());
exports.Factory = Factory;
function parsePointer(element) {
    var that = this;
    return Pointer.Factory.is(element) ? element : that.getPointer(element);
}
function parsePointers(elements) {
    var _this = this;
    var elementsArray = Utils.isArray(elements) ? elements : [elements];
    return elementsArray.map(function (element) { return parsePointer.call(_this, element); });
}
function configACE(granting, subject, subjectClass, permissions, aces) {
    var subjectACEs = aces.filter(function (ace) { return ace.subjects.length === 1 && ace.subjects.indexOf(subject) !== -1 && ace.granting === granting; });
    var ace;
    if (subjectACEs.length === 0) {
        ace = ACE.Factory.decorate(this.createFragment(), granting, [subject], subjectClass, []);
        aces.push(ace);
    }
    else {
        ace = subjectACEs[0];
    }
    Array.prototype.push.apply(ace.permissions, permissions);
    return ace;
}
function configACEs(granting, subjects, subjectsClass, permissions, aces) {
    var subjectPointers = parsePointers.call(this, subjects);
    var subjectClassPointer = parsePointer.call(this, subjectsClass);
    var permissionPointers = parsePointers.call(this, permissions);
    for (var _i = 0, subjectPointers_1 = subjectPointers; _i < subjectPointers_1.length; _i++) {
        var subject = subjectPointers_1[_i];
        removePermissionsFrom.call(this, subject, permissionPointers, aces);
        configACE.call(this, granting, subject, subjectClassPointer, permissionPointers, aces);
    }
}
function grant(subjects, subjectsClass, permissions) {
    var that = this;
    that.accessControlEntries = that.accessControlEntries || [];
    configACEs.call(this, true, subjects, subjectsClass, permissions, that.accessControlEntries);
}
function deny(subjects, subjectsClass, permissions) {
    var that = this;
    that.accessControlEntries = that.accessControlEntries || [];
    configACEs.call(this, false, subjects, subjectsClass, permissions, that.accessControlEntries);
}
function configureChildInheritance(granting, subjects, subjectsClass, permissions) {
    var that = this;
    that.inheritableEntries = that.inheritableEntries || [];
    configACEs.call(this, granting, subjects, subjectsClass, permissions, that.inheritableEntries);
}
function grantingFrom(subject, permission, aces) {
    var subjectACEs = aces.filter(function (ace) { return ace.subjects.indexOf(subject) !== -1; });
    for (var _i = 0, subjectACEs_1 = subjectACEs; _i < subjectACEs_1.length; _i++) {
        var ace = subjectACEs_1[_i];
        if (ace.permissions.indexOf(permission) !== -1)
            return ace.granting;
    }
    return null;
}
function getGranting(subject, permission, aces) {
    if (!aces)
        return null;
    var subjectPointer = parsePointer.call(this, subject);
    var permissionPointer = parsePointer.call(this, permission);
    return grantingFrom(subjectPointer, permissionPointer, aces);
}
function grants(subject, permission) {
    var that = this;
    return getGranting.call(this, subject, permission, that.accessControlEntries);
}
function denies(subject, permission) {
    var that = this;
    var granting = getGranting.call(this, subject, permission, that.accessControlEntries);
    return granting === null ? null : !granting;
}
function getChildInheritance(subject, permission) {
    var that = this;
    return getGranting.call(this, subject, permission, that.inheritableEntries);
}
function removePermissionsFrom(subject, permissions, aces) {
    if (!aces)
        return;
    var that = this;
    var opposedAces = that.accessControlEntries === aces ? that.inheritableEntries : that.accessControlEntries;
    var subjectACEs = aces.filter(function (ace) { return ace.subjects.indexOf(subject) !== -1; });
    for (var _i = 0, subjectACEs_2 = subjectACEs; _i < subjectACEs_2.length; _i++) {
        var ace = subjectACEs_2[_i];
        if (opposedAces && opposedAces.indexOf(ace) !== -1) {
            aces.splice(aces.indexOf(ace), 1);
            var newACE = configACE.call(this, ace.granting, subject, ace.subjectsClass, ace.permissions, aces);
            subjectACEs.push(newACE);
            continue;
        }
        if (ace.subjects.length > 1) {
            ace.subjects.splice(ace.subjects.indexOf(subject), 1);
            var newACE = configACE.call(this, ace.granting, subject, ace.subjectsClass, ace.permissions, aces);
            subjectACEs.push(newACE);
            continue;
        }
        for (var _a = 0, permissions_1 = permissions; _a < permissions_1.length; _a++) {
            var permission = permissions_1[_a];
            var index = ace.permissions.indexOf(permission);
            if (index === -1)
                continue;
            ace.permissions.splice(index, 1);
        }
        if (ace.permissions.length === 0) {
            aces.splice(aces.indexOf(ace), 1);
            that.removeFragment(ace);
        }
    }
}
function removePermissions(subject, permissions, aces) {
    var subjectPointer = parsePointer.call(this, subject);
    var permissionPointers = parsePointers.call(this, permissions);
    removePermissionsFrom.call(this, subjectPointer, permissionPointers, aces);
}
function remove(subject, permissions) {
    var that = this;
    removePermissions.call(this, subject, permissions, that.accessControlEntries);
}
function removeChildInheritance(subject, permissions) {
    var that = this;
    removePermissions.call(this, subject, permissions, that.inheritableEntries);
}

//# sourceMappingURL=ACL.js.map
