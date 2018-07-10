import { Context } from "../Context";
import { JSONLDConverter } from "../JSONLD";
import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype,
	ModelTypeGuard
} from "../Model";
import {
	DigestedObjectSchema,
	ObjectSchemaUtils,
} from "../ObjectSchema";
import { Pointer } from "../Pointer";
import {
	RDFNode,
	URI
} from "../RDF";
import {
	GeneralRegistry,
	RegisteredPointer,
	Registry
} from "../Registry";
import { isObject } from "../Utils";
import { BaseResource } from "./BaseResource";


export interface Resource extends RegisteredPointer {
	types:string[];

	$registry:Registry<RegisteredPointer> | undefined;
	$slug:string;


	addType( type:string ):void;

	hasType( type:string ):boolean;

	removeType( type:string ):void;


	toJSON( registryOrKey:Context | string ):RDFNode;
}


function __getContext( registry:Registry<any> | GeneralRegistry<any> | undefined ):Context | undefined {
	if( ! registry ) return;
	if( "$context" in registry ) return registry.$context;

	return __getContext( registry.$registry );
}

function __resolveURI( resource:Resource, uri:string ):string {
	if( URI.isAbsolute( uri ) ) return uri;

	const context:Context | undefined = __getContext( resource.$registry );
	if( ! context || context.registry ) return uri;

	const schema:DigestedObjectSchema = context.registry.getGeneralSchema();
	return ObjectSchemaUtils.resolveURI( uri, schema, { vocab: true } );
}

export type ResourceFactory =
	& ModelPrototype<Resource, Pointer>
	& ModelDecorator<Resource, BaseResource>
	& ModelFactory<Resource>
	& ModelTypeGuard<Resource>
	;

export const Resource:ResourceFactory = {
	PROTOTYPE: {
		$registry: void 0,

		get types():string[] { return []; },

		get $slug( this:Resource ):string {
			if( URI.isBNodeID( this.$id ) ) return this.$id;
			return URI.getSlug( this.$id );
		},
		set $slug( this:Resource, slug:string ) {},


		addType( this:Resource, type:string ):void {
			type = __resolveURI( this, type );

			if( this.types.indexOf( type ) !== - 1 ) return;

			this.types.push( type );
		},

		hasType( this:Resource, type:string ):boolean {
			type = __resolveURI( this, type );
			return this.types.indexOf( type ) !== - 1;
		},

		removeType( this:Resource, type:string ):void {
			type = __resolveURI( this, type );

			const index:number = this.types.indexOf( type );
			if( index !== - 1 ) this.types.splice( index, 1 );
		},


		toJSON( this:Resource, contextOrKey?:Context | string ):RDFNode {
			const context:Context | undefined = typeof contextOrKey === "object" ?
				contextOrKey : __getContext( this.$registry );

			const generalSchema:DigestedObjectSchema = context ?
				context.registry.getGeneralSchema() : new DigestedObjectSchema();

			const resourceSchema:DigestedObjectSchema = context ?
				context.registry.getSchemaFor( this ) : new DigestedObjectSchema();

			const jsonldConverter:JSONLDConverter = context ?
				context.jsonldConverter : new JSONLDConverter();

			return jsonldConverter.expand( this, generalSchema, resourceSchema );
		},
	},

	isDecorated( object:object ):object is Resource {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( Resource.PROTOTYPE, object );
	},

	is( value:any ):value is Resource {
		return Pointer.is( value )
			&& Resource.isDecorated( value );
	},

	create<T extends object>( data?:T & BaseResource ):T & Resource {
		const clone:T = Object.assign( {}, data );
		return Resource.createFrom<T>( clone );
	},

	createFrom<T extends object>( object:T & BaseResource ):T & Resource {
		return Resource.decorate<T>( object );
	},

	decorate<T extends object>( object:T ):T & Resource {
		if( Resource.isDecorated( object ) ) return object;

		const resource:T & RegisteredPointer = ModelDecorator
			.decorateMultiple( object, RegisteredPointer );

		return ModelDecorator
			.definePropertiesFrom( Resource.PROTOTYPE, resource );
	},
};
