import { Context } from "../Context/Context";

import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";

import { JSONLDConverter } from "../JSONLD/JSONLDConverter";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactoryOptional } from "../Model/ModelFactoryOptional";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";

import { Pointer } from "../Pointer/Pointer";

import { RDFNode } from "../RDF/Node";
import { URI } from "../RDF/URI";

import { RegisteredPointer } from "../Registry/RegisteredPointer";
import { $Registry, Registry } from "../Registry/Registry";

import { isObject } from "../Utils";

import { BaseResource } from "./BaseResource";


/**
 * Interface that represents any resource in the SDK.
 */
export interface Resource extends RegisteredPointer {
	/**
	 * Types of the resource.
	 */
	types:string[];

	/**
	 * Optional associated registry of the resource.
	 */
	$registry:Registry<RegisteredPointer> | $Registry<RegisteredPointer> | undefined;
	/**
	 * Slug of the URI of the resource.
	 * Depending of the URI, the value returned would be:
	 * 1. For blank nodes the same $id of the resource would be returned
	 * 2. For named fragments, the content after the `#` symbol would be returned
	 * 3. For documents, it's the last part URI e.g. `https://example.com/resource-1/` => `resource-1`
	 */
	$slug:string;


	/**
	 * Adds a type to the current resource.
	 * @param type The type to be added.
	 */
	$addType( type:string ):void;

	/**
	 * Returns true if the current resource contains the type specified.
	 * @param type The type to look for.
	 */
	$hasType( type:string ):boolean;

	/**
	 * Remove the type specified from the current resource.
	 * @param type The type to be removed.
	 */
	$removeType( type:string ):void;


	/**
	 * Returns the JSON-LD Node representation of the current resource.
	 * @param contextOrKey A specific context to use for expand the data into JSON-LD Node instead of the internal one.
	 */
	toJSON( contextOrKey?:Context | string ):RDFNode;
}


function __getContext( registry:$Registry<any> | Registry<any> | GeneralRegistry<any> | undefined ):Context | undefined {
	if( ! registry ) return;
	if( "context" in registry && registry.context ) return registry.context;

	return __getContext( "$id" in registry ? registry.$registry : registry.registry );
}

function __resolveURI( resource:Resource, uri:string ):string {
	if( URI.isAbsolute( uri ) ) return uri;

	const context:Context | undefined = __getContext( resource.$registry );
	if( ! context ) return uri;

	return context
		.getObjectSchema()
		.resolveURI( uri, { vocab: true } );
}

/**
 * Factory, decorator and utils for {@link Resource}.
 */
export type ResourceFactory =
	& ModelPrototype<Resource, RegisteredPointer>
	& ModelDecorator<Resource, BaseResource>
	& ModelFactoryOptional<Resource>
	& ModelTypeGuard<Resource>
	;

/**
 * Constant with the factory, decorator and/or utils for a {@link Resource} object.
 */
export const Resource:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link Resource}
	 */
	PROTOTYPE: ResourceFactory["PROTOTYPE"];

	/**
	 * Checks if the Resource has the decorated properties and methods from its prototype.
	 */
	isDecorated( object:object ):object is Resource;

	/**
	 * Returns true when the value provided is considered to be a {@link Resource}.
	 */
	is( value:any ):value is Resource;

	/**
	 * Defines the Resource's prototype properties and methods to the Resource object.
	 */
	decorate<T extends object>( object:T &  BaseResource ):T & Resource;

	/**
	 * Creates a {@link Resource} with the provided data.
	 */
	create<T extends object>( data?:T & BaseResource ):T & Resource

	/**
	 * Creates a {@link Resource} from the provided Resource.
	 */
	createFrom<T extends object>( object:T & BaseResource ):T & Resource;
} = {
	PROTOTYPE: {
		get types():string[] { return []; },

		get $slug( this:Resource ):string {
			if( URI.isBNodeID( this.$id ) ) return this.$id;
			return URI.getSlug( this.$id );
		},
		set $slug( this:Resource, slug:string ) {},


		$addType( this:Resource, type:string ):void {
			type = __resolveURI( this, type );

			if( this.types.indexOf( type ) !== - 1 ) return;

			this.types.push( type );
		},

		$hasType( this:Resource, type:string ):boolean {
			type = __resolveURI( this, type );
			return this.types.indexOf( type ) !== - 1;
		},

		$removeType( this:Resource, type:string ):void {
			type = __resolveURI( this, type );

			const index:number = this.types.indexOf( type );
			if( index !== - 1 ) this.types.splice( index, 1 );
		},


		toJSON( this:Resource, contextOrKey?:Context | string ):RDFNode {
			const context:Context | undefined = typeof contextOrKey === "object" ?
				contextOrKey : __getContext( this.$registry );

			const generalSchema:DigestedObjectSchema = context ?
				context.registry.getGeneralSchema() : new DigestedObjectSchema();

			const resourceSchema:DigestedObjectSchema = context && context.registry ?
				context.registry.getSchemaFor( this ) : generalSchema;

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

	decorate<T extends BaseResource>( object:T ):T & Resource {
		if( Resource.isDecorated( object ) ) return object;

		if( ! object.hasOwnProperty( "$registry" ) ) object.$registry = void 0;

		const resource:T & RegisteredPointer = ModelDecorator
			.decorateMultiple( object as T & { $registry:undefined }, RegisteredPointer );

		return ModelDecorator
			.definePropertiesFrom( Resource.PROTOTYPE, resource );
	},
};
