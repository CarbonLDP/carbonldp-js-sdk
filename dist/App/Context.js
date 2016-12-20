"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractContext_1 = require("./../AbstractContext");
var Auth_1 = require("./Auth");
var RDF = require("./../RDF");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(parentContext, app) {
        var _this = _super.call(this, parentContext) || this;
        _this.auth = new Auth_1.default(_this);
        _this._app = app;
        _this.base = _this.getBase(_this.app);
        _this.documents.removePointer(app.rootContainer);
        app.rootContainer = _this.documents.getPointer(app.rootContainer.id);
        return _this;
    }
    Object.defineProperty(Class.prototype, "app", {
        get: function () { return this._app; },
        enumerable: true,
        configurable: true
    });
    ;
    Class.prototype.resolve = function (uri) {
        if (RDF.URI.Util.isAbsolute(uri))
            return uri;
        var finalURI = this.parentContext.resolve(this.base);
        return RDF.URI.Util.resolve(finalURI, uri);
    };
    Class.prototype.getBase = function (resource) {
        return resource.rootContainer.id;
    };
    return Class;
}(AbstractContext_1.default));
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Context.js.map
