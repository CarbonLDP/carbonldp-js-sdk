"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PointerLibrary_1 = require("../Pointer/PointerLibrary");
var Utils_1 = require("../Utils");
var List_1 = require("./List");
var Literal_1 = require("./Literal");
var Node_1 = require("./Node");
exports.RDFValue = {
    parse: function (pointerLibrary, value) {
        if (Utils_1.isString(value))
            return value;
        if (Literal_1.RDFLiteral.is(value))
            return Literal_1.RDFLiteral.parse(value);
        if (Node_1.RDFNode.is(value))
            return PointerLibrary_1._getPointer(pointerLibrary, value["@id"]);
        if (List_1.RDFList.is(value))
            return value["@list"]
                .map(exports.RDFValue.parse.bind(null, pointerLibrary));
        return null;
    },
};

//# sourceMappingURL=Value.js.map
