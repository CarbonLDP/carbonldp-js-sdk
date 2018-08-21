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

			.extendObjectSchema( ChildCreated )
			.extendObjectSchema( DocumentCreatedDetails )
			.extendObjectSchema( DocumentDeleted )
			.extendObjectSchema( DocumentModified )
			.extendObjectSchema( MemberAdded )
			.extendObjectSchema( MemberAddedDetails )
			.extendObjectSchema( MemberRemoved )
			.extendObjectSchema( MemberRemovedDetails )
		;
	}

	private __registerDefaultDecorators():void {
	}
}
