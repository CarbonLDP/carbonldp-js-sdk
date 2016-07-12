"use strict";
var Errors = require("./../Errors");
var Role = require("./Role");
var Utils = require("./../Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "_roles")
            && Utils.hasPropertyDefined(object, "name")
            && Utils.hasFunction(object, "listAgents")
            && Utils.hasFunction(object, "getAgents")
            && Utils.hasFunction(object, "addAgent")
            && Utils.hasFunction(object, "addAgents");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && Role.Factory.is(object);
    };
    Factory.decorate = function (object, roles) {
        var role = object;
        if (Factory.hasClassProperties(role))
            return role;
        Object.defineProperties(role, {
            "_roles": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: roles,
            },
            "listAgents": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: listAgents,
            },
            "getAgents": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: getAgents,
            },
            "addAgent": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: addAgent,
            },
            "addAgents": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: addAgents,
            },
        });
        return role;
    };
    return Factory;
}());
exports.Factory = Factory;
function listAgents(requestOptions) {
    checkState.call(this);
    return this._roles.listAgents(this.id, requestOptions);
}
function getAgents(retrievalPreferencesOrRequestOptions, requestOptions) {
    checkState.call(this);
    return this._roles.getAgents(this.id, retrievalPreferencesOrRequestOptions, requestOptions);
}
function addAgent(agent, requestOptions) {
    checkState.call(this);
    return this._roles.addAgents(this.id, [agent], requestOptions);
}
function addAgents(agents, requestOptions) {
    checkState.call(this);
    return this._roles.addAgents(this.id, agents, requestOptions);
}
function checkState() {
    if (!this._roles)
        throw new Errors.IllegalStateError("The context of the current role, does not support roles management.");
}

//# sourceMappingURL=PersistedRole.js.map
