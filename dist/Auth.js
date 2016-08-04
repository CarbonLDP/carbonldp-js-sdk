"use strict";
var ACE = require("./Auth/ACE");
exports.ACE = ACE;
var ACL = require("./Auth/ACL");
exports.ACL = ACL;
var BasicAuthenticator_1 = require("./Auth/BasicAuthenticator");
exports.BasicAuthenticator = BasicAuthenticator_1.default;
var PersistedACE = require("./Auth/PersistedACE");
exports.PersistedACE = PersistedACE;
var PersistedACL = require("./Auth/PersistedACL");
exports.PersistedACL = PersistedACL;
var Role = require("./Auth/Role");
exports.Role = Role;
var Roles = require("./Auth/Roles");
exports.Roles = Roles;
var TokenAuthenticator_1 = require("./Auth/TokenAuthenticator");
exports.TokenAuthenticator = TokenAuthenticator_1.default;
var Ticket = require("./Auth/Ticket");
exports.Ticket = Ticket;
var Token = require("./Auth/Token");
exports.Token = Token;
var UsernameAndPasswordToken_1 = require("./Auth/UsernameAndPasswordToken");
exports.UsernameAndPasswordToken = UsernameAndPasswordToken_1.default;
var Errors = require("./Errors");
var FreeResources = require("./FreeResources");
var HTTP = require("./HTTP");
var NS = require("./NS");
var PersistedDocument = require("./PersistedDocument");
var Resource = require("./Resource");
var RDF = require("./RDF");
var Utils = require("./Utils");
(function (Method) {
    Method[Method["BASIC"] = 0] = "BASIC";
    Method[Method["TOKEN"] = 1] = "TOKEN";
})(exports.Method || (exports.Method = {}));
var Method = exports.Method;
var Class = (function () {
    function Class(context) {
        this.roles = null;
        this.context = context;
        this.authenticators = [];
        this.authenticators[Method.BASIC] = new BasicAuthenticator_1.default();
        this.authenticators[Method.TOKEN] = new TokenAuthenticator_1.default(this.context);
    }
    Object.defineProperty(Class.prototype, "authenticatedAgent", {
        get: function () {
            if (!this._authenticatedAgent) {
                if (this.context.parentContext && this.context.parentContext.auth)
                    return this.context.parentContext.auth.authenticatedAgent;
                return null;
            }
            return this._authenticatedAgent;
        },
        enumerable: true,
        configurable: true
    });
    Class.prototype.isAuthenticated = function (askParent) {
        if (askParent === void 0) { askParent = true; }
        return ((this.authenticator && this.authenticator.isAuthenticated()) ||
            (askParent && !!this.context.parentContext && !!this.context.parentContext.auth && this.context.parentContext.auth.isAuthenticated()));
    };
    Class.prototype.authenticate = function (username, password) {
        return this.authenticateUsing("TOKEN", username, password);
    };
    Class.prototype.authenticateUsing = function (method, userOrTokenOrCredentials, password) {
        switch (method) {
            case "BASIC":
                return this.authenticateWithBasic(userOrTokenOrCredentials, password);
            case "TOKEN":
                return this.authenticateWithToken(userOrTokenOrCredentials, password);
            default:
                return Promise.reject(new Errors.IllegalArgumentError("No exists the authentication method '" + method + "'"));
        }
    };
    Class.prototype.addAuthentication = function (requestOptions) {
        if (this.isAuthenticated(false)) {
            this.authenticator.addAuthentication(requestOptions);
        }
        else if (!!this.context.parentContext && !!this.context.parentContext.auth) {
            this.context.parentContext.auth.addAuthentication(requestOptions);
        }
        else {
            console.warn("There is no authentication to add to the request.");
        }
    };
    Class.prototype.clearAuthentication = function () {
        if (!this.authenticator)
            return;
        this.authenticator.clearAuthentication();
        this.authenticator = null;
        this._authenticatedAgent = null;
    };
    Class.prototype.createTicket = function (uri, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var resourceURI = this.context.resolve(uri);
        var containerURI = this.context.resolve(Ticket.TICKETS_CONTAINER);
        var freeResources = FreeResources.Factory.create(this.context.documents);
        Ticket.Factory.createFrom(freeResources.createResource(), resourceURI);
        if (this.isAuthenticated())
            this.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.RDFSource, requestOptions);
        return HTTP.Request.Service.post(containerURI, freeResources.toJSON(), requestOptions, new HTTP.JSONLDParser.Class()).then(function (_a) {
            var expandedResult = _a[0], response = _a[1];
            var freeNodes = RDF.Node.Util.getFreeNodes(expandedResult);
            var ticketNodes = freeNodes.filter(function (freeNode) { return RDF.Node.Util.hasType(freeNode, Ticket.RDF_CLASS); });
            if (ticketNodes.length === 0)
                throw new HTTP.Errors.BadResponseError("No " + Ticket.RDF_CLASS + " was returned.", response);
            if (ticketNodes.length > 1)
                throw new HTTP.Errors.BadResponseError("Multiple " + Ticket.RDF_CLASS + " were returned.", response);
            var expandedTicket = ticketNodes[0];
            var ticket = Resource.Factory.create();
            var digestedSchema = _this.context.documents.getSchemaFor(expandedTicket);
            _this.context.documents.jsonldConverter.compact(expandedTicket, ticket, digestedSchema, _this.context.documents);
            return [ticket, response];
        });
    };
    Class.prototype.getAuthenticatedURL = function (uri, requestOptions) {
        var resourceURI = this.context.resolve(uri);
        return this.createTicket(resourceURI, requestOptions).then(function (_a) {
            var ticket = _a[0], response = _a[1];
            resourceURI += RDF.URI.Util.hasQuery(resourceURI) ? "&" : "?";
            resourceURI += "ticket=" + ticket.ticketKey;
            return resourceURI;
        });
    };
    Class.prototype.authenticateWithBasic = function (username, password) {
        var _this = this;
        var authenticator = this.authenticators[Method.BASIC];
        var authenticationToken;
        authenticationToken = new UsernameAndPasswordToken_1.default(username, password);
        this.clearAuthentication();
        var credentials;
        return authenticator.authenticate(authenticationToken).then(function (_credentials) {
            credentials = _credentials;
            return _this.getAuthenticatedAgent(authenticator);
        }).then(function (persistedAgent) {
            _this._authenticatedAgent = persistedAgent;
            _this.authenticator = authenticator;
            return credentials;
        });
    };
    Class.prototype.authenticateWithToken = function (userOrTokenOrCredentials, password) {
        var _this = this;
        var authenticator = this.authenticators[Method.TOKEN];
        var credentials = null;
        var authenticationToken = null;
        if (Utils.isString(userOrTokenOrCredentials) && Utils.isString(password)) {
            authenticationToken = new UsernameAndPasswordToken_1.default(userOrTokenOrCredentials, password);
        }
        else if (Token.Factory.hasRequiredValues(userOrTokenOrCredentials)) {
            credentials = userOrTokenOrCredentials;
        }
        else {
            return Promise.reject(new Errors.IllegalArgumentError("Parameters do not match with the authentication request."));
        }
        this.clearAuthentication();
        return authenticator.authenticate((authenticationToken) ? authenticationToken : credentials).then(function (_credentials) {
            credentials = _credentials;
            if (PersistedDocument.Factory.is(_credentials.agent))
                return credentials.agent;
            return _this.getAuthenticatedAgent(authenticator);
        }).then(function (persistedAgent) {
            _this._authenticatedAgent = persistedAgent;
            credentials.agent = persistedAgent;
            _this.authenticator = authenticator;
            return credentials;
        });
    };
    Class.prototype.getAuthenticatedAgent = function (authenticator) {
        var _this = this;
        var requestOptions = {};
        authenticator.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.RDFSource, requestOptions);
        var uri = this.context.resolve("agents/me/");
        return HTTP.Request.Service.get(uri, requestOptions, new RDF.Document.Parser()).then(function (_a) {
            var rdfDocuments = _a[0], response = _a[1];
            var eTag = HTTP.Response.Util.getETag(response);
            if (eTag === null)
                throw new HTTP.Errors.BadResponseError("The authenticated agent doesn't contain an ETag", response);
            var locationHeader = response.getHeader("Content-Location");
            if (!locationHeader || locationHeader.values.length < 1)
                throw new HTTP.Errors.BadResponseError("The response is missing a Content-Location header.", response);
            if (locationHeader.values.length !== 1)
                throw new HTTP.Errors.BadResponseError("The response contains more than one Content-Location header.", response);
            var agentURI = locationHeader.toString();
            if (!agentURI)
                throw new HTTP.Errors.BadResponseError("The response doesn't contain a 'Content-Location' header.", response);
            var agentsDocuments = RDF.Document.Util.getDocuments(rdfDocuments).filter(function (rdfDocument) { return rdfDocument["@id"] === agentURI; });
            if (agentsDocuments.length === 0)
                throw new HTTP.Errors.BadResponseError("The response doesn't contain a the '" + agentURI + "' resource.", response);
            if (agentsDocuments.length > 1)
                throw new HTTP.Errors.BadResponseError("The response contains more than one '" + agentURI + "' resource.", response);
            var document = _this.context.documents._getPersistedDocument(agentsDocuments[0], response);
            document._etag = eTag;
            return document;
        });
    };
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Auth.js.map
