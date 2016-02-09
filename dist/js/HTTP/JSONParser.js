System.register([], function(exports_1) {
    var Class;
    return {
        setters:[],
        execute: function() {
            Class = (function () {
                function Class() {
                }
                Class.prototype.parse = function (body) {
                    return new Promise(function (resolve, reject) {
                        try {
                            resolve(JSON.parse(body));
                        }
                        catch (error) {
                            // TODO: Handle SyntaxError
                            reject(error);
                        }
                    });
                };
                return Class;
            })();
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

//# sourceMappingURL=JSONParser.js.map
