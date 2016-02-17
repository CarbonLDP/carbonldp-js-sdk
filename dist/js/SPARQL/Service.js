/// <reference path="./../../typings/typings.d.ts" />
System.register(["./../HTTP", "./../Utils", "./RawResultsParser"], function(exports_1) {
    var HTTP, Utils, RawResultsParser_1;
    var Class;
    return {
        setters:[
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (RawResultsParser_1_1) {
                RawResultsParser_1 = RawResultsParser_1_1;
            }],
        execute: function() {
            Class = (function () {
                function Class() {
                }
                Class.executeRawASKQuery = function (url, askQuery, options) {
                    if (options === void 0) { options = {}; }
                    options = Utils.extend(options, Class.defaultOptions);
                    HTTP.Request.Util.setAcceptHeader("application/sparql-results+json", options);
                    HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
                    return HTTP.Request.Service.post(url, askQuery, options, Class.resultsParser);
                };
                Class.executeRawSELECTQuery = function (url, selectQuery, options) {
                    if (options === void 0) { options = {}; }
                    options = Utils.extend(options, Class.defaultOptions);
                    HTTP.Request.Util.setAcceptHeader("application/sparql-results+json", options);
                    HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
                    return HTTP.Request.Service.post(url, selectQuery, options, Class.resultsParser);
                };
                Class.executeRawCONSTRUCTQuery = function (url, constructQuery, options) {
                    if (options === void 0) { options = {}; }
                    options = Utils.extend(options, Class.defaultOptions);
                    if (HTTP.Request.Util.getHeader("Accept", options) === null)
                        HTTP.Request.Util.setAcceptHeader("application/ld+json", options);
                    HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
                    return HTTP.Request.Service.post(url, constructQuery, options, Class.stringParser);
                };
                Class.executeRawDESCRIBEQuery = function (url, describeQuery, options) {
                    if (options === void 0) { options = {}; }
                    options = Utils.extend(options, Class.defaultOptions);
                    if (HTTP.Request.Util.getHeader("Accept", options) === null)
                        HTTP.Request.Util.setAcceptHeader("application/ld+json", options);
                    HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
                    return HTTP.Request.Service.post(url, describeQuery, options, Class.stringParser);
                };
                Class.defaultOptions = {};
                Class.resultsParser = new RawResultsParser_1.default();
                Class.stringParser = new HTTP.StringParser.Class();
                return Class;
            })();
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

//# sourceMappingURL=Service.js.map
