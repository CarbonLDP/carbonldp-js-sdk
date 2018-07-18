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
var Document_1 = require("../Document/Document");
var GeneralRegistry_1 = require("../GeneralRegistry/GeneralRegistry");
var AddMemberAction_1 = require("../LDP/AddMemberAction");
var DocumentMetadata_1 = require("../LDP/DocumentMetadata");
var Error_1 = require("../LDP/Error");
var ErrorResponse_1 = require("../LDP/ErrorResponse");
var Map_1 = require("../LDP/Map");
var MapEntry_1 = require("../LDP/MapEntry");
var RemoveMemberAction_1 = require("../LDP/RemoveMemberAction");
var ResponseMetadata_1 = require("../LDP/ResponseMetadata");
var ValidationError_1 = require("../LDP/ValidationError");
var ChildCreated_1 = require("../Messaging/ChildCreated");
var DocumentCreatedDetails_1 = require("../Messaging/DocumentCreatedDetails");
var DocumentDeleted_1 = require("../Messaging/DocumentDeleted");
var DocumentModified_1 = require("../Messaging/DocumentModified");
var MemberAdded_1 = require("../Messaging/MemberAdded");
var MemberAddedDetails_1 = require("../Messaging/MemberAddedDetails");
var MemberRemoved_1 = require("../Messaging/MemberRemoved");
var MemberRemovedDetails_1 = require("../Messaging/MemberRemovedDetails");
var DigestedObjectSchema_1 = require("../ObjectSchema/DigestedObjectSchema");
var QueryMetadata_1 = require("../QueryDocuments/QueryMetadata");
var RegisteredPointer_1 = require("../Registry/RegisteredPointer");
var ValidationReport_1 = require("../SHACL/ValidationReport");
var ValidationResult_1 = require("../SHACL/ValidationResult");
var PlatformInstance_1 = require("../System/PlatformInstance");
var PlatformMetadata_1 = require("../System/PlatformMetadata");
var AbstractContext_1 = require("./AbstractContext");
var GlobalContext = (function (_super) {
    __extends(GlobalContext, _super);
    function GlobalContext() {
        var _this = _super.call(this) || this;
        _this._baseURI = "";
        _this._generalObjectSchema = new DigestedObjectSchema_1.DigestedObjectSchema();
        _this.registry = GeneralRegistry_1.GeneralRegistry.createFrom({ $context: _this, __modelDecorator: RegisteredPointer_1.RegisteredPointer });
        _this.__registerDefaultObjectSchemas();
        _this.__registerDefaultDecorators();
        return _this;
    }
    GlobalContext.prototype.__registerDefaultObjectSchemas = function () {
        this
            .extendObjectSchema(Document_1.Document.TYPE, Document_1.Document.SCHEMA)
            .extendObjectSchema(PlatformMetadata_1.PlatformMetadata.TYPE, PlatformMetadata_1.PlatformMetadata.SCHEMA)
            .extendObjectSchema(PlatformInstance_1.PlatformInstance.TYPE, PlatformInstance_1.PlatformInstance.SCHEMA)
            .extendObjectSchema(AddMemberAction_1.AddMemberAction.TYPE, AddMemberAction_1.AddMemberAction.SCHEMA)
            .extendObjectSchema(RemoveMemberAction_1.RemoveMemberAction.TYPE, RemoveMemberAction_1.RemoveMemberAction.SCHEMA)
            .extendObjectSchema(Error_1.Error.TYPE, Error_1.Error.SCHEMA)
            .extendObjectSchema(Map_1.Map.TYPE, Map_1.Map.SCHEMA)
            .extendObjectSchema(MapEntry_1.MapEntry.SCHEMA)
            .extendObjectSchema(DocumentMetadata_1.DocumentMetadata.TYPE, DocumentMetadata_1.DocumentMetadata.SCHEMA)
            .extendObjectSchema(ErrorResponse_1.ErrorResponse.TYPE, ErrorResponse_1.ErrorResponse.SCHEMA)
            .extendObjectSchema(ResponseMetadata_1.ResponseMetadata.TYPE, ResponseMetadata_1.ResponseMetadata.SCHEMA)
            .extendObjectSchema(ValidationError_1.ValidationError.TYPE, ValidationError_1.ValidationError.SCHEMA)
            .extendObjectSchema(ValidationReport_1.ValidationReport.TYPE, ValidationReport_1.ValidationReport.SCHEMA)
            .extendObjectSchema(ValidationResult_1.ValidationResult.TYPE, ValidationResult_1.ValidationResult.SCHEMA)
            .extendObjectSchema(QueryMetadata_1.QueryMetadata.TYPE, QueryMetadata_1.QueryMetadata.SCHEMA)
            .extendObjectSchema(ChildCreated_1.ChildCreated.TYPE, ChildCreated_1.ChildCreated.SCHEMA)
            .extendObjectSchema(DocumentCreatedDetails_1.DocumentCreatedDetails.TYPE, DocumentCreatedDetails_1.DocumentCreatedDetails.SCHEMA)
            .extendObjectSchema(DocumentDeleted_1.DocumentDeleted.TYPE, DocumentDeleted_1.DocumentDeleted.SCHEMA)
            .extendObjectSchema(DocumentModified_1.DocumentModified.TYPE, DocumentModified_1.DocumentModified.SCHEMA)
            .extendObjectSchema(MemberAdded_1.MemberAdded.TYPE, MemberAdded_1.MemberAdded.SCHEMA)
            .extendObjectSchema(MemberAddedDetails_1.MemberAddedDetails.TYPE, MemberAddedDetails_1.MemberAddedDetails.SCHEMA)
            .extendObjectSchema(MemberRemoved_1.MemberRemoved.TYPE, MemberRemoved_1.MemberRemoved.SCHEMA)
            .extendObjectSchema(MemberRemovedDetails_1.MemberRemovedDetails.TYPE, MemberRemovedDetails_1.MemberRemovedDetails.SCHEMA);
    };
    GlobalContext.prototype.__registerDefaultDecorators = function () {
    };
    GlobalContext.instance = new GlobalContext();
    return GlobalContext;
}(AbstractContext_1.AbstractContext));
exports.GlobalContext = GlobalContext;

//# sourceMappingURL=GlobalContext.js.map
