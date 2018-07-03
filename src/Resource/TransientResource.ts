import { ModelDecorator } from "../core";
import {
	DigestedObjectSchema,
	ObjectSchemaResolver,
	ObjectSchemaUtils,
} from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { URI } from "../RDF";
import {
	RegisteredPointer,
	Registry
} from "../Registry";
import {
	isObject,
	PickSelfProps
} from "../Utils";
import { BaseResource } from "./BaseResource";


export interface TransientResource extends RegisteredPointer {
	types:string[];


	addType( type:string ):void;

	hasType( type:string ):boolean;

	removeType( type:string ):void;
}


export interface TransientResourceFactory {
	isDecorated( object:object ):object is TransientResource;

	is( value:any ):value is TransientResource;


	create<T extends object>( data?:T & BaseResource ):T & TransientResource;

	createFrom<T extends object>( object:T & BaseResource ):T & TransientResource;

	decorate<T extends object>( object:T ):T & TransientResource;
}


function getSchemaResolver( registry:Registry<any> | undefined ):ObjectSchemaResolver | undefined {
	if( ! registry ) return;

	if( ObjectSchemaResolver.is( registry ) ) return registry;

	return getSchemaResolver( registry.$registry );
}

function resolveURI( resource:TransientResource, uri:string ):string {
	if( URI.isAbsolute( uri ) ) return uri;

	const registry:ObjectSchemaResolver | undefined = getSchemaResolver( resource._registry );
	if( ! registry ) return uri;

	const schema:DigestedObjectSchema = registry.getGeneralSchema();
	return ObjectSchemaUtils.resolveURI( uri, schema, { vocab: true } );
}

const PROTOTYPE:PickSelfProps<TransientResource, RegisteredPointer> = {
	get types():string[] { return []; },


	addType( this:TransientResource, type:string ):void {
		type = resolveURI( this, type );

		if( this.types.indexOf( type ) !== - 1 ) return;

		this.types.push( type );
	},

	hasType( this:TransientResource, type:string ):boolean {
		type = resolveURI( this, type );
		return this.types.indexOf( type ) !== - 1;
	},

	removeType( this:TransientResource, type:string ):void {
		type = resolveURI( this, type );

		const index:number = this.types.indexOf( type );
		if( index !== - 1 ) this.types.splice( index, 1 );
	},
};

export const TransientResource:TransientResourceFactory = {
	isDecorated( object:object ):object is TransientResource {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( PROTOTYPE, object );
	},

	is( value:any ):value is TransientResource {
		return Pointer.is( value )
			&& TransientResource.isDecorated( value );
	},

	create<T extends object>( data?:T & BaseResource ):T & TransientResource {
		const clone:T = Object.assign( {}, data );
		return TransientResource.createFrom<T>( clone );
	},

	createFrom<T extends object>( object:T & BaseResource ):T & TransientResource {
		return TransientResource.decorate<T>( object );
	},

	decorate<T extends object>( object:T ):T & TransientResource {
		if( TransientResource.isDecorated( object ) ) return object;

		const resource:T & RegisteredPointer = ModelDecorator
			.decorateMultiple( object, RegisteredPointer );

		return ModelDecorator
			.definePropertiesFrom( PROTOTYPE, resource );
	},
};
