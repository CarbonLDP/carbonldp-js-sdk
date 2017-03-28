"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PersistedFragment = require("./PersistedFragment");
var Factory = (function () {
    function Factory() {
    }
    Factory.decorate = function (fragment, snapshot) {
        if (snapshot === void 0) { snapshot = {}; }
        PersistedFragment.Factory.decorate(fragment, snapshot);
        return fragment;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedNamedFragment.js.map
