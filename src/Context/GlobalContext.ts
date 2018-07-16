import { Document } from "../Document/Document";

import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";

import { AddMemberAction } from "../LDP/AddMemberAction";
import { DocumentMetadata } from "../LDP/DocumentMetadata";
import { Error } from "../LDP/Error";
import { ErrorResponse } from "../LDP/ErrorResponse";
import { Map } from "../LDP/Map";
import { MapEntry } from "../LDP/MapEntry";
import { RemoveMemberAction } from "../LDP/RemoveMemberAction";
import { ResponseMetadata } from "../LDP/ResponseMetadata";
import { ValidationError } from "../LDP/ValidationError";

import { ChildCreated } from "../Messaging/ChildCreated";
import { DocumentCreatedDetails } from "../Messaging/DocumentCreatedDetails";
import { DocumentDeleted } from "../Messaging/DocumentDeleted";
import { DocumentModified } from "../Messaging/DocumentModified";
import { MemberAdded } from "../Messaging/MemberAdded";
import { MemberAddedDetails } from "../Messaging/MemberAddedDetails";
import { MemberRemoved } from "../Messaging/MemberRemoved";
import { MemberRemovedDetails } from "../Messaging/MemberRemovedDetails";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";

import { QueryMetadata } from "../QueryDocuments/QueryMetadata";

import { RegisteredPointer } from "../Registry/RegisteredPointer";

import { ValidationReport } from "../SHACL/ValidationReport";
import { ValidationResult } from "../SHACL/ValidationResult";

import { PlatformInstance } from "../System/PlatformInstance";
import { PlatformMetadata } from "../System/PlatformMetadata";

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
