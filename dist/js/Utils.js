"use strict";

System.register([], function (_export, _context) {
    var _createClass, _typeof, S, A, M, UUID, P;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function hasFunction(object, functionName) {
        return typeof object[functionName] === "function";
    }

    function hasProperty(object, property) {
        if (!object) return false;
        return "undefined" !== typeof object[property];
    }

    function hasPropertyDefined(object, property) {
        return !!Object.getOwnPropertyDescriptor(object, property);
    }

    function isNull(value) {
        return value === null;
    }

    function isArray(object) {
        return object instanceof Array;
    }

    function isString(value) {
        return typeof value === "string" || value instanceof String;
    }

    function isBoolean(value) {
        return typeof value === "boolean";
    }

    function isNumber(value) {
        return typeof value === "number" || value instanceof Number;
    }

    function isInteger(value) {
        if (!isNumber(value)) return false;
        return value % 1 === 0;
    }

    function isDouble(value) {
        if (!isNumber(value)) return false;
        return value % 1 !== 0;
    }

    function isDate(date) {
        return typeof date === "date" || date instanceof Date;
    }

    function isObject(object) {
        return (typeof object === "undefined" ? "undefined" : _typeof(object)) === "object" && !!object;
    }

    function isFunction(value) {
        return typeof value === "function";
    }

    function isMap(value) {
        return isObject(value) && hasFunction(value, "get") && hasFunction(value, "has") && hasProperty(value, "size") && hasFunction(value, "clear") && hasFunction(value, "delete") && hasFunction(value, "entries") && hasFunction(value, "forEach") && hasFunction(value, "get") && hasFunction(value, "has") && hasFunction(value, "keys") && hasFunction(value, "set") && hasFunction(value, "values");
    }

    function parseBoolean(value) {
        if (!isString(value)) return false;

        switch (value.toLowerCase()) {
            case "true":
            case "yes":
            case "y":
            case "1":
                return true;

            case "false":
            case "no":
            case "n":
            case "0":
            default:
                return false;
        }
    }

    function extend(target) {
        for (var _len = arguments.length, objects = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            objects[_key - 1] = arguments[_key];
        }

        if (arguments.length <= 1) return target;

        for (var i = 0, length = arguments.length; i < length; i++) {
            var toMerge = objects[i];

            for (var name in toMerge) {
                if (toMerge.hasOwnProperty(name)) {
                    target[name] = toMerge[name];
                }
            }
        }

        return target;
    }

    function forEachOwnProperty(object, action) {
        if (!(isObject(object) || isFunction(object))) throw new Error("IllegalArgument");

        for (var name in object) {
            if (object.hasOwnProperty(name)) {
                if (action(name, object[name]) === false) break;
            }
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

            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
            };

            _export("S", S = function () {
                function S() {
                    _classCallCheck(this, S);
                }

                _createClass(S, null, [{
                    key: "startsWith",
                    value: function startsWith(str, substring) {
                        return str.lastIndexOf(substring, 0) === 0;
                    }
                }, {
                    key: "endsWith",
                    value: function endsWith(str, substring) {
                        return str.indexOf(substring, str.length - substring.length) !== -1;
                    }
                }, {
                    key: "contains",
                    value: function contains(str, substring) {
                        return str.indexOf(substring) !== -1;
                    }
                }]);

                return S;
            }());

            _export("A", A = function () {
                function A() {
                    _classCallCheck(this, A);
                }

                _createClass(A, null, [{
                    key: "from",
                    value: function from(iterator) {
                        var array = [];
                        var next = iterator.next();

                        while (!next.done) {
                            array.push(next.value);
                            next = iterator.next();
                        }

                        return array;
                    }
                }, {
                    key: "joinWithoutDuplicates",
                    value: function joinWithoutDuplicates() {
                        for (var _len2 = arguments.length, arrays = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                            arrays[_key2] = arguments[_key2];
                        }

                        var result = arrays[0].slice();

                        for (var i = 1, length = arrays.length; i < length; i++) {
                            result = result.concat(arrays[i].filter(function (item) {
                                return result.indexOf(item) < 0;
                            }));
                        }

                        return result;
                    }
                }]);

                return A;
            }());

            _export("M", M = function () {
                function M() {
                    _classCallCheck(this, M);
                }

                _createClass(M, null, [{
                    key: "from",
                    value: function from(object) {
                        var map = new Map();
                        forEachOwnProperty(object, function (name, value) {
                            map.set(name, value);
                        });
                        return map;
                    }
                }, {
                    key: "extend",
                    value: function extend(toExtend) {
                        for (var _len3 = arguments.length, extenders = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                            extenders[_key3 - 1] = arguments[_key3];
                        }

                        for (var i = 0, length = extenders.length; i < length; i++) {
                            var extender = extenders[i];
                            var values = extender.entries();
                            var next = values.next();

                            while (!next.done) {
                                var entry = next.value;
                                var key = entry[0];
                                var value = entry[1];
                                if (!toExtend.has(key)) toExtend.set(key, value);
                                next = values.next();
                            }
                        }

                        return toExtend;
                    }
                }]);

                return M;
            }());

            _export("UUID", UUID = function () {
                function UUID() {
                    _classCallCheck(this, UUID);
                }

                _createClass(UUID, null, [{
                    key: "is",
                    value: function is(uuid) {
                        return UUID.regExp.test(uuid);
                    }
                }, {
                    key: "generate",
                    value: function generate() {
                        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                            var r = Math.random() * 16 | 0;
                            var v = c === "x" ? r : r & 0x3 | 0x8;
                            return v.toString(16);
                        });
                    }
                }]);

                return UUID;
            }());

            UUID.regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

            _export("P", P = function () {
                function P() {
                    _classCallCheck(this, P);
                }

                _createClass(P, null, [{
                    key: "createRejectedPromise",
                    value: function createRejectedPromise(error) {
                        return new Promise(function (resolve, reject) {
                            reject(error);
                        });
                    }
                }]);

                return P;
            }());

            _export("hasFunction", hasFunction);

            _export("hasProperty", hasProperty);

            _export("hasPropertyDefined", hasPropertyDefined);

            _export("isNull", isNull);

            _export("isArray", isArray);

            _export("isString", isString);

            _export("isBoolean", isBoolean);

            _export("isNumber", isNumber);

            _export("isInteger", isInteger);

            _export("isDouble", isDouble);

            _export("isDate", isDate);

            _export("isObject", isObject);

            _export("isFunction", isFunction);

            _export("isMap", isMap);

            _export("parseBoolean", parseBoolean);

            _export("extend", extend);

            _export("forEachOwnProperty", forEachOwnProperty);

            _export("S", S);

            _export("A", A);

            _export("M", M);

            _export("UUID", UUID);

            _export("P", P);
        }
    };
});
//# sourceMappingURL=Utils.js.map
