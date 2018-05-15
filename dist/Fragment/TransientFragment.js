"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("../Resource");
exports.TransientFragment = {
    isDecorated: function (object) {
        return Resource_1.TransientResource.isDecorated(object);
    },
    is: function (value) {
        return Resource_1.TransientResource.is(value);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientFragment.createFrom(copy);
    },
    createFrom: function (object) {
        return exports.TransientFragment.decorate(object);
    },
    decorate: function (object) {
        if (exports.TransientFragment.isDecorated(object))
            return object;
        Resource_1.TransientResource.decorate(object);
        return object;
    },
};

//# sourceMappingURL=TransientFragment.js.map
