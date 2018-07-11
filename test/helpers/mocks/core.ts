import { AbstractContext } from "../../../src/Context/AbstractContext";
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
import { PartialMetadata } from "../../../src/QueryDocument";
import {
	GeneralRegistry,
	RegisteredPointer,
	Registry,
	RegistryService
} from "../../../src/Registry";
import { ContextSettings } from "../../../src/Settings";
import * as Utils from "../../../src/Utils";


export function createMockDigestedSchema( values?:Partial<DigestedObjectSchema> ):DigestedObjectSchema {
	return Object.assign( new DigestedObjectSchema(), values );
}

export function createMockDigestedSchemaProperty( values?:Partial<DigestedObjectSchemaProperty> ):DigestedObjectSchemaProperty {
	return Object.assign( new DigestedObjectSchemaProperty(), values );
}

export function createMockPartialMetadata( schema:ObjectSchema = {} ):PartialMetadata {
	const digestedSchema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( schema );
	digestedSchema.properties.forEach( definition => ObjectSchemaUtils.resolveProperty( digestedSchema, definition, true ) );
	return new PartialMetadata( digestedSchema );
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

	generalSchema?:DigestedObjectSchema,
	schemasMap?:Map<string, DigestedObjectSchema>,
} ):AbstractContext<RegisteredPointer, undefined, PARENT> {
	return new class extends AbstractContext<RegisteredPointer, undefined, PARENT> {
		registry:GeneralRegistry<RegisteredPointer>;
		repository:undefined;

		_baseURI:string;

		constructor( parentContext?:PARENT ) {
			super( parentContext );

			this.registry = GeneralRegistry.create( { $context: this, __modelDecorator: RegisteredPointer } );

			this._baseURI = data && data.uri !== void 0 ? data.uri : "https://example.com/";
			if( data && data.settings ) this._settings = data.settings;

			if( data && data.generalSchema ) this._generalObjectSchema = data.generalSchema;
			if( data && data.schemasMap ) this._typeObjectSchemaMap = data.schemasMap;
		}

	}( data && data.parentContext );
}
