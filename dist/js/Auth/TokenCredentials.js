System.register([], function(exports_1) {
    var Class;
    return {
        setters:[],
        execute: function() {
            Class = (function () {
                function Class(token) {
                    this._token = token;
                }
                Object.defineProperty(Class.prototype, "token", {
                    get: function () { return this._token; },
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

//# sourceMappingURL=TokenCredentials.js.map
