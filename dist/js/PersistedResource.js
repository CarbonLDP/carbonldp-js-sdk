/// <reference path="./../typings/typings.d.ts" />
System.register(["./Utils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Utils;
    var Factory;
    function syncSnapshot() {
        var resource = this;
        resource._snapshot = Object.assign({}, resource);
    }
    function isDirty() {
        var resource = this;
        return !Utils.O.areShallowlyEqual(resource, resource._snapshot);
    }
    return {
        setters:[
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.hasClassProperties = function (object) {
                    return (Utils.hasPropertyDefined(object, "_snapshot") &&
                        Utils.hasFunction(object, "_syncSnapshot") &&
                        Utils.hasFunction(object, "isDirty"));
                };
                Factory.decorate = function (object, snapshot) {
                    if (snapshot === void 0) { snapshot = {}; }
                    if (Factory.hasClassProperties(object))
                        return object;
                    var persistedResource = object;
                    Object.defineProperties(persistedResource, {
                        "_snapshot": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: snapshot,
                        },
                        "_syncSnapshot": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: syncSnapshot,
                        },
                        "isDirty": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: isDirty,
                        },
                    });
                    return persistedResource;
                };
                return Factory;
            }());
            exports_1("Factory", Factory);
        }
    }
});

//# sourceMappingURL=PersistedResource.js.map
