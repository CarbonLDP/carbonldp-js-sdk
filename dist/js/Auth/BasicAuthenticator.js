"use strict";

System.register(["./../HTTP", "./../Errors", "./UsernameAndPasswordToken"], function (_export, _context) {
    var HTTP, Errors, UsernameAndPasswordToken, _createClass, Class;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HTTP) {
            HTTP = _HTTP;
        }, function (_Errors) {
            Errors = _Errors;
        }, function (_UsernameAndPasswordToken) {
            UsernameAndPasswordToken = _UsernameAndPasswordToken.default;
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

            _export("Class", Class = function () {
                function Class() {
                    _classCallCheck(this, Class);
                }

                _createClass(Class, [{
                    key: "isAuthenticated",
                    value: function isAuthenticated() {
                        return !!this.credentials;
                    }
                }, {
                    key: "authenticate",
                    value: function authenticate(authenticationToken) {
                        var _this = this;

                        if (authenticationToken === null) throw new Errors.IllegalArgumentError("The authenticationToken cannot be null.");
                        return new Promise(function (resolve, reject) {
                            if (!authenticationToken.username) throw new Errors.IllegalArgumentError("The username cannot be empty.");
                            if (!authenticationToken.password) throw new Errors.IllegalArgumentError("The password cannot be empty.");
                            _this.credentials = authenticationToken;
                            resolve();
                        });
                    }
                }, {
                    key: "addAuthentication",
                    value: function addAuthentication(requestOptions) {
                        if (!this.isAuthenticated()) throw new Errors.IllegalStateError("The authenticator isn't authenticated.");
                        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
                        this.addBasicAuthenticationHeader(headers);
                        return requestOptions;
                    }
                }, {
                    key: "clearAuthentication",
                    value: function clearAuthentication() {
                        this.credentials = null;
                    }
                }, {
                    key: "supports",
                    value: function supports(authenticationToken) {
                        return authenticationToken instanceof UsernameAndPasswordToken;
                    }
                }, {
                    key: "addBasicAuthenticationHeader",
                    value: function addBasicAuthenticationHeader(headers) {
                        var header = undefined;

                        if (headers.has("Authorization")) {
                            header = headers.get("Authorization");
                        } else {
                            header = new HTTP.Header.Class();
                            headers.set("Authorization", header);
                        }

                        var authorization = "Basic " + btoa(this.credentials.username + ":" + this.credentials.password);
                        header.values.push(new HTTP.Header.Value(authorization));
                        return headers;
                    }
                }]);

                return Class;
            }());

            _export("Class", Class);

            _export("default", Class);
        }
    };
});
//# sourceMappingURL=BasicAuthenticator.js.map
