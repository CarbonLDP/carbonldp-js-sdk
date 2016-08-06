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
            && Utils.hasPropertyDefined(object, "enabled")
            && Utils.hasFunction(object, "enable")
            && Utils.hasFunction(object, "disable");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && PersistedDocument.Factory.is(object)
            && object.hasType(Agent.RDF_CLASS);
    };
    Factory.decorate = function (object) {
        var agent = object;
        if (Factory.hasClassProperties(agent))
            return agent;
        Object.defineProperties(agent, {
            "enable": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: enable,
            },
            "disable": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: disable,
            },
        });
        return agent;
    };
    return Factory;
}());
exports.Factory = Factory;
function enable() {
    this.enabled = true;
    return this.save();
}
function disable() {
    this.enabled = false;
    return this.save();
}

//# sourceMappingURL=PersistedAgent.js.map
