"use strict";

System.register(["./Errors", "./Fragment", "./JSONLDConverter", "./NamedFragment", "./ObjectSchema", "./Pointer", "./RDF", "./Resource", "./Utils"], function (_export, _context) {
    var Errors, Fragment, JSONLDConverter, NamedFragment, ObjectSchema, Pointer, RDF, Resource, Utils, _createClass, Factory, factory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function hasPointer(id) {
        var document = this;
        if (!document.inScope(id)) return false;
        return !!document.getFragment(id);
    }

    function getPointer(id) {
        var document = this;
        if (!document.inScope(id)) return null;
        if (id === document.id) return document;
        var fragment = document.getFragment(id);
        fragment = !fragment ? document.createFragment(id) : fragment;
        return fragment;
    }

    function inScope(idOrPointer) {
        var document = this;
        var id = Pointer.Factory.is(idOrPointer) ? idOrPointer.id : idOrPointer;
        if (id === document.id) return true;
        if (RDF.URI.Util.isBNodeID(id)) return true;
        if (RDF.URI.Util.isAbsolute(id) && RDF.URI.Util.isFragmentOf(id, document.id)) return true;
        if (!RDF.URI.Util.isAbsolute(document.id) && !RDF.URI.Util.isAbsolute(id) && RDF.URI.Util.isFragmentOf(id, document.id)) return true;
        return false;
    }

    function hasFragment(id) {
        var document = this;
        if (!document.inScope(id)) return false;
        return !!document._fragmentsIndex.has(id);
    }

    function getFragment(id) {
        var document = this;
        if (!RDF.URI.Util.isBNodeID(id)) return document.getNamedFragment(id);
        return document._fragmentsIndex.get(id);
    }

    function getNamedFragment(id) {
        var document = this;
        if (RDF.URI.Util.isBNodeID(id)) throw new Errors.IllegalArgumentError("Named fragments can't have a id that starts with '_:'.");

        if (RDF.URI.Util.isAbsolute(id)) {
            if (!RDF.URI.Util.isFragmentOf(id, document.id)) throw new Errors.IllegalArgumentError("The id is out of scope.");
            id = RDF.URI.Util.hasFragment(id) ? RDF.URI.Util.getFragment(id) : id;
        } else if (Utils.S.startsWith(id, "#")) id = id.substring(1);

        return document._fragmentsIndex.get(id);
    }

    function getFragments() {
        var document = this;
        return Utils.A.from(document._fragmentsIndex.values());
    }

    function createFragment(slug) {
        var document = this;
        var id = undefined;

        if (slug) {
            if (!RDF.URI.Util.isBNodeID(slug)) return document.createNamedFragment(slug);
            id = slug;
            if (this._fragmentsIndex.has(id)) return this.getFragment(id);
        } else {
            id = Fragment.Util.generateID();
        }

        var fragment = Fragment.factory.create(id, document);

        document._fragmentsIndex.set(id, fragment);

        return fragment;
    }

    function createNamedFragment(slug) {
        var document = this;
        if (RDF.URI.Util.isBNodeID(slug)) throw new Errors.IllegalArgumentError("Named fragments can't have a slug that starts with '_:'.");

        if (RDF.URI.Util.isAbsolute(slug)) {
            if (!RDF.URI.Util.isFragmentOf(slug, document.id)) throw new Errors.IllegalArgumentError("The slug is out of scope.");
            slug = RDF.URI.Util.hasFragment(slug) ? RDF.URI.Util.getFragment(slug) : slug;
        } else if (Utils.S.startsWith(slug, "#")) slug = slug.substring(1);

        if (document._fragmentsIndex.has(slug)) throw new Errors.IDAlreadyInUseError("The slug provided is already being used by a fragment.");
        var fragment = NamedFragment.factory.create(slug, document);

        document._fragmentsIndex.set(slug, fragment);

        return fragment;
    }

    function removeFragment(fragmentOrSlug) {}

    function toJSON() {
        var objectSchemaResolver = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
        var jsonldConverter = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
        jsonldConverter = !!jsonldConverter ? jsonldConverter : new JSONLDConverter();
        var resources = [];
        resources.push(this);
        resources = resources.concat(this.getFragments());
        var expandedResources = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = resources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var resource = _step.value;
                var digestedContext = objectSchemaResolver ? objectSchemaResolver.getSchemaFor(resource) : new ObjectSchema.DigestedObjectSchema();
                expandedResources.push(jsonldConverter.expand(resource, digestedContext, this));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var graph = {
            "@id": this.id,
            "@graph": expandedResources
        };
        return JSON.stringify(graph);
    }

    return {
        setters: [function (_Errors) {
            Errors = _Errors;
        }, function (_Fragment) {
            Fragment = _Fragment;
        }, function (_JSONLDConverter) {
            JSONLDConverter = _JSONLDConverter.default;
        }, function (_NamedFragment) {
            NamedFragment = _NamedFragment;
        }, function (_ObjectSchema) {
            ObjectSchema = _ObjectSchema;
        }, function (_Pointer) {
            Pointer = _Pointer;
        }, function (_RDF) {
            RDF = _RDF;
        }, function (_Resource) {
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
                    value: function hasClassProperties(documentResource) {
                        return Utils.isObject(documentResource) && Utils.hasPropertyDefined(documentResource, "_fragmentsIndex") && Utils.hasFunction(documentResource, "hasFragment") && Utils.hasFunction(documentResource, "getFragment") && Utils.hasFunction(documentResource, "getNamedFragment") && Utils.hasFunction(documentResource, "getFragments") && Utils.hasFunction(documentResource, "createFragment") && Utils.hasFunction(documentResource, "createNamedFragment") && Utils.hasFunction(documentResource, "removeFragment") && Utils.hasFunction(documentResource, "toJSON");
                    }
                }, {
                    key: "create",
                    value: function create() {
                        var uri = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                        return this.createFrom({}, uri);
                    }
                }, {
                    key: "createFrom",
                    value: function createFrom(object) {
                        var uri = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
                        if (!!uri && RDF.URI.Util.isBNodeID(uri)) throw new Errors.IllegalArgumentError("Documents cannot have a BNodeID as a uri.");
                        var resource = Resource.Factory.createFrom(object, uri);
                        var document = this.decorate(resource);
                        return document;
                    }
                }, {
                    key: "decorate",
                    value: function decorate(object) {
                        if (this.hasClassProperties(object)) return object;
                        Object.defineProperties(object, {
                            "_fragmentsIndex": {
                                writable: false,
                                enumerable: false,
                                configurable: true,
                                value: new Map()
                            },
                            "hasPointer": {
                                writable: true,
                                enumerable: false,
                                configurable: true,
                                value: hasPointer
                            },
                            "getPointer": {
                                writable: true,
                                enumerable: false,
                                configurable: true,
                                value: getPointer
                            },
                            "inScope": {
                                writable: true,
                                enumerable: false,
                                configurable: true,
                                value: inScope
                            },
                            "hasFragment": {
                                writable: true,
                                enumerable: false,
                                configurable: true,
                                value: hasFragment
                            },
                            "getFragment": {
                                writable: true,
                                enumerable: false,
                                configurable: true,
                                value: getFragment
                            },
                            "getNamedFragment": {
                                writable: true,
                                enumerable: false,
                                configurable: true,
                                value: getNamedFragment
                            },
                            "getFragments": {
                                writable: true,
                                enumerable: false,
                                configurable: true,
                                value: getFragments
                            },
                            "createFragment": {
                                writable: true,
                                enumerable: false,
                                configurable: true,
                                value: createFragment
                            },
                            "createNamedFragment": {
                                writable: true,
                                enumerable: false,
                                configurable: true,
                                value: createNamedFragment
                            },
                            "removeFragment": {
                                writable: true,
                                enumerable: false,
                                configurable: true,
                                value: removeFragment
                            },
                            "toJSON": {
                                writable: true,
                                enumerable: false,
                                configurable: true,
                                value: toJSON
                            }
                        });
                        return object;
                    }
                }]);

                return Factory;
            }());

            _export("Factory", Factory);

            _export("factory", factory = new Factory());

            _export("factory", factory);

            _export("default", Document);
        }
    };
});
//# sourceMappingURL=Document.js.map
