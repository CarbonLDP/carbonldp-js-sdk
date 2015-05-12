define(["require", "exports"], function (require, exports) {
    exports.namespace = "http://www.w3.org/2001/XMLSchema#";
    (function (DataType) {
        DataType[DataType["date"] = (exports.namespace + "date")] = "date";
        DataType[DataType["dateTime"] = (exports.namespace + "dateTime")] = "dateTime";
        DataType[DataType["duration"] = (exports.namespace + "duration")] = "duration";
        DataType[DataType["gDay"] = (exports.namespace + "gDay")] = "gDay";
        DataType[DataType["gMonth"] = (exports.namespace + "gMonth")] = "gMonth";
        DataType[DataType["gMonthDay"] = (exports.namespace + "gMonthDay")] = "gMonthDay";
        DataType[DataType["gYear"] = (exports.namespace + "gYear")] = "gYear";
        DataType[DataType["gYearMonth"] = (exports.namespace + "gYearMonth")] = "gYearMonth";
        DataType[DataType["time"] = (exports.namespace + "time")] = "time";
        DataType[DataType["byte"] = (exports.namespace + "byte")] = "byte";
        DataType[DataType["decimal"] = (exports.namespace + "decimal")] = "decimal";
        DataType[DataType["int"] = (exports.namespace + "int")] = "int";
        DataType[DataType["integer"] = (exports.namespace + "integer")] = "integer";
        DataType[DataType["long"] = (exports.namespace + "long")] = "long";
        DataType[DataType["negativeInteger"] = (exports.namespace + "negativeInteger")] = "negativeInteger";
        DataType[DataType["nonNegativeInteger"] = (exports.namespace + "nonNegativeInteger")] = "nonNegativeInteger";
        DataType[DataType["nonPositiveInteger"] = (exports.namespace + "nonPositiveInteger")] = "nonPositiveInteger";
        DataType[DataType["positiveInteger"] = (exports.namespace + "positiveInteger")] = "positiveInteger";
        DataType[DataType["short"] = (exports.namespace + "short")] = "short";
        DataType[DataType["unsignedLong"] = (exports.namespace + "unsignedLong")] = "unsignedLong";
        DataType[DataType["unsignedInt"] = (exports.namespace + "unsignedInt")] = "unsignedInt";
        DataType[DataType["unsignedShort"] = (exports.namespace + "unsignedShort")] = "unsignedShort";
        DataType[DataType["unsignedByte"] = (exports.namespace + "unsignedByte")] = "unsignedByte";
        DataType[DataType["double"] = (exports.namespace + "double")] = "double";
        DataType[DataType["float"] = (exports.namespace + "float")] = "float";
        DataType[DataType["boolean"] = (exports.namespace + "boolean")] = "boolean";
        DataType[DataType["string"] = (exports.namespace + "string")] = "string";
        DataType[DataType["object"] = (exports.namespace + "object")] = "object";
    })(exports.DataType || (exports.DataType = {}));
    var DataType = exports.DataType;
});
//# sourceMappingURL=XSD.js.map