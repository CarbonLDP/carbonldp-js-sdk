"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return typeof date === "object" && date instanceof Date;
}
exports.isDate = isDate;
function isObject(object) {
    return typeof object === "object" && (!!object);
}
exports.isObject = isObject;
function isPlainObject(object) {
    return isObject(object)
        && !isArray(object)
        && !isDate(object)
        && !isMap(object)
        && !(typeof Blob !== "undefined" && object instanceof Blob)
        && !(Object.prototype.toString.call(object) === "[object Set]");
}
exports.isPlainObject = isPlainObject;
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
    for (var _a = 0, objects_1 = objects; _a < objects_1.length; _a++) {
        var toMerge = objects_1[_a];
        if (!toMerge)
            continue;
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
    O.extend = function (target, source, config, ignore) {
        if (config === void 0) { config = { arrays: false, objects: false }; }
        if (ignore === void 0) { ignore = {}; }
        if (!isArray(source) && !isPlainObject(source) || !isArray(target) && !isPlainObject(target))
            return null;
        var clone = target;
        source.__CarbonSDK_circularReferenceFlag = clone;
        for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
            var key = _a[_i];
            if (isFunction(source[key]) || key === "__CarbonSDK_circularReferenceFlag")
                continue;
            if (key in ignore)
                continue;
            var property = source[key];
            if (isArray(property) && config.arrays ||
                isPlainObject(property) && config.objects) {
                property = property.__CarbonSDK_circularReferenceFlag || O.clone(property, config);
            }
            clone[key] = property;
        }
        delete source.__CarbonSDK_circularReferenceFlag;
        return clone;
    };
    O.clone = function (object, config, ignore) {
        if (config === void 0) { config = { arrays: false, objects: false }; }
        if (ignore === void 0) { ignore = {}; }
        var isAnArray = isArray(object);
        if (!isAnArray && !isPlainObject(object))
            return null;
        var clone = (isAnArray ? [] : Object.create(Object.getPrototypeOf(object)));
        return O.extend(clone, object, config, ignore);
    };
    O.areEqual = function (object1, object2, config, ignore) {
        if (config === void 0) { config = { arrays: false, objects: false }; }
        if (ignore === void 0) { ignore = {}; }
        return internalAreEqual(object1, object2, config, [object1], [object2], ignore);
    };
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
function internalAreEqual(object1, object2, config, stack1, stack2, ignore) {
    if (ignore === void 0) { ignore = {}; }
    if (object1 === object2)
        return true;
    if (!isObject(object1) || !isObject(object2))
        return false;
    if (isDate(object1))
        return object1.getTime() === object2.getTime();
    var keys = A.joinWithoutDuplicates(Object.keys(object1), Object.keys(object2));
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (!(key in object1) || !(key in object2))
            return false;
        if (typeof object1 !== typeof object2)
            return false;
        if (key in ignore)
            continue;
        if (isFunction(object1[key]))
            continue;
        var firstIsPlainObject = isPlainObject(object1[key]);
        if (isArray(object1[key]) && config.arrays ||
            firstIsPlainObject && config.objects ||
            isDate(object1[key])) {
            if (firstIsPlainObject) {
                var lengthStack = stack1.length;
                while (lengthStack--) {
                    if (stack1[lengthStack] === object1[key])
                        return stack2[lengthStack] === object2[key];
                }
                stack1.push(object1[key]);
                stack2.push(object2[key]);
            }
            if (!internalAreEqual(object1[key], object2[key], config, stack1, stack2))
                return false;
            if (firstIsPlainObject) {
                stack1.pop();
                stack2.pop();
            }
        }
        else {
            if (object1[key] !== object2[key])
                return false;
        }
    }
    return true;
}
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
            arrays[_i] = arguments[_i];
        }
        var result = arrays[0].slice();
        for (var i = 1, length_1 = arrays.length; i < length_1; i++) {
            result = result.concat(arrays[i].filter(function (item) {
                return result.indexOf(item) < 0;
            }));
        }
        return result;
    };
    A.indexOf = function (array, searchedElement, comparator) {
        if (comparator === void 0) { comparator = function (a, b) { return a === b; }; }
        for (var i = 0, length_2 = array.length; i < length_2; ++i) {
            if (comparator(array[i], searchedElement))
                return i;
        }
        return -1;
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
    return UUID;
}());
UUID.regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
exports.UUID = UUID;

//# sourceMappingURL=Utils.js.map
