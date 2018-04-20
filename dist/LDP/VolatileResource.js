"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransientResource_1 = require("../TransientResource");
var C_1 = require("../Vocabularies/C");
exports.VolatileResource = {
    TYPE: C_1.C.VolatileResource,
    is: function (object) {
        return TransientResource_1.TransientResource.is(object)
            && object.hasType(exports.VolatileResource.TYPE);
    },
    create: function () {
        return exports.VolatileResource.createFrom({});
    },
    createFrom: function (object) {
        var resource = TransientResource_1.TransientResource.createFrom(object);
        resource.addType(exports.VolatileResource.TYPE);
        return resource;
    },
};

//# sourceMappingURL=VolatileResource.js.map
