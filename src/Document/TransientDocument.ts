import { isRelative } from "sparqler/iri";
import { TransientBlankNode, } from "../BlankNode";
import {
	ModelDecorator,
	ModelFactory,
} from "../core";
import { IllegalArgumentError, } from "../Errors";
import { TransientFragment } from "../Fragment";
import { JSONLDConverter } from "../JSONLD";
import { TransientNamedFragment, } from "../NamedFragment";
import { DigestedObjectSchema, } from "../ObjectSchema";
import { Pointer, } from "../Pointer";
import {
	RDFDocument,
	RDFNode,
	URI,
} from "../RDF";
import {
	DocumentsRegistry,
	Registry
} from "../Registry";
import { TransientResource } from "../Resource";
import {
	isObject,
	isPlainObject,
	isString,
	PickSelfProps,
} from "../Utils";
import { C } from "../Vocabularies";
import { BaseDocument } from "./BaseDocument";


export interface TransientDocument extends TransientResource, Registry<TransientBlankNode | TransientNamedFragment> {
	_registry:DocumentsRegistry | undefined;

	defaultInteractionModel?:Pointer;
	isMemberOfRelation?:Pointer;
	hasMemberRelation?:Pointer;


	hasFragment( id:string ):boolean;


	getFragment<T extends object>( id:string ):(T & TransientFragment) | null;

	getNamedFragment<T extends object>( slug:string ):(T & TransientNamedFragment) | null;

	getFragments():TransientFragment[];


	createFragment<T extends object>( object:T, id?:string ):T & TransientFragment;
	createFragment( slug?:string ):TransientFragment;

	createNamedFragment<T extends object>( object:T, slug:string ):T & TransientNamedFragment;
	createNamedFragment( slug:string ):TransientNamedFragment;


	removeNamedFragment( slugOrFragment:string | TransientNamedFragment ):boolean;

	_removeFragment( slugOrFragment:string | TransientFragment ):boolean;


	_normalize():void;


	_getLocalID( id:string ):string;

	_register<T extends object>( base:T & { slug:string } ):T & TransientNamedFragment;
	_register<T extends object>( base:T & { id?:string } ):T & TransientFragment;


	toJSON( registry?:DocumentsRegistry ):RDFDocument;
}


function getLabelFrom( slug:string ):string {
	if( ! isRelative( slug ) || slug.startsWith( "#" ) ) return slug;
	return "#" + slug;
}

function getNestedObjectId( object:any ):string {
	if( "id" in object ) return object.id;

	if( "slug" in object ) return URI.hasFragment( object.slug ) ?
		object.slug : getLabelFrom( object.slug );

	return "";
}

function internalConverter( resource:TransientDocument, target:object, tracker:Set<string> = new Set() ):void {
	Object
		.keys( target )
		.map( key => target[ key ] )
		.forEach( next => {
			if( Array.isArray( next ) )
				return internalConverter( resource, next, tracker );


			if( ! isPlainObject( next ) ) return;
			if( TransientDocument.is( next ) ) return;
			if( next._registry && next._registry !== resource ) return;


			const idOrSlug:string = getNestedObjectId( next );
			if( tracker.has( idOrSlug ) ) return;
			if( idOrSlug && ! resource.inScope( idOrSlug, true ) ) return;


			const fragment:TransientFragment = idOrSlug && resource.hasPointer( idOrSlug, true ) ?
				resource.getPointer( idOrSlug, true ) :
				resource._register( next )
			;

			tracker.add( fragment.id );
			internalConverter( resource, fragment, tracker );
		} )
	;
}


type OverloadedProps =
	| "_registry"
	| "_getLocalID"
	| "_register"
	;

