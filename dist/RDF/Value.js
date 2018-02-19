"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var List = __importStar(require("./List"));
var Literal = __importStar(require("./Literal"));
var RDFNode = __importStar(require("./Node"));
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
