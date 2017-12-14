"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var namespace = "https://carbonldp.com/ns/v1/security#";
exports.namespace = namespace;
var Class = (function () {
    function Class() {
    }
    Object.defineProperty(Class, "AccessControlEntry", {
        get: function () { return namespace + "AccessControlEntry"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "AccessControlList", {
        get: function () { return namespace + "AccessControlList"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "AllOrigins", {
        get: function () { return namespace + "AllOrigins"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "CreateAccessPoint", {
        get: function () { return namespace + "CreateAccessPoint"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "CreateChild", {
        get: function () { return namespace + "CreateChild"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "CredentialsSet", {
        get: function () { return namespace + "CredentialsSet"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Delete", {
        get: function () { return namespace + "Delete"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Download", {
        get: function () { return namespace + "Download"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Extend", {
        get: function () { return namespace + "Extend"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "ManageSecurity", {
        get: function () { return namespace + "ManageSecurity"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "ProtectedDocument", {
        get: function () { return namespace + "ProtectedDocument"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Read", {
        get: function () { return namespace + "Read"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "RemoveMember", {
        get: function () { return namespace + "RemoveMember"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Role", {
        get: function () { return namespace + "Role"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Ticket", {
        get: function () { return namespace + "Ticket"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Token", {
        get: function () { return namespace + "Token"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Update", {
        get: function () { return namespace + "Update"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Upload", {
        get: function () { return namespace + "Upload"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "User", {
        get: function () { return namespace + "User"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "UsernameAndPasswordCredentials", {
        get: function () { return namespace + "UsernameAndPasswordCredentials"; },
        enumerable: true,
        configurable: true
    });
    return Class;
}());
exports.Class = Class;
var Predicate = (function () {
    function Predicate() {
    }
    Object.defineProperty(Predicate, "accessControlEntry", {
        get: function () { return namespace + "accessControlEntry"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "accessControlList", {
        get: function () { return namespace + "accessControlList"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "accessTo", {
        get: function () { return namespace + "accessTo"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "allowsOrigin", {
        get: function () { return namespace + "allowsOrigin"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "childRole", {
        get: function () { return namespace + "childRole"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "credentials", {
        get: function () { return namespace + "credentials"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "credentialsOf", {
        get: function () { return namespace + "credentialsOf"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "description", {
        get: function () { return namespace + "description"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "enabled", {
        get: function () { return namespace + "enabled"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "expirationTime", {
        get: function () { return namespace + "expirationTime"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "forIRI", {
        get: function () { return namespace + "forIRI"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "granting", {
        get: function () { return namespace + "granting"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "inheritableEntry", {
        get: function () { return namespace + "inheritableEntry"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "namae", {
        get: function () { return namespace + "name"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "parentRole", {
        get: function () { return namespace + "parentRole"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "password", {
        get: function () { return namespace + "password"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "permission", {
        get: function () { return namespace + "permission"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "rootContainer", {
        get: function () { return namespace + "rootContainer"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "subject", {
        get: function () { return namespace + "subject"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "subjectClass", {
        get: function () { return namespace + "subjectClass"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "ticketKey", {
        get: function () { return namespace + "ticketKey"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "tokenKey", {
        get: function () { return namespace + "tokenKey"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "user", {
        get: function () { return namespace + "user"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "username", {
        get: function () { return namespace + "username"; },
        enumerable: true,
        configurable: true
    });
    return Predicate;
}());
exports.Predicate = Predicate;

//# sourceMappingURL=CS.js.map
