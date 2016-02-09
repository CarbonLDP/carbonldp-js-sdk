"use strict";

System.register([], function (_export, _context) {
    var _createClass, Class, Value, Util;

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
                function Class(valueOrValues) {
                    _classCallCheck(this, Class);

                    this.values = [];

                    if (!valueOrValues) {
                        return;
                    } else if (Array.isArray(valueOrValues)) {
                        this.values = valueOrValues;
                    } else {
                        this.setValues(valueOrValues);
                    }
                }

                _createClass(Class, [{
                    key: "toString",
                    value: function toString() {
                        return this.values.join(", ");
                    }
                }, {
                    key: "setValues",
                    value: function setValues(valuesString) {
                        this.values = [];
                        var valueStrings = valuesString.split(",");

                        for (var i = 0, length = valueStrings.length; i < length; i++) {
                            var valueString = valueStrings[i];
                            this.values.push(new Value(valueString));
                        }
                    }
                }]);

                return Class;
            }());

            _export("Class", Class);

            _export("Value", Value = function () {
                function Value(value) {
                    _classCallCheck(this, Value);

                    this.value = value;
                }

                _createClass(Value, [{
                    key: "toString",
                    value: function toString() {
                        return this.value;
                    }
                }]);

                return Value;
            }());

            _export("Value", Value);

            _export("Util", Util = function () {
                function Util() {
                    _classCallCheck(this, Util);
                }

                _createClass(Util, null, [{
                    key: "parseHeaders",
                    value: function parseHeaders(headersString) {
                        var headers = new Map();
                        var headerStrings = headersString.split("\r\n");

                        for (var i = 0, length = headerStrings.length; i < length; i++) {
                            var headerString = headerStrings[i];
                            if (!headerString.trim()) continue;
                            var parts = headerString.split(":");
                            if (parts.length < 2) throw new Error("ParseError: The header couldn't be parsed.");
                            if (parts.length > 2) parts[1] = parts.slice(1).join(":");
                            var name = parts[0].trim();
                            var header = new Class(parts[1].trim());

                            if (headers.has(name)) {
                                var existingHeader = headers.get(name);
                                existingHeader.values.concat(header.values);
                            } else headers.set(name, header);
                        }

                        return headers;
                    }
                }]);

                return Util;
            }());

            _export("Util", Util);
        }
    };
});
//# sourceMappingURL=Header.js.map
