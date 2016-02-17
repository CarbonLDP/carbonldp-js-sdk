System.register([], function(exports_1) {
    var namespace, Class, Predicate;
    return {
        setters:[],
        execute: function() {
            exports_1("namespace", namespace = "https://carbonldp.com/ns/v1/platform#");
            Class = (function () {
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
            exports_1("Class", Class);
            Predicate = (function () {
                function Predicate() {
                }
                Object.defineProperty(Predicate, "accessPoint", {
                    get: function () { return namespace + "accessPoint"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "buildDate", {
                    get: function () { return namespace + "buildDate"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "created", {
                    get: function () { return namespace + "created"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "modified", {
                    get: function () { return namespace + "modified"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "version", {
                    get: function () { return namespace + "version"; },
                    enumerable: true,
                    configurable: true
                });
                return Predicate;
            })();
            exports_1("Predicate", Predicate);
        }
    }
});

//# sourceMappingURL=C.js.map
