"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Header = (function () {
    function Header(values) {
        this.values = Array.isArray(values) ?
            values : Header.__parseValues(values);
    }
    Header.parseHeaders = function (headersString) {
        var headers = new Map();
        headersString.split(/\r?\n/).forEach(function (strHeader) {
            if (!strHeader.trim())
                return;
            var parts = strHeader.split(":");
            if (parts.length < 2)
                throw new Error("ParseError: The header couldn't be parsed.");
            var name = parts[0].trim().toLowerCase();
            var values = Header.__parseValues(parts.slice(1).join(":"));
            if (headers.has(name)) {
                (_a = headers.get(name).values).push.apply(_a, values);
            }
            else {
                headers.set(name, new Header(values));
            }
            var _a;
        });
        return headers;
    };
    Header.__parseValues = function (strValues) {
        if (!strValues)
            return [];
        return strValues
            .split(",")
            .map(function (valueString) {
            return valueString.trim();
        });
    };
    Header.prototype.hasValue = function (value) {
        return this.values.indexOf(value) !== -1;
    };
    Header.prototype.toString = function () {
        return this.values.join(", ");
    };
    return Header;
}());
exports.Header = Header;

//# sourceMappingURL=Header.js.map
