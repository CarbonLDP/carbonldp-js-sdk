"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("../Resource");
var C_1 = require("../Vocabularies/C");
exports.VolatileResource = {
    TYPE: C_1.C.VolatileResource,
    is: function (value) {
        return Resource_1.TransientResource.is(value)
            && value.hasType(exports.VolatileResource.TYPE);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.VolatileResource.createFrom(copy);
    },
    createFrom: function (object) {
        var resource = Resource_1.TransientResource.createFrom(object);
        resource.addType(exports.VolatileResource.TYPE);
        return resource;
    },
};

//# sourceMappingURL=VolatileResource.js.map
