var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fragment = require("./Fragment");
var RDF = require("./RDF");
var Utils = require("./Utils");
var Factory = (function (_super) {
    __extends(Factory, _super);
    function Factory() {
        _super.apply(this, arguments);
    }
    Factory.prototype.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "slug"));
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
        var fragment = Fragment.factory.from(node, document);
        if (!this.hasClassProperties(fragment))
            this.injectBehavior(fragment, document);
        return fragment;
    };
    Factory.prototype.injectBehavior = function (fragment, document) {
        if (this.hasClassProperties(fragment))
            return fragment;
        Object.defineProperties(fragment, {
            "slug": {
                get: function () {
                    return RDF.URI.Util.getFragment(fragment.uri);
                },
                set: function (slug) {
                    this.uri = this.document.uri + "#" + slug;
                },
                enumerable: false,
            },
        });
        return fragment;
    };
    return Factory;
})(Fragment.Factory);
exports.Factory = Factory;
exports.factory = new Factory();

//# sourceMappingURL=NamedFragment.js.map
