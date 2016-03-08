System.register(["./Utils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Utils;
    var Modifications, ModificationType, Factory;
    function isDirty() {
        return this._dirty;
    }
    return {
        setters:[
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Modifications = (function () {
                function Modifications() {
                    this.add = new Map();
                    this.set = new Map();
                    this.delete = new Map();
                }
                return Modifications;
            }());
            (function (ModificationType) {
                ModificationType[ModificationType["ADD"] = 0] = "ADD";
                ModificationType[ModificationType["SET"] = 1] = "SET";
                ModificationType[ModificationType["DELETE"] = 2] = "DELETE";
            })(ModificationType || (ModificationType = {}));
            Factory = (function () {
                function Factory() {
                }
                Factory.is = function (object) {
                    return (Utils.hasPropertyDefined(object, "_dirty") &&
                        Utils.hasPropertyDefined(object, "_modifications") &&
                        Utils.hasFunction(object, "isDirty"));
                };
                Factory.from = function (objectOrObjects) {
                    var objects = Utils.isArray(objectOrObjects) ? objectOrObjects : [objectOrObjects];
                    var values = [];
                    for (var i = 0, length_1 = objects.length; i < length_1; i++) {
                        var value = objects[i];
                        if (!Factory.is(value))
                            Factory.injectBehavior(value);
                        values.push(value);
                    }
                    if (Utils.isArray(objectOrObjects))
                        return values;
                    return values[0];
                };
                Factory.injectBehavior = function (value) {
                    Object.defineProperties(value, {
                        "_dirty": {
                            writable: true,
                            enumerable: false,
                            value: false,
                        },
                        "_modifications": {
                            writable: false,
                            enumerable: false,
                            value: new Modifications(),
                        },
                    });
                    value.isDirty = isDirty;
                    return value;
                };
                return Factory;
            }());
            exports_1("Modifications", Modifications);
            exports_1("ModificationType", ModificationType);
            exports_1("Factory", Factory);
        }
    }
});

//# sourceMappingURL=Persisted.js.map
