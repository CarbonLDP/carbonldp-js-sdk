"use strict";
var App = require("./App");
var PersistedDocument = require("./PersistedDocument");
var Utils = require("./Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return Utils.hasPropertyDefined(resource, "rootContainer");
    };
    Factory.is = function (object) {
        return App.Factory.is(object)
            && PersistedDocument.Factory.hasClassProperties(object)
            && Factory.hasClassProperties(object);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedApp.js.map
