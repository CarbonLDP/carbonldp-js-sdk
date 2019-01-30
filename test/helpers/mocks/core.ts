import { AbstractContext } from "../../../src/Context/AbstractContext";
import { ContextSettings } from "../../../src/Context/ContextSettings";

import { GeneralRegistry } from "../../../src/GeneralRegistry/GeneralRegistry";
import { GeneralRepository } from "../../../src/GeneralRepository/GeneralRepository";

import { ModelDecorator } from "../../../src/Model";

import { DigestedObjectSchema, DigestedObjectSchemaProperty } from "../../../src/ObjectSchema";

import { BaseRegisteredPointer } from "../../../src/Registry/BaseRegisteredPointer";
import { RegisteredPointer } from "../../../src/Registry/RegisteredPointer";

import { BaseResolvablePointer } from "../../../src/Repository/BaseResolvablePointer";
import { ResolvablePointer } from "../../../src/Repository/ResolvablePointer";


export function createMockDigestedSchema( values?:Partial<DigestedObjectSchema> ):DigestedObjectSchema {
	return Object.assign( new DigestedObjectSchema(), values );
}

export function createMockDigestedSchemaProperty( values?:Partial<DigestedObjectSchemaProperty> ):DigestedObjectSchemaProperty {
	return Object.assign( new DigestedObjectSchemaProperty(), values );
}

export function createMockContext<PARENT extends AbstractContext<any, any, any> | undefined = undefined>( data?:{
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
			super( data! && data!.parentContext! );

			const decorator:ModelDecorator<ResolvablePointer & RegisteredPointer, BaseResolvablePointer & BaseRegisteredPointer> = {
				isDecorated: ( object ):object is ResolvablePointer & RegisteredPointer =>
					ResolvablePointer.isDecorated( object ) &&
					RegisteredPointer.isDecorated( object )
				,
				decorate: ( object ) => ModelDecorator
					.decorateMultiple( object, RegisteredPointer, ResolvablePointer ),
			};

			this.registry = data && "registry" in data ?
				data.registry! :
				GeneralRegistry.create( {
					context: this,
					__modelDecorator: decorator,
				} );

			this.repository = data && "repository" in data ?
				data.repository! :
				GeneralRepository.create( { context: this } );

			this._baseURI = data && data.uri !== void 0 ? data.uri : "https://example.com/";
			if( data && data.settings ) this._settings = data.settings;

			if( data && data.generalSchema ) this._generalObjectSchema = data.generalSchema;
			if( data && data.schemasMap ) this._typeObjectSchemaMap = data.schemasMap;
		}

	};
}
