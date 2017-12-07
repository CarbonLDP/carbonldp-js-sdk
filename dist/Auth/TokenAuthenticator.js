"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = require("./../Errors");
var HTTP = require("./../HTTP");
var JSONLD = require("./../JSONLD");
var LDP = require("./../LDP");
var NS = require("./../NS");
var RDF = require("./../RDF");
var Resource = require("./../Resource");
var Utils = require("./../Utils");
var BasicAuthenticator_1 = require("./BasicAuthenticator");
var TokenCredentials = require("./TokenCredentials");
var UsernameAndPasswordToken = require("./UsernameAndPasswordToken");
exports.TOKEN_CONTAINER = "auth-tokens/";
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
    Class.prototype.authenticate = function (tokenOrCredentials) {
        var _this = this;
        if (tokenOrCredentials instanceof UsernameAndPasswordToken.Class)
            return this.basicAuthenticator.authenticate(tokenOrCredentials).then(function () {
                return _this.createToken();
            }).then(function (_a) {
                var tokenCredentials = _a[0];
                _this.basicAuthenticator.clearAuthentication();
                _this._credentials = tokenCredentials;
                return tokenCredentials;
            });
        var credentials = tokenOrCredentials;
        if (Utils.isString(credentials.expirationTime))
            tokenOrCredentials.expirationTime = new Date(credentials.expirationTime);
        if (credentials.expirationTime <= new Date())
            return Promise.reject(new Errors.IllegalArgumentError("The token has already expired."));
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
        var requestOptions = {};
        this.basicAuthenticator.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.RDFSource, requestOptions);
        return Promise.resolve().then(function () {
            var tokensURI = _this.context.resolveSystemURI(exports.TOKEN_CONTAINER);
            return HTTP.Request.Service.post(tokensURI, null, requestOptions, new JSONLD.Parser.Class());
        }).then(function (_a) {
            var expandedResult = _a[0], response = _a[1];
            var freeNodes = RDF.Node.Util.getFreeNodes(expandedResult);
            var freeResources = _this.context.documents._getFreeResources(freeNodes);
            var tokenResources = freeResources.getResources().filter(function (resource) { return Resource.Util.hasType(resource, TokenCredentials.RDF_CLASS); });
            if (tokenResources.length === 0)
                throw new HTTP.Errors.BadResponseError("No '" + TokenCredentials.RDF_CLASS + "' was returned.", response);
            if (tokenResources.length > 1)
                throw new HTTP.Errors.BadResponseError("Multiple '" + TokenCredentials.RDF_CLASS + "' were returned. ", response);
            var token = tokenResources[0];
            var userDocuments = RDF.Document.Util.getDocuments(expandedResult).filter(function (rdfDocument) { return rdfDocument["@id"] === token.user.id; });
            userDocuments.forEach(function (document) { return _this.context.documents._getPersistedDocument(document, response); });
            var responseMetadata = freeResources
                .getResources()
                .find(LDP.ResponseMetadata.Factory.is);
            if (responseMetadata)
                responseMetadata
                    .documentsMetadata
                    .forEach(function (documentMetadata) {
                    var document = documentMetadata.relatedDocument;
                    document._etag = documentMetadata.eTag;
                });
            return [token, response];
        }, function (response) { return _this.context.documents._parseErrorResponse(response); });
    };
    Class.prototype.addTokenAuthenticationHeader = function (headers) {
        if (headers.has("authorization"))
            return;
        var header = new HTTP.Header.Class();
        headers.set("authorization", header);
        var authorization = "Token " + this._credentials.key;
        header.values.push(new HTTP.Header.Value(authorization));
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=TokenAuthenticator.js.map
