import {
	ACE,
	ACL,
	AuthenticatedUserInformationAccessor,
	AuthenticatedUserMetadata,
	CredentialsSet,
	LDAPCredentials,
	TokenCredentials,
	User,
	UsernameAndPasswordCredentials
} from "../Auth";
import { Document } from "../Document";
import {
	DocumentMetadata,
	Error,
	ErrorResponse,
	Map,
	MapEntry,
	ResponseMetadata,
	ValidationError
} from "../LDP";
import {
	AddMemberAction,
	RemoveMemberAction
} from "../Members";
import {
	AccessPointCreated,
	ChildCreated,
	DocumentCreatedDetails,
	DocumentDeleted,
	DocumentModified,
	MemberAdded,
	MemberAddedDetails,
	MemberRemoved,
	MemberRemovedDetails,
} from "../Messaging";
import { DigestedObjectSchema } from "../ObjectSchema";
import { ProtectedDocument } from "../ProtectedDocument";
import {
	GeneralRegistry,
	RegisteredPointer
} from "../Registry";
import {
	ValidationReport,
	ValidationResult,
} from "../SHACL";
import { QueryMetadata } from "../SPARQL/QueryDocument";
import {
	PlatformInstance,
	PlatformMetadata,
} from "../System";
import { AbstractContext } from "./AbstractContext";


export class GlobalContext extends AbstractContext<RegisteredPointer, undefined> {
	static readonly instance:GlobalContext = new GlobalContext();

	readonly registry:GeneralRegistry<RegisteredPointer>;
	readonly repository:undefined;
	readonly auth:undefined;

	protected _baseURI:"" = "";
	protected _parentContext:undefined;


	private constructor() {
		super();
		this._generalObjectSchema = new DigestedObjectSchema();
		this.registry = GeneralRegistry.createFrom( { $context: this, __modelDecorator: RegisteredPointer } );

		this._registerDefaultObjectSchemas();
		this._registerDefaultDecorators();
	}


	private _registerDefaultObjectSchemas():void {
		this
			.extendObjectSchema( Document.TYPE, Document.SCHEMA )
			.extendObjectSchema( ProtectedDocument.TYPE, ProtectedDocument.SCHEMA )

			.extendObjectSchema( PlatformMetadata.TYPE, PlatformMetadata.SCHEMA )
			.extendObjectSchema( PlatformInstance.TYPE, PlatformInstance.SCHEMA )

			.extendObjectSchema( AddMemberAction.TYPE, AddMemberAction.SCHEMA )
			.extendObjectSchema( RemoveMemberAction.TYPE, RemoveMemberAction.SCHEMA )

			.extendObjectSchema( Error.TYPE, Error.SCHEMA )
			.extendObjectSchema( Map.TYPE, Map.SCHEMA )
			.extendObjectSchema( MapEntry.SCHEMA )
			.extendObjectSchema( DocumentMetadata.TYPE, DocumentMetadata.SCHEMA )
			.extendObjectSchema( ErrorResponse.TYPE, ErrorResponse.SCHEMA )
			.extendObjectSchema( ResponseMetadata.TYPE, ResponseMetadata.SCHEMA )
			.extendObjectSchema( ValidationError.TYPE, ValidationError.SCHEMA )

			.extendObjectSchema( ACE.TYPE, ACE.SCHEMA )
			.extendObjectSchema( ACL.TYPE, ACL.SCHEMA )
			.extendObjectSchema( AuthenticatedUserInformationAccessor.TYPE, AuthenticatedUserInformationAccessor.SCHEMA )
			.extendObjectSchema( AuthenticatedUserMetadata.TYPE, AuthenticatedUserMetadata.SCHEMA )
			.extendObjectSchema( User.TYPE, User.SCHEMA )
			.extendObjectSchema( TokenCredentials.TYPE, TokenCredentials.SCHEMA )
			.extendObjectSchema( CredentialsSet.TYPE, CredentialsSet.SCHEMA )
			.extendObjectSchema( UsernameAndPasswordCredentials.TYPE, UsernameAndPasswordCredentials.SCHEMA )
			.extendObjectSchema( LDAPCredentials.TYPE, LDAPCredentials.SCHEMA )

			.extendObjectSchema( ValidationReport.TYPE, ValidationReport.SCHEMA )
			.extendObjectSchema( ValidationResult.TYPE, ValidationResult.SCHEMA )

			.extendObjectSchema( QueryMetadata.TYPE, QueryMetadata.SCHEMA )

			.extendObjectSchema( AccessPointCreated.TYPE, AccessPointCreated.SCHEMA )
			.extendObjectSchema( ChildCreated.TYPE, ChildCreated.SCHEMA )
			.extendObjectSchema( DocumentCreatedDetails.TYPE, DocumentCreatedDetails.SCHEMA )
			.extendObjectSchema( DocumentDeleted.TYPE, DocumentDeleted.SCHEMA )
			.extendObjectSchema( DocumentModified.TYPE, DocumentModified.SCHEMA )
			.extendObjectSchema( MemberAdded.TYPE, MemberAdded.SCHEMA )
			.extendObjectSchema( MemberAddedDetails.TYPE, MemberAddedDetails.SCHEMA )
			.extendObjectSchema( MemberRemoved.TYPE, MemberRemoved.SCHEMA )
			.extendObjectSchema( MemberRemovedDetails.TYPE, MemberRemovedDetails.SCHEMA )
		;
	}

	private _registerDefaultDecorators():void {
		this.registry
			.addDecorator( ProtectedDocument )
			.addDecorator( ACL )
			.addDecorator( User )
		;
	}
}
