var namespace = "https://carbonldp.com/ns/v1/platform#";
exports.namespace = namespace;
var Class = (function () {
    function Class() {
    }
    Object.defineProperty(Class, "AccessPoint", {
        get: function () { return namespace + "AccessPoint"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "API", {
        get: function () { return namespace + "API"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class, "VolatileResource", {
        get: function () { return namespace + "VolatileResource"; },
        enumerable: true,
        configurable: true
    });
    return Class;
})();
exports.Class = Class;
var Predicate = (function () {
    function Predicate() {
    }
    Object.defineProperty(Predicate, "accessPoint", {
        get: function () { return namespace + "accessPoint"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "version", {
        get: function () { return namespace + "version"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "buildDate", {
        get: function () { return namespace + "buildDate"; },
        enumerable: true,
        configurable: true
    });
    return Predicate;
})();
exports.Predicate = Predicate;
//@formatter:off
//@formatter:on 
//# sourceMappingURL=C.js.map