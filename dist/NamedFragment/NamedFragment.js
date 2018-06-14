"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var Fragment_1 = require("../Fragment");
var TransientNamedFragment_1 = require("./TransientNamedFragment");
exports.NamedFragment = {
    isDecorated: function (object) {
        return TransientNamedFragment_1.TransientNamedFragment.isDecorated(object)
            && Fragment_1.Fragment.isDecorated(object);
    },
    is: function (value) {
        return TransientNamedFragment_1.TransientNamedFragment.is(value)
            && Fragment_1.Fragment.isDecorated(value);
    },
    decorate: function (object) {
        if (exports.NamedFragment.isDecorated(object))
            return object;
        return core_1.ModelDecorator
            .decorateMultiple(object, TransientNamedFragment_1.TransientNamedFragment, Fragment_1.Fragment);
    },
    create: TransientNamedFragment_1.TransientNamedFragment.create,
    createFrom: TransientNamedFragment_1.TransientNamedFragment.createFrom,
};

//# sourceMappingURL=NamedFragment.js.map
