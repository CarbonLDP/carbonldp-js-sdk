System.register(["./../HTTP", "./../Errors", "./UsernameAndPasswordToken"], function(exports_1) {
    var HTTP, Errors, UsernameAndPasswordToken_1;
    var Class;
    return {
        setters:[
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (UsernameAndPasswordToken_1_1) {
                UsernameAndPasswordToken_1 = UsernameAndPasswordToken_1_1;
            }],
        execute: function() {
            Class = (function () {
                function Class() {
                }
                Class.prototype.isAuthenticated = function () {
                    return !!this.credentials;
                };
                Class.prototype.authenticate = function (authenticationToken) {
                    var _this = this;
                    if (authenticationToken === null)
                        throw new Errors.IllegalArgumentError("The authenticationToken cannot be null.");
                    return new Promise(function (resolve, reject) {
                        if (!authenticationToken.username)
                            throw new Errors.IllegalArgumentError("The username cannot be empty.");
                        if (!authenticationToken.password)
                            throw new Errors.IllegalArgumentError("The password cannot be empty.");
                        _this.credentials = authenticationToken;
                        resolve();
                    });
                };
                Class.prototype.addAuthentication = function (requestOptions) {
                    if (!this.isAuthenticated())
                        throw new Errors.IllegalStateError("The authenticator isn't authenticated.");
                    var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
                    this.addBasicAuthenticationHeader(headers);
                    return requestOptions;
                };
                Class.prototype.clearAuthentication = function () {
                    this.credentials = null;
                };
                Class.prototype.supports = function (authenticationToken) {
                    return authenticationToken instanceof UsernameAndPasswordToken_1.default;
                };
                Class.prototype.addBasicAuthenticationHeader = function (headers) {
                    var header;
                    if (headers.has("Authorization")) {
                        header = headers.get("Authorization");
                    }
                    else {
                        header = new HTTP.Header.Class();
                        headers.set("Authorization", header);
                    }
                    var authorization = "Basic " + btoa(this.credentials.username + ":" + this.credentials.password);
                    header.values.push(new HTTP.Header.Value(authorization));
                    return headers;
                };
                return Class;
            })();
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

//# sourceMappingURL=BasicAuthenticator.js.map
