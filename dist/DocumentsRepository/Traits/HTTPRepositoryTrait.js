"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("../../Errors/IllegalArgumentError");
var GeneralRepository_1 = require("../../GeneralRepository/GeneralRepository");
var Request_1 = require("../../HTTP/Request");
var ModelDecorator_1 = require("../../Model/ModelDecorator");
var ResolvablePointer_1 = require("../../Repository/ResolvablePointer");
exports.HTTPRepositoryTrait = {
    PROTOTYPE: {
        $get: function (uri, requestOptions) {
            var _this = this;
            if (!this.$context.registry.inScope(uri, true))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
            var url = this.$context.getObjectSchema().resolveURI(uri, { base: true });
            if (this.$context.registry.hasPointer(url, true)) {
                var resource = this.$context.registry.getPointer(url, true);
                if (resource.$isResolved()) {
                    if (!requestOptions.ensureLatest)
                        return Promise.resolve(resource);
                    Request_1.RequestUtils.setIfNoneMatchHeader(resource.$eTag, requestOptions);
                }
            }
            return Request_1.RequestService
                .get(url, requestOptions)
                .then(function (response) {
                return _this._parseResponseData(response, url);
            });
        },
        $resolve: function (resource, requestOptions) {
            return this.$get(resource.$id, requestOptions);
        },
        $exists: function (uri, requestOptions) {
            if (!this.$context.registry.inScope(uri, true))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
            var url = this.$context.getObjectSchema().resolveURI(uri, { base: true });
            return Request_1.RequestService
                .head(url, requestOptions)
                .then(function () { return true; })
                .catch(function (error) {
                if ("response" in error && error.response.status === 404)
                    return false;
                return Promise.reject(error);
            });
        },
        $refresh: function (resource, requestOptions) {
            var _this = this;
            if (!ResolvablePointer_1.ResolvablePointer.is(resource))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The resource isn't a resolvable pointer."));
            if (!this.$context.registry.inScope(resource.$id, true))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + resource.$id + "\" is out of scope."));
            var url = this.$context.getObjectSchema().resolveURI(resource.$id, { base: true });
            return Request_1.RequestService
                .get(url, requestOptions)
                .then(function (response) {
                return _this._parseResponseData(response, url);
            })
                .catch(function (error) {
                if ("response" in error && error.response.status === 304)
                    return resource;
                return Promise.reject(error);
            });
        },
        $save: function (resource, requestOptions) {
            if (!ResolvablePointer_1.ResolvablePointer.is(resource))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The resource isn't a resolvable pointer."));
            if (!this.$context.registry.inScope(resource.$id, true))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + resource.$id + "\" is out of scope."));
            var url = this.$context.getObjectSchema().resolveURI(resource.$id, { base: true });
            if (!resource.$isDirty())
                return Promise.resolve(resource);
            var body = JSON.stringify(resource);
            return Request_1.RequestService
                .put(url, body, requestOptions)
                .then(function () { return resource; });
        },
        $saveAndRefresh: function (resource, requestOptions) {
            var _this = this;
            return this
                .$save(resource, requestOptions)
                .then(function () { return _this.$refresh(resource, requestOptions); });
        },
        $delete: function (uri, requestOptions) {
            var _this = this;
            if (!this.$context.registry.inScope(uri, true))
                return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
            var url = this.$context.getObjectSchema().resolveURI(uri, { base: true });
            return Request_1.RequestService
                .delete(url, requestOptions)
                .then(function () {
                _this.$context.registry.removePointer(url);
            });
        },
        _parseResponseData: function (response, id) {
            return __awaiter(this, void 0, void 0, function () {
                var resolvable;
                return __generator(this, function (_a) {
                    resolvable = this.$context.registry
                        .getPointer(id, true);
                    resolvable.$eTag = response.getETag();
                    resolvable.$_resolved = true;
                    return [2, resolvable];
                });
            });
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.HTTPRepositoryTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.HTTPRepositoryTrait.isDecorated(object))
            return;
        var resource = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, GeneralRepository_1.GeneralRepository);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.HTTPRepositoryTrait.PROTOTYPE, resource);
    },
};

//# sourceMappingURL=HTTPRepositoryTrait.js.map
