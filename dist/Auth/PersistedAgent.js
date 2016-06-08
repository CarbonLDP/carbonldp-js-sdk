"use strict";
var Agent = require("./Agent");
var Utils = require("./../Utils");
var PersistedDocument = require("./../PersistedDocument");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "name")
            && Utils.hasPropertyDefined(object, "email")
            && Utils.hasPropertyDefined(object, "enabled");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && PersistedDocument.Factory.is(object)
            && object.types.indexOf(Agent.RDF_CLASS) !== -1;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedAgent.js.map
