/// <reference path="./../../typings/typings.d.ts" />
System.register(["./../HTTP/JSONParser"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var JSONParser_1;
    var Class;
    return {
        setters:[
            function (JSONParser_1_1) {
                JSONParser_1 = JSONParser_1_1;
            }],
        execute: function() {
            Class = (function () {
                function Class() {
                }
                Class.prototype.parse = function (input) {
                    var jsonParser = new JSONParser_1.default();
                    return jsonParser.parse(input).then(function (parsedObject) {
                        return parsedObject;
                    });
                };
                return Class;
            }());
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

//# sourceMappingURL=RawResultsParser.js.map
