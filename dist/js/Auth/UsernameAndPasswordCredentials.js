System.register([], function(exports_1) {
    var Class;
    return {
        setters:[],
        execute: function() {
            Class = (function () {
                function Class(username, password) {
                    this._username = username;
                    this._password = password;
                }
                Object.defineProperty(Class.prototype, "username", {
                    get: function () { return this._username; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Class.prototype, "password", {
                    get: function () { return this._password; },
                    enumerable: true,
                    configurable: true
                });
                ;
                return Class;
            })();
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

//# sourceMappingURL=UsernameAndPasswordCredentials.js.map
