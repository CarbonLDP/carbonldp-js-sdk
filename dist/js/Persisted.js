"use strict";

System.register(["./Utils"], function (_export, _context) {
    var Utils, _createClass, Modifications, ModificationType, Factory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function isDirty() {
        return this._dirty;
    }

    return {
        setters: [function (_Utils) {
            Utils = _Utils;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("Modifications", Modifications = function Modifications() {
                _classCallCheck(this, Modifications);

                this.add = new Map();
                this.set = new Map();
                this.delete = new Map();
            });

            (function (ModificationType) {
                ModificationType[ModificationType["ADD"] = 0] = "ADD";
                ModificationType[ModificationType["SET"] = 1] = "SET";
                ModificationType[ModificationType["DELETE"] = 2] = "DELETE";
            })(ModificationType || _export("ModificationType", ModificationType = {}));

            _export("Factory", Factory = function () {
                function Factory() {
                    _classCallCheck(this, Factory);
                }

                _createClass(Factory, null, [{
                    key: "is",
                    value: function is(object) {
                        return Utils.hasPropertyDefined(object, "_dirty") && Utils.hasPropertyDefined(object, "_modifications") && Utils.hasFunction(object, "isDirty");
                    }
                }, {
                    key: "from",
                    value: function from(objectOrObjects) {
                        var objects = Utils.isArray(objectOrObjects) ? objectOrObjects : [objectOrObjects];
                        var values = [];

                        for (var i = 0, length = objects.length; i < length; i++) {
                            var value = objects[i];
                            if (!Factory.is(value)) Factory.injectBehavior(value);
                            values.push(value);
                        }

                        if (Utils.isArray(objectOrObjects)) return values;
                        return values[0];
                    }
                }, {
                    key: "injectBehavior",
                    value: function injectBehavior(value) {
                        Object.defineProperties(value, {
                            "_dirty": {
                                writable: true,
                                enumerable: false,
                                value: false
                            },
                            "_modifications": {
                                writable: false,
                                enumerable: false,
                                value: new Modifications()
                            }
                        });
                        value.isDirty = isDirty;
                        return value;
                    }
                }]);

                return Factory;
            }());

            _export("Modifications", Modifications);

            _export("ModificationType", ModificationType);

            _export("Factory", Factory);
        }
    };
});
//# sourceMappingURL=Persisted.js.map
