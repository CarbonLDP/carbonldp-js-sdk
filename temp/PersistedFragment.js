"use strict";
var PersistedResource = require("./PersistedResource");
var Factory = (function () {
    function Factory() {
    }
    Factory.decorate = function (fragment, snapshot) {
        if (snapshot === void 0) { snapshot = {}; }
        PersistedResource.Factory.decorate(fragment, snapshot);
        return fragment;
    };
    return Factory;
}());
exports.Factory = Factory;
