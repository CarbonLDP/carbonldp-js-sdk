"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = require("./../Errors");
var HTTP = require("./../HTTP");
var JSONLD = require("./../JSONLD");
var LDP = require("./../LDP");
var NS = require("./../NS");
var RDF = require("./../RDF");
var Resource = require("./../Resource");
var Utils = require("./../Utils");
var Authenticator_1 = require("./Authenticator");
var BasicAuthenticator_1 = require("./BasicAuthenticator");
var TokenCredentials = require("./TokenCredentials");
exports.TOKEN_CONTAINER = "auth-tokens/";
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(context) {
        var _this = _super.call(this) || this;
        _this.context = context;
        return _this;
    }
    Class.prototype.isAuthenticated = function () {
        return _super.prototype.isAuthenticated.call(this) && this.credentials.expirationTime > new Date();
    };
    Class.prototype.authenticate = function (tokenOrCredentials) {
        var _this = this;
        return this
            .getCredentials(tokenOrCredentials)
            .then(function (credentials) {
            if (Utils.isString(credentials.expirationTime))
                credentials.expirationTime = new Date(credentials.expirationTime);
            if (credentials.expirationTime <= new Date())
                throw new Errors.IllegalArgumentError("The token has already expired.");
            return _this.credentials = credentials;
        });
    };
    Class.prototype.getHeaderValue = function () {
        return new HTTP.Header.Value("Token " + this.credentials.key);
    };
    Class.prototype.getCredentials = function (tokenOrCredentials) {
        var _this = this;
        if (TokenCredentials.Factory.hasClassProperties(tokenOrCredentials))
            return Promise.resolve(tokenOrCredentials);
        var basicAuthenticator = new BasicAuthenticator_1.default();
        return basicAuthenticator
            .authenticate(tokenOrCredentials)
            .then(function () {
            var requestOptions = {};
            basicAuthenticator.addAuthentication(requestOptions);
            HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
            HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.RDFSource, requestOptions);
            var tokensURI = _this.context.auth._resolveSecurityURL(exports.TOKEN_CONTAINER);
            return HTTP.Request.Service.post(tokensURI, null, requestOptions, new JSONLD.Parser.Class());
        })
            .then(function (_a) {
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
            return token;
        })
            .catch(function (error) { return _this.context.documents._parseErrorResponse(error); });
    };
    return Class;
}(Authenticator_1.default));
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=TokenAuthenticator.js.map
