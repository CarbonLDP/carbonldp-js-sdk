import { Document } from "../Document";
import {
	AddMemberAction,
	DocumentMetadata,
	Error,
	ErrorResponse,
	Map,
	MapEntry,
	RemoveMemberAction,
	ResponseMetadata,
	ValidationError
} from "../LDP";
import {
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
import {
	GeneralRegistry,
	RegisteredPointer
} from "../Registry";
import {
	ValidationReport,
	ValidationResult,
} from "../SHACL";
import { QueryMetadata } from "../QueryDocument";
import {
	PlatformInstance,
	PlatformMetadata,
} from "../System";
import { AbstractContext } from "./AbstractContext";


export class GlobalContext extends AbstractContext<RegisteredPointer, undefined, undefined> {
	static readonly instance:GlobalContext = new GlobalContext();

	readonly registry:GeneralRegistry<RegisteredPointer>;
	readonly repository:undefined;

	protected _baseURI:"" = "";

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

			.extendObjectSchema( ValidationReport.TYPE, ValidationReport.SCHEMA )
			.extendObjectSchema( ValidationResult.TYPE, ValidationResult.SCHEMA )

			.extendObjectSchema( QueryMetadata.TYPE, QueryMetadata.SCHEMA )

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
	}
}
