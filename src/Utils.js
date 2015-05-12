define(["require", "exports"], function (require, exports) {
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
        return typeof object === 'object';
    }
    exports.isObject = isObject;
    function isFunction(value) {
        return typeof value === 'function';
    }
    exports.isFunction = isFunction;
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
    function extend() {
        var target = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            target[_i - 0] = arguments[_i];
        }
        if (arguments.length <= 1)
            return;
        for (var i = 1, length = arguments.length; i < length; i++) {
            var toMerge = arguments[i];
            if (isObject(toMerge)) {
                for (var name in toMerge) {
                    if (toMerge.hasOwnProperty(name)) {
                        target[name] = toMerge[name];
                    }
                }
            }
        }
        return target;
    }
    exports.extend = extend;
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
    ;
});
//# sourceMappingURL=Utils.js.map