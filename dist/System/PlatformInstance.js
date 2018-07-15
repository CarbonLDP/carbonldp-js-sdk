"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vocabularies_1 = require("../Vocabularies");
var SCHEMA = {
    "buildDate": {
        "@id": Vocabularies_1.C.buildDate,
        "@type": Vocabularies_1.XSD.dateTime,
    },
    "version": {
        "@id": Vocabularies_1.C.version,
        "@type": Vocabularies_1.XSD.string,
    },
};
exports.PlatformInstance = {
    TYPE: Vocabularies_1.C.PlatformInstance,
    SCHEMA: SCHEMA,
};

//# sourceMappingURL=PlatformInstance.js.map
