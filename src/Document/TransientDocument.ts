import { isRelative } from "sparqler/iri";
import { Context } from "../Context";
import { IllegalArgumentError } from "../Errors";
import { TransientFragment } from "../Fragment";
import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype,
	ModelTypeGuard,
} from "../Model";
import { Pointer } from "../Pointer";
import {
	RDFDocument,
	RDFNode,
	URI,
} from "../RDF";
import {
	DocumentsRegistry,
	Registry
} from "../Registry";
import { Resource } from "../Resource";
import {
	isObject,
	isPlainObject,
	isString,
} from "../Utils";
import { BaseDocument } from "./BaseDocument";


export interface TransientDocument extends Resource, Registry<TransientFragment> {
	$registry:DocumentsRegistry | undefined;

	hasMemberRelation?:Pointer;
	isMemberOfRelation?:Pointer;
	insertedContentRelation?:Pointer;
	defaultInteractionModel?:Pointer;


	hasFragment( id:string ):boolean;

	getFragment<T extends object>( id:string ):(T & TransientFragment) | null;

	getFragments():TransientFragment[];

	createFragment<T extends object>( object:T, id?:string ):T & TransientFragment;
	createFragment( slug?:string ):TransientFragment;

	removeFragment( slugOrFragment:string | TransientFragment ):boolean;


	_normalize():void;


	_getLocalID( id:string ):string;


	toJSON( registryOrKey:Context | string ):RDFDocument;
}


function __getLabelFrom( slug:string ):string {
	if( ! isRelative( slug ) || slug.startsWith( "#" ) ) return slug;
	return "#" + slug;
}

function __getObjectId( object:any ):string {
	if( "id" in object ) return object.id;

	if( "slug" in object ) return URI.hasFragment( object.slug ) ?
		object.slug : __getLabelFrom( object.slug );

	return URI.generateBNodeID();
}

function __internalConverter( resource:TransientDocument, target:object, tracker:Set<string> = new Set() ):void {
	Object
		.keys( target )
		.map( key => target[ key ] )
		.forEach( next => {
			if( Array.isArray( next ) )
				return __internalConverter( resource, next, tracker );


			if( ! isPlainObject( next ) ) return;
			if( TransientDocument.is( next ) ) return;
			if( next._registry && next._registry !== resource ) return;


			const idOrSlug:string = __getObjectId( next );
			if( tracker.has( idOrSlug ) ) return;
			if( ! resource.inScope( idOrSlug, true ) ) return;


			const fragment:TransientFragment = resource.hasPointer( idOrSlug, true ) ?
				resource.getPointer( idOrSlug, true ) :
				resource._addPointer( next )
			;

			tracker.add( fragment.$id );
			__internalConverter( resource, fragment, tracker );
		} )
	;
}

type OverrodeMembers =
	| "$registry"
	| "_getLocalID"
	| "__modelDecorator"
	| "getPointer"
	| "toJSON"
	;

export type TransientDocumentFactory =
	& ModelPrototype<TransientDocument, Resource & Registry, OverrodeMembers>
	& ModelDecorator<TransientDocument, BaseDocument>
	& ModelFactory<TransientDocument, BaseDocument>
	& ModelTypeGuard<TransientDocument>
	;

export const TransientDocument:TransientDocumentFactory = {
	PROTOTYPE: {
		$registry: void 0,

		__modelDecorator: TransientFragment,

		_normalize( this:TransientDocument ):void {
			const usedFragments:Set<string> = new Set();
			__internalConverter( this, this, usedFragments );

			this.getPointers( true )
				.map( Pointer.getID )
				.filter( URI.isBNodeID )
				.filter( id => ! usedFragments.has( id ) )
				.forEach( this.removePointer, this )
			;
		},


		_getLocalID( this:TransientDocument, id:string ):string {
			if( URI.isBNodeID( id ) ) return id;

			if( URI.isFragmentOf( id, this.$id ) ) return URI.getFragment( id );

			throw new IllegalArgumentError( `"${ id }" is outside the scope of the document.` );
		},

		getPointer( this:TransientDocument, id:string, local?:true ):TransientFragment {
			id = URI.resolve( this.$id, id );
			return Registry.PROTOTYPE.getPointer.call( this, id, local );
		},


		hasFragment( this:TransientDocument, id:string ):boolean {
			id = __getLabelFrom( id );
			if( ! this.inScope( id, true ) ) return false;

			const localID:string = this._getLocalID( id );
			return this.__resourcesMap.has( localID );
		},

		getFragment<T extends object>( this:TransientDocument, id:string ):(T & TransientFragment) | null {
			id = __getLabelFrom( id );
			const localID:string = this._getLocalID( id );

			const resource:TransientFragment = this.__resourcesMap.get( localID );
			if( ! resource ) return null;

			return resource as T & TransientFragment;
		},

		getFragments( this:TransientDocument ):TransientFragment[] {
			return this.getPointers( true );
		},

		createFragment<T extends object>( this:TransientDocument, isOrObject?:string | T, id:string = URI.generateBNodeID() ):T & TransientFragment {
			const object:T = isObject( isOrObject ) ? isOrObject : {} as T;

			id = isString( isOrObject ) ? isOrObject : id;
			const pointer:T & Pointer = Object.assign<T, Pointer>( object, {
				$id: __getLabelFrom( id ),
			} );

			const fragment:T & TransientFragment = this._addPointer( pointer );

			__internalConverter( this, fragment );
			return fragment;
		},

		removeFragment( this:TransientDocument, fragmentOrSlug:string | TransientFragment ):boolean {
			const id:string = __getLabelFrom( Pointer.getID( fragmentOrSlug ) );
			if( ! this.inScope( id, true ) ) return false;

			return this.removePointer( id );
		},


		toJSON( this:TransientDocument, contextOrKey:Context | string ):RDFDocument {
			const nodes:RDFNode[] = [ this, ...this.getFragments(), ]
				.map( resource => resource.toJSON( contextOrKey ) )
			;

			return {
				"@id": this.$id,
				"@graph": nodes,
			};
		},
	},

	isDecorated: ( object ):object is TransientDocument =>
		ModelDecorator
			.hasPropertiesFrom( TransientDocument.PROTOTYPE, object )
	,

	decorate<T extends BaseDocument>( object:T ):T & TransientDocument {
		if( TransientDocument.isDecorated( object ) ) return object;

		const resource:T & Resource & Registry<TransientFragment> = ModelDecorator
			.decorateMultiple( object, Resource, Registry );

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

		__internalConverter( document, document );
		return document;
	},

	create: <T extends object>( data?:T & BaseDocument ) => {
		const copy:T = Object.assign( {}, data );
		return TransientDocument.createFrom( copy );
	},
};
