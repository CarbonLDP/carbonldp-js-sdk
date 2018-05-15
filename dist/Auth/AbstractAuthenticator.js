"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("../Errors");
var HTTP_1 = require("../HTTP");
var Errors_2 = require("../HTTP/Errors");
var JSONLD_1 = require("../JSONLD");
var RDF_1 = require("../RDF");
var Utils_1 = require("../Utils");
var Vocabularies_1 = require("../Vocabularies");
var User_1 = require("./User");
var AbstractAuthenticator = (function () {
    function AbstractAuthenticator(context) {
        this.context = context;
    }
    Object.defineProperty(AbstractAuthenticator.prototype, "authenticatedUser", {
        get: function () { return this._authenticatedUser; },
        enumerable: true,
        configurable: true
    });
    AbstractAuthenticator.prototype.isAuthenticated = function () {
        return !!this._credentials;
    };
    AbstractAuthenticator.prototype.clearAuthentication = function () {
        this._credentials = null;
        this._authenticatedUser = null;
    };
    AbstractAuthenticator.prototype.addAuthentication = function (requestOptions) {
        if (requestOptions.headers && requestOptions.headers.has("authorization"))
            return requestOptions;
        if (!this.isAuthenticated())
            throw new Errors_1.IllegalStateError("The authenticator isn't authenticated.");
        if (!requestOptions.headers)
            requestOptions.headers = new Map();
        var strAuthHeader = this._getHeaderValue();
        requestOptions.headers.set("authorization", new HTTP_1.Header([strAuthHeader]));
        return requestOptions;
    };
    AbstractAuthenticator.prototype.getAuthenticatedUser = function (requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        if (this._authenticatedUser)
            return Promise.resolve(this._authenticatedUser);
        return Utils_1.promiseMethod(function () {
            var metadataURI = _this.context._resolvePath("users.me");
            var localOptions = HTTP_1.RequestUtils.cloneOptions(requestOptions);
            _this.addAuthentication(localOptions);
            HTTP_1.RequestUtils.setAcceptHeader("application/ld+json", localOptions);
            HTTP_1.RequestUtils.setPreferredInteractionModel(Vocabularies_1.LDP.RDFSource, localOptions);
            localOptions.ensureLatest = true;
            return HTTP_1.RequestService
                .get(metadataURI, localOptions, new JSONLD_1.JSONLDParser())
                .catch(_this.context.registry._parseErrorResponse);
        }).then(function (_a) {
            var rdfData = _a[0], response = _a[1];
            var accessor = _this._parseRDFMetadata(rdfData, response, requestOptions);
            _this._authenticatedUser = accessor
                .authenticatedUserMetadata
                .user;
            return User_1.User
                .decorate(_this._authenticatedUser);
        });
    };
    AbstractAuthenticator.prototype._parseRDFMetadata = function (rdfData, response, requestOptions) {
        var metadataURI = this.context._resolvePath("users.me");
        var metadataRDFs = RDF_1.RDFDocument
            .getDocuments(rdfData)
            .filter(function (rdfDocument) { return rdfDocument["@id"] === metadataURI; });
        if (metadataRDFs.length !== 1)
            throw new Errors_2.BadResponseError("No correct cs:UserMetadata was returned.", response);
        var document = new JSONLD_1.JSONLDCompacter(this.context.registry)
            .compactDocument(metadataRDFs[0]);
        document._eTag = response.getETag();
        document._resolved = true;
        return document;
    };
    return AbstractAuthenticator;
}());
exports.AbstractAuthenticator = AbstractAuthenticator;

//# sourceMappingURL=AbstractAuthenticator.js.map
