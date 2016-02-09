System.register([], function(exports_1) {
    var ValueTypes;
    return {
        setters:[],
        execute: function() {
            ValueTypes = (function () {
                function ValueTypes() {
                }
                Object.defineProperty(ValueTypes, "URI", {
                    get: function () { return "uri"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ValueTypes, "LITERAL", {
                    get: function () { return "literal"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ValueTypes, "BNODE", {
                    get: function () { return "bnode"; },
                    enumerable: true,
                    configurable: true
                });
                return ValueTypes;
            })();
            exports_1("ValueTypes", ValueTypes);
        }
    }
});

//# sourceMappingURL=Results.js.map
