"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CS_1 = require("../Vocabularies/CS");
var XSD_1 = require("../Vocabularies/XSD");
var Utils = require("./../Utils");
exports.RDF_CLASS = CS_1.CS.User;
exports.SCHEMA = {
    "name": {
        "@id": CS_1.CS.name,
        "@type": XSD_1.XSD.string,
    },
    "credentials": {
        "@id": CS_1.CS.credentials,
        "@type": "@id",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "name");
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=User.js.map
