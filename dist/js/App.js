"use strict";

System.register(["./AbstractContext", "./NS", "./RDF", "./Utils"], function (_export, _context) {
    var AbstractContext, NS, RDF, Utils, _createClass, RDF_CLASS, SCHEMA, AppContext, Factory, factory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_AbstractContext2) {
            AbstractContext = _AbstractContext2.default;
        }, function (_NS) {
            NS = _NS;
        }, function (_RDF) {
            RDF = _RDF;
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

            _export("RDF_CLASS", RDF_CLASS = NS.CS.Class.Application);

            _export("RDF_CLASS", RDF_CLASS);

            _export("SCHEMA", SCHEMA = {
                "rootContainer": {
                    "@id": NS.CS.Predicate.rootContainer,
                    "@type": "@id"
                }
            });

            _export("SCHEMA", SCHEMA);

            _export("Context", AppContext = function (_AbstractContext) {
                _inherits(AppContext, _AbstractContext);

                function AppContext(parentContext, app) {
                    _classCallCheck(this, AppContext);

                    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppContext).call(this, parentContext));

                    _this.app = app;
                    _this.base = _this.getBase(_this.app);
                    return _this;
                }

                _createClass(AppContext, [{
                    key: "resolve",
                    value: function resolve(uri) {
                        if (RDF.URI.Util.isAbsolute(uri)) return uri;
                        var finalURI = this.parentContext.resolve(this.base);
                        return RDF.URI.Util.resolve(finalURI, uri);
                    }
                }, {
                    key: "getBase",
                    value: function getBase(resource) {
                        return resource.rootContainer.id;
                    }
                }]);

                return AppContext;
            }(AbstractContext));

            _export("Context", AppContext);

            _export("Factory", Factory = function () {
                function Factory() {
                    _classCallCheck(this, Factory);
                }

                _createClass(Factory, [{
                    key: "hasClassProperties",
                    value: function hasClassProperties(resource) {
                        return Utils.hasPropertyDefined(resource, "rootContainer");
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
//# sourceMappingURL=App.js.map
