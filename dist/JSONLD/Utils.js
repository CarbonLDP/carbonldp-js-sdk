"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var XSD_1 = require("../Vocabularies/XSD");
function guessXSDType(value) {
    if (Utils_1.isFunction(value))
        return null;
    if (Utils_1.isString(value))
        return XSD_1.XSD.string;
    if (Utils_1.isDate(value))
        return XSD_1.XSD.dateTime;
    if (Utils_1.isNumber(value))
        return XSD_1.XSD.float;
    if (Utils_1.isBoolean(value))
        return XSD_1.XSD.boolean;
    return null;
}
exports.guessXSDType = guessXSDType;

//# sourceMappingURL=Utils.js.map
