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

            _export("namespace", namespace = "https://carbonldp.com/ns/v1/security#");

            _export("Class", Class = function () {
                function Class() {
                    _classCallCheck(this, Class);
                }

                _createClass(Class, null, [{
                    key: "Application",
                    get: function get() {
                        return namespace + "Application";
                    }
                }, {
                    key: "Token",
                    get: function get() {
                        return namespace + "Token";
                    }
                }]);

                return Class;
            }());

            _export("Predicate", Predicate = function () {
                function Predicate() {
                    _classCallCheck(this, Predicate);
                }

                _createClass(Predicate, null, [{
                    key: "rootContainer",
                    get: function get() {
                        return namespace + "rootContainer";
                    }
                }, {
                    key: "tokenKey",
                    get: function get() {
                        return namespace + "tokenKey";
                    }
                }, {
                    key: "expirationTime",
                    get: function get() {
                        return namespace + "expirationTime";
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
//# sourceMappingURL=CS.js.map
