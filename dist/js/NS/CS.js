System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var namespace, Class, Predicate;
    return {
        setters:[],
        execute: function() {
            namespace = "https://carbonldp.com/ns/v1/security#";
            Class = (function () {
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
                Object.defineProperty(Class, "AllOrigins", {
                    get: function () { return namespace + "AllOrigins"; },
                    enumerable: true,
                    configurable: true
                });
                return Class;
            }());
            Predicate = (function () {
                function Predicate() {
                }
                Object.defineProperty(Predicate, "name", {
                    get: function () { return namespace + "name"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "allowsOrigin", {
                    get: function () { return namespace + "allowsOrigin"; },
                    enumerable: true,
                    configurable: true
                });
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
            }());
            exports_1("namespace", namespace);
            exports_1("Class", Class);
            exports_1("Predicate", Predicate);
        }
    }
});

//# sourceMappingURL=CS.js.map
