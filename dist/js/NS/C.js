"use strict";

System.register([], function (_export, _context) {
    var _createClass, namespace, Class, Predicate;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            _export("namespace", namespace = "https://carbonldp.com/ns/v1/platform#");

            _export("Class", Class = function () {
                function Class() {
                    _classCallCheck(this, Class);
                }

                _createClass(Class, null, [{
                    key: "AccessPoint",
                    get: function get() {
                        return namespace + "AccessPoint";
                    }
                }, {
                    key: "API",
                    get: function get() {
                        return namespace + "API";
                    }
                }, {
                    key: "VolatileResource",
                    get: function get() {
                        return namespace + "VolatileResource";
                    }
                }]);

                return Class;
            }());

            _export("Predicate", Predicate = function () {
                function Predicate() {
                    _classCallCheck(this, Predicate);
                }

                _createClass(Predicate, null, [{
                    key: "accessPoint",
                    get: function get() {
                        return namespace + "accessPoint";
                    }
                }, {
                    key: "buildDate",
                    get: function get() {
                        return namespace + "buildDate";
                    }
                }, {
                    key: "created",
                    get: function get() {
                        return namespace + "created";
                    }
                }, {
                    key: "modified",
                    get: function get() {
                        return namespace + "modified";
                    }
                }, {
                    key: "version",
                    get: function get() {
                        return namespace + "version";
                    }
                }]);

                return Predicate;
            }());

            _export("namespace", namespace);

            _export("Class", Class);

            _export("Predicate", Predicate);
        }
    };
});
//# sourceMappingURL=C.js.map
