"use strict";

System.register([], function (_export, _context) {
    var _createClass, Class;

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

            _export("Class", Class = function () {
                function Class(username, password) {
                    _classCallCheck(this, Class);

                    this._username = username;
                    this._password = password;
                }

                _createClass(Class, [{
                    key: "username",
                    get: function get() {
                        return this._username;
                    }
                }, {
                    key: "password",
                    get: function get() {
                        return this._password;
                    }
                }]);

                return Class;
            }());

            _export("Class", Class);

            _export("default", Class);
        }
    };
});
//# sourceMappingURL=UsernameAndPasswordToken.js.map
