"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List = require("./List");
var Literal = require("./Literal");
var RDFNode = require("./Node");
var Util = (function () {
    function Util() {
    }
    Util.parseValue = function (propertyValue, pointerLibrary) {
        if (Literal.Factory.is(propertyValue)) {
            return Literal.Factory.parse(propertyValue);
        }
        else if (RDFNode.Factory.is(propertyValue)) {
            return pointerLibrary.getPointer(propertyValue["@id"]);
        }
        else if (List.Factory.is(propertyValue)) {
            var parsedValue = [];
            var listValues = propertyValue["@list"];
            for (var _i = 0, listValues_1 = listValues; _i < listValues_1.length; _i++) {
                var listValue = listValues_1[_i];
                parsedValue.push(Util.parseValue(listValue, pointerLibrary));
            }
            return parsedValue;
        }
        else {
        }
        return null;
    };
    return Util;
}());
exports.Util = Util;

//# sourceMappingURL=Value.js.map
