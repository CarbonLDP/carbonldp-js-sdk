var Errors = require("./Errors");
var RDF = require("./RDF");
var Utils = require("./Utils");
function externalAnonymousFragmentFilter(propertyURI, value) {
    if (!RDF.Node.Factory.is(value))
        return;
    if (!RDF.URI.Util.isBNodeID(value["@id"]))
        return;
    if (!("document" in value))
        throw new Errors.IllegalArgumentError("The resource provided doesn't belong to a document.");
    var fragment = value;
    if (this.document !== fragment.document)
        throw new Errors.IllegalArgumentError("The anonymous fragment provided belongs to another document. To reference it from another document it needs to be named.");
}
var Factory = (function () {
    function Factory() {
    }
    Factory.prototype.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "document"));
    };
    Factory.prototype.create = function (idOrDocument, document) {
        if (document === void 0) { document = null; }
        return this.createFrom({}, idOrDocument, document);
    };
    Factory.prototype.createFrom = function (object, idOrDocument, document) {
        if (document === void 0) { document = null; }
        var id = !!document ? idOrDocument : Util.generateID();
        if (this.hasClassProperties(object))
            return object;
        Object.defineProperties(object, {
            "uri": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: id,
            },
            "document": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: document,
            },
        });
        return object;
    };
    Factory.prototype.from = function (nodeOrNodes, document) {
        if (!Utils.isArray(nodeOrNodes))
            return this.singleFrom(nodeOrNodes, document);
        for (var _i = 0; _i < nodeOrNodes.length; _i++) {
            var node = nodeOrNodes[_i];
            this.singleFrom(node, document);
        }
        return nodeOrNodes;
    };
    Factory.prototype.singleFrom = function (node, document) {
        var resource = RDF.Resource.factory.from(node);
        if (!this.hasClassProperties(resource))
            this.injectBehavior(resource, document);
        return node;
    };
    Factory.prototype.injectBehavior = function (object, document) {
        if (this.hasClassProperties(object))
            return object;
        object._propertyAddedCallbacks.push(externalAnonymousFragmentFilter);
        Object.defineProperties(object, {
            "document": {
                writable: false,
                enumerable: false,
                value: document,
            },
        });
        return object;
    };
    return Factory;
})();
exports.Factory = Factory;
exports.factory = new Factory();
var Util = (function () {
    function Util() {
    }
    Util.generateID = function () {
        return "_:" + Utils.UUID.generate();
    };
    return Util;
})();
exports.Util = Util;

//# sourceMappingURL=Fragment.js.map
