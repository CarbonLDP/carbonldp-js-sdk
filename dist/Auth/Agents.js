"use strict";
var Agent = require("./Agent");
var Errors = require("./../Errors");
var URI = require("./../RDF/URI");
var Class = (function () {
    function Class(context) {
        this.context = context;
    }
    Class.prototype.register = function (agentDocument, slug) {
        var _this = this;
        if (slug === void 0) { slug = null; }
        return this.resolveURI("").then(function (containerURI) {
            if (!Agent.Factory.is(agentDocument))
                throw new Errors.IllegalArgumentError("The Document is not a cs:Agent object.");
            return _this.context.documents.createChild(containerURI, agentDocument, slug);
        });
    };
    Class.prototype.get = function (agentURI, requestOptions) {
        var _this = this;
        return this.resolveURI(agentURI).then(function (uri) {
            return _this.context.documents.get(uri, requestOptions);
        });
    };
    Class.prototype.resolveURI = function (agentURI) {
        var _this = this;
        return new Promise(function (resolve) {
            var containerURI = _this.context.resolve(_this.getContainerURI());
            var uri = URI.Util.resolve(containerURI, agentURI);
            if (!URI.Util.isBaseOf(containerURI, uri))
                throw new Errors.IllegalArgumentError("The URI provided is not a valid agent of the current context.");
            resolve(uri);
        });
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
