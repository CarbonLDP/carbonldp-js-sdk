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
var AbstractContext_1 = require("./AbstractContext");
var Auth_1 = require("./Auth");
var Document_1 = require("./Document");
var LDP_1 = require("./LDP");
var Members_1 = require("./Members");
var Messaging_1 = require("./Messaging");
var ObjectSchema_1 = require("./ObjectSchema");
var Pointer_1 = require("./Pointer");
var ProtectedDocument_1 = require("./ProtectedDocument");
var Registry_1 = require("./Registry");
var SHACL_1 = require("./SHACL");
var QueryDocument_1 = require("./SPARQL/QueryDocument");
var System_1 = require("./System");
var GlobalContext = (function (_super) {
    __extends(GlobalContext, _super);
    function GlobalContext() {
        var _this = _super.call(this) || this;
        _this.repository = undefined;
        _this.auth = undefined;
        _this._baseURI = "";
        _this._parentContext = undefined;
        _this._generalObjectSchema = new ObjectSchema_1.DigestedObjectSchema();
        _this.registry = new Registry_1.RegistryService(Pointer_1.Pointer, _this);
        _this._registerDefaultObjectSchemas();
        _this._registerDefaultDecorators();
        return _this;
    }
    GlobalContext.prototype._registerDefaultObjectSchemas = function () {
        this
            .extendObjectSchema(Document_1.Document.TYPE, Document_1.Document.SCHEMA)
            .extendObjectSchema(ProtectedDocument_1.ProtectedDocument.TYPE, ProtectedDocument_1.ProtectedDocument.SCHEMA)
            .extendObjectSchema(System_1.PlatformMetadata.TYPE, System_1.PlatformMetadata.SCHEMA)
            .extendObjectSchema(System_1.PlatformInstance.TYPE, System_1.PlatformInstance.SCHEMA)
            .extendObjectSchema(Members_1.AddMemberAction.TYPE, Members_1.AddMemberAction.SCHEMA)
            .extendObjectSchema(Members_1.RemoveMemberAction.TYPE, Members_1.RemoveMemberAction.SCHEMA)
            .extendObjectSchema(LDP_1.Error.TYPE, LDP_1.Error.SCHEMA)
            .extendObjectSchema(LDP_1.Map.TYPE, LDP_1.Map.SCHEMA)
            .extendObjectSchema(LDP_1.MapEntry.SCHEMA)
            .extendObjectSchema(LDP_1.DocumentMetadata.TYPE, LDP_1.DocumentMetadata.SCHEMA)
            .extendObjectSchema(LDP_1.ErrorResponse.TYPE, LDP_1.ErrorResponse.SCHEMA)
            .extendObjectSchema(LDP_1.ResponseMetadata.TYPE, LDP_1.ResponseMetadata.SCHEMA)
            .extendObjectSchema(LDP_1.ValidationError.TYPE, LDP_1.ValidationError.SCHEMA)
            .extendObjectSchema(Auth_1.ACE.TYPE, Auth_1.ACE.SCHEMA)
            .extendObjectSchema(Auth_1.ACL.TYPE, Auth_1.ACL.SCHEMA)
            .extendObjectSchema(Auth_1.AuthenticatedUserInformationAccessor.TYPE, Auth_1.AuthenticatedUserInformationAccessor.SCHEMA)
            .extendObjectSchema(Auth_1.AuthenticatedUserMetadata.TYPE, Auth_1.AuthenticatedUserMetadata.SCHEMA)
            .extendObjectSchema(Auth_1.User.TYPE, Auth_1.User.SCHEMA)
            .extendObjectSchema(Auth_1.TokenCredentials.TYPE, Auth_1.TokenCredentials.SCHEMA)
            .extendObjectSchema(Auth_1.CredentialsSet.TYPE, Auth_1.CredentialsSet.SCHEMA)
            .extendObjectSchema(Auth_1.UsernameAndPasswordCredentials.TYPE, Auth_1.UsernameAndPasswordCredentials.SCHEMA)
            .extendObjectSchema(Auth_1.LDAPCredentials.TYPE, Auth_1.LDAPCredentials.SCHEMA)
            .extendObjectSchema(SHACL_1.ValidationReport.TYPE, SHACL_1.ValidationReport.SCHEMA)
            .extendObjectSchema(SHACL_1.ValidationResult.TYPE, SHACL_1.ValidationResult.SCHEMA)
            .extendObjectSchema(QueryDocument_1.QueryMetadata.TYPE, QueryDocument_1.QueryMetadata.SCHEMA)
            .extendObjectSchema(Messaging_1.AccessPointCreated.TYPE, Messaging_1.AccessPointCreated.SCHEMA)
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
        this.registry.documentDecorators
            .set(ProtectedDocument_1.ProtectedDocument.TYPE, ProtectedDocument_1.ProtectedDocument.decorate)
            .set(Auth_1.ACL.TYPE, Auth_1.ACL.decorate)
            .set(Auth_1.User.TYPE, Auth_1.User.decorate);
    };
    GlobalContext.instance = new GlobalContext();
    return GlobalContext;
}(AbstractContext_1.AbstractContext));
exports.GlobalContext = GlobalContext;

//# sourceMappingURL=GlobalContext.js.map
