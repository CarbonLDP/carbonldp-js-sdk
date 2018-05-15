"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("../Resource");
var TransientFragment_1 = require("./TransientFragment");
exports.Fragment = {
    isDecorated: function (object) {
        return TransientFragment_1.TransientFragment.isDecorated(object)
            && Resource_1.PersistedResource.isDecorated(object);
    },
    is: function (value) {
        return TransientFragment_1.TransientFragment.is(value) &&
            Resource_1.PersistedResource.isDecorated(value);
    },
    decorate: function (object) {
        if (exports.Fragment.isDecorated(object))
            return object;
        TransientFragment_1.TransientFragment.decorate(object);
        Resource_1.PersistedResource.decorate(object);
        return object;
    },
    create: TransientFragment_1.TransientFragment.create,
    createFrom: TransientFragment_1.TransientFragment.createFrom,
};

//# sourceMappingURL=Fragment.js.map
