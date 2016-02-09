/// <reference path="./../../typings/typings.d.ts" />
System.register(["./../HTTP", "./../Utils", "./ResultsParser"], function(exports_1) {
    var HTTP, Utils, ResultsParser_1;
    var Class;
    return {
        setters:[
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (ResultsParser_1_1) {
                ResultsParser_1 = ResultsParser_1_1;
            }],
        execute: function() {
            Class = (function () {
                function Class() {
                }
                Class.executeSELECTQuery = function (url, selectQuery, options) {
                    if (options === void 0) { options = {}; }
                    options = Utils.extend(options, Class.defaultOptions);
                    HTTP.Request.Util.setAcceptHeader("application/sparql-results+json", options);
                    HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
                    return HTTP.Request.Service.post(url, selectQuery, options, Class.parser);
                };
                Class.defaultOptions = {};
                Class.parser = new ResultsParser_1.default();
                return Class;
            })();
            exports_1("default", Class);
        }
    }
});

//# sourceMappingURL=Service.js.map
