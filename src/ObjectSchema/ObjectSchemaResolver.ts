import { Context } from "../Context";
import {
	ModelDecorator,
	ModelPrototype,
	ModelTypeGuard,
} from "../Model";
import {
	RDFNode,
	URI
} from "../RDF";
import { ResolvablePointer } from "../Repository";
import { isObject } from "../Utils";
import { C } from "../Vocabularies";
import { DigestedObjectSchema } from "./DigestedObjectSchema";
import { ObjectSchemaDigester } from "./ObjectSchemaDigester";


export interface ObjectSchemaResolver {
	$context?:Context;


	getGeneralSchema():DigestedObjectSchema;

	hasSchemaFor( object:object, path?:string ):boolean;

	getSchemaFor( object:object, path?:string ):DigestedObjectSchema;
}


function __getSchemaForNode( this:void, $context:Context | undefined, node:{ "@id"?:string, "@type"?:string[] } ):DigestedObjectSchema {
	const types:string[] = RDFNode.getTypes( node as any );
	return __getSchema( $context, types, node[ "@id" ] );
}

function __getSchemaForResource( this:void, $context:Context | undefined, resource:{ id?:string, types?:string[] } ):DigestedObjectSchema {
	const types:string[] = resource.types || [];
	return __getSchema( $context, types, resource.id );
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


type ObjectSchemaResolverFactory =
	& ModelDecorator<ObjectSchemaResolver>
	& ModelTypeGuard<ObjectSchemaResolver>
	& ModelPrototype<ObjectSchemaResolver>
	;

export const ObjectSchemaResolver:ObjectSchemaResolverFactory = {
	PROTOTYPE: {
		$context: undefined,

		getGeneralSchema( this:ObjectSchemaResolver ):DigestedObjectSchema {
			if( ! this.$context ) return new DigestedObjectSchema();
			return this.$context.getObjectSchema();
		},


		hasSchemaFor( this:ObjectSchemaResolver, object:object, path?:string ):boolean {
			return ! path;
		},

		getSchemaFor( this:ObjectSchemaResolver, object:object ):DigestedObjectSchema {
			const schema:DigestedObjectSchema = "types" in object || "id" in object ?
				__getSchemaForResource( this.$context, object ) :
				__getSchemaForNode( this.$context, object );

			if( ! ResolvablePointer.isDecorated( object ) || ! object.isQueried() )
				return schema;

			return ObjectSchemaDigester
				._combineSchemas( [
					schema,
					object.__partialMetadata.schema,
				] );
		},
	},


	isDecorated( object:object ):object is ObjectSchemaResolver {
		return ModelDecorator.hasPropertiesFrom( ObjectSchemaResolver.PROTOTYPE, object );
	},

	decorate<T extends object>( object:T ):T & ObjectSchemaResolver {
		return ModelDecorator.definePropertiesFrom( ObjectSchemaResolver.PROTOTYPE, object );
	},


	is( value:any ):value is ObjectSchemaResolver {
		return isObject( value )
			&& ObjectSchemaResolver.isDecorated( value )
			;
	},
};
