"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("../Resource/Resource");
var C_1 = require("../Vocabularies/C");
var SCHEMA = {
    "target": {
        "@id": C_1.C.target,
        "@type": "@id",
    },
};
exports.EventMessage = {
    SCHEMA: SCHEMA,
    is: function (value) {
        return Resource_1.Resource.is(value)
            && value.hasOwnProperty("target");
    },
};

//# sourceMappingURL=EventMessage.js.map
