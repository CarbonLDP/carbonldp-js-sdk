"use strict";

System.register(["./Fragment", "./RDF", "./Utils"], function (_export, _context) {
    var Fragment, RDF, Utils, _createClass, Factory, factory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_Fragment) {
            Fragment = _Fragment;
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

            _export("Factory", Factory = function () {
                function Factory() {
                    _classCallCheck(this, Factory);
                }

                _createClass(Factory, [{
                    key: "hasClassProperties",
                    value: function hasClassProperties(resource) {
                        return Utils.hasPropertyDefined(resource, "slug");
                    }
                }, {
                    key: "create",
                    value: function create(slug, document) {
                        return this.createFrom({}, slug, document);
                    }
                }, {
                    key: "createFrom",
                    value: function createFrom(object, slug, document) {
                        var uri = document.id + "#" + slug;
                        var fragment = Fragment.factory.createFrom(object, uri, document);
                        if (this.hasClassProperties(fragment)) return fragment;
                        Object.defineProperties(fragment, {
                            "slug": {
                                enumerable: false,
                                configurable: true,
                                get: function get() {
                                    return RDF.URI.Util.getFragment(fragment.id);
                                },
                                set: function set(value) {
                                    this.id = this.document.id + "#" + value;
                                }
                            }
                        });
                        return fragment;
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
//# sourceMappingURL=NamedFragment.js.map
