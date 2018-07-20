"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DocumentsRegistry_1 = require("../DocumentsRegistry/DocumentsRegistry");
var DocumentsRepository_1 = require("../DocumentsRepository/DocumentsRepository");
var IllegalStateError_1 = require("../Errors/IllegalStateError");
var MessagingService_1 = require("../Messaging/MessagingService");
var URI_1 = require("../RDF/URI");
var Utils_1 = require("../Utils");
var AbstractContext_1 = require("./AbstractContext");
var GlobalContext_1 = require("./GlobalContext");
var DocumentsContext = (function (_super) {
    __extends(DocumentsContext, _super);
    function DocumentsContext(url) {
        var _this = _super.call(this, GlobalContext_1.GlobalContext.instance) || this;
        _this._baseURI = url;
        _this.registry = DocumentsRegistry_1.DocumentsRegistry.createFrom({ context: _this });
        _this.repository = DocumentsRepository_1.DocumentsRepository.createFrom({ $context: _this });
        _this.messaging = new MessagingService_1.MessagingService(_this);
        return _this;
    }
    DocumentsContext.__mergePaths = function (target, source) {
        if (!source)
            return target;
        if (!target)
            return Utils_1.ObjectUtils.clone(source, { objects: true });
        for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
            var key = _a[_i];
            var sourcePath = source[key];
            if (sourcePath === null) {
                delete target[key];
                continue;
            }
            var targetPath = target[key];
            if (!targetPath) {
                target[key] = Utils_1.isObject(sourcePath) ?
                    Utils_1.ObjectUtils.clone(sourcePath, { objects: true }) :
                    sourcePath;
                continue;
            }
            if (Utils_1.isString(sourcePath)) {
                if (Utils_1.isObject(targetPath)) {
                    targetPath.slug = sourcePath;
                }
                else {
                    target[key] = sourcePath;
                }
                continue;
            }
            if (sourcePath.slug === void 0 && sourcePath.paths === void 0)
                continue;
            var targetDocPaths = Utils_1.isString(targetPath) ?
                target[key] = { slug: targetPath } : targetPath;
            if (sourcePath.slug !== void 0)
                targetDocPaths.slug = sourcePath.slug;
            if (sourcePath.paths !== void 0)
                targetDocPaths.paths = DocumentsContext.__mergePaths(targetDocPaths.paths, sourcePath.paths);
        }
        return target;
    };
    DocumentsContext.prototype._resolvePath = function (path) {
        var leftSearchedPaths = path.split(".");
        var currentSearchedPaths = [];
        var url = "";
        var documentPaths = this._settings && this._settings.paths;
        while (leftSearchedPaths.length) {
            var containerKey = leftSearchedPaths.shift();
            currentSearchedPaths.push(containerKey);
            var containerPath = documentPaths ? documentPaths[containerKey] : null;
            if (!containerPath)
                throw new IllegalStateError_1.IllegalStateError("The path \"" + currentSearchedPaths.join(".") + "\" hasn't been declared.");
            var slug = Utils_1.isString(containerPath) ? containerPath : containerPath.slug;
            if (!slug)
                throw new IllegalStateError_1.IllegalStateError("The path \"" + currentSearchedPaths.join(".") + "\" doesn't have a slug set.");
            url = URI_1.URI.resolve(url, slug);
            documentPaths = Utils_1.isObject(containerPath) ? containerPath.paths : null;
        }
        return this.resolve(url);
    };
    DocumentsContext.prototype._extendPaths = function (paths) {
        this._settings.paths = DocumentsContext.__mergePaths(this._settings.paths, paths);
    };
    DocumentsContext.prototype._extendsSettings = function (settings) {
        this._extendPaths(settings.paths);
        delete settings.paths;
        Utils_1.ObjectUtils.extend(this._settings, settings);
    };
    return DocumentsContext;
}(AbstractContext_1.AbstractContext));
exports.DocumentsContext = DocumentsContext;

//# sourceMappingURL=DocumentsContext.js.map
