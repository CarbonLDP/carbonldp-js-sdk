"use strict";

System.register(["./Auth/BasicAuthenticator", "./Auth/Token", "./Auth/TokenAuthenticator", "./Auth/UsernameAndPasswordToken", "./Errors", "./Utils"], function (_export, _context) {
    var BasicAuthenticator, Token, TokenAuthenticator, UsernameAndPasswordToken, Errors, Utils, _createClass, Method, Class;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_AuthBasicAuthenticator) {
            BasicAuthenticator = _AuthBasicAuthenticator.default;
        }, function (_AuthToken) {
            Token = _AuthToken;
        }, function (_AuthTokenAuthenticator) {
            TokenAuthenticator = _AuthTokenAuthenticator.default;
        }, function (_AuthUsernameAndPasswordToken) {
            UsernameAndPasswordToken = _AuthUsernameAndPasswordToken.default;
        }, function (_Errors) {
            Errors = _Errors;
        }, function (_Utils) {
            Utils = _Utils;
        }],
        execute: function () {
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

            _export("BasicAuthenticator", BasicAuthenticator);

            _export("Token", Token);

            _export("TokenAuthenticator", TokenAuthenticator);

            _export("UsernameAndPasswordToken", UsernameAndPasswordToken);

            _export("Method", Method);

            (function (Method) {
                Method[Method["BASIC"] = 0] = "BASIC";
                Method[Method["TOKEN"] = 1] = "TOKEN";
            })(Method || _export("Method", Method = {}));

            _export("Class", Class = function () {
                function Class(context) {
                    _classCallCheck(this, Class);

                    this.method = null;
                    this.context = context;
                    this.authenticators = [];
                    this.authenticators.push(new TokenAuthenticator(this.context));
                    this.authenticators.push(new BasicAuthenticator());
                }

                _createClass(Class, [{
                    key: "isAuthenticated",
                    value: function isAuthenticated() {
                        var askParent = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
                        return this.authenticator && this.authenticator.isAuthenticated() || askParent && !!this.context.parentContext && this.context.parentContext.Auth.isAuthenticated();
                    }
                }, {
                    key: "authenticate",
                    value: function authenticate(usernameOrToken) {
                        var _this = this;

                        var password = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
                        return new Promise(function (resolve, reject) {
                            if (!usernameOrToken) throw new Errors.IllegalArgumentError("Either a username or an authenticationToken are required.");
                            var authenticationToken = undefined;

                            if (Utils.isString(usernameOrToken)) {
                                var username = usernameOrToken;
                                if (!password) throw new Errors.IllegalArgumentError("A password is required when providing a username.");
                                authenticationToken = new UsernameAndPasswordToken(username, password);
                            } else {
                                authenticationToken = usernameOrToken;
                            }

                            if (_this.authenticator) _this.clearAuthentication();
                            _this.authenticator = _this.getAuthenticator(authenticationToken);
                            resolve(_this.authenticator.authenticate(authenticationToken));
                        });
                    }
                }, {
                    key: "addAuthentication",
                    value: function addAuthentication(requestOptions) {
                        if (this.isAuthenticated(false)) {
                            this.authenticator.addAuthentication(requestOptions);
                        } else if (!!this.context.parentContext) {
                            this.context.parentContext.Auth.addAuthentication(requestOptions);
                        } else {
                            console.warn("There is no authentication to add to the request.");
                        }
                    }
                }, {
                    key: "clearAuthentication",
                    value: function clearAuthentication() {
                        if (!this.authenticator) return;
                        this.authenticator.clearAuthentication();
                        this.authenticator = null;
                    }
                }, {
                    key: "getAuthenticator",
                    value: function getAuthenticator(authenticationToken) {
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = this.authenticators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var authenticator = _step.value;
                                if (authenticator.supports(authenticationToken)) return authenticator;
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        throw new Errors.IllegalStateError("The configured authentication method isn\'t supported.");
                    }
                }]);

                return Class;
            }());

            _export("Class", Class);

            _export("default", Class);
        }
    };
});
//# sourceMappingURL=Auth.js.map
