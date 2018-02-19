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
var Resource_1 = require("./../Resource");
exports.RDF_CLASS = NS.C.Map;
exports.SCHEMA = {
    "entries": {
        "@id": NS.C.entry,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return Resource_1.Factory.is(object)
            && object.hasType(exports.RDF_CLASS)
            && object.hasOwnProperty("entries");
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=Map.js.map
