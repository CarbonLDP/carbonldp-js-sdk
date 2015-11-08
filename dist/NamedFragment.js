var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fragment = require('./Fragment');
var RDF = require('./RDF');
var Utils = require('./Utils');
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
    Factory.prototype.injectBehavior = function (node) {
        var fragment = _super.prototype.injectBehavior.call(this, node);
        if (this.hasClassProperties(fragment))
            return fragment;
        Object.defineProperties(fragment, {
            'slug': {
                get: function () {
                    return RDF.URI.Util.getFragment(fragment.uri);
                },
                set: function (slug) {
                    this.uri = this.document.uri + '#' + slug;
                },
                enumerable: false
            }
        });
        return fragment;
    };
    Factory.prototype.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, 'slug'));
    };
    return Factory;
})(Fragment.Factory);
exports.Factory = Factory;
exports.factory = new Factory();
//# sourceMappingURL=NamedFragment.js.map