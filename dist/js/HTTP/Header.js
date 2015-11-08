/// <reference path="../../typings/es6/es6.d.ts" />
var Utils = require('./../Utils');
var Class = (function () {
    function Class(valueOrValues) {
        this.values = [];
        if (!valueOrValues)
            return;
        else if (Array.isArray(valueOrValues))
            this.values = valueOrValues;
        else
            this.setValues(valueOrValues);
    }
    Class.prototype.setValues = function (valuesString) {
        this.values = [];
        var valueStrings = valuesString.split(",");
        for (var i = 0, length = valueStrings.length; i < length; i++) {
            var valueString = valueStrings[i];
            var value = new Value(valueString);
            this.values.push(value);
        }
    };
    Class.prototype.toString = function () {
        return this.values.join(', ');
    };
    return Class;
})();
exports.Class = Class;
var Value = (function () {
    function Value(value, mainValue, secondaryKey, secondaryValue) {
        this.mainKey = null;
        this.mainValue = null;
        this.secondaryKey = null;
        this.secondaryValue = null;
        if (mainValue) {
            this.mainKey = value;
            this.mainValue = mainValue;
            this.secondaryKey = secondaryKey;
            this.secondaryValue = secondaryValue;
        }
        else
            this.setValue(value);
    }
    Value.prototype.setValue = function (value) {
        var parts = value.split(";");
        this.setMain(parts[0]);
        if (parts.length > 1)
            this.setSecondary(parts[1]);
    };
    Value.prototype.setMain = function (main) {
        var parts = main.split("=");
        if (parts.length === 1)
            this.mainValue = Value.cleanString(parts[0]);
        else if (parts.length === 2) {
            this.mainKey = Value.cleanString(parts[0]);
            this.mainValue = Value.cleanString(parts[1]);
        }
        else
            this.mainValue = main;
    };
    Value.prototype.setSecondary = function (secondary) {
        var parts = secondary.split("=");
        if (parts.length === 1)
            this.secondaryValue = Value.cleanString(parts[0]);
        else if (parts.length === 2) {
            this.secondaryKey = Value.cleanString(parts[0]);
            this.secondaryValue = Value.cleanString(parts[1]);
        }
        else
            this.secondaryValue = secondary;
    };
    Value.cleanString = function (toClean) {
        toClean = toClean.trim();
        toClean = (Utils.S.startsWith(toClean, "\"") || Utils.S.startsWith(toClean, "'")) ? toClean.substr(1, toClean.length) : toClean;
        toClean = (Utils.S.endsWith(toClean, "\"") || Utils.S.endsWith(toClean, "'")) ? toClean.substr(0, toClean.length - 1) : toClean;
        return toClean;
    };
    Value.prototype.toString = function () {
        var result = '';
        if (this.mainKey)
            result += this.mainKey + '=';
        result += this.mainValue;
        if (this.secondaryKey || this.secondaryValue)
            result += '; ';
        if (this.secondaryKey)
            result += this.secondaryKey + '=';
        if (this.secondaryValue)
            result += this.secondaryValue;
        return result;
    };
    return Value;
})();
exports.Value = Value;
var Util = (function () {
    function Util() {
    }
    Util.parseHeaders = function (headersString) {
        var headers = new Map();
        var headerStrings = headersString.split('\r\n');
        for (var i = 0, length = headerStrings.length; i < length; i++) {
            var headerString = headerStrings[i];
            if (!headerString.trim())
                continue;
            var parts = headerString.split(':');
            if (parts.length != 2)
                throw new Error("ParseError: The header couldn't be parsed.");
            var name = parts[0].trim();
            var header = new Class(parts[1].trim());
            if (headers.has(name)) {
                var existingHeader = headers.get(name);
                existingHeader.values.concat(header.values);
            }
            else
                headers.set(name, header);
        }
        return headers;
    };
    return Util;
})();
exports.Util = Util;

//# sourceMappingURL=Header.js.map
