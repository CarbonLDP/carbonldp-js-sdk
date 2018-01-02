"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PersistedFragment = require("./PersistedFragment");
var Factory = (function () {
    function Factory() {
    }
    Factory.decorate = function (fragment) {
        PersistedFragment.Factory.decorate(fragment);
        return fragment;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedNamedFragment.js.map
