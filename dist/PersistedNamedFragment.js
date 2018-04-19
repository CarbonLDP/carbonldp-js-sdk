"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransientNamedFragment_1 = require("./TransientNamedFragment");
var Fragment_1 = require("./Fragment");
exports.PersistedNamedFragment = {
    isDecorated: function (object) {
        return Fragment_1.Fragment.isDecorated(object);
    },
    decorate: function (object) {
        if (exports.PersistedNamedFragment.isDecorated(object))
            return object;
        var fragment = TransientNamedFragment_1.TransientNamedFragment.decorate(object);
        return Fragment_1.Fragment.decorate(fragment);
    },
};

//# sourceMappingURL=PersistedNamedFragment.js.map
