"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../Vocabularies/index");
var Utils_1 = require("../Utils");
function guessXSDType(value) {
    if (Utils_1.isFunction(value))
        return null;
    if (Utils_1.isString(value))
        return index_1.XSD.DataType.string;
    if (Utils_1.isDate(value))
        return index_1.XSD.DataType.dateTime;
    if (Utils_1.isNumber(value))
        return index_1.XSD.DataType.float;
    if (Utils_1.isBoolean(value))
        return index_1.XSD.DataType.boolean;
    return null;
}
exports.guessXSDType = guessXSDType;

//# sourceMappingURL=Utils.js.map
