"use strict";

System.register(["../Utils"], function (_export, _context) {
    var Utils, _createClass, Factory, Util;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_Utils) {
            Utils = _Utils;
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

            _export("Factory", Factory = function () {
                function Factory() {
                    _classCallCheck(this, Factory);
                }

                _createClass(Factory, null, [{
                    key: "is",
                    value: function is(value) {
                        return !Utils.isNull(value) && Utils.isObject(value) && Utils.hasProperty(value, "@id");
                    }
                }, {
                    key: "create",
                    value: function create(uri) {
                        return {
                            "@id": uri
                        };
                    }
                }]);

                return Factory;
            }());

            _export("Factory", Factory);

            _export("Util", Util = function () {
                function Util() {
                    _classCallCheck(this, Util);
                }

                _createClass(Util, null, [{
                    key: "areEqual",
                    value: function areEqual(node1, node2) {
                        return node1["@id"] === node2["@id"];
                    }
                }]);

                return Util;
            }());

            _export("Util", Util);
        }
    };
});
//# sourceMappingURL=RDFNode.js.map
