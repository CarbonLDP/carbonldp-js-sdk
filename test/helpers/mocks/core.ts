import { AbstractContext } from "../../../src/Context/AbstractContext";
import { Authenticator } from "../../../src/Auth";
import { ModelDecorator } from "../../../src/core";
import { Document } from "../../../src/Document";
import {
	DigestedObjectSchema,
	DigestedObjectSchemaProperty,
	ObjectSchema,
	ObjectSchemaDigester,
	ObjectSchemaUtils
} from "../../../src/ObjectSchema";
import { Pointer } from "../../../src/Pointer";
import {
	Registry,
	RegistryService
} from "../../../src/Registry";
import { ContextSettings } from "../../../src/Settings";
import { PartialMetadata } from "../../../src/SPARQL/QueryDocument";
import * as Utils from "../../../src/Utils";


export function createMockDigestedSchema( values?:Partial<DigestedObjectSchema> ):DigestedObjectSchema {
	return Object.assign( new DigestedObjectSchema(), values );
}

export function createMockDigestedSchemaProperty( values?:Partial<DigestedObjectSchemaProperty> ):DigestedObjectSchemaProperty {
	return Object.assign( new DigestedObjectSchemaProperty(), values );
}


export function createMockContext<M extends Pointer = Pointer, P extends AbstractContext<any, any> = undefined, A extends Authenticator<any> = undefined>( data:{
	uri?:string | boolean,
	settings?:ContextSettings | boolean,
	parentContext?:P | boolean,

	model?:ModelDecorator<M>,
	registry?:RegistryService<M, AbstractContext<M, P>>,
	auth?:A,

	generalSchema?:DigestedObjectSchema,
	schemasMap?:Map<string, DigestedObjectSchema>,
} = {} ):AbstractContext<M, P> {
	if( ! ("uri" in data) ) data.uri = true;
	if( ! ("settings" in data) ) data.settings = true;
	if( ! ("model" in data) ) data.model = Pointer as any;

	return new class extends AbstractContext<M, P> {
		auth:A;
		registry:RegistryService<M, AbstractContext<M, P>>;


		protected _baseURI:string;

		constructor() {
			super();

			if( data.generalSchema ) this._generalObjectSchema = data.generalSchema;
			if( data.schemasMap ) this._typeObjectSchemaMap = data.schemasMap;

			this._settings = data.settings === true ? {
					paths: {
						system: {
							slug: ".system/",
							paths: {
								security: {
									slug: "security/",
									paths: {
										roles: "roles/",
									},
								},
							},
						},
						users: {
							slug: "users/",
							paths: { me: "me/" },
						},
					},
				}
				: data.settings ? data.settings : void 0
			;

			this._baseURI = data.uri !== false ? data.uri === true ?
				"https://example.com/" : data.uri : "";

			if( data.parentContext ) this._parentContext = data.parentContext === true ?
				createMockContext<Pointer>() as P : data.parentContext;

			this.registry = data.registry ?
				data.registry : new RegistryService( data.model, this );

			if( data.auth ) this.auth = data.auth;
		}
	};
}


export function createMockPartialMetadata( schema:ObjectSchema = {} ):PartialMetadata {
	const digestedSchema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( schema );
	digestedSchema.properties.forEach( definition => ObjectSchemaUtils.resolveProperty( digestedSchema, definition, true ) );
	return new PartialMetadata( digestedSchema );
}

export function createMockDocument<T extends {
	_registry?:Registry<any>,
	id:string,
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
