import { AbstractContext } from "../../../src/Context/AbstractContext";
import { GeneralRegistry } from "../../../src/GeneralRegistry/GeneralRegistry";
import { GeneralRepository } from "../../../src/GeneralRepository/GeneralRepository";

import { ModelDecorator } from "../../../src/Model";

import {
	DigestedObjectSchema,
	DigestedObjectSchemaProperty,
	ObjectSchema,
	ObjectSchemaDigester,
	ObjectSchemaUtils
} from "../../../src/ObjectSchema";

import { QueryableMetadata } from "../../../src/QueryDocuments";

import { BaseRegisteredPointer } from "../../../src/Registry/BaseRegisteredPointer";
import { RegisteredPointer } from "../../../src/Registry/RegisteredPointer";

import { BaseResolvablePointer } from "../../../src/Repository/BaseResolvablePointer";
import { ResolvablePointer } from "../../../src/Repository/ResolvablePointer";

import { ContextSettings } from "../../../src/Context/ContextSettings";


export function createMockDigestedSchema( values?:Partial<DigestedObjectSchema> ):DigestedObjectSchema {
	return Object.assign( new DigestedObjectSchema(), values );
}

export function createMockDigestedSchemaProperty( values?:Partial<DigestedObjectSchemaProperty> ):DigestedObjectSchemaProperty {
	return Object.assign( new DigestedObjectSchemaProperty(), values );
}

export function createMockQueryableMetadata( schema:ObjectSchema = {} ):QueryableMetadata {
	const digestedSchema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( schema );
	digestedSchema.properties.forEach( definition => ObjectSchemaUtils._resolveProperty( digestedSchema, definition, true ) );
	return new QueryableMetadata( digestedSchema );
}


export function createMockContext<PARENT extends AbstractContext<any, any, any> = undefined>( data?:{
	parentContext?:PARENT;

	uri?:string;
	settings?:ContextSettings,

	registry?:GeneralRegistry<ResolvablePointer & RegisteredPointer>;
	repository?:GeneralRepository<ResolvablePointer>;

	generalSchema?:DigestedObjectSchema,
	schemasMap?:Map<string, DigestedObjectSchema>,
} ):AbstractContext<ResolvablePointer & RegisteredPointer, ResolvablePointer, PARENT> {
	return new class extends AbstractContext<ResolvablePointer & RegisteredPointer, ResolvablePointer, PARENT> {
		registry:GeneralRegistry<ResolvablePointer & RegisteredPointer>;
		repository:GeneralRepository<ResolvablePointer>;

		_baseURI:string;

		constructor() {
			super( data && data.parentContext );

			const decorator:ModelDecorator<ResolvablePointer & RegisteredPointer, BaseResolvablePointer & BaseRegisteredPointer> = {
				isDecorated: ( object ):object is ResolvablePointer & RegisteredPointer =>
					ResolvablePointer.isDecorated( object ) &&
					RegisteredPointer.isDecorated( object )
				,
				decorate: ( object ) => ModelDecorator
					.decorateMultiple( object, RegisteredPointer, ResolvablePointer ),
			};

			this.registry = data && "registry" in data ?
				data.registry :
				GeneralRegistry.create( {
					$context: this,
					__modelDecorator: decorator,
				} );

			this.repository = data && "repository" in data ?
				data.repository :
				GeneralRepository.create( { $context: this } );

			this._baseURI = data && data.uri !== void 0 ? data.uri : "https://example.com/";
			if( data && data.settings ) this._settings = data.settings;

			if( data && data.generalSchema ) this._generalObjectSchema = data.generalSchema;
			if( data && data.schemasMap ) this._typeObjectSchemaMap = data.schemasMap;
		}

	};
}
