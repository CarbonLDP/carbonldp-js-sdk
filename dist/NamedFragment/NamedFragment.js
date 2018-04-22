"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fragment_1 = require("../Fragment");
var TransientNamedFragment_1 = require("./TransientNamedFragment");
exports.NamedFragment = {
    isDecorated: function (object) {
        return Fragment_1.Fragment.isDecorated(object);
    },
    is: function (value) {
        return TransientNamedFragment_1.TransientNamedFragment.is(value);
    },
    decorate: function (object) {
        if (exports.NamedFragment.isDecorated(object))
            return object;
        var fragment = TransientNamedFragment_1.TransientNamedFragment.decorate(object);
        return Fragment_1.Fragment.decorate(fragment);
    },
    create: TransientNamedFragment_1.TransientNamedFragment.create,
    createFrom: TransientNamedFragment_1.TransientNamedFragment.createFrom,
};

//# sourceMappingURL=NamedFragment.js.map
