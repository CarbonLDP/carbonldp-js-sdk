/// <reference path="./../../typings/typings.d.ts" />
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Class;
    return {
        setters:[],
        execute: function() {
            Class = (function () {
                function Class() {
                }
                Class.prototype.parse = function (body) {
                    return new Promise(function (resolve, reject) {
                        resolve(body);
                    });
                };
                return Class;
            }());
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

//# sourceMappingURL=StringParser.js.map
