"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var NS = __importStar(require("../Vocabularies/index"));
var Utils_1 = require("../Utils");
exports.SCHEMA = {
    "target": {
        "@id": NS.C.target,
        "@type": "@id",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils_1.hasProperty(object, "target");
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=Message.js.map
