System.register(["./../Utils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Utils;
    var ValueTypes, Factory;
    return {
        setters:[
            function (Utils_1) {
                Utils = Utils_1;
            }],
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
            }());
            exports_1("ValueTypes", ValueTypes);
            Factory = (function () {
                function Factory() {
                }
                Factory.hasClassProperties = function (value) {
                    return (Utils.hasPropertyDefined(value, "head"));
                };
                Factory.is = function (value) {
                    return (Utils.isObject(value) &&
                        Factory.hasClassProperties(value));
                };
                return Factory;
            }());
            exports_1("Factory", Factory);
        }
    }
});

//# sourceMappingURL=RawResults.js.map
