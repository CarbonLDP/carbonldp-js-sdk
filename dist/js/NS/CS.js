var namespace = "https://carbonldp.com/ns/v1/security#";
exports.namespace = namespace;
var Class = (function () {
    function Class() {
    }
    Object.defineProperty(Class, "Application", {
        get: function () { return namespace + "Application"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "Token", {
        get: function () { return namespace + "Token"; },
        enumerable: true,
        configurable: true
    });
    return Class;
})();
exports.Class = Class;
var Predicate = (function () {
    function Predicate() {
    }
    Object.defineProperty(Predicate, "rootContainer", {
        get: function () { return namespace + "rootContainer"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "tokenKey", {
        get: function () { return namespace + "tokenKey"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "expirationTime", {
        get: function () { return namespace + "expirationTime"; },
        enumerable: true,
        configurable: true
    });
    return Predicate;
})();
exports.Predicate = Predicate;

//# sourceMappingURL=CS.js.map
