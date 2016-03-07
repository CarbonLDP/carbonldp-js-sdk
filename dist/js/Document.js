/// <reference path="./../typings/typings.d.ts" />
System.register(["./Errors", "./Fragment", "./JSONLDConverter", "./NamedFragment", "./ObjectSchema", "./Pointer", "./RDF", "./Resource", "./Utils"], function(exports_1) {
    var Errors, Fragment, JSONLDConverter_1, NamedFragment, ObjectSchema, Pointer, RDF, Resource, Utils;
    var Factory;
    function hasPointer(id) {
        var document = this;
        if (!document.inScope(id))
            return false;
        return !!document.getFragment(id);
    }
    function getPointer(id) {
        var document = this;
        if (!document.inScope(id))
            return null;
        if (id === document.id)
            return document;
        var fragment = document.getFragment(id);
        fragment = !fragment ? document.createFragment(id) : fragment;
        return fragment;
    }
    function inScope(idOrPointer) {
        var document = this;
        var id = Pointer.Factory.is(idOrPointer) ? idOrPointer.id : idOrPointer;
        if (id === document.id)
            return true;
        if (RDF.URI.Util.isBNodeID(id))
            return true;
        if (RDF.URI.Util.isAbsolute(id) && RDF.URI.Util.isFragmentOf(id, document.id))
            return true;
        if (!RDF.URI.Util.isAbsolute(document.id) && !RDF.URI.Util.isAbsolute(id) && RDF.URI.Util.isFragmentOf(id, document.id))
            return true;
        return false;
    }
    function hasFragment(id) {
        var document = this;
        if (!document.inScope(id))
            return false;
        return !!document._fragmentsIndex.has(id);
    }
    function getFragment(id) {
        var document = this;
        if (!RDF.URI.Util.isBNodeID(id))
            return document.getNamedFragment(id);
        return document._fragmentsIndex.get(id);
    }
    function getNamedFragment(id) {
        var document = this;
        if (RDF.URI.Util.isBNodeID(id))
            throw new Errors.IllegalArgumentError("Named fragments can't have a id that starts with '_:'.");
        if (RDF.URI.Util.isAbsolute(id)) {
            if (!RDF.URI.Util.isFragmentOf(id, document.id))
                throw new Errors.IllegalArgumentError("The id is out of scope.");
            id = RDF.URI.Util.hasFragment(id) ? RDF.URI.Util.getFragment(id) : id;
        }
        else if (Utils.S.startsWith(id, "#"))
            id = id.substring(1);
        return document._fragmentsIndex.get(id);
    }
    function getFragments() {
        var document = this;
        return Utils.A.from(document._fragmentsIndex.values());
    }
    function createFragment(slug) {
        var document = this;
        var id;
        if (slug) {
            if (!RDF.URI.Util.isBNodeID(slug))
                return document.createNamedFragment(slug);
            id = slug;
            if (this._fragmentsIndex.has(id))
                return this.getFragment(id);
        }
        else {
            id = Fragment.Util.generateID();
        }
        var fragment = Fragment.factory.create(id, document);
        document._fragmentsIndex.set(id, fragment);
        return fragment;
    }
    function createNamedFragment(slug) {
        var document = this;
        if (RDF.URI.Util.isBNodeID(slug))
            throw new Errors.IllegalArgumentError("Named fragments can't have a slug that starts with '_:'.");
        if (RDF.URI.Util.isAbsolute(slug)) {
            if (!RDF.URI.Util.isFragmentOf(slug, document.id))
                throw new Errors.IllegalArgumentError("The slug is out of scope.");
            slug = RDF.URI.Util.hasFragment(slug) ? RDF.URI.Util.getFragment(slug) : slug;
        }
        else if (Utils.S.startsWith(slug, "#"))
            slug = slug.substring(1);
        if (document._fragmentsIndex.has(slug))
            throw new Errors.IDAlreadyInUseError("The slug provided is already being used by a fragment.");
        var fragment = NamedFragment.factory.create(slug, document);
        document._fragmentsIndex.set(slug, fragment);
        return fragment;
    }
    function removeFragment(fragmentOrSlug) {
        // TODO: FT
    }
    function toJSON(objectSchemaResolver, jsonldConverter) {
        if (objectSchemaResolver === void 0) { objectSchemaResolver = null; }
        if (jsonldConverter === void 0) { jsonldConverter = null; }
        jsonldConverter = !!jsonldConverter ? jsonldConverter : new JSONLDConverter_1.default();
        var resources = [];
        resources.push(this);
        resources = resources.concat(this.getFragments());
        var expandedResources = [];
        for (var _i = 0; _i < resources.length; _i++) {
            var resource = resources[_i];
            var digestedContext = objectSchemaResolver ? objectSchemaResolver.getSchemaFor(resource) : new ObjectSchema.DigestedObjectSchema();
            expandedResources.push(jsonldConverter.expand(resource, digestedContext, this));
        }
        var graph = {
            "@id": this.id,
            "@graph": expandedResources,
        };
        return JSON.stringify(graph);
    }
    return {
        setters:[
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (Fragment_1) {
                Fragment = Fragment_1;
            },
            function (JSONLDConverter_1_1) {
                JSONLDConverter_1 = JSONLDConverter_1_1;
            },
            function (NamedFragment_1) {
                NamedFragment = NamedFragment_1;
            },
            function (ObjectSchema_1) {
                ObjectSchema = ObjectSchema_1;
            },
            function (Pointer_1) {
                Pointer = Pointer_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (Resource_1) {
                Resource = Resource_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.hasClassProperties = function (documentResource) {
                    return (Utils.isObject(documentResource) &&
                        Utils.hasPropertyDefined(documentResource, "_fragmentsIndex") &&
                        Utils.hasFunction(documentResource, "hasFragment") &&
                        Utils.hasFunction(documentResource, "getFragment") &&
                        Utils.hasFunction(documentResource, "getNamedFragment") &&
                        Utils.hasFunction(documentResource, "getFragments") &&
                        Utils.hasFunction(documentResource, "createFragment") &&
                        Utils.hasFunction(documentResource, "createNamedFragment") &&
                        Utils.hasFunction(documentResource, "removeFragment") &&
                        Utils.hasFunction(documentResource, "toJSON"));
                };
                Factory.create = function (uri) {
                    if (uri === void 0) { uri = null; }
                    return this.createFrom({}, uri);
                };
                Factory.createFrom = function (object, uri) {
                    if (uri === void 0) { uri = null; }
                    if (!!uri && RDF.URI.Util.isBNodeID(uri))
                        throw new Errors.IllegalArgumentError("Documents cannot have a BNodeID as a uri.");
                    var resource = Resource.Factory.createFrom(object, uri);
                    var document = this.decorate(resource);
                    return document;
                };
                Factory.decorate = function (object) {
                    if (this.hasClassProperties(object))
                        return object;
                    Object.defineProperties(object, {
                        "_fragmentsIndex": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: new Map(),
                        },
                        "hasPointer": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: hasPointer,
                        },
                        "getPointer": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: getPointer,
                        },
                        "inScope": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: inScope,
                        },
                        "hasFragment": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: hasFragment,
                        },
                        "getFragment": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: getFragment,
                        },
                        "getNamedFragment": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: getNamedFragment,
                        },
                        "getFragments": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: getFragments,
                        },
                        "createFragment": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: createFragment,
                        },
                        "createNamedFragment": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: createNamedFragment,
                        },
                        "removeFragment": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: removeFragment,
                        },
                        "toJSON": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: toJSON,
                        },
                    });
                    return object;
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
        }
    }
});

//# sourceMappingURL=Document.js.map
