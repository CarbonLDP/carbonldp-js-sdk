"use strict";

System.register(["./../HTTP/JSONParser"], function (_export, _context) {
    var JSONParser, _createClass, Class;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HTTPJSONParser) {
            JSONParser = _HTTPJSONParser.default;
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
                        var jsonParser = new JSONParser();
                        return jsonParser.parse(input).then(function (parsedObject) {
                            return parsedObject;
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
//# sourceMappingURL=ResultsParser.js.map
