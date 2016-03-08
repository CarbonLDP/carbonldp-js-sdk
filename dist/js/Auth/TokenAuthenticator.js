System.register(["./../Errors", "./../HTTP", "./../NS", "./../RDF", "./BasicAuthenticator", "./UsernameAndPasswordToken", "./Token", "./TokenCredentials"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Errors, HTTP, NS, RDF, BasicAuthenticator_1, UsernameAndPasswordToken_1, Token, TokenCredentials;
    var Class;
    return {
        setters:[
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (NS_1) {
                NS = NS_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (BasicAuthenticator_1_1) {
                BasicAuthenticator_1 = BasicAuthenticator_1_1;
            },
            function (UsernameAndPasswordToken_1_1) {
                UsernameAndPasswordToken_1 = UsernameAndPasswordToken_1_1;
            },
            function (Token_1) {
                Token = Token_1;
            },
            function (TokenCredentials_1) {
                TokenCredentials = TokenCredentials_1;
            }],
        execute: function() {
            Class = (function () {
                function Class(context) {
                    if (context === null)
                        throw new Errors.IllegalArgumentError("context cannot be null");
                    this.context = context;
                    this.basicAuthenticator = new BasicAuthenticator_1.default();
                }
                Class.prototype.isAuthenticated = function () {
                    return !!this.credentials && this.credentials.token.expirationTime > new Date();
                };
                Class.prototype.authenticate = function (authenticationToken) {
                    var _this = this;
                    return this.basicAuthenticator.authenticate(authenticationToken).then(function (credentials) {
                        return _this.createToken();
                    }).then(function (_a) {
                        var token = _a[0], response = _a[1];
                        _this.credentials = new TokenCredentials.Class(token);
                        _this.basicAuthenticator.clearAuthentication();
                        return _this.credentials;
                    });
                };
                Class.prototype.addAuthentication = function (requestOptions) {
                    var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
                    this.addTokenAuthenticationHeader(headers);
                    return requestOptions;
                };
                Class.prototype.clearAuthentication = function () {
                    this.credentials = null;
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
                    var authorization = "Token " + this.credentials.token.key;
                    header.values.push(new HTTP.Header.Value(authorization));
                    return headers;
                };
                Class.TOKEN_CONTAINER = "auth-tokens/";
                return Class;
            }());
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

//# sourceMappingURL=TokenAuthenticator.js.map
