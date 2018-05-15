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
    return Array.isArray(object);
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
    return date instanceof Date || (typeof date === "object" && Object.prototype.toString.call(date) === "[object Date]");
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
function forEachOwnProperty(object, action) {
    if (!(isObject(object) || isFunction(object)))
        throw new Error("IllegalArgument");
    for (var name_1 in object) {
        if (object.hasOwnProperty(name_1)) {
            if (action(name_1, object[name_1]) === false)
                break;
        }
    }
}
exports.forEachOwnProperty = forEachOwnProperty;
function promiseMethod(fn) {
    return new Promise(function (resolve) { return resolve(fn ? fn() : void 0); });
}
exports.promiseMethod = promiseMethod;
function mapTupleArray(tuples) {
    var firsts = [];
    var seconds = [];
    tuples.forEach(function (tuple) {
        firsts.push(tuple[0]);
        seconds.push(tuple[1]);
    });
    return [firsts, seconds];
}
exports.mapTupleArray = mapTupleArray;
var ArrayUtils = (function () {
    function ArrayUtils() {
    }
    ArrayUtils.from = function (iterator) {
        var array = [];
        var next = iterator.next();
        while (!next.done) {
            array.push(next.value);
            next = iterator.next();
        }
        return array;
    };
    ArrayUtils.joinWithoutDuplicates = function () {
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
    ArrayUtils.indexOf = function (array, searchedElement, comparator) {
        if (comparator === void 0) { comparator = function (a, b) { return a === b; }; }
        if (!array)
            return -1;
        for (var i = 0, length_2 = array.length; i < length_2; ++i) {
            if (comparator(array[i], searchedElement))
                return i;
        }
        return -1;
    };
    return ArrayUtils;
}());
exports.ArrayUtils = ArrayUtils;
var ObjectUtils = (function () {
    function ObjectUtils() {
    }
    ObjectUtils.extend = function (target, source, config) {
        if (config === void 0) { config = { arrays: false, objects: false }; }
        if (!isArray(source) && !isPlainObject(source) || !isArray(target) && !isPlainObject(target))
            return null;
        source.__CarbonSDK_circularReferenceFlag = target;
        for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
            var key = _a[_i];
            if (isFunction(source[key]) || key === "__CarbonSDK_circularReferenceFlag")
                continue;
            var property = source[key];
            if (isArray(property) && config.arrays || isPlainObject(property) && config.objects) {
                if ("__CarbonSDK_circularReferenceFlag" in property) {
                    property = property.__CarbonSDK_circularReferenceFlag;
                }
                else {
                    property = !(key in target) || target[key].constructor !== property.constructor ?
                        ObjectUtils.clone(property, config) :
                        ObjectUtils.extend(target[key], property, config);
                }
            }
            if (property === null) {
                if (target[key])
                    delete target[key];
                continue;
            }
            target[key] = property;
        }
        delete source.__CarbonSDK_circularReferenceFlag;
        return target;
    };
    ObjectUtils.clone = function (object, config) {
        if (config === void 0) { config = { arrays: false, objects: false }; }
        var isAnArray = isArray(object);
        if (!isAnArray && !isPlainObject(object))
            return null;
        var clone = (isAnArray ? [] : Object.create(Object.getPrototypeOf(object)));
        return ObjectUtils.extend(clone, object, config);
    };
    ObjectUtils.areEqual = function (object1, object2, config, ignore) {
        if (config === void 0) { config = { arrays: false, objects: false }; }
        if (ignore === void 0) { ignore = {}; }
        return internalAreEqual(object1, object2, config, [object1], [object2], ignore);
    };
    ObjectUtils.areShallowlyEqual = function (object1, object2) {
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
    return ObjectUtils;
}());
exports.ObjectUtils = ObjectUtils;
function internalAreEqual(object1, object2, config, stack1, stack2, ignore) {
    if (ignore === void 0) { ignore = {}; }
    if (object1 === object2)
        return true;
    if (!isObject(object1) || !isObject(object2))
        return false;
    if (isDate(object1))
        return object1.getTime() === object2.getTime();
    var keys = ArrayUtils.joinWithoutDuplicates(Object.keys(object1), Object.keys(object2));
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
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.startsWith = function (str, substring) {
        return str.lastIndexOf(substring, 0) === 0;
    };
    StringUtils.endsWith = function (str, substring) {
        return str.indexOf(substring, str.length - substring.length) !== -1;
    };
    StringUtils.contains = function (str, substring) {
        return str.indexOf(substring) !== -1;
    };
    return StringUtils;
}());
exports.StringUtils = StringUtils;
var MapUtils = (function () {
    function MapUtils() {
    }
    MapUtils.from = function (object) {
        var map = new Map();
        forEachOwnProperty(object, function (name, value) {
            map.set(name, value);
        });
        return map;
    };
    MapUtils.extend = function (toExtend) {
        var extenders = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extenders[_i - 1] = arguments[_i];
        }
        for (var i = 0, length_3 = extenders.length; i < length_3; i++) {
            var extender = extenders[i];
            if (!extender)
                continue;
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
    return MapUtils;
}());
exports.MapUtils = MapUtils;
var UUIDUtils = (function () {
    function UUIDUtils() {
    }
    UUIDUtils.is = function (uuid) {
        return UUIDUtils.regExp.test(uuid);
    };
    UUIDUtils.generate = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    UUIDUtils.regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return UUIDUtils;
}());
exports.UUIDUtils = UUIDUtils;

//# sourceMappingURL=Utils.js.map
