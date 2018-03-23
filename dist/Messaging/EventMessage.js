"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var C_1 = require("../Vocabularies/C");
var SCHEMA = {
    "target": {
        "@id": C_1.C.target,
        "@type": "@id",
    },
};
exports.EventMessage = {
    SCHEMA: SCHEMA,
    isDecorated: function (object) {
        return Utils_1.hasProperty(object, "target");
    },
};

//# sourceMappingURL=EventMessage.js.map
