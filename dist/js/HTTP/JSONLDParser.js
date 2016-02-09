"use strict";

System.register(["jsonld", "./JSONParser"], function (_export, _context) {
    var jsonld, JSONParser, _createClass, Class;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_jsonld) {
            jsonld = _jsonld;
        }, function (_JSONParser) {
            JSONParser = _JSONParser.default;
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

            _export("Class", Class = function () {
                function Class() {
                    _classCallCheck(this, Class);
                }

                _createClass(Class, [{
                    key: "parse",
                    value: function parse(input) {
                        var _this = this;

                        var jsonParser = new JSONParser();
                        return jsonParser.parse(input).then(function (parsedObject) {
                            return _this.expandJSON(parsedObject);
                        });
                    }
                }, {
                    key: "expandJSON",
                    value: function expandJSON(parsedObject, options) {
                        return new Promise(function (resolve, reject) {
                            jsonld.expand(parsedObject, options, function (error, expanded) {
                                if (error) {
                                    throw error;
                                }

                                parsedObject = expanded;
                                resolve(expanded);
                            });
                        });
                    }
                }]);

                return Class;
            }());

            _export("Class", Class);

            _export("default", Class);
        }
    };
});
//# sourceMappingURL=JSONLDParser.js.map
