"use strict";

System.register([], function (_export, _context) {
    var _createClass, ValueTypes;

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

            _export("ValueTypes", ValueTypes = function () {
                function ValueTypes() {
                    _classCallCheck(this, ValueTypes);
                }

                _createClass(ValueTypes, null, [{
                    key: "URI",
                    get: function get() {
                        return "uri";
                    }
                }, {
                    key: "LITERAL",
                    get: function get() {
                        return "literal";
                    }
                }, {
                    key: "BNODE",
                    get: function get() {
                        return "bnode";
                    }
                }]);

                return ValueTypes;
            }());

            _export("ValueTypes", ValueTypes);
        }
    };
});
//# sourceMappingURL=Results.js.map
