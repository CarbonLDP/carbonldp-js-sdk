"use strict";
var Utils = require("./../Utils");
exports.namespace = "http://www.w3.org/2001/XMLSchema#";
var DataType = (function () {
    function DataType() {
    }
    DataType.date = exports.namespace + "date";
    DataType.dateTime = exports.namespace + "dateTime";
    DataType.duration = exports.namespace + "duration";
    DataType.gDay = exports.namespace + "gDay";
    DataType.gMonth = exports.namespace + "gMonth";
    DataType.gMonthDay = exports.namespace + "gMonthDay";
    DataType.gYear = exports.namespace + "gYear";
    DataType.gYearMonth = exports.namespace + "gYearMonth";
    DataType.time = exports.namespace + "time";
    DataType.byte = exports.namespace + "byte";
    DataType.decimal = exports.namespace + "decimal";
    DataType.int = exports.namespace + "int";
    DataType.integer = exports.namespace + "integer";
    DataType.long = exports.namespace + "long";
    DataType.negativeInteger = exports.namespace + "negativeInteger";
    DataType.nonNegativeInteger = exports.namespace + "nonNegativeInteger";
    DataType.nonPositiveInteger = exports.namespace + "nonPositiveInteger";
    DataType.positiveInteger = exports.namespace + "positiveInteger";
    DataType.short = exports.namespace + "short";
    DataType.unsignedLong = exports.namespace + "unsignedLong";
    DataType.unsignedInt = exports.namespace + "unsignedInt";
    DataType.unsignedShort = exports.namespace + "unsignedShort";
    DataType.unsignedByte = exports.namespace + "unsignedByte";
    DataType.double = exports.namespace + "double";
    DataType.float = exports.namespace + "float";
    DataType.boolean = exports.namespace + "boolean";
    DataType.string = exports.namespace + "string";
    DataType.object = exports.namespace + "object";
    return DataType;
}());
exports.DataType = DataType;
Utils.forEachOwnProperty(DataType, function (key, value) {
    DataType[value] = key;
});
