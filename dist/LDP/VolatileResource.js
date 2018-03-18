"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("../Resource");
var C_1 = require("../Vocabularies/C");
exports.VolatileResource = {
    TYPE: C_1.C.VolatileResource,
    is: function (object) {
        return Resource_1.Resource.is(object)
            && object.hasType(exports.VolatileResource.TYPE);
    },
};
exports.default = exports.VolatileResource;

//# sourceMappingURL=VolatileResource.js.map
