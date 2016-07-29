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
        this.method = context.getSetting("auth.method") || Method.TOKEN;
        this.authenticators = [];
        this.authenticators[Method.BASIC] = new BasicAuthenticator_1.default();
        this.authenticators[Method.TOKEN] = new TokenAuthenticator_1.default(this.context);
    }
    Class.prototype.isAuthenticated = function (askParent) {
        if (askParent === void 0) { askParent = true; }
        return ((this.authenticator && this.authenticator.isAuthenticated()) ||
            (askParent && !!this.context.parentContext && !!this.context.parentContext.auth && this.context.parentContext.auth.isAuthenticated()));
    };
    Class.prototype.authenticate = function (username, password) {
        return this.authenticateUsing(Method[this.method], username, password);
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
        var authenticator = this.authenticators[Method.BASIC];
        var authenticationToken;
        authenticationToken = new UsernameAndPasswordToken_1.default(username, password);
        this.clearAuthentication();
        this.authenticator = authenticator;
        return this.authenticator.authenticate(authenticationToken);
    };
    Class.prototype.authenticateWithToken = function (userOrTokenOrCredentials, password) {
        var authenticator = this.authenticators[Method.TOKEN];
        var credentials = null;
        var authenticationToken = null;
        if (Utils.isString(userOrTokenOrCredentials) && Utils.isString(password)) {
            authenticationToken = new UsernameAndPasswordToken_1.default(userOrTokenOrCredentials, password);
        }
        else if (Token.Factory.is(userOrTokenOrCredentials)) {
            credentials = userOrTokenOrCredentials;
        }
        else {
            return Promise.reject(new Errors.IllegalArgumentError("Parameters do not match with the authentication request."));
        }
        this.clearAuthentication();
        this.authenticator = authenticator;
        if (authenticationToken)
            return authenticator.authenticate(authenticationToken);
        return authenticator.authenticate(credentials);
    };
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Auth.js.map
