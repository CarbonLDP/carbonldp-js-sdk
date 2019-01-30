import { isRelative } from "sparqler/iri";

import { Context } from "../Context/Context";

import { DocumentsRegistry } from "../DocumentsRegistry/DocumentsRegistry";

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

import { BaseDocument } from "./BaseDocument";


/**
 * In-memory model that represents a `c:Document`.
 */
export interface TransientDocument extends Resource, $Registry<TransientFragment> {
	/**
	 * Registry where the resource will exits.
	 */
	$registry:DocumentsRegistry | undefined;

	/**
	 * @see {@link BaseDocument.hasMemberRelation}
	 */
	hasMemberRelation?:Pointer;
	/**
	 * @see {@link BaseDocument.hasMemberRelation}
	 */
	isMemberOfRelation?:Pointer;
	/**
	 * @see {@link BaseDocument.isMemberOfRelation}
	 */
	insertedContentRelation?:Pointer;
	/**
	 * @see {@link BaseDocument.defaultInteractionModel}
	 */
	defaultInteractionModel?:Pointer;


	/**
	 * Returns true if the document has a fragment with the ID specified.
	 * @param id The ID of the fragment to check if exists.
	 */
	$hasFragment( id:string ):boolean;

	/**
	 * Returns the fragment with the ID specified.
	 * If no fragment exists, `null` will be returned.
	 * @param id The ID of the fragment to look for.
	 */
	$getFragment<T extends object>( id:string ):(T & TransientFragment) | null;

	/**
	 * Returns an array with all the fragments in the document.
	 */
	$getFragments():TransientFragment[];

	/**
	 * Creates a {@link TransientFragment} from the object and ID specified.
	 * @param object The object to be converted into a fragment.
	 * @param id Optional ID to be set for the fragment, if no provided a random BNode label will be assigned.
	 */
	$createFragment<T extends object>( object:T, id?:string ):T & TransientFragment;
	/**
	 * Creates a {@link TransientFragment} with the ID specified.
	 * @param id Optional ID to be set for the fragment, if no provided a random BNode label will be assigned.
	 */
	$createFragment( id?:string ):TransientFragment;

	/**
	 * Removes the fragment provided from the document.
	 * If a string is provided, it will be used as the ID of the fragment to be removed.
	 * @param idOrFragment
	 */
	$removeFragment( idOrFragment:string | TransientFragment ):boolean;


	/**
	 * Search over the document for normal object and converted them into fragments.
	 * If unused fragments with BNode label as ID are detected, they will be removed from the document.
	 */
	$_normalize():void;


	/**
	 * @see {@link $Registry.$_getLocalID}
	 */
	$_getLocalID( id:string ):string;


	/**
	 * Returns the JSON-LD representation of the current document.
	 * @param contextOrKey A specific context to use for expand the data into JSON-LD instead of the internal one.
	 */
	toJSON( contextOrKey?:Context | string ):RDFDocument;
}


function __getLabelFrom( slug:string ):string {
	if( ! isRelative( slug ) || slug.startsWith( "#" ) ) return slug;
	return "#" + slug;
}

function __getObjectId( object:{ $id?:string, $slug?:string } ):string {
	if( "$id" in object ) return object.$id!;

	if( "$slug" in object ) return URI.hasFragment( object.$slug! ) ?
		object.$slug! : __getLabelFrom( object.$slug! );

	return URI.generateBNodeID();
}

function __convertNested( resource:TransientDocument, target:object, tracker:Set<string> = new Set() ):void {
	Object
		.keys( target )
		.map( key => target[ key ] )
		.forEach( next => {
			if( Array.isArray( next ) )
				return __convertNested( resource, next, tracker );


			if( ! isPlainObject( next ) ) return;
			if( TransientDocument.is( next ) ) return;
			if( next._registry && next._registry !== resource ) return;


			const idOrSlug:string = __getObjectId( next );
			if( tracker.has( idOrSlug ) ) return;
			if( ! resource.$inScope( idOrSlug, true ) ) return;


			const fragment:TransientFragment = resource.$hasPointer( idOrSlug, true ) ?
				resource.$getPointer( idOrSlug, true ) :
				resource.$createFragment( next, idOrSlug )
			;

			tracker.add( fragment.$id );
			__convertNested( resource, fragment, tracker );
		} )
	;
}

export type OverriddenMembers =
	| "$registry"
	| "$_getLocalID"
	| "$getPointer"
	| "toJSON"
	;

/**
 * Factory, decorator and utils for {@link TransientDocument} objects.
 */
export type TransientDocumentFactory =
	& ModelPrototype<TransientDocument, Resource & $Registry<TransientFragment>, OverriddenMembers>
	& ModelDecorator<TransientDocument, BaseDocument>
	& ModelFactoryOptional<TransientDocument, BaseDocument>
	& ModelTypeGuard<TransientDocument>
	;

