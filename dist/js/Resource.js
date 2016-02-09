"use strict";

System.register(["./Pointer", "./Utils"], function (_export, _context) {
    var Pointer, Utils, _createClass, Factory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function hasType(type) {
        return this.types.indexOf(type) !== -1;
    }

    return {
        setters: [function (_Pointer) {
            Pointer = _Pointer;
        }, function (_Utils) {
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

            _export("Factory", Factory = function () {
                function Factory() {
                    _classCallCheck(this, Factory);
                }

                _createClass(Factory, null, [{
                    key: "hasClassProperties",
                    value: function hasClassProperties(resource) {
                        return Utils.hasPropertyDefined(resource, "types");
                    }
                }, {
                    key: "create",
                    value: function create() {
                        var id = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                        var types = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
                        return Factory.createFrom({}, id, types);
                    }
                }, {
                    key: "createFrom",
                    value: function createFrom(object) {
                        var id = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
                        var types = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
                        id = !!id ? id : "";
                        types = !!types ? types : [];
                        var resource = Factory.decorate(object);
                        resource.id = id;
                        resource.types = types;
                        return resource;
                    }
                }, {
                    key: "decorate",
                    value: function decorate(object) {
                        Pointer.Factory.decorate(object);
                        if (Factory.hasClassProperties(object)) return object;
                        Object.defineProperties(object, {
                            "types": {
                                writable: true,
                                enumerable: false,
                                configurable: true,
                                value: []
                            }
                        });
                        return object;
                    }
                }]);

                return Factory;
            }());

            _export("Factory", Factory);
        }
    };
});
//# sourceMappingURL=Resource.js.map
