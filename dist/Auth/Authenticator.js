"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("../Errors");
var HTTP_1 = require("../HTTP");
var Errors_2 = require("../HTTP/Errors");
var JSONLD_1 = require("../JSONLD");
var Document_1 = require("../RDF/Document");
var Utils_1 = require("../Utils");
var LDP_1 = require("../Vocabularies/LDP");
var Authenticator = (function () {
    function Authenticator(context) {
        this.context = context;
    }
    Authenticator.prototype.isAuthenticated = function () {
        return !!this.credentials;
    };
    Authenticator.prototype.clearAuthentication = function () {
        this.credentials = null;
        this.authenticatedUser = null;
    };
    Authenticator.prototype.addAuthentication = function (requestOptions) {
        if (!this.isAuthenticated())
            throw new Errors_1.IllegalStateError("The authenticator isn't authenticated.");
        var headers = requestOptions.headers ?
            requestOptions.headers : requestOptions.headers = new Map();
        if (headers.has("authorization"))
            return requestOptions;
        var strAuthHeader = this._getHeaderValue();
        headers.set("authorization", new HTTP_1.Header([strAuthHeader]));
        return requestOptions;
    };
    Authenticator.prototype.getAuthenticatedUser = function (requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        if (this.authenticatedUser)
            return Promise.resolve(this.authenticatedUser);
        return Utils_1.promiseMethod(function () {
            var metadataURI = _this.context._resolvePath("users.me");
            var localOptions = HTTP_1.RequestUtils.cloneOptions(requestOptions);
            _this.addAuthentication(localOptions);
            HTTP_1.RequestUtils.setAcceptHeader("application/ld+json", localOptions);
            HTTP_1.RequestUtils.setPreferredInteractionModel(LDP_1.LDP.RDFSource, localOptions);
            return HTTP_1.RequestService
                .get(metadataURI, localOptions, new JSONLD_1.JSONLDParser())
                .catch(function (response) { return _this.context.documents._parseErrorResponse(response); });
        }).then(function (_a) {
            var rdfData = _a[0], response = _a[1];
            var userMetadata = _this._parseRDFMetadata(rdfData, response);
            var localOptions = HTTP_1.RequestUtils.cloneOptions(requestOptions);
            _this.addAuthentication(localOptions);
            return userMetadata
                .authenticatedUser
                .user
                .resolve(localOptions);
        }).then(function (user) {
            return _this.authenticatedUser = user;
        });
    };
    Authenticator.prototype._parseRDFMetadata = function (rdfData, response) {
        var metadataURI = this.context._resolvePath("users.me");
        var metadataRDFs = Document_1.RDFDocument
            .getDocuments(rdfData)
            .filter(function (rdfDocument) { return rdfDocument["@id"] === metadataURI; });
        if (metadataRDFs.length !== 1)
            throw new Errors_2.BadResponseError("No correct cs:UserMetadata was returned.", response);
        return this.context.documents
            ._getPersistedDocument(metadataRDFs[0], response);
    };
    return Authenticator;
}());
exports.Authenticator = Authenticator;

//# sourceMappingURL=Authenticator.js.map
