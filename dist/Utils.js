"use strict";
function hasFunction(object, functionName) {
    return typeof object[functionName] === "function";
}
exports.hasFunction = hasFunction;
function hasProperty(object, property) {
    if (!object)
        return false;
    return isDefined(object[property]);
}
exports.hasProperty = hasProperty;
function hasPropertyDefined(object, property) {
    if (!object)
        return false;
    return !!Object.getOwnPropertyDescriptor(object, property);
}
exports.hasPropertyDefined = hasPropertyDefined;
function isDefined(value) {
    return void 0 !== value;
}
exports.isDefined = isDefined;
function isNull(value) {
    return value === null;
}
exports.isNull = isNull;
function isArray(object) {
    return object instanceof Array;
}
exports.isArray = isArray;
function isString(value) {
    return typeof value === "string" || value instanceof String;
}
exports.isString = isString;
function isBoolean(value) {
    return typeof value === "boolean";
}
exports.isBoolean = isBoolean;
function isNumber(value) {
    return typeof value === "number" || value instanceof Number;
}
exports.isNumber = isNumber;
function isInteger(value) {
    if (!isNumber(value))
        return false;
    return value % 1 === 0;
}
exports.isInteger = isInteger;
function isDouble(value) {
    if (!isNumber(value))
        return false;
    return value % 1 !== 0;
}
exports.isDouble = isDouble;
function isDate(date) {
    return typeof date === "date" || date instanceof Date;
}
exports.isDate = isDate;
function isObject(object) {
    return typeof object === "object" && (!!object);
}
exports.isObject = isObject;
function isFunction(value) {
    return typeof value === "function";
}
exports.isFunction = isFunction;
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
exports.isMap = isMap;
function parseBoolean(value) {
    if (!isString(value))
        return false;
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
exports.parseBoolean = parseBoolean;
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
exports.extend = extend;
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
exports.forEachOwnProperty = forEachOwnProperty;
var O = (function () {
    function O() {
    }
    O.areShallowlyEqual = function (object1, object2) {
        if (object1 === object2)
            return true;
        if (!isObject(object1) || !isObject(object2))
            return false;
        var properties = [];
        for (var propertyName in object1) {
            if (!object1.hasOwnProperty(propertyName))
                continue;
            if (isFunction(object1[propertyName]))
                continue;
            if (!(propertyName in object2))
                return false;
            if (object1[propertyName] !== object2[propertyName])
                return false;
            properties.push(propertyName);
        }
        for (var propertyName in object2) {
            if (!object2.hasOwnProperty(propertyName))
                continue;
            if (isFunction(object2[propertyName]))
                continue;
            if (!(propertyName in object1))
                return false;
            if (properties.indexOf(propertyName) === -1)
                return false;
        }
        return true;
    };
    return O;
}());
exports.O = O;
var S = (function () {
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
exports.S = S;
var A = (function () {
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
exports.A = A;
var M = (function () {
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
exports.M = M;
var UUID = (function () {
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
exports.UUID = UUID;
var P = (function () {
    function P() {
    }
    P.createRejectedPromise = function (error) {
        return new Promise(function (resolve, reject) {
            reject(error);
        });
    };
    return P;
}());
exports.P = P;

//# sourceMappingURL=Utils.js.map
