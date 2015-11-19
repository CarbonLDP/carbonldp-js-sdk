/// <reference path="./../typings/es6/es6.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fragment = require("./Fragment");
var NamedFragment = require("./NamedFragment");
var RDF = require("./RDF");
var Utils = require("./Utils");
var Errors = require("./Errors");
function hasFragment(id) {
    var document = this;
    id = RDF.URI.Util.hasFragment(id) ? RDF.URI.Util.getFragment(id) : id;
    return document._fragmentsIndex.has(id);
}
function getFragment(id) {
    var document = this;
    id = RDF.URI.Util.hasFragment(id) ? RDF.URI.Util.getFragment(id) : id;
    return document._fragmentsIndex.get(id);
}
function getNamedFragment(slug) {
    var document = this;
    if (RDF.URI.Util.isBNodeID(slug))
        throw new Errors.IllegalArgumentError("Named fragments can't have a slug that starts with '_:'.");
    slug = RDF.URI.Util.hasFragment(slug) ? RDF.URI.Util.getFragment(slug) : slug;
    return document._fragmentsIndex.get(slug);
}
function getFragments() {
    var document = this;
    return Utils.A.from(document._fragmentsIndex.values());
}
function createFragment(slug) {
    var document = this;
    if (slug)
        return document.createNamedFragment(slug);
    var id = Fragment.Util.generateID();
    var fragmentObject = {
        "@id": id,
        "document": document
    };
    var fragment = Fragment.factory.from(fragmentObject);
    document._fragmentsIndex.set(id, fragment);
    return fragment;
}
function createNamedFragment(slug) {
    var document = this;
    if (RDF.URI.Util.isBNodeID(slug))
        throw new Errors.IllegalArgumentError("Named fragments can't have a slug that starts with '_:'.");
    slug = RDF.URI.Util.hasFragment(slug) ? RDF.URI.Util.getFragment(slug) : slug;
    if (document._fragmentsIndex.has(slug))
        throw new Errors.IDAlreadyInUseError("The slug provided is already being used by a fragment.");
    var uri = document.uri + "#" + slug;
    var fragmentObject = {
        "@id": uri,
        "document": document
    };
    var fragment = NamedFragment.factory.from(fragmentObject);
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
    // TODO: FOR_OF_TYPEDEF
    /* tslint:disable: typedef */
    for (var _i = 0; _i < resources.length; _i++) {
        var resource = resources[_i];
        /* tslint:enable: typedef */
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
var Factory = (function (_super) {
    __extends(Factory, _super);
    function Factory() {
        _super.apply(this, arguments);
    }
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
        var document = this.injectBehavior(documentResources[0]);
        var fragmentResources = RDF.Document.Util.getBNodeResources(rdfDocument);
        for (var i = 0, length_3 = fragmentResources.length; i < length_3; i++) {
            var fragmentResource = fragmentResources[i];
            fragmentResource.document = document;
            var fragment = Fragment.factory.from(fragmentResource);
            if (!fragment.uri)
                fragment.uri = Fragment.Util.generateID();
            document._fragmentsIndex.set(fragment.uri, fragment);
        }
        var namedFragmentResources = RDF.Document.Util.getFragmentResources(rdfDocument);
        for (var i = 0, length_4 = namedFragmentResources.length; i < length_4; i++) {
            var namedFragmentResource = namedFragmentResources[i];
            namedFragmentResource.document = document;
            var namedFragment = NamedFragment.factory.from(namedFragmentResource);
            document._fragmentsIndex.set(RDF.URI.Util.getFragment(namedFragment.uri), namedFragment);
        }
        return document;
    };
    Factory.prototype.injectBehavior = function (resource) {
        var documentResource = _super.prototype.injectBehavior.call(this, resource);
        if (this.hasClassProperties(documentResource))
            return documentResource;
        Object.defineProperties(documentResource, {
            "_fragmentsIndex": {
                writable: false,
                enumerable: false,
                configurable: false,
                value: new Map()
            },
            "hasFragment": {
                writable: false,
                enumerable: false,
                configurable: false,
                value: hasFragment
            },
            "getFragment": {
                writable: false,
                enumerable: false,
                configurable: false,
                value: getFragment
            },
            "getNamedFragment": {
                writable: false,
                enumerable: false,
                configurable: false,
                value: getNamedFragment
            },
            "getFragments": {
                writable: false,
                enumerable: false,
                configurable: false,
                value: getFragments
            },
            "createFragment": {
                writable: false,
                enumerable: false,
                configurable: false,
                value: createFragment
            },
            "createNamedFragment": {
                writable: false,
                enumerable: false,
                configurable: false,
                value: createNamedFragment
            },
            "removeFragment": {
                writable: false,
                enumerable: false,
                configurable: false,
                value: removeFragment
            },
            "toJSON": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: toJSON
            }
        });
        return documentResource;
    };
    Factory.prototype.hasClassProperties = function (documentResource) {
        return (Utils.hasPropertyDefined(documentResource, "_fragmentsIndex"));
    };
    return Factory;
})(RDF.Resource.Factory);
exports.Factory = Factory;
exports.factory = new Factory();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Document;

//# sourceMappingURL=Document.js.map
