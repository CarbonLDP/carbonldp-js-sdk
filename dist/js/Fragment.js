"use strict";

System.register(["./Resource", "./Utils"], function (_export, _context) {
    var Resource, Utils, _createClass, Factory, factory, Util;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_Resource) {
            Resource = _Resource;
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

            _export("Factory", Factory = function () {
                function Factory() {
                    _classCallCheck(this, Factory);
                }

                _createClass(Factory, [{
                    key: "hasClassProperties",
                    value: function hasClassProperties(resource) {
                        return Utils.hasPropertyDefined(resource, "document");
                    }
                }, {
                    key: "create",
                    value: function create(idOrDocument) {
                        var document = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
                        return this.createFrom({}, idOrDocument, document);
                    }
                }, {
                    key: "createFrom",
                    value: function createFrom(object, idOrDocument) {
                        var document = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
                        var id = !!document ? idOrDocument : Util.generateID();
                        var resource = Resource.Factory.createFrom(object, id);
                        if (this.hasClassProperties(resource)) return resource;
                        Object.defineProperties(resource, {
                            "document": {
                                writable: false,
                                enumerable: false,
                                configurable: true,
                                value: document
                            }
                        });
                        return resource;
                    }
                }]);

                return Factory;
            }());

            _export("Factory", Factory);

            _export("factory", factory = new Factory());

            _export("factory", factory);

            _export("Util", Util = function () {
                function Util() {
                    _classCallCheck(this, Util);
                }

                _createClass(Util, null, [{
                    key: "generateID",
                    value: function generateID() {
                        return "_:" + Utils.UUID.generate();
                    }
                }]);

                return Util;
            }());

            _export("Util", Util);
        }
    };
});
//# sourceMappingURL=Fragment.js.map
