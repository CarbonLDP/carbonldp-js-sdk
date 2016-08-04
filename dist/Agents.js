"use strict";
var Agent = require("./Agent");
var Errors = require("./Errors");
var Class = (function () {
    function Class(context) {
        this.context = context;
    }
    Class.prototype.create = function (agentDocument, slug) {
        if (slug === void 0) { slug = null; }
        var containerURI = this.context.resolve(this.getContainerURI());
        if (!Agent.Factory.is(agentDocument))
            return Promise.reject(new Errors.IllegalArgumentError("The Document is not a `Carbon.Agents.Agent.Class` object."));
        return this.context.documents.createChild(containerURI, agentDocument, slug);
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
