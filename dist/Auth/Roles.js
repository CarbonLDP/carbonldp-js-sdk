"use strict";
var Errors = require("./../Errors");
var HTTP = require("./../HTTP");
var URI = require("./../RDF/URI");
var Utils = require("./../Utils");
var Class = (function () {
    function Class(context) {
        this.context = context;
    }
    Class.prototype.createChild = function (parentRole, role, slugOrRequestOptions, requestOptions) {
        var _this = this;
        var containerUri = this.context.resolve(this.getContainerURI());
        var parentUri = Utils.isString(parentRole) ? parentRole : parentRole.id;
        parentUri = URI.Util.resolve(containerUri, parentUri);
        var slug = Utils.isString(slugOrRequestOptions) ? slugOrRequestOptions : null;
        requestOptions = HTTP.Request.Util.isOptions(slugOrRequestOptions) ? slugOrRequestOptions : requestOptions;
        if (!URI.Util.isBaseOf(containerUri, parentUri))
            return Promise.reject(new Errors.IllegalArgumentError("The parent role provided is not a valid role of the current context."));
        var rolePointer;
        var responseCreated;
        return this.context.documents.exists(parentUri).then(function (_a) {
            var exists = _a[0], response = _a[1];
            if (!exists)
                throw new Errors.IllegalArgumentError("The parent role provided does not exist.");
            return slug ? _this.context.documents.createChild(containerUri, slug, role, requestOptions) : _this.context.documents.createChild(containerUri, role, requestOptions);
        }).then(function (_a) {
            var newRole = _a[0], response = _a[1];
            rolePointer = newRole;
            responseCreated = response;
            return _this.context.documents.addMember(parentUri, newRole);
        }).then(function (response) {
            return [rolePointer, [responseCreated, response]];
        });
    };
    Class.prototype.get = function (roleURI, requestOptions) {
        var _this = this;
        return this.resolveRoleURI(roleURI).then(function (uri) {
            return _this.context.documents.get(uri, requestOptions);
        });
    };
    Class.prototype.listAgents = function (roleURI, requestOptions) {
        var _this = this;
        return this.getAgentsAccessPoint(roleURI).then(function (agentsAccessPoint) {
            return _this.context.documents.listMembers(agentsAccessPoint.id, requestOptions);
        });
    };
    Class.prototype.getAgents = function (roleURI, retrievalPreferencesOrRequestOptions, requestOptions) {
        var _this = this;
        return this.getAgentsAccessPoint(roleURI).then(function (agentsAccessPoint) {
            return _this.context.documents.getMembers(agentsAccessPoint.id, retrievalPreferencesOrRequestOptions, requestOptions);
        });
    };
    Class.prototype.addAgent = function (roleURI, agent, requestOptions) {
        return this.addAgents(roleURI, [agent], requestOptions);
    };
    Class.prototype.addAgents = function (roleURI, agents, requestOptions) {
        var _this = this;
        return this.getAgentsAccessPoint(roleURI).then(function (agentsAccessPoint) {
            return _this.context.documents.addMembers(agentsAccessPoint.id, agents, requestOptions);
        });
    };
    Class.prototype.removeAgent = function (roleURI, agent, requestOptions) {
        return this.removeAgents(roleURI, [agent], requestOptions);
    };
    Class.prototype.removeAgents = function (roleURI, agents, requestOptions) {
        var _this = this;
        return this.getAgentsAccessPoint(roleURI).then(function (agentsAccessPoint) {
            return _this.context.documents.removeMembers(agentsAccessPoint.id, agents, requestOptions);
        });
    };
    Class.prototype.getContainerURI = function () {
        if (!this.context.hasSetting("platform.roles.container"))
            throw new Errors.IllegalStateError("The roles container setting hasn't been declared.");
        return this.context.getSetting("platform.roles.container");
    };
    Class.prototype.resolveRoleURI = function (roleURI) {
        var containerUri = this.context.resolve(this.getContainerURI());
        var uri = URI.Util.resolve(containerUri, roleURI);
        if (!URI.Util.isBaseOf(containerUri, uri))
            return Promise.reject(new Errors.IllegalArgumentError("The URI provided is not a valid role of the current context."));
        return Promise.resolve(uri);
    };
    Class.prototype.getAgentsAccessPoint = function (roleURI) {
        var _this = this;
        return this.resolveRoleURI(roleURI).then(function (uri) {
            return _this.context.documents.executeSELECTQuery(uri, " select distinct ?agentsAccessPoint where {\n\t\t\t\t<" + uri + "> <https://carbonldp.com/ns/v1/platform#accessPoint> ?agentsAccessPoint .\n\t\t\t\t?agentsAccessPoint <http://www.w3.org/ns/ldp#hasMemberRelation> <https://carbonldp.com/ns/v1/security#agent> .\n\t\t\t}");
        }).then(function (_a) {
            var selectResults = _a[0], response = _a[1];
            return selectResults.bindings[0]["agentsAccessPoint"];
        });
    };
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Roles.js.map
