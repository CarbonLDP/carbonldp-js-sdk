import { Context } from "../Context/Context";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelPrototype } from "../Model/ModelPrototype";

import { QueryablePointer } from "../QueryDocuments/QueryablePointer";

import { RDFNode } from "../RDF/Node";
import { URI } from "../RDF/URI";

import { C } from "../Vocabularies/C";

import { DigestedObjectSchema } from "./DigestedObjectSchema";
import { ObjectSchemaDigester } from "./ObjectSchemaDigester";


/**
 * Interface that defines the methods needed for an element that can provide object schemas.
 */
export interface ObjectSchemaResolver {
	/**
	 * Optional context where to obtain the contexts.
	 */
	context?:Context;


	/**
	 * Returns the general object schema that applies to all the resources.
	 */
	getGeneralSchema():DigestedObjectSchema;

	// TODO: Remove path param
	/**
	 * Returns true if the object provided has an specific schema for.
	 * @param object The object to check if it has any associated schema.
	 * @param path
	 */
	hasSchemaFor( object:object, path?:string ):boolean;

	// TODO: Remove path param
	/**
	 * Returns the specific object schema that applies to the object provided.
	 * @param object The object to look for its associated schema.
	 * @param path
	 */
	getSchemaFor( object:object, path?:string ):DigestedObjectSchema;
}


function __getSchemaForNode( this:void, $context:Context | undefined, node:{ "@id"?:string, "@type"?:string[] } ):DigestedObjectSchema {
	const types:string[] = RDFNode.getTypes( node as any );
	return __getSchema( $context, types, node[ "@id" ] );
}

function __getSchemaForResource( this:void, $context:Context | undefined, resource:{ $id?:string, types?:string[] } ):DigestedObjectSchema {
	const types:string[] = resource.types || [];
	return __getSchema( $context, types, resource.$id );
}

function __getSchema( this:void, $context:Context | undefined, objectTypes:string[], objectID?:string ):DigestedObjectSchema {
	if( ! $context ) return new DigestedObjectSchema();

	if( objectID !== void 0 && ! URI.hasFragment( objectID ) && ! URI.isBNodeID( objectID ) && objectTypes.indexOf( C.Document ) === - 1 )
		objectTypes = objectTypes.concat( C.Document );

	const objectSchemas:DigestedObjectSchema[] = objectTypes
		.filter( type => $context.hasObjectSchema( type ) )
		.map( type => $context.getObjectSchema( type ) )
	;

	return ObjectSchemaDigester
		._combineSchemas( [
			$context.getObjectSchema(),
			...objectSchemas,
		] );
}


export type ObjectSchemaResolverFactory =
	& ModelPrototype<ObjectSchemaResolver>
	& ModelDecorator<ObjectSchemaResolver>
	;

export const ObjectSchemaResolver:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link ObjectSchemaResolver}.
	 */
	PROTOTYPE: ObjectSchemaResolverFactory["PROTOTYPE"];

	/**
	 * Checks if the ObjectSchemaResolver has the decorated properties and methods from its prototype.
	 */
	isDecorated( object:object): object is ObjectSchemaResolver;

	/**
	 * Defines the ObjectSchemaResolver's prototype properties and methods to the ObjectSchemaResolver object.
	 */
	decorate<T extends object>( object:T ):T & ObjectSchemaResolver;
} = <ObjectSchemaResolverFactory> {
	PROTOTYPE: {
		context: undefined,

		getGeneralSchema( this:ObjectSchemaResolver ):DigestedObjectSchema {
			if( ! this.context ) return new DigestedObjectSchema();
			return this.context.getObjectSchema();
		},


		hasSchemaFor( this:ObjectSchemaResolver, object:object, path?:string ):boolean {
			return ! path;
		},

		getSchemaFor( this:ObjectSchemaResolver, object:object | QueryablePointer ):DigestedObjectSchema {
			return "types" in object || "$id" in object ?
				__getSchemaForResource( this.context, object ) :
				__getSchemaForNode( this.context, object );
		},
	},


	isDecorated( object:object ):object is ObjectSchemaResolver {
		return ModelDecorator.hasPropertiesFrom( ObjectSchemaResolver.PROTOTYPE, object );
	},

	decorate<T extends object>( object:T ):T & ObjectSchemaResolver {
		return ModelDecorator.definePropertiesFrom( ObjectSchemaResolver.PROTOTYPE, object );
	},
};
