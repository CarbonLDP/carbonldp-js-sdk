"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var PersistedFragment = __importStar(require("./PersistedFragment"));
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
