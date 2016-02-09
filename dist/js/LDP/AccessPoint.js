"use strict";

System.register(["./../NS", "./../Utils"], function (_export, _context) {
    var NS, Utils, _createClass, RDF_CLASS, SCHEMA, Factory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_NS) {
            NS = _NS;
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

            _export("RDF_CLASS", RDF_CLASS = NS.C.Class.AccessPoint);

            _export("RDF_CLASS", RDF_CLASS);

            _export("SCHEMA", SCHEMA = {
                "membershipResource": {
                    "@id": NS.LDP.Predicate.membershipResource,
                    "@type": "@id"
                }
            });

            _export("SCHEMA", SCHEMA);

            _export("Factory", Factory = function () {
                function Factory() {
                    _classCallCheck(this, Factory);
                }

                _createClass(Factory, [{
                    key: "hasClassProperties",
                    value: function hasClassProperties(resource) {
                        return Utils.hasPropertyDefined(resource, "membershipResource");
                    }
                }]);

                return Factory;
            }());

            _export("Factory", Factory);
        }
    };
});
//# sourceMappingURL=AccessPoint.js.map
