/**
 * In-memory model that represents a `c:ExecutableQueryDocument`.
 */
import { isRelative } from "sparqler/core";
import { Context } from "../Context/Context";
import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { TransientFragment } from "../Fragment/TransientFragment";
import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactoryOptional } from "../Model/ModelFactoryOptional";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";
import { Pointer } from "../Pointer/Pointer";
import { RDFDocument } from "../RDF/Document";
import { RDFNode } from "../RDF/Node";
import { URI } from "../RDF/URI";
import { $BaseRegistry } from "../Registry/BaseRegistry";
import { $Registry, Registry } from "../Registry/Registry";
import { Resource } from "../Resource/Resource";
import { isObject, isPlainObject, isString } from "../Utils";
import { C } from "../Vocabularies/C";
import { BaseExecutableQueryDocument } from "./BaseExecutableQueryDocument";
import { OverriddenMembers, TransientDocument } from "../Document/TransientDocument";

export interface TransientExecutableQueryDocument extends TransientDocument {
	/**
	 * The stored SPARQL Query to execute on GET request with `ldp:ExecutableQuery` interaction model.
	 */
	storedQuery: string;
}

function __getLabelFrom( slug:string ):string {
	if( !isRelative( slug ) || slug.startsWith( "#" ) ) return slug;
	return "#" + slug;
}

function __getObjectId( object:{ $id?:string, $slug?:string } ):string {
	if( "$id" in object ) return object.$id!;

	if( "$slug" in object ) return URI.hasFragment( object.$slug! ) ?
		object.$slug! : __getLabelFrom( object.$slug! );

	return URI.generateBNodeID();
}

function __convertNested( resource:TransientExecutableQueryDocument, target:object, tracker:Set<string> = new Set() ):void {
	Object
		.keys( target )
		.map( key => target[ key ] )
		.forEach( next => {
			if( Array.isArray( next ) )
				return __convertNested( resource, next, tracker );


			if( !isPlainObject( next ) ) return;
			if( TransientExecutableQueryDocument.is( next ) ) return;
			if( next._registry && next._registry !== resource ) return;


			const idOrSlug:string = __getObjectId( next );
			if( tracker.has( idOrSlug ) ) return;
			if( !resource.$inScope( idOrSlug, true ) ) return;

			const fragment:TransientFragment = resource.$hasPointer( idOrSlug, true ) ?
				resource.$getPointer( idOrSlug, true ) :
				resource.$createFragment( next, idOrSlug )
			;

			tracker.add( fragment.$id );
			__convertNested( resource, fragment, tracker );
		} )
	;
}

/**
 * Factory, decorator and utils for {@link TransientExecutableQueryDocument} objects.
 */
export type TransientExecutableQueryDocumentFactory =
	& ModelPrototype<TransientExecutableQueryDocument, Resource & $Registry<TransientFragment>, OverriddenMembers>
	& ModelDecorator<TransientExecutableQueryDocument, BaseExecutableQueryDocument>
	& ModelFactoryOptional<TransientExecutableQueryDocument, BaseExecutableQueryDocument>
	& ModelTypeGuard<TransientExecutableQueryDocument>
	;



/**
 * Constant with the factory, decorator and/or utils for a {@link TransientExecutableQueryDocument} object.
 */
export const TransientExecutableQueryDocument:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link TransientExecutableQueryDocument}.
	 */
	PROTOTYPE:TransientExecutableQueryDocumentFactory["PROTOTYPE"];

	/**
	 * Returns true if the object is decorated with the specific properties and methods of a {@link TransientExecutableQueryDocument}.
	 */
	isDecorated( object:object ):object is TransientExecutableQueryDocument;

	/**
	 * Returns true when the value provided is considered to be a {@link TransientExecutableQueryDocument}.
	 */
	is( value:any ):value is TransientExecutableQueryDocument;

	/**
	 * Decorates the object with the properties and methods from the {@link TransientExecutableQueryDocument} prototype.
	 */
	decorate<T extends BaseExecutableQueryDocument>( object:T ):T & TransientExecutableQueryDocument;

	/**
	 * Creates a {@link TransientExecutableQueryDocument} with the provided data.
	 */
	create<T extends object>( data?:T & BaseExecutableQueryDocument ):T & TransientExecutableQueryDocument;

	/**
	 * Creates a {@link TransientExecutableQueryDocument} from the provided object.
	 */
	createFrom<T extends object>( object:T & BaseExecutableQueryDocument ):T & TransientExecutableQueryDocument;
} = <TransientExecutableQueryDocumentFactory> {

	...TransientDocument,
	createFrom: <T extends object>( object:T & BaseExecutableQueryDocument ) => {
		if( TransientExecutableQueryDocument.is( object ) ) throw new IllegalArgumentError( "The object provided is already an ExecutableQueryDocument." );

		if (!object.storedQuery) throw new IllegalArgumentError( "The new ExecutableQueryDocument must contain a storedQuery propery" );

		const document:T & TransientExecutableQueryDocument = TransientExecutableQueryDocument.decorate<T & BaseExecutableQueryDocument>( object );



		__convertNested( document, document );
		return document;
	},

	is: ( value ):value is TransientExecutableQueryDocument =>
		Resource.is( value ) &&
		Registry.isDecorated( value ) &&
		TransientExecutableQueryDocument.isDecorated( value )
	,

	isDecorated( object:object ):object is TransientExecutableQueryDocument {
		return ModelDecorator
			.hasPropertiesFrom( TransientExecutableQueryDocument.PROTOTYPE, object );
	},

	decorate<T extends BaseExecutableQueryDocument>( object:T ):T & TransientExecutableQueryDocument {
		if( TransientExecutableQueryDocument.isDecorated( object ) ) return object;

		type Base = T & Pick<$BaseRegistry<TransientFragment>, "$__modelDecorator">;
		const base:Base = ModelDecorator.definePropertiesFrom<Pick<$BaseRegistry<TransientFragment>, "$__modelDecorator">, T>( {
			$__modelDecorator: TransientFragment,
		}, object );

		const resource:Base & Resource & $Registry<TransientFragment> = ModelDecorator
			.decorateMultiple( base, Resource, Registry as ModelDecorator<$Registry<TransientFragment>, $BaseRegistry> );

		return ModelDecorator
			.definePropertiesFrom( TransientExecutableQueryDocument.PROTOTYPE, resource )
			;
	},
};
