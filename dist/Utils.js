/// <reference path="../typings/es6/es6.d.ts" />
function hasFunction(object, functionName) {
    return typeof object[functionName] === 'function';
}
exports.hasFunction = hasFunction;
function hasProperty(object, property) {
    if (!object)
        return false;
    return 'undefined' !== typeof object[property];
}
exports.hasProperty = hasProperty;
function hasPropertyDefined(object, property) {
    return !!Object.getOwnPropertyDescriptor(object, property);
}
exports.hasPropertyDefined = hasPropertyDefined;
function isNull(value) {
    return value === null;
}
exports.isNull = isNull;
function isArray(object) {
    return Object.prototype.toString.call(object) === '[object Array]';
}
exports.isArray = isArray;
function isString(string) {
    return typeof string == 'string' || string instanceof String;
}
exports.isString = isString;
function isBoolean(boolean) {
    return typeof boolean == 'boolean';
}
exports.isBoolean = isBoolean;
function isNumber(number) {
    return typeof number == 'number' || number instanceof Number;
}
exports.isNumber = isNumber;
function isInteger(number) {
    if (!isNumber(number))
        return false;
    return number % 1 == 0;
}
exports.isInteger = isInteger;
function isDouble(number) {
    if (!isNumber(number))
        return false;
    return number % 1 != 0;
}
exports.isDouble = isDouble;
function isDate(date) {
    return typeof date == 'date' || date instanceof Date;
}
exports.isDate = isDate;
function isObject(object) {
    return typeof object === 'object' && (!!object);
}
exports.isObject = isObject;
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;
function isMap(value) {
    //@formatter:off
    return (isObject(value) &&
        hasFunction(value, 'get') &&
        hasFunction(value, 'has') &&
        hasProperty(value, 'size') &&
        hasFunction(value, 'clear') &&
        hasFunction(value, 'delete') &&
        hasFunction(value, 'entries') &&
        hasFunction(value, 'forEach') &&
        hasFunction(value, 'get') &&
        hasFunction(value, 'has') &&
        hasFunction(value, 'keys') &&
        hasFunction(value, 'set') &&
        hasFunction(value, 'values'));
    //@formatter:on
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
        return;
    for (var i = 1, length = arguments.length; i < length; i++) {
        var toMerge = objects[i];
        for (var name in toMerge) {
            if (toMerge.hasOwnProperty(name)) {
                target[name] = toMerge[name];
            }
        }
    }
    return target;
}
exports.extend = extend;
function forEachOwnProperty(object, action) {
    if (!isObject(object))
        throw new Error('IllegalArgument');
    for (var name in object) {
        if (object.hasOwnProperty(name)) {
            action(name, object[name]);
        }
    }
}
exports.forEachOwnProperty = forEachOwnProperty;
var S = (function () {
    function S() {
    }
    S.startsWith = function (string, substring) {
        return string.lastIndexOf(substring, 0) === 0;
    };
    S.endsWith = function (string, substring) {
        return string.indexOf(substring, string.length - substring.length) !== -1;
    };
    S.contains = function (string, substring) {
        return string.indexOf(substring) !== -1;
    };
    return S;
})();
exports.S = S;
var A = (function () {
    function A() {
    }
    A.from = function (iterator) {
        var array = [];
        var next;
        while (!(next = iterator.next()).done) {
            array.push(next.value);
        }
        return array;
    };
    A.joinWithoutDuplicates = function () {
        var arrays = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arrays[_i - 0] = arguments[_i];
        }
        var result = arrays[0].slice();
        for (var i = 1, length_1 = arrays.length; i < length_1; i++) {
            result = result.concat(arrays[i].filter(function (item) {
                return result.indexOf(item) < 0;
            }));
        }
        return result;
    };
    return A;
})();
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
        for (var i = 0, length_2 = extenders.length; i < length_2; i++) {
            var extender = extenders[i];
            var values = extender.entries();
            var next;
            while (!(next = values.next()).done) {
                var entry = next.value;
                var key = entry[0];
                var value = entry[1];
                if (!toExtend.has(key))
                    toExtend.set(key, value);
            }
        }
        return toExtend;
    };
    return M;
})();
exports.M = M;
var UUID = (function () {
    function UUID() {
    }
    UUID.is = function (uuid) {
        return UUID.regExp.test(uuid);
    };
    UUID.generate = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    UUID.regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return UUID;
})();
exports.UUID = UUID;
//@formatter:off
//@foramtter:on 
//# sourceMappingURL=Utils.js.map