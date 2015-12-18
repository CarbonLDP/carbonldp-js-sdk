var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractContext_1 = require("./AbstractContext");
var RDF = require("./RDF");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(parentContext) {
        _super.call(this, parentContext);
    }
    Class.prototype.resolve = function (uri) {
        if (RDF.URI.Util.isAbsolute(uri))
            return uri;
        var finalURI = this.parentContext.resolve(this.parentContext.getSetting("platform.container"));
        return RDF.URI.Util.resolve(finalURI, uri);
    };
    return Class;
})(AbstractContext_1.default);
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Platform.js.map
