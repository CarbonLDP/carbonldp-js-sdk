"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = __importStar(require("./../Utils"));
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (value) {
        return Utils.hasPropertyDefined(value, "@list");
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=List.js.map
