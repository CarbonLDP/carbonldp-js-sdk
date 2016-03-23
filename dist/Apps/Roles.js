"use strict";
var Role = require("./Roles/Role");
exports.Role = Role;
var Utils = require("./../Utils");
var Errors = require("./../Errors");
var Class = (function () {
    function Class(context) {
        this.context = context;
    }
    Class.prototype.create = function (slugOrAgent, agentDocument) {
        var containerURI = this.context.resolve(this.getContainerURI());
        var slug = Utils.isString(slugOrAgent) ? slugOrAgent : null;
        agentDocument = agentDocument || slugOrAgent;
        if (!Role.Factory.is(agentDocument))
            return Promise.reject(new Errors.IllegalArgumentError("The Document is not a `Carbon.Apps.Roles.Role.Class` object."));
        if (slug)
            return this.context.documents.createChild(containerURI, slug, agentDocument);
        return this.context.documents.createChild(containerURI, agentDocument);
    };
    Class.prototype.getContainerURI = function () {
        if (!this.context.hasSetting("platform.apps.roles.container"))
            throw new Errors.IllegalStateError("The apps roles container URI hasn't been set.");
        return this.context.getSetting("platform.apps.roles.container");
    };
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Roles.js.map