/**
 * Constant that implements {@link TransientDocumentFactory}.
 */
export const TransientDocument:TransientDocumentFactory = {
	PROTOTYPE: {
		$registry: void 0,

		$_normalize( this:TransientDocument ):void {
			const usedFragments:Set<string> = new Set();
			__convertNested( this, this, usedFragments );

			this.$getPointers( true )
				.map( Pointer.getID )
				.filter( URI.isBNodeID )
				.filter( id => ! usedFragments.has( id ) )
				.forEach( this.$removePointer, this )
			;
		},


		$_getLocalID( this:TransientDocument, id:string ):string {
			if( URI.isBNodeID( id ) ) return id;

			if( URI.isFragmentOf( id, this.$id ) ) return URI.getFragment( id );

			throw new IllegalArgumentError( `"${ id }" is out of scope.` );
		},

		$getPointer( this:TransientDocument, id:string, local?:true ):TransientFragment {
			id = URI.resolve( this.$id, id );
			return Registry.PROTOTYPE.getPointer.call( this, id, local! );
		},


		$hasFragment( this:TransientDocument, id:string ):boolean {
			id = __getLabelFrom( id );
			if( ! this.$inScope( id, true ) ) return false;

			const localID:string = this.$_getLocalID( id );
			return this.$__resourcesMap.has( localID );
		},

		$getFragment<T extends object>( this:TransientDocument, id:string ):(T & TransientFragment) | null {
			id = __getLabelFrom( id );
			const localID:string = this.$_getLocalID( id );

			const resource:TransientFragment | undefined = this.$__resourcesMap.get( localID );
			if( ! resource ) return null;

			return resource as T & TransientFragment;
		},

		$getFragments( this:TransientDocument ):TransientFragment[] {
			return this.$getPointers( true );
		},

		$createFragment<T extends object>( this:TransientDocument, isOrObject?:string | T, id?:string ):T & TransientFragment {
			const object:T = isObject( isOrObject ) ? isOrObject : {} as T;
			if( isString( isOrObject ) ) id = isOrObject;

			const $id:string = id ? __getLabelFrom( id ) : __getObjectId( object );
			const fragment:T & TransientFragment = this.$_addPointer( Object
				.assign<T, Pointer>( object, { $id } )
			);

			__convertNested( this, fragment );
			return fragment;
		},

		$removeFragment( this:TransientDocument, fragmentOrSlug:string | TransientFragment ):boolean {
			const id:string = __getLabelFrom( Pointer.getID( fragmentOrSlug ) );
			if( ! this.$inScope( id, true ) ) return false;

			return this.$removePointer( id );
		},


		toJSON( this:TransientDocument, contextOrKey:Context | string ):RDFDocument {
			const nodes:RDFNode[] = [
				Resource.PROTOTYPE.toJSON.call( this, contextOrKey ),
				...this
					.$getFragments()
					.map( resource => resource.toJSON( contextOrKey ) ),
			];

			return {
				"@id": this.$id,
				"@graph": nodes,
			};
		},
	},

	isDecorated( object:object ):object is TransientDocument {
		return ModelDecorator
			.hasPropertiesFrom( TransientDocument.PROTOTYPE, object );
	},

	decorate<T extends BaseDocument>( object:T ):T & TransientDocument {
		if( TransientDocument.isDecorated( object ) ) return object;

		type Base = T & Pick<$BaseRegistry<TransientFragment>, "$__modelDecorator">;
		const base:Base = ModelDecorator.definePropertiesFrom<Pick<$BaseRegistry<TransientFragment>, "$__modelDecorator">, T>( {
			$__modelDecorator: TransientFragment,
		}, object );

		const resource:Base & Resource & $Registry<TransientFragment> = ModelDecorator
			.decorateMultiple( base, Resource, Registry as ModelDecorator<$Registry<TransientFragment>, $BaseRegistry> );

		return ModelDecorator
			.definePropertiesFrom( TransientDocument.PROTOTYPE, resource )
			;
	},


	is: ( value ):value is TransientDocument =>
		Resource.is( value ) &&
		Registry.isDecorated( value ) &&
		TransientDocument.isDecorated( value )
	,

	createFrom: <T extends object>( object:T & BaseDocument ) => {
		if( TransientDocument.is( object ) ) throw new IllegalArgumentError( "The object provided is already a Document." );

		const document:T & TransientDocument = TransientDocument.decorate<T>( object );

		__convertNested( document, document );
		return document;
	},

	create: <T extends object>( data?:T & BaseDocument ) => {
		const copy:T = Object.assign( {}, data );
		return TransientDocument.createFrom( copy );
	},
};
