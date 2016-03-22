"use strict";
var Agent = require("./Agents/Agent");
exports.Agent = Agent;
var Utils = require("./Utils");
var Errors = require("./Errors");
var Class = (function () {
    function Class(context) {
        this.context = context;
    }
    Class.prototype.createAgent = function (slugOrAgent, agentDocument) {
        var containerURI = this.context.resolve(this.getContainerURI());
        var slug = Utils.isString(slugOrAgent) ? slugOrAgent : null;
        agentDocument = agentDocument || slugOrAgent;
        if (!Agent.Factory.is(agentDocument))
            return Promise.reject(new Errors.IllegalArgumentError("The Document is not a `Carbon.Agents.Agent.Class` object."));
        return this.context.documents.createChild(containerURI, slug, agentDocument);
    };
    Class.prototype.getContainerURI = function () {
        if (!this.context.hasSetting("platform.agents.container"))
            throw new Errors.IllegalStateError("The agents container URI hasn't been set.");
        return this.context.getSetting("platform.agents.container");
    };
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Agents.js.map
