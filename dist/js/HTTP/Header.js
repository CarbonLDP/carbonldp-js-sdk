/// <reference path="../../typings/typings.d.ts" />
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Class, Value, Util;
    return {
        setters:[],
        execute: function() {
            Class = (function () {
                function Class(valueOrValues) {
                    this.values = [];
                    if (!valueOrValues) {
                        return;
                    }
                    else if (Array.isArray(valueOrValues)) {
                        this.values = valueOrValues;
                    }
                    else {
                        this.setValues(valueOrValues);
                    }
                }
                Class.prototype.toString = function () {
                    return this.values.join(", ");
                };
                Class.prototype.setValues = function (valuesString) {
                    this.values = [];
                    var valueStrings = valuesString.split(",");
                    for (var i = 0, length_1 = valueStrings.length; i < length_1; i++) {
                        var valueString = valueStrings[i].trim();
                        this.values.push(new Value(valueString));
                    }
                };
                return Class;
            }());
            exports_1("Class", Class);
            Value = (function () {
                function Value(value) {
                    this.value = value;
                }
                Value.prototype.toString = function () {
                    return this.value;
                };
                return Value;
            }());
            exports_1("Value", Value);
            Util = (function () {
                function Util() {
                }
                Util.parseHeaders = function (headersString) {
                    var headers = new Map();
                    var headerStrings = headersString.split(/\r?\n/);
                    for (var i = 0, length_2 = headerStrings.length; i < length_2; i++) {
                        var headerString = headerStrings[i];
                        if (!headerString.trim())
                            continue;
                        var parts = headerString.split(":");
                        if (parts.length < 2)
                            throw new Error("ParseError: The header couldn't be parsed.");
                        if (parts.length > 2)
                            parts[1] = parts.slice(1).join(":");
                        var name_1 = parts[0].trim();
                        var header = new Class(parts[1].trim());
                        if (headers.has(name_1)) {
                            var existingHeader = headers.get(name_1);
                            existingHeader.values.concat(header.values);
                        }
                        else
                            headers.set(name_1, header);
                    }
                    return headers;
                };
                return Util;
            }());
            exports_1("Util", Util);
            exports_1("default",Class);
        }
    }
});

//# sourceMappingURL=Header.js.map
