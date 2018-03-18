"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("../Resource");
var C_1 = require("../Vocabularies/C");
var SCHEMA = {
    "entries": {
        "@id": C_1.C.entry,
        "@type": "@id",
        "@container": "@set",
    },
};
exports.Map = {
    TYPE: C_1.C.Map,
    SCHEMA: SCHEMA,
    is: function (object) {
        return Resource_1.Resource.is(object)
            && object.hasType(exports.Map.TYPE)
            && object.hasOwnProperty("entries");
    },
};
exports.default = exports.Map;

//# sourceMappingURL=Map.js.map
