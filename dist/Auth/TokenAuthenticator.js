"use strict";
var Errors = require("./../Errors");
var HTTP = require("./../HTTP");
var NS = require("./../NS");
var RDF = require("./../RDF");
var BasicAuthenticator_1 = require("./BasicAuthenticator");
var UsernameAndPasswordToken_1 = require("./UsernameAndPasswordToken");
var Token = require("./Token");
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
        if (Token.Factory.is(authenticationOrCredentials)) {
            this._credentials = authenticationOrCredentials;
            return new Promise(function (resolve, reject) {
                if (!_this.isAuthenticated()) {
                    _this.clearAuthentication();
                    throw new Errors.IllegalArgumentError("The token provided in not valid.");
                }
                resolve(_this._credentials);
            });
        }
        else {
            return this.basicAuthenticator.authenticate(authenticationOrCredentials)
                .then(function (credentials) {
                return _this.createToken();
            })
                .then(function (_a) {
                var token = _a[0], response = _a[1];
                _this._credentials = token;
                _this.basicAuthenticator.clearAuthentication();
                return _this._credentials;
            });
        }
    };
    Class.prototype.addAuthentication = function (requestOptions) {
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        this.addTokenAuthenticationHeader(headers);
        return requestOptions;
    };
    Class.prototype.clearAuthentication = function () {
        this._credentials = null;
    };
    Class.prototype.supports = function (authenticationToken) {
        return authenticationToken instanceof UsernameAndPasswordToken_1.default;
    };
    Class.prototype.createToken = function () {
        var _this = this;
        var uri = this.context.resolve(Class.TOKEN_CONTAINER);
        var requestOptions = {};
        this.basicAuthenticator.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.RDFSource, requestOptions);
        return HTTP.Request.Service.post(uri, null, requestOptions, new HTTP.JSONLDParser.Class()).then(function (_a) {
            var expandedResult = _a[0], response = _a[1];
            var expandedNodes = RDF.Document.Util.getResources(expandedResult);
            expandedNodes = expandedNodes.filter(Token.Factory.hasRDFClass);
            if (expandedNodes.length === 0)
                throw new HTTP.Errors.BadResponseError("No '" + Token.RDF_CLASS + "' was returned.", response);
            if (expandedNodes.length > 1)
                throw new HTTP.Errors.BadResponseError("Multiple '" + Token.RDF_CLASS + "' were returned. ", response);
            var expandedToken = expandedNodes[0];
            var token = Token.Factory.decorate({});
            var digestedSchema = _this.context.documents.getSchemaFor(expandedToken);
            _this.context.documents.jsonldConverter.compact(expandedToken, token, digestedSchema, _this.context.documents);
            return [token, response];
        });
    };
    Class.prototype.addTokenAuthenticationHeader = function (headers) {
        var header;
        if (headers.has("Authorization")) {
            header = headers.get("Authorization");
        }
        else {
            header = new HTTP.Header.Class();
            headers.set("Authorization", header);
        }
        var authorization = "Token " + this._credentials.key;
        header.values.push(new HTTP.Header.Value(authorization));
        return headers;
    };
    Class.TOKEN_CONTAINER = "auth-tokens/";
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=TokenAuthenticator.js.map