const PROTOTYPE:PickSelfProps<TransientDocument, TransientResource & Registry<TransientBlankNode | TransientNamedFragment>, OverloadedProps> = {
	_registry: void 0,


	_normalize( this:TransientDocument ):void {
		const usedFragments:Set<string> = new Set();
		internalConverter( this, this, usedFragments );

		this.getPointers( true )
			.map( Pointer.getID )
			.filter( URI.isBNodeID )
			.filter( id => ! usedFragments.has( id ) )
			.forEach( this.removePointer, this )
		;
	},


	_getLocalID( this:TransientDocument, id:string ):string {
		if( URI.isBNodeID( id ) ) return id;

		if( URI.isFragmentOf( id, this.id ) ) return URI.getFragment( id );

		return Registry.PROTOTYPE._getLocalID.call( this, id );
	},

	_register<T extends object>( this:TransientDocument, base:T & ({ slug:string } | { id?:string }) ):T & TransientFragment {
		const id:string = "slug" in base ? getLabelFrom( base.slug ) :
			base.id ? base.id : URI.generateBNodeID();
		const targetBase:T & { id:string } = Object.assign( base, { id } );

		const pointer:T & Pointer = Registry.PROTOTYPE._register.call( this, targetBase );


		if( URI.isBNodeID( pointer.id ) )
			return TransientBlankNode.decorate( pointer );

		return TransientNamedFragment.decorate( pointer );
	},


	hasFragment( this:TransientDocument, id:string ):boolean {
		id = getLabelFrom( id );
		if( ! this.inScope( id, true ) ) return false;

		const localID:string = this._getLocalID( id );
		return this._resourcesMap.has( localID );
	},


	getFragment<T extends object>( this:TransientDocument, id:string ):(T & TransientFragment) | null {
		id = getLabelFrom( id );
		if( ! this.inScope( id, true ) ) throw new IllegalArgumentError( `"${ id }" is out of scope.` );

		const localID:string = this._getLocalID( id );

		const resource:TransientFragment = this._resourcesMap.get( localID );
		if( ! resource ) return null;

		return resource as T & TransientFragment;
	},

	getNamedFragment<T extends object>( this:TransientDocument, slug:string ):(T & TransientNamedFragment) | null {
		if( URI.isBNodeID( slug ) ) throw new IllegalArgumentError( `A named fragment slug can't start with "_:".` );
		return this.getFragment( slug );
	},

	getFragments( this:TransientDocument ):TransientFragment[] {
		return this.getPointers( true );
	},


	createFragment<T extends object>( this:TransientDocument, isOrObject?:string | T, id?:string ):T & TransientFragment {
		const object:T & { id?:string } = isObject( isOrObject ) ? isOrObject : {} as T;

		id = isString( isOrObject ) ? isOrObject : id;
		if( id ) object.id = getLabelFrom( id );

		const fragment:T & TransientFragment = this._register( object );

		TransientDocument._convertNestedObjects( this, fragment );
		return fragment;
	},

	createNamedFragment<T extends object>( this:TransientDocument, slugOrObject:string | T, slug?:string ):T & TransientNamedFragment {
		slug = isString( slugOrObject ) ? slugOrObject : slug;
		if( ! slug ) throw new IllegalArgumentError( `The slug can't be empty.` );

		if( URI.isBNodeID( slug ) ) throw new IllegalArgumentError( `A named fragment slug can't start with "_:".` );

		const object:T = isObject( slugOrObject ) ? slugOrObject : {} as T;
		const base:T & { slug:string } = Object.assign( object, { slug } );
		const fragment:T & TransientNamedFragment = this._register( base );

		TransientDocument._convertNestedObjects( this, fragment );
		return fragment;
	},


	removeNamedFragment( this:TransientDocument, fragmentOrSlug:TransientNamedFragment | string ):boolean {
		const slug:string = Pointer.getID( fragmentOrSlug );

		if( URI.isBNodeID( slug ) ) throw new IllegalArgumentError( `A named fragment slug can't start with "_:".` );
		return this._removeFragment( slug );
	},

	_removeFragment( this:TransientDocument, fragmentOrSlug:string | TransientFragment ):boolean {
		const id:string = getLabelFrom( Pointer.getID( fragmentOrSlug ) );
		if( ! this.inScope( id, true ) ) return false;
		return this.removePointer( id );
	},


	toJSON( this:TransientDocument, registryOrKey?:DocumentsRegistry | string ):RDFDocument {
		const registry:DocumentsRegistry = isObject( registryOrKey ) ?
			registryOrKey : this._registry;

		const generalSchema:DigestedObjectSchema = registry ?
			registry.getGeneralSchema() : new DigestedObjectSchema();

		const jsonldConverter:JSONLDConverter = registry ?
			registry.jsonldConverter : new JSONLDConverter();

		const expandedResources:RDFNode[] = [ this, ...this.getFragments(), ]
			.map( resource => {
				const resourceSchema:DigestedObjectSchema = registry ?
					registry.getSchemaFor( resource ) :
					new DigestedObjectSchema()
				;

				return jsonldConverter.expand( resource, generalSchema, resourceSchema );
			} )
		;

		return {
			"@id": this.id,
			"@graph": expandedResources,
		};
	},
};


export interface TransientDocumentFactory extends ModelFactory<TransientDocument>, ModelDecorator<TransientDocument> {
	PROTOTYPE:PickSelfProps<TransientDocument,
		TransientResource & Registry<TransientBlankNode | TransientNamedFragment>,
		| "_registry"
		| "_getLocalID"
		| "_register">;

	TYPE:C[ "Document" ];


	is( value:any ):value is TransientDocument;

	isDecorated( object:object ):object is TransientDocument;


	create<T extends object>( data?:T & BaseDocument ):T & TransientDocument;

	createFrom<T extends object>( object:T & BaseDocument ):T & TransientDocument;

	decorate<T extends object>( object:T ):T & TransientDocument;


	_convertNestedObjects<T extends object>( resource:TransientDocument, target:T ):T;
}

export const TransientDocument:TransientDocumentFactory = {
	PROTOTYPE,

	TYPE: C.Document,

	isDecorated: ( object ):object is TransientDocument =>
		isObject( object )
		&& ModelDecorator
			.hasPropertiesFrom( PROTOTYPE, object )
	,

	is: ( value ):value is TransientDocument =>
		TransientResource.is( value ) &&
		Registry.isDecorated( value ) &&
		TransientDocument.isDecorated( value )
	,


	decorate<T extends object>( object:T ):T & TransientDocument {
		if( TransientDocument.isDecorated( object ) ) return object;

		const resource:T & TransientResource & Registry<TransientBlankNode | TransientNamedFragment> = ModelDecorator
			.decorateMultiple( object, TransientResource, Registry );

		return ModelDecorator
			.definePropertiesFrom( PROTOTYPE, resource )
			;
	},

	createFrom: <T extends object>( object:T & BaseDocument ) => {
		if( TransientDocument.is( object ) ) throw new IllegalArgumentError( "The object provided is already a Document." );

		const document:T & TransientDocument = TransientDocument.decorate<T>( object );
		TransientDocument._convertNestedObjects( document, document );

		return document;
	},

	create: <T extends object>( data?:T & BaseDocument ) => {
		const copy:T = Object.assign( {}, data );
		return TransientDocument.createFrom( copy );
	},


	_convertNestedObjects<T extends object>( resource:TransientDocument, target:T ):T {
		internalConverter( resource, target );
		return target;
	},
};
