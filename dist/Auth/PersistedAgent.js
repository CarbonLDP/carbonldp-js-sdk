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
            && object.hasType(Agent.RDF_CLASS);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedAgent.js.map
