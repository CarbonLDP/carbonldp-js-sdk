/// <reference path="../../typings/typings.d.ts" />
System.register(["jsonld", "./JSONParser"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var jsonld, JSONParser_1;
    var Class;
    return {
        setters:[
            function (jsonld_1) {
                jsonld = jsonld_1;
            },
            function (JSONParser_1_1) {
                JSONParser_1 = JSONParser_1_1;
            }],
        execute: function() {
            Class = (function () {
                function Class() {
                }
                Class.prototype.parse = function (input) {
                    var _this = this;
                    var jsonParser = new JSONParser_1.default();
                    return jsonParser.parse(input).then(function (parsedObject) {
                        return _this.expandJSON(parsedObject);
                    });
                };
                Class.prototype.expandJSON = function (parsedObject, options) {
                    return new Promise(function (resolve, reject) {
                        jsonld.expand(parsedObject, options, function (error, expanded) {
                            if (error) {
                                // TODO: Handle jsonld.expand error
                                throw error;
                            }
                            parsedObject = expanded;
                            resolve(expanded);
                        });
                    });
                };
                return Class;
            }());
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

//# sourceMappingURL=JSONLDParser.js.map
