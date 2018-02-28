"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PersistedFragment_1 = require("./PersistedFragment");
var Factory = (function () {
    function Factory() {
    }
    Factory.decorate = function (fragment) {
        PersistedFragment_1.PersistedFragment.decorate(fragment);
        return fragment;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedNamedFragment.js.map
