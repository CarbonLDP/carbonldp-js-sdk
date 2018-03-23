"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NamedFragment_1 = require("./NamedFragment");
var PersistedFragment_1 = require("./PersistedFragment");
exports.PersistedNamedFragment = {
    isDecorated: function (object) {
        return PersistedFragment_1.PersistedFragment.isDecorated(object);
    },
    decorate: function (object) {
        if (exports.PersistedNamedFragment.isDecorated(object))
            return object;
        var fragment = NamedFragment_1.NamedFragment.decorate(object);
        return PersistedFragment_1.PersistedFragment.decorate(fragment);
    },
};

//# sourceMappingURL=PersistedNamedFragment.js.map
