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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __importStar(require("../Errors"));
var Errors_1 = require("../HTTP/Errors");
var Request_1 = require("../HTTP/Request");
var JSONLD_1 = require("../JSONLD");
var ResponseMetadata_1 = require("../LDP/ResponseMetadata");
var Document_1 = require("../RDF/Document");
var Node_1 = require("../RDF/Node");
var LDP_1 = require("../Vocabularies/LDP");
var Utils = __importStar(require("./../Utils"));
var Authenticator_1 = require("./Authenticator");
var BasicAuthenticator_1 = require("./BasicAuthenticator");
var TokenCredentials = __importStar(require("./TokenCredentials"));
exports.TOKEN_CONTAINER = "auth-tokens/";
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(context) {
        var _this = _super.call(this, context) || this;
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
    Class.prototype._getHeaderValue = function () {
        return "Token " + this.credentials.key;
    };
    Class.prototype.getCredentials = function (tokenOrCredentials) {
        var _this = this;
        if (TokenCredentials.Factory.hasClassProperties(tokenOrCredentials))
            return Promise.resolve(tokenOrCredentials);
        var basicAuthenticator = new BasicAuthenticator_1.BasicAuthenticator();
        return basicAuthenticator
            .authenticate(tokenOrCredentials)
            .then(function () {
            var requestOptions = {};
            basicAuthenticator.addAuthentication(requestOptions);
            Request_1.RequestUtils.setAcceptHeader("application/ld+json", requestOptions);
            Request_1.RequestUtils.setPreferredInteractionModel(LDP_1.LDP.RDFSource, requestOptions);
            var tokensURI = _this.context._resolvePath("system.security") + exports.TOKEN_CONTAINER;
            return Request_1.RequestService.post(tokensURI, null, requestOptions, new JSONLD_1.JSONLDParser());
        })
            .then(function (_a) {
            var expandedResult = _a[0], response = _a[1];
            var freeNodes = Node_1.RDFNode.getFreeNodes(expandedResult);
            var freeResources = _this.context.documents._getFreeResources(freeNodes);
            var tokenResources = freeResources.getResources().filter(function (resource) { return resource.hasType(TokenCredentials.RDF_CLASS); });
            if (tokenResources.length === 0)
                throw new Errors_1.BadResponseError("No '" + TokenCredentials.RDF_CLASS + "' was returned.", response);
            if (tokenResources.length > 1)
                throw new Errors_1.BadResponseError("Multiple '" + TokenCredentials.RDF_CLASS + "' were returned. ", response);
            var token = tokenResources[0];
            var userDocuments = Document_1.RDFDocument.getDocuments(expandedResult).filter(function (rdfDocument) { return rdfDocument["@id"] === token.user.id; });
            userDocuments.forEach(function (document) { return _this.context.documents._getPersistedDocument(document, response); });
            var responseMetadata = freeResources
                .getResources()
                .find(ResponseMetadata_1.ResponseMetadata.is);
            if (responseMetadata)
                responseMetadata
                    .documentsMetadata
                    .forEach(function (documentMetadata) {
                    var document = documentMetadata.relatedDocument;
                    document._eTag = documentMetadata.eTag;
                });
            return token;
        })
            .catch(function (error) { return _this.context.documents._parseErrorResponse(error); });
    };
    return Class;
}(Authenticator_1.Authenticator));
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=TokenAuthenticator.js.map
