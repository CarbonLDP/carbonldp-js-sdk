var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var Factory = (function (_super) {
    __extends(Factory, _super);
    function Factory() {
        _super.apply(this, arguments);
    }
    Factory.prototype.from = function (objects) {
        if (!Utils.isArray(objects))
            return this.singleFrom(objects);
        for (var i = 0, length_1 = objects.length; i < length_1; i++) {
            var object = objects[i];
            this.singleFrom(object);
        }
        return objects;
    };
    Factory.prototype.singleFrom = function (object) {
        return this.injectBehavior(object);
    };
    Factory.prototype.injectBehavior = function (object) {
        var fragment = _super.prototype.injectBehavior.call(this, object);
        if (this.hasClassProperties(fragment))
            return fragment;
        fragment._propertyAddedCallbacks.push(externalAnonymousFragmentFilter);
        var document = fragment.document;
        delete fragment.document;
        Object.defineProperties(fragment, {
            "document": {
                writable: false,
                enumerable: false,
                value: document
            }
        });
        return fragment;
    };
    Factory.prototype.hasClassProperties = function (resource) {
        return false;
    };
    return Factory;
})(RDF.Resource.Factory);
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
