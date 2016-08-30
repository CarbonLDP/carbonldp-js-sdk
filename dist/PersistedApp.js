"use strict";
var App = require("./App");
var PersistedProtectedDocument = require("./PersistedProtectedDocument");
var Utils = require("./Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return Utils.hasPropertyDefined(resource, "rootContainer");
    };
    Factory.is = function (object) {
        return App.Factory.is(object)
            && PersistedProtectedDocument.Factory.is(object)
            && Factory.hasClassProperties(object);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedApp.js.map
