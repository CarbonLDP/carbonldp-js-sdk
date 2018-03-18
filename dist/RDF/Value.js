"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("./List");
var Literal_1 = require("./Literal");
var Node_1 = require("./Node");
var Utils_1 = require("../Utils");
exports.RDFValue = {
    parse: function (pointerLibrary, value) {
        if (Utils_1.isString(value))
            return value;
        if (Literal_1.RDFLiteral.is(value))
            return Literal_1.RDFLiteral.parse(value);
        if (Node_1.RDFNode.is(value))
            return pointerLibrary.getPointer(value["@id"]);
        if (List_1.RDFList.is(value))
            return value["@list"]
                .map(exports.RDFValue.parse.bind(null, pointerLibrary));
        return null;
    },
};
exports.default = exports.RDFValue;

//# sourceMappingURL=Value.js.map
