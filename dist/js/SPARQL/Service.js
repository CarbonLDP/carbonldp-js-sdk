/// <reference path="./../../typings/tsd.d.ts" />
var HTTP = require("./../HTTP");
var Utils = require("./../Utils");
var ResultsParser_1 = require("./ResultsParser");
var Class = (function () {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Service.js.map
