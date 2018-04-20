"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransientResource_1 = require("../TransientResource");
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
        return TransientResource_1.TransientResource.is(object)
            && object.hasType(exports.Map.TYPE)
            && object.hasOwnProperty("entries");
    },
};

//# sourceMappingURL=Map.js.map
