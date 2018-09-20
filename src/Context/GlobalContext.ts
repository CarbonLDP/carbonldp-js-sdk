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

import { ChildCreatedEvent } from "../Messaging/ChildCreatedEvent";
import { DocumentCreatedEventDetails } from "../Messaging/DocumentCreatedEventDetails";
import { DocumentDeletedEvent } from "../Messaging/DocumentDeletedEvent";
import { DocumentModifiedEvent } from "../Messaging/DocumentModifiedEvent";
import { MemberAddedEvent } from "../Messaging/MemberAddedEvent";
import { MemberAddedEventDetails } from "../Messaging/MemberAddedEventDetails";
import { MemberRemovedEvent } from "../Messaging/MemberRemovedEvent";
import { MemberRemovedEventDetails } from "../Messaging/MemberRemovedEventDetails";

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
		this.registry = GeneralRegistry.createFrom( { context: this, __modelDecorator: RegisteredPointer } );

		this.__registerDefaultObjectSchemas();
		this.__registerDefaultDecorators();
	}


	private __registerDefaultObjectSchemas():void {
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

			.extendObjectSchema( ChildCreatedEvent.TYPE, ChildCreatedEvent.SCHEMA )
			.extendObjectSchema( DocumentCreatedEventDetails.TYPE, DocumentCreatedEventDetails.SCHEMA )
			.extendObjectSchema( DocumentDeletedEvent.TYPE, DocumentDeletedEvent.SCHEMA )
			.extendObjectSchema( DocumentModifiedEvent.TYPE, DocumentModifiedEvent.SCHEMA )
			.extendObjectSchema( MemberAddedEvent.TYPE, MemberAddedEvent.SCHEMA )
			.extendObjectSchema( MemberAddedEventDetails.TYPE, MemberAddedEventDetails.SCHEMA )
			.extendObjectSchema( MemberRemovedEvent.TYPE, MemberRemovedEvent.SCHEMA )
			.extendObjectSchema( MemberRemovedEventDetails.TYPE, MemberRemovedEventDetails.SCHEMA )
		;
	}

	private __registerDefaultDecorators():void {
	}
}
