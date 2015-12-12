/// <reference path="./../typings/tsd.d.ts" />
var Errors = require("./Errors");
var Fragment = require("./Fragment");
var NamedFragment = require("./NamedFragment");
var Pointer = require("./Pointer");
var RDF = require("./RDF");
var Utils = require("./Utils");
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
    var fragment = document.getFragment(id);
    fragment = !fragment ? document.createFragment(id) : fragment;
    return fragment;
}
function inScope(idOrPointer) {
    var document = this;
    var id = Pointer.Factory.is(idOrPointer) ? idOrPointer.uri : idOrPointer;
    if (id === document.uri)
        return false;
    // BNodes need to be already in the index to be in-scope
    if (RDF.URI.Util.isBNodeID(id) && !document._fragmentsIndex.has(id))
        return false;
    if (RDF.URI.Util.isAbsolute(id) && !RDF.URI.Util.isFragmentOf(id, document.uri))
        return false;
    return true;
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
        if (!RDF.URI.Util.isFragmentOf(id, document.uri))
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
        if (!RDF.URI.Util.isFragmentOf(slug, document.uri))
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
function toJSON() {
    var resources = [];
    resources.push(this);
    resources.push(this.getFragments());
    var toJSONFunctions = [];
    for (var _i = 0; _i < resources.length; _i++) {
        var resource = resources[_i];
        var toJSON_1 = null;
        if ("toJSON" in resource) {
            toJSONFunctions.push(resource.toJSON);
            delete resource.toJSON;
        }
        toJSONFunctions.push(toJSON_1);
    }
    var rdfDocument = {
        "@graph": resources
    };
    if (this.uri)
        rdfDocument["@id"] = this.id;
    var json = JSON.stringify(rdfDocument);
    for (var i = 0, length_1 = resources.length; i < length_1; i++) {
        if (toJSONFunctions[i] !== null)
            resources[i].toJSON = toJSONFunctions[i];
    }
    return json;
}
var Factory = (function () {
    function Factory() {
    }
    Factory.prototype.hasClassProperties = function (documentResource) {
        return (Utils.isObject(documentResource) &&
            Utils.hasPropertyDefined(documentResource, "_fragmentsIndex") &&
            Utils.hasPropertyDefined(documentResource, "uri") &&
            Utils.hasFunction(documentResource, "hasFragment") &&
            Utils.hasFunction(documentResource, "getFragment") &&
            Utils.hasFunction(documentResource, "getNamedFragment") &&
            Utils.hasFunction(documentResource, "getFragments") &&
            Utils.hasFunction(documentResource, "createFragment") &&
            Utils.hasFunction(documentResource, "createNamedFragment") &&
            Utils.hasFunction(documentResource, "removeFragment") &&
            Utils.hasFunction(documentResource, "toJSON"));
    };
    Factory.prototype.create = function (uri) {
        if (uri === void 0) { uri = null; }
        return this.createFrom({}, uri);
    };
    Factory.prototype.createFrom = function (object, uri) {
        if (uri === void 0) { uri = null; }
        var document = this.decorate(object);
        if (!!uri)
            document.uri = uri;
        return document;
    };
    Factory.prototype.decorate = function (object) {
        if (this.hasClassProperties(object))
            return object;
        Object.defineProperties(object, {
            "_fragmentsIndex": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: new Map(),
            },
            "uri": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: null,
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
    Factory.prototype.from = function (rdfDocuments) {
        if (!Utils.isArray(rdfDocuments))
            return this.singleFrom(rdfDocuments);
        var documents = [];
        for (var i = 0, length_2 = rdfDocuments.length; i < length_2; i++) {
            var rdfDocument = rdfDocuments[i];
            documents.push(this.singleFrom(rdfDocument));
        }
        return documents;
    };
    Factory.prototype.singleFrom = function (rdfDocument) {
        var documentResources = RDF.Document.Util.getDocumentResources(rdfDocument);
        if (documentResources.length > 1)
            throw new Errors.IllegalArgumentError("The RDFDocument contains more than one document resource.");
        if (documentResources.length === 0)
            throw new Errors.IllegalArgumentError("The RDFDocument doesn\'t contain a document resource.");
        var documentResource = RDF.Resource.factory.from(documentResources[0]);
        var document = this.decorate(documentResource);
        var fragmentResources = RDF.Document.Util.getBNodeResources(rdfDocument);
        for (var i = 0, length_3 = fragmentResources.length; i < length_3; i++) {
            var fragmentResource = fragmentResources[i];
            var fragment = Fragment.factory.from(fragmentResource, document);
            if (!fragment.uri)
                fragment.uri = Fragment.Util.generateID();
            document._fragmentsIndex.set(fragment.uri, fragment);
        }
        var namedFragmentResources = RDF.Document.Util.getFragmentResources(rdfDocument);
        for (var i = 0, length_4 = namedFragmentResources.length; i < length_4; i++) {
            var namedFragmentResource = namedFragmentResources[i];
            var namedFragment = NamedFragment.factory.from(namedFragmentResource, document);
            document._fragmentsIndex.set(RDF.URI.Util.getFragment(namedFragment.uri), namedFragment);
        }
        return document;
    };
    return Factory;
})();
exports.Factory = Factory;
exports.factory = new Factory();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Document;

//# sourceMappingURL=Document.js.map
