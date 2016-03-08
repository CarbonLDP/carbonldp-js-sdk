/// <reference path="./../typings/typings.d.ts" />
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var S, A, M, UUID, P;
    function hasFunction(object, functionName) {
        return typeof object[functionName] === "function";
    }
    function hasProperty(object, property) {
        if (!object)
            return false;
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
        if (!isNumber(value))
            return false;
        return value % 1 === 0;
    }
    function isDouble(value) {
        if (!isNumber(value))
            return false;
        return value % 1 !== 0;
    }
    function isDate(date) {
        return typeof date === "date" || date instanceof Date;
    }
    function isObject(object) {
        return typeof object === "object" && (!!object);
    }
    function isFunction(value) {
        return typeof value === "function";
    }
    function isMap(value) {
        return (isObject(value) &&
            hasFunction(value, "get") &&
            hasFunction(value, "has") &&
            hasProperty(value, "size") &&
            hasFunction(value, "clear") &&
            hasFunction(value, "delete") &&
            hasFunction(value, "entries") &&
            hasFunction(value, "forEach") &&
            hasFunction(value, "get") &&
            hasFunction(value, "has") &&
            hasFunction(value, "keys") &&
            hasFunction(value, "set") &&
            hasFunction(value, "values"));
    }
    function parseBoolean(value) {
        if (!isString(value))
            return false;
        /* tslint:disable: no-switch-case-fall-through */
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
        /* tslint:enable: no-switch-case-fall-through */
    }
    function extend(target) {
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            objects[_i - 1] = arguments[_i];
        }
        if (arguments.length <= 1)
            return target;
        for (var i = 0, length_1 = arguments.length; i < length_1; i++) {
            var toMerge = objects[i];
            for (var name_1 in toMerge) {
                if (toMerge.hasOwnProperty(name_1)) {
                    target[name_1] = toMerge[name_1];
                }
            }
        }
        return target;
    }
    function forEachOwnProperty(object, action) {
        if (!(isObject(object) || isFunction(object)))
            throw new Error("IllegalArgument");
        for (var name_2 in object) {
            if (object.hasOwnProperty(name_2)) {
                if (action(name_2, object[name_2]) === false)
                    break;
            }
        }
    }
    return {
        setters:[],
        execute: function() {
            S = (function () {
                function S() {
                }
                S.startsWith = function (str, substring) {
                    return str.lastIndexOf(substring, 0) === 0;
                };
                S.endsWith = function (str, substring) {
                    return str.indexOf(substring, str.length - substring.length) !== -1;
                };
                S.contains = function (str, substring) {
                    return str.indexOf(substring) !== -1;
                };
                return S;
            }());
            A = (function () {
                function A() {
                }
                A.from = function (iterator) {
                    var array = [];
                    var next = iterator.next();
                    while (!next.done) {
                        array.push(next.value);
                        next = iterator.next();
                    }
                    return array;
                };
                A.joinWithoutDuplicates = function () {
                    var arrays = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        arrays[_i - 0] = arguments[_i];
                    }
                    var result = arrays[0].slice();
                    for (var i = 1, length_2 = arrays.length; i < length_2; i++) {
                        result = result.concat(arrays[i].filter(function (item) {
                            return result.indexOf(item) < 0;
                        }));
                    }
                    return result;
                };
                return A;
            }());
            M = (function () {
                function M() {
                }
                M.from = function (object) {
                    var map = new Map();
                    forEachOwnProperty(object, function (name, value) {
                        map.set(name, value);
                    });
                    return map;
                };
                M.extend = function (toExtend) {
                    var extenders = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        extenders[_i - 1] = arguments[_i];
                    }
                    for (var i = 0, length_3 = extenders.length; i < length_3; i++) {
                        var extender = extenders[i];
                        var values = extender.entries();
                        var next = values.next();
                        while (!next.done) {
                            var entry = next.value;
                            var key = entry[0];
                            var value = entry[1];
                            if (!toExtend.has(key))
                                toExtend.set(key, value);
                            next = values.next();
                        }
                    }
                    return toExtend;
                };
                return M;
            }());
            UUID = (function () {
                function UUID() {
                }
                UUID.is = function (uuid) {
                    return UUID.regExp.test(uuid);
                };
                UUID.generate = function () {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0;
                        var v = c === "x" ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                };
                UUID.regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
                return UUID;
            }());
            P = (function () {
                function P() {
                }
                P.createRejectedPromise = function (error) {
                    return new Promise(function (resolve, reject) {
                        reject(error);
                    });
                };
                return P;
            }());
            exports_1("hasFunction", hasFunction);
            exports_1("hasProperty", hasProperty);
            exports_1("hasPropertyDefined", hasPropertyDefined);
            exports_1("isNull", isNull);
            exports_1("isArray", isArray);
            exports_1("isString", isString);
            exports_1("isBoolean", isBoolean);
            exports_1("isNumber", isNumber);
            exports_1("isInteger", isInteger);
            exports_1("isDouble", isDouble);
            exports_1("isDate", isDate);
            exports_1("isObject", isObject);
            exports_1("isFunction", isFunction);
            exports_1("isMap", isMap);
            exports_1("parseBoolean", parseBoolean);
            exports_1("extend", extend);
            exports_1("forEachOwnProperty", forEachOwnProperty);
            exports_1("S", S);
            exports_1("A", A);
            exports_1("M", M);
            exports_1("UUID", UUID);
            exports_1("P", P);
        }
    }
});

//# sourceMappingURL=Utils.js.map
