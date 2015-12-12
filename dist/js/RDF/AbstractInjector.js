var Utils = require("./../Utils");
var AbstractInjector = (function () {
    function AbstractInjector(RDF_CLASS, parentInjectors) {
        if (parentInjectors === void 0) { parentInjectors = []; }
        this._RDF_CLASS = RDF_CLASS;
        this.parentInjectors = parentInjectors;
    }
    Object.defineProperty(AbstractInjector.prototype, "RDF_CLASS", {
        get: function () {
            return this._RDF_CLASS;
        },
        enumerable: true,
        configurable: true
    });
    AbstractInjector.prototype.hasRDFClass = function (resource) {
        if (this.RDF_CLASS === null)
            return true;
        return resource.types.indexOf(this.RDF_CLASS) !== -1;
    };
    AbstractInjector.prototype.is = function (object) {
        for (var _i = 0, _a = this.parentInjectors; _i < _a.length; _i++) {
            var parentInjector = _a[_i];
            if (!parentInjector.is(object))
                return false;
        }
    };
    AbstractInjector.prototype.from = function (nodeOrNodes) {
        if (!Utils.isArray(nodeOrNodes))
            return this.singleFrom(nodeOrNodes);
        for (var _i = 0; _i < nodeOrNodes.length; _i++) {
            var node = nodeOrNodes[_i];
            this.singleFrom(node);
        }
        return nodeOrNodes;
    };
    AbstractInjector.prototype.singleFrom = function (node) {
        for (var _i = 0, _a = this.parentInjectors; _i < _a.length; _i++) {
            var parentInjector = _a[_i];
            parentInjector.from(node);
        }
        if (!this.hasClassProperties(node))
            this.injectBehavior(node);
        return node;
    };
    AbstractInjector.prototype.injectBehavior = function (node) {
        return node;
    };
    return AbstractInjector;
})();
exports.AbstractInjector = AbstractInjector;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AbstractInjector;

//# sourceMappingURL=AbstractInjector.js.map
