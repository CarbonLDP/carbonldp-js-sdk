"use strict";

System.register(["./../HTTP", "./../Utils", "./ResultsParser"], function (_export, _context) {
    var HTTP, Utils, ResultsParser, _createClass, Class;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HTTP) {
            HTTP = _HTTP;
        }, function (_Utils) {
            Utils = _Utils;
        }, function (_ResultsParser) {
            ResultsParser = _ResultsParser.default;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            Class = function () {
                function Class() {
                    _classCallCheck(this, Class);
                }

                _createClass(Class, null, [{
                    key: "executeSELECTQuery",
                    value: function executeSELECTQuery(url, selectQuery) {
                        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                        options = Utils.extend(options, Class.defaultOptions);
                        HTTP.Request.Util.setAcceptHeader("application/sparql-results+json", options);
                        HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
                        return HTTP.Request.Service.post(url, selectQuery, options, Class.parser);
                    }
                }]);

                return Class;
            }();

            _export("default", Class);

            Class.defaultOptions = {};
            Class.parser = new ResultsParser();
        }
    };
});
//# sourceMappingURL=Service.js.map
