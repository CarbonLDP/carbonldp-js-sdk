"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var ACE = __importStar(require("./Auth/ACE"));
exports.ACE = ACE;
var ACL = __importStar(require("./Auth/ACL"));
exports.ACL = ACL;
var BasicAuthenticator_1 = __importDefault(require("./Auth/BasicAuthenticator"));
exports.BasicAuthenticator = BasicAuthenticator_1.default;
var Credentials = __importStar(require("./Auth/Credentials"));
exports.Credentials = Credentials;
var PersistedACE = __importStar(require("./Auth/PersistedACE"));
exports.PersistedACE = PersistedACE;
var PersistedACL = __importStar(require("./Auth/PersistedACL"));
exports.PersistedACL = PersistedACL;
var PersistedCredentials = __importStar(require("./Auth/PersistedCredentials"));
exports.PersistedCredentials = PersistedCredentials;
var PersistedRole = __importStar(require("./Auth/PersistedRole"));
exports.PersistedRole = PersistedRole;
var PersistedUser = __importStar(require("./Auth/PersistedUser"));
exports.PersistedUser = PersistedUser;
var Role = __importStar(require("./Auth/Role"));
exports.Role = Role;
var Roles = __importStar(require("./Auth/Roles"));
exports.Roles = Roles;
var Ticket = __importStar(require("./Auth/Ticket"));
exports.Ticket = Ticket;
var Token = __importStar(require("./Auth/Token"));
exports.Token = Token;
var TokenAuthenticator_1 = __importDefault(require("./Auth/TokenAuthenticator"));
exports.TokenAuthenticator = TokenAuthenticator_1.default;
var User = __importStar(require("./Auth/User"));
exports.User = User;
var UsernameAndPasswordToken_1 = __importDefault(require("./Auth/UsernameAndPasswordToken"));
exports.UsernameAndPasswordToken = UsernameAndPasswordToken_1.default;
var Users = __importStar(require("./Auth/Users"));
exports.Users = Users;
var Errors = __importStar(require("./Errors"));
var FreeResources_1 = require("./FreeResources");
var Errors_1 = require("./HTTP/Errors");
var Request_1 = require("./HTTP/Request");
var Parser_1 = require("./JSONLD/Parser");
var RDF = __importStar(require("./RDF"));
var Resource_1 = require("./Resource");
var Utils = __importStar(require("./Utils"));
var LDP_1 = require("./Vocabularies/LDP");
var Method;
(function (Method) {
    Method[Method["BASIC"] = 0] = "BASIC";
    Method[Method["TOKEN"] = 1] = "TOKEN";
})(Method = exports.Method || (exports.Method = {}));
var Class = (function () {
    function Class(context) {
        this.roles = new Roles.Class(this.context);
        this.users = new Users.Class(this.context);
        this.context = context;
        this.authenticators = [];
        this.authenticators[Method.BASIC] = new BasicAuthenticator_1.default();
        this.authenticators[Method.TOKEN] = new TokenAuthenticator_1.default(this.context);
    }
    Object.defineProperty(Class.prototype, "authenticatedUser", {
        get: function () {
            if (!this._authenticatedUser) {
                if (this.context.parentContext && this.context.parentContext.auth)
                    return this.context.parentContext.auth.authenticatedUser;
                return null;
            }
            return this._authenticatedUser;
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
        this._authenticatedUser = null;
    };
    Class.prototype.createTicket = function (uri, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var resourceURI = this.context.resolve(uri);
        var freeResources = FreeResources_1.FreeResources.create(this.context.documents);
        Ticket.Factory.createFrom(freeResources.createResource(), resourceURI);
        if (this.isAuthenticated())
            this.addAuthentication(requestOptions);
        Request_1.RequestUtils.setAcceptHeader("application/ld+json", requestOptions);
        Request_1.RequestUtils.setContentTypeHeader("application/ld+json", requestOptions);
        Request_1.RequestUtils.setPreferredInteractionModel(LDP_1.LDP.RDFSource, requestOptions);
        return Promise.resolve().then(function () {
            var containerURI = _this.context._resolvePath("system") + Ticket.TICKETS_CONTAINER;
            var body = JSON.stringify(freeResources);
            return Request_1.RequestService.post(containerURI, body, requestOptions, new Parser_1.JSONLDParser())
                .catch(function (response) { return _this.context.documents._parseErrorResponse(response); });
        }).then(function (_a) {
            var expandedResult = _a[0], response = _a[1];
            var freeNodes = RDF.Node.Util.getFreeNodes(expandedResult);
            var ticketNodes = freeNodes.filter(function (freeNode) { return RDF.Node.Util.hasType(freeNode, Ticket.RDF_CLASS); });
            if (ticketNodes.length === 0)
                throw new Errors_1.BadResponseError("No " + Ticket.RDF_CLASS + " was returned.", response);
            if (ticketNodes.length > 1)
                throw new Errors_1.BadResponseError("Multiple " + Ticket.RDF_CLASS + " were returned.", response);
            var expandedTicket = ticketNodes[0];
            var ticket = Resource_1.Resource.create();
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
            return _this.getAuthenticatedUser(authenticator);
        }).then(function (persistedUser) {
            _this._authenticatedUser = persistedUser;
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
            if (PersistedUser.Factory.is(credentials.user))
                return credentials.user;
            return _this.getAuthenticatedUser(authenticator);
        }).then(function (persistedUser) {
            _this._authenticatedUser = persistedUser;
            credentials.user = persistedUser;
            _this.authenticator = authenticator;
            return credentials;
        });
    };
    Class.prototype.getAuthenticatedUser = function (authenticator) {
        var requestOptions = {};
        authenticator.addAuthentication(requestOptions);
        return this.context.documents.get("users/me/", requestOptions).then(function (_a) {
            var userDocument = _a[0], response = _a[1];
            return userDocument;
        });
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Auth.js.map
