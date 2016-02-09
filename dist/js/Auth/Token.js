"use strict";

System.register(["./../NS", "./../Pointer", "./../Utils"], function (_export, _context) {
    var NS, Pointer, Utils, _createClass, RDF_CLASS, CONTEXT, Factory, factory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_NS) {
            NS = _NS;
        }, function (_Pointer) {
            Pointer = _Pointer;
        }, function (_Utils) {
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

            _export("RDF_CLASS", RDF_CLASS = NS.CS.Class.Token);

            _export("RDF_CLASS", RDF_CLASS);

            _export("CONTEXT", CONTEXT = {
                "key": {
                    "@id": NS.CS.Predicate.tokenKey,
                    "@type": NS.XSD.DataType.string
                },
                "expirationTime": {
                    "@id": NS.CS.Predicate.expirationTime,
                    "@type": NS.XSD.DataType.dateTime
                }
            });

            _export("CONTEXT", CONTEXT);

            _export("Factory", Factory = function () {
                function Factory() {
                    _classCallCheck(this, Factory);
                }

                _createClass(Factory, [{
                    key: "hasClassProperties",
                    value: function hasClassProperties(object) {
                        return Utils.isObject(object) && Utils.hasPropertyDefined(object, "key") && Utils.hasPropertyDefined(object, "expirationTime");
                    }
                }, {
                    key: "decorate",
                    value: function decorate(object) {
                        if (this.hasClassProperties(object)) return object;
                        return object;
                    }
                }, {
                    key: "hasRDFClass",
                    value: function hasRDFClass(pointerOrExpandedObject) {
                        var types = [];

                        if ("@type" in pointerOrExpandedObject) {
                            types = pointerOrExpandedObject["@type"];
                        } else if ("types" in pointerOrExpandedObject) {
                            var resource = pointerOrExpandedObject;
                            types = Pointer.Util.getIDs(resource.types);
                        }

                        return types.indexOf(RDF_CLASS) !== -1;
                    }
                }]);

                return Factory;
            }());

            _export("Factory", Factory);

            _export("factory", factory = new Factory());

            _export("factory", factory);
        }
    };
});
//# sourceMappingURL=Token.js.map
