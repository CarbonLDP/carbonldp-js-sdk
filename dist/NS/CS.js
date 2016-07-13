"use strict";
var namespace = "https://carbonldp.com/ns/v1/security#";
exports.namespace = namespace;
var Class = (function () {
    function Class() {
    }
    Object.defineProperty(Class, "Agent", {
        get: function () { return namespace + "Agent"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "AllOrigins", {
        get: function () { return namespace + "AllOrigins"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Application", {
        get: function () { return namespace + "Application"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "AppRole", {
        get: function () { return namespace + "AppRole"; },
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
    return Class;
}());
exports.Class = Class;
var Predicate = (function () {
    function Predicate() {
    }
    Object.defineProperty(Predicate, "agent", {
        get: function () { return namespace + "agent"; },
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
    Object.defineProperty(Predicate, "platformRole", {
        get: function () { return namespace + "platformRole"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "rootContainer", {
        get: function () { return namespace + "rootContainer"; },
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
    return Predicate;
}());
exports.Predicate = Predicate;

//# sourceMappingURL=CS.js.map
