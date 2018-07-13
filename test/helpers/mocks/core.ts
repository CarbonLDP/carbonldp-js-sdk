import { AbstractContext } from "../../../src/Context/AbstractContext";
import { GeneralRepository } from "../../../src/GeneralRepository/GeneralRepository";
import { Document } from "../../../src/Document";
import { ModelDecorator } from "../../../src/Model";
import {
	DigestedObjectSchema,
	DigestedObjectSchemaProperty,
	ObjectSchema,
	ObjectSchemaDigester,
	ObjectSchemaUtils
} from "../../../src/ObjectSchema";
import { Pointer } from "../../../src/Pointer";
import { QueryableMetadata } from "../../../src/QueryDocuments";
import { GeneralRegistry, RegisteredPointer, Registry, RegistryService } from "../../../src/Registry";
import { BaseRegisteredPointer } from "../../../src/Registry/BaseRegisteredPointer";
import { BaseResolvablePointer } from "../../../src/Repository/BaseResolvablePointer";
import { ResolvablePointer } from "../../../src/Repository/ResolvablePointer";
import { ContextSettings } from "../../../src/Settings";
import * as Utils from "../../../src/Utils";


export function createMockDigestedSchema( values?:Partial<DigestedObjectSchema> ):DigestedObjectSchema {
	return Object.assign( new DigestedObjectSchema(), values );
}

export function createMockDigestedSchemaProperty( values?:Partial<DigestedObjectSchemaProperty> ):DigestedObjectSchemaProperty {
	return Object.assign( new DigestedObjectSchemaProperty(), values );
}

export function createMockQueryableMetadata( schema:ObjectSchema = {} ):QueryableMetadata {
	const digestedSchema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( schema );
	digestedSchema.properties.forEach( definition => ObjectSchemaUtils.resolveProperty( digestedSchema, definition, true ) );
	return new QueryableMetadata( digestedSchema );
}

export function createMockDocument<T extends {
	_registry?:Registry<any>,
	$id:string,
}>( data:T ):T & Document {
	const base:T & Pointer = Pointer.create( data );

	if( data._registry ) data._registry._addPointer( base );

	const doc:T & Document = Document.decorate( base );

	defineNonEnumerableProps( doc );
	doc._normalize();

	return doc;
}

export function defineNonEnumerableProps( object:object ):void {
	Object
		.keys( object )
		.filter( key => key.startsWith( "_" ) )
		.forEach( key => Object.defineProperty( object, key, { enumerable: false, configurable: true } ) )
	;

	Object
		.keys( object )
		.filter( key => Array.isArray( object[ key ] ) || Utils.isPlainObject( object[ key ] ) )
		.map( key => object[ key ] )
		.forEach( defineNonEnumerableProps )
	;
}


export function createMockRegistry<M extends Pointer, C extends AbstractContext<M, any>>( data?:{
	model?:ModelDecorator<M>,
	context?:C,
} ):RegistryService<M, C> {
	data = Object.assign( {}, data );

	const model:ModelDecorator<M> = data.model ?
		data.model : Pointer as any;

	const context:C = data.context ?
		data.context : createMockContext( { model } ) as C;

	return new RegistryService<M, C>( model, context );
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
