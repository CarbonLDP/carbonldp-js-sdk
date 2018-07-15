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
var GeneralRegistry_1 = require("../GeneralRegistry/GeneralRegistry");
var LDP_1 = require("../LDP");
var Messaging_1 = require("../Messaging");
var ObjectSchema_1 = require("../ObjectSchema");
var QueryDocuments_1 = require("../QueryDocuments");
var Registry_1 = require("../Registry");
var SHACL_1 = require("../SHACL");
var System_1 = require("../System");
var AbstractContext_1 = require("./AbstractContext");
var GlobalContext = (function (_super) {
    __extends(GlobalContext, _super);
    function GlobalContext() {
        var _this = _super.call(this) || this;
        _this._baseURI = "";
        _this._generalObjectSchema = new ObjectSchema_1.DigestedObjectSchema();
        _this.registry = GeneralRegistry_1.GeneralRegistry.createFrom({ $context: _this, __modelDecorator: Registry_1.RegisteredPointer });
        _this._registerDefaultObjectSchemas();
        _this._registerDefaultDecorators();
        return _this;
    }
    GlobalContext.prototype._registerDefaultObjectSchemas = function () {
        this
            .extendObjectSchema(Document_1.Document.TYPE, Document_1.Document.SCHEMA)
            .extendObjectSchema(System_1.PlatformMetadata.TYPE, System_1.PlatformMetadata.SCHEMA)
            .extendObjectSchema(System_1.PlatformInstance.TYPE, System_1.PlatformInstance.SCHEMA)
            .extendObjectSchema(LDP_1.AddMemberAction.TYPE, LDP_1.AddMemberAction.SCHEMA)
            .extendObjectSchema(LDP_1.RemoveMemberAction.TYPE, LDP_1.RemoveMemberAction.SCHEMA)
            .extendObjectSchema(LDP_1.Error.TYPE, LDP_1.Error.SCHEMA)
            .extendObjectSchema(LDP_1.Map.TYPE, LDP_1.Map.SCHEMA)
            .extendObjectSchema(LDP_1.MapEntry.SCHEMA)
            .extendObjectSchema(LDP_1.DocumentMetadata.TYPE, LDP_1.DocumentMetadata.SCHEMA)
            .extendObjectSchema(LDP_1.ErrorResponse.TYPE, LDP_1.ErrorResponse.SCHEMA)
            .extendObjectSchema(LDP_1.ResponseMetadata.TYPE, LDP_1.ResponseMetadata.SCHEMA)
            .extendObjectSchema(LDP_1.ValidationError.TYPE, LDP_1.ValidationError.SCHEMA)
            .extendObjectSchema(SHACL_1.ValidationReport.TYPE, SHACL_1.ValidationReport.SCHEMA)
            .extendObjectSchema(SHACL_1.ValidationResult.TYPE, SHACL_1.ValidationResult.SCHEMA)
            .extendObjectSchema(QueryDocuments_1.QueryMetadata.TYPE, QueryDocuments_1.QueryMetadata.SCHEMA)
            .extendObjectSchema(Messaging_1.ChildCreated.TYPE, Messaging_1.ChildCreated.SCHEMA)
            .extendObjectSchema(Messaging_1.DocumentCreatedDetails.TYPE, Messaging_1.DocumentCreatedDetails.SCHEMA)
            .extendObjectSchema(Messaging_1.DocumentDeleted.TYPE, Messaging_1.DocumentDeleted.SCHEMA)
            .extendObjectSchema(Messaging_1.DocumentModified.TYPE, Messaging_1.DocumentModified.SCHEMA)
            .extendObjectSchema(Messaging_1.MemberAdded.TYPE, Messaging_1.MemberAdded.SCHEMA)
            .extendObjectSchema(Messaging_1.MemberAddedDetails.TYPE, Messaging_1.MemberAddedDetails.SCHEMA)
            .extendObjectSchema(Messaging_1.MemberRemoved.TYPE, Messaging_1.MemberRemoved.SCHEMA)
            .extendObjectSchema(Messaging_1.MemberRemovedDetails.TYPE, Messaging_1.MemberRemovedDetails.SCHEMA);
    };
    GlobalContext.prototype._registerDefaultDecorators = function () {
    };
    GlobalContext.instance = new GlobalContext();
    return GlobalContext;
}(AbstractContext_1.AbstractContext));
exports.GlobalContext = GlobalContext;

//# sourceMappingURL=GlobalContext.js.map
