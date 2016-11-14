"use strict";
var Errors = require("./../Errors");
var PersistedProtectedDocument = require("./../PersistedProtectedDocument");
var Utils = require("./../Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "_roles")
            && Utils.hasFunction(object, "createChild")
            && Utils.hasFunction(object, "createChildAndRetrieve")
            && Utils.hasFunction(object, "listAgents")
            && Utils.hasFunction(object, "getAgents")
            && Utils.hasFunction(object, "addAgent")
            && Utils.hasFunction(object, "addAgents")
            && Utils.hasFunction(object, "removeAgent")
            && Utils.hasFunction(object, "removeAgents");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && PersistedProtectedDocument.Factory.is(object);
    };
    Factory.decorate = function (object, roles) {
        var role = object;
        if (Factory.hasClassProperties(role))
            return role;
        if (!PersistedProtectedDocument.Factory.hasClassProperties(role))
            PersistedProtectedDocument.Factory.decorate(role);
        Object.defineProperties(role, {
            "_roles": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: roles,
            },
            "createChild": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: createChild,
            },
            "createChildAndRetrieve": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: createChildAndRetrieve,
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
            "removeAgent": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: removeAgent,
            },
            "removeAgents": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: removeAgents,
            },
        });
        return role;
    };
    return Factory;
}());
exports.Factory = Factory;
function createChild(role, slugOrRequestOptions, requestOptions) {
    checkState.call(this);
    return this._roles.createChild(this.id, role, slugOrRequestOptions, requestOptions);
}
function createChildAndRetrieve(role, slugOrRequestOptions, requestOptions) {
    checkState.call(this);
    return this._roles.createChildAndRetrieve(this.id, role, slugOrRequestOptions, requestOptions);
}
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
function removeAgent(agent, requestOptions) {
    checkState.call(this);
    return this._roles.removeAgents(this.id, [agent], requestOptions);
}
function removeAgents(agents, requestOptions) {
    checkState.call(this);
    return this._roles.removeAgents(this.id, agents, requestOptions);
}
function checkState() {
    if (!this._roles)
        throw new Errors.IllegalStateError("The context of the current role, does not support roles management.");
}

//# sourceMappingURL=PersistedRole.js.map
