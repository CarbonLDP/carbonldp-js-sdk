"use strict";

System.register(["./../Errors", "./../HTTP", "./../NS", "./../RDF", "./BasicAuthenticator", "./UsernameAndPasswordToken", "./Token"], function (_export, _context) {
    var Errors, HTTP, NS, RDF, BasicAuthenticator, UsernameAndPasswordToken, Token, _slicedToArray, _createClass, Class;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_Errors) {
            Errors = _Errors;
        }, function (_HTTP) {
            HTTP = _HTTP;
        }, function (_NS) {
            NS = _NS;
        }, function (_RDF) {
            RDF = _RDF;
        }, function (_BasicAuthenticator) {
            BasicAuthenticator = _BasicAuthenticator.default;
        }, function (_UsernameAndPasswordToken) {
            UsernameAndPasswordToken = _UsernameAndPasswordToken.default;
        }, function (_Token) {
            Token = _Token;
        }],
        execute: function () {
            _slicedToArray = function () {
                function sliceIterator(arr, i) {
                    var _arr = [];
                    var _n = true;
                    var _d = false;
                    var _e = undefined;

                    try {
                        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                            _arr.push(_s.value);

                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = true;
                        _e = err;
                    } finally {
                        try {
                            if (!_n && _i["return"]) _i["return"]();
                        } finally {
                            if (_d) throw _e;
                        }
                    }

                    return _arr;
                }

                return function (arr, i) {
                    if (Array.isArray(arr)) {
                        return arr;
                    } else if (Symbol.iterator in Object(arr)) {
                        return sliceIterator(arr, i);
                    } else {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance");
                    }
                };
            }();

            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("Class", Class = function () {
                function Class(context) {
                    _classCallCheck(this, Class);

                    if (context === null) throw new Errors.IllegalArgumentError("context cannot be null");
                    this.context = context;
                    this.basicAuthenticator = new BasicAuthenticator();
                }

                _createClass(Class, [{
                    key: "isAuthenticated",
                    value: function isAuthenticated() {
                        return !!this.token && this.token.expirationTime > new Date();
                    }
                }, {
                    key: "authenticate",
                    value: function authenticate(authenticationToken) {
                        var _this = this;

                        return this.basicAuthenticator.authenticate(authenticationToken).then(function () {
                            return _this.createToken();
                        }).then(function (_ref) {
                            var _ref2 = _slicedToArray(_ref, 2);

                            var token = _ref2[0];
                            var response = _ref2[1];
                            _this.token = token;
                        });
                    }
                }, {
                    key: "addAuthentication",
                    value: function addAuthentication(requestOptions) {
                        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
                        this.addTokenAuthenticationHeader(headers);
                        return requestOptions;
                    }
                }, {
                    key: "clearAuthentication",
                    value: function clearAuthentication() {
                        this.token = null;
                    }
                }, {
                    key: "supports",
                    value: function supports(authenticationToken) {
                        return authenticationToken instanceof UsernameAndPasswordToken;
                    }
                }, {
                    key: "createToken",
                    value: function createToken() {
                        var _this2 = this;

                        var uri = this.context.resolve(Class.TOKEN_CONTAINER);
                        var requestOptions = {};
                        this.basicAuthenticator.addAuthentication(requestOptions);
                        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
                        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.RDFSource, requestOptions);
                        return HTTP.Request.Service.post(uri, null, requestOptions, new HTTP.JSONLDParser.Class()).then(function (_ref3) {
                            var _ref4 = _slicedToArray(_ref3, 2);

                            var expandedResult = _ref4[0];
                            var response = _ref4[1];
                            var expandedNodes = RDF.Document.Util.getResources(expandedResult);
                            expandedNodes = expandedNodes.filter(Token.factory.hasRDFClass);
                            if (expandedNodes.length === 0) throw new HTTP.Errors.BadResponseError("No '" + Token.RDF_CLASS + "' was returned.", response);
                            if (expandedNodes.length > 1) throw new HTTP.Errors.BadResponseError("Multiple '" + Token.RDF_CLASS + "' were returned. ", response);
                            var expandedToken = expandedNodes[0];
                            var token = Token.factory.decorate({});

                            var digestedSchema = _this2.context.Documents.getSchemaFor(expandedToken);

                            _this2.context.Documents.jsonldConverter.compact(expandedToken, token, digestedSchema, _this2.context.Documents);

                            return [token, response];
                        });
                    }
                }, {
                    key: "addTokenAuthenticationHeader",
                    value: function addTokenAuthenticationHeader(headers) {
                        var header = undefined;

                        if (headers.has("Authorization")) {
                            header = headers.get("Authorization");
                        } else {
                            header = new HTTP.Header.Class();
                            headers.set("Authorization", header);
                        }

                        var authorization = "Token " + this.token.key;
                        header.values.push(new HTTP.Header.Value(authorization));
                        return headers;
                    }
                }]);

                return Class;
            }());

            _export("Class", Class);

            Class.TOKEN_CONTAINER = "auth-tokens/";

            _export("default", Class);
        }
    };
});
//# sourceMappingURL=TokenAuthenticator.js.map
