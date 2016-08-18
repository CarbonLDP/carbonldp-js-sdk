"use strict";
var Errors = require("./../Errors");
var HTTP = require("./../HTTP");
var JSONLD = require("./../JSONLD");
var LDP = require("./../LDP");
var NS = require("./../NS");
var RDF = require("./../RDF");
var Resource = require("./../Resource");
var BasicAuthenticator_1 = require("./BasicAuthenticator");
var UsernameAndPasswordToken_1 = require("./UsernameAndPasswordToken");
var Token = require("./Token");
var Utils = require("./../Utils");
var Class = (function () {
    function Class(context) {
        if (context === null)
            throw new Errors.IllegalArgumentError("context cannot be null");
        this.context = context;
        this.basicAuthenticator = new BasicAuthenticator_1.default();
    }
    Class.prototype.isAuthenticated = function () {
        return !!this._credentials && this._credentials.expirationTime > new Date();
    };
    Class.prototype.authenticate = function (authenticationOrCredentials) {
        var _this = this;
        if (authenticationOrCredentials instanceof UsernameAndPasswordToken_1.default)
            return this.basicAuthenticator.authenticate(authenticationOrCredentials).then(function () {
                return _this.createToken();
            }).then(function (_a) {
                var token = _a[0], response = _a[1];
                _this.basicAuthenticator.clearAuthentication();
                _this._credentials = token;
                return token;
            });
        var credentials = authenticationOrCredentials;
        if (Utils.isString(credentials.expirationTime))
            authenticationOrCredentials.expirationTime = new Date(credentials.expirationTime);
        if (credentials.expirationTime <= new Date())
            return Promise.reject(new Errors.IllegalArgumentError("The token provided in not valid."));
        this._credentials = credentials;
        return Promise.resolve(credentials);
    };
    Class.prototype.addAuthentication = function (requestOptions) {
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        this.addTokenAuthenticationHeader(headers);
        return requestOptions;
    };
    Class.prototype.clearAuthentication = function () {
        this._credentials = null;
    };
    Class.prototype.createToken = function () {
        var _this = this;
        var uri = this.context.resolve(Class.TOKEN_CONTAINER);
        var requestOptions = {};
        this.basicAuthenticator.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.RDFSource, requestOptions);
        return HTTP.Request.Service.post(uri, null, requestOptions, new JSONLD.Parser.Class()).then(function (_a) {
            var expandedResult = _a[0], response = _a[1];
            var freeNodes = RDF.Node.Util.getFreeNodes(expandedResult);
            var freeResources = _this.context.documents._getFreeResources(freeNodes);
            var tokenResources = freeResources.getResources().filter(function (resource) { return Resource.Util.hasType(resource, Token.RDF_CLASS); });
            if (tokenResources.length === 0)
                throw new HTTP.Errors.BadResponseError("No '" + Token.RDF_CLASS + "' was returned.", response);
            if (tokenResources.length > 1)
                throw new HTTP.Errors.BadResponseError("Multiple '" + Token.RDF_CLASS + "' were returned. ", response);
            var token = tokenResources[0];
            var agentDocuments = RDF.Document.Util.getDocuments(expandedResult).filter(function (rdfDocument) { return rdfDocument["@id"] === token.agent.id; });
            agentDocuments.forEach(function (document) { return _this.context.documents._getPersistedDocument(document, response); });
            var responseMetadata = freeResources.getResources().find(function (resource) { return Resource.Util.hasType(resource, LDP.ResponseMetadata.RDF_CLASS); });
            if (!!responseMetadata)
                responseMetadata.resourcesMetadata.forEach(function (resourceMetadata) {
                    resourceMetadata.resource._etag = resourceMetadata.eTag;
                });
            return [token, response];
        });
    };
    Class.prototype.addTokenAuthenticationHeader = function (headers) {
        if (headers.has("authorization"))
            return;
        var header = new HTTP.Header.Class();
        headers.set("authorization", header);
        var authorization = "Token " + this._credentials.key;
        header.values.push(new HTTP.Header.Value(authorization));
    };
    Class.TOKEN_CONTAINER = "auth-tokens/";
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=TokenAuthenticator.js.map
