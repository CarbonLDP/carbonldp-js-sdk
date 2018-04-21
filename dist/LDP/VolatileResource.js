"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("../Resource");
var C_1 = require("../Vocabularies/C");
exports.VolatileResource = {
    TYPE: C_1.C.VolatileResource,
    is: function (object) {
        return Resource_1.TransientResource.is(object)
            && object.hasType(exports.VolatileResource.TYPE);
    },
    create: function () {
        return exports.VolatileResource.createFrom({});
    },
    createFrom: function (object) {
        var resource = Resource_1.TransientResource.createFrom(object);
        resource.addType(exports.VolatileResource.TYPE);
        return resource;
    },
};

//# sourceMappingURL=VolatileResource.js.map
