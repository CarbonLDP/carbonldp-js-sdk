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
import { SetStoredQueryAction } from "../LDP/SetStoredQueryAction";
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


/**
 * Shared context used by every {@link CarbonLDP} context as its parent.
 *
 * This context contains the shared schemas of the Platform and all the
 * references to external resources.
 */
export class GlobalContext extends AbstractContext<RegisteredPointer, undefined, undefined> {
	/**
	 * Singleton instance of the {@link GlobalContext}.
	 * This exact instance is used as parent by every {@link CarbonLDP} instance.
	 */
	static readonly instance:GlobalContext = new GlobalContext();

	/**
	 * Registry that stores the external resources of any {@link CarbonLDP} instance.
	 */
	readonly registry:GeneralRegistry<RegisteredPointer>;
	/**
	 * Undefined repository since external resources cannot be fetched.
	 */
	readonly repository:undefined;

	protected _baseURI:"" = "";

	private constructor() {
		super( undefined );
		this._generalObjectSchema = new DigestedObjectSchema();
		this.registry = GeneralRegistry.createFrom( { context: this, __modelDecorator: RegisteredPointer } );

		this.__registerDefaultObjectSchemas();
		this.__registerDefaultDecorators();
	}


	private __registerDefaultObjectSchemas():void {
		this
			.extendObjectSchema( Document )

			.extendObjectSchema( PlatformMetadata )
			.extendObjectSchema( PlatformInstance )

			.extendObjectSchema( AddMemberAction )
			.extendObjectSchema( RemoveMemberAction )
			.extendObjectSchema( SetStoredQueryAction )

			.extendObjectSchema( Error )
			.extendObjectSchema( Map )
			.extendObjectSchema( MapEntry.SCHEMA )
			.extendObjectSchema( DocumentMetadata )
			.extendObjectSchema( ErrorResponse )
			.extendObjectSchema( ResponseMetadata )
			.extendObjectSchema( ValidationError )

			.extendObjectSchema( ValidationReport )
			.extendObjectSchema( ValidationResult )

			.extendObjectSchema( QueryMetadata )

			.extendObjectSchema( ChildCreatedEvent )
			.extendObjectSchema( DocumentCreatedEventDetails )
			.extendObjectSchema( DocumentDeletedEvent )
			.extendObjectSchema( DocumentModifiedEvent )
			.extendObjectSchema( MemberAddedEvent )
			.extendObjectSchema( MemberAddedEventDetails )
			.extendObjectSchema( MemberRemovedEvent )
			.extendObjectSchema( MemberRemovedEventDetails )
		;
	}

	private __registerDefaultDecorators():void {
	}
}
