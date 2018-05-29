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
var Document_1 = require("../Document");
var Errors_1 = require("../Errors");
var Errors_2 = require("../HTTP/Errors");
var JSONLD_1 = require("../JSONLD");
var LDP_1 = require("../LDP");
var ObjectSchema_1 = require("../ObjectSchema");
var RDF_1 = require("../RDF");
var Registry_1 = require("./Registry");
var RegistryService_1 = require("./RegistryService");
var DocumentsRegistry = (function (_super) {
    __extends(DocumentsRegistry, _super);
    function DocumentsRegistry(context) {
        return _super.call(this, Document_1.Document, context) || this;
    }
    DocumentsRegistry.prototype.register = function (id) {
        return this._register({ id: id });
    };
    DocumentsRegistry.prototype._register = function (base) {
        var document = _super.prototype._register.call(this, base);
        document._context = this._context;
        return document;
    };
    DocumentsRegistry.prototype._getLocalID = function (id) {
        if (RDF_1.URI.isBNodeID(id) || RDF_1.URI.hasFragment(id))
            return Registry_1.Registry.PROTOTYPE._getLocalID.call(this, id);
        return _super.prototype._getLocalID.call(this, id);
    };
    DocumentsRegistry.prototype._requestURLFor = function (pointer, uri) {
        if (uri && this._context) {
            var schema = this.getGeneralSchema();
            uri = ObjectSchema_1.ObjectSchemaUtils.resolveURI(uri, schema);
        }
        var id = uri ? RDF_1.URI.resolve(pointer.id, uri) : pointer.id;
        var localIRI = this._getLocalID(id);
        if (this._context)
            return RDF_1.URI.resolve(this._context.baseURI, localIRI);
        if (RDF_1.URI.isRelative(id))
            throw new Errors_1.IllegalArgumentError("\"" + id + "\" cannot be resolved.");
        return id;
    };
    DocumentsRegistry.prototype._parseErrorResponse = function (response) {
        var _this = this;
        if (!response || response instanceof Error)
            return Promise.reject(response);
        if (!(response.status >= 400 && response.status < 600 && Errors_2.statusCodeMap.has(response.status)))
            return Promise.reject(new Errors_2.UnknownError(response.data, response));
        var error = new (Errors_2.statusCodeMap.get(response.status))(response.data, response);
        if (!response.data)
            return Promise.reject(error);
        return new JSONLD_1.JSONLDParser()
            .parse(response.data)
            .then(function (freeNodes) {
            var freeResources = _this._parseFreeNodes(freeNodes);
            var errorResponses = freeResources
                .getPointers(true)
                .filter(LDP_1.ErrorResponse.is);
            if (errorResponses.length === 0)
                return Promise.reject(new Errors_1.IllegalArgumentError("The response string does not contains a c:ErrorResponse."));
            if (errorResponses.length > 1)
                return Promise.reject(new Errors_1.IllegalArgumentError("The response string contains multiple c:ErrorResponse."));
            Object.assign(error, errorResponses[0]);
            error.message = LDP_1.ErrorResponse.getMessage(error);
            return Promise.reject(error);
        }, function () {
            return Promise.reject(error);
        });
    };
    return DocumentsRegistry;
}(RegistryService_1.RegistryService));
exports.DocumentsRegistry = DocumentsRegistry;

//# sourceMappingURL=DocumentsRegistry.js.map
