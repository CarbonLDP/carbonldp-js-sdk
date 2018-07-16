"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = require("../Vocabularies/C");
var XSD_1 = require("../Vocabularies/XSD");
var SCHEMA = {
    "buildDate": {
        "@id": C_1.C.buildDate,
        "@type": XSD_1.XSD.dateTime,
    },
    "version": {
        "@id": C_1.C.version,
        "@type": XSD_1.XSD.string,
    },
};
exports.PlatformInstance = {
    TYPE: C_1.C.PlatformInstance,
    SCHEMA: SCHEMA,
};

//# sourceMappingURL=PlatformInstance.js.map
