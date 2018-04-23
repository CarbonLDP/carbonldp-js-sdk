import {
	BaseBlankNode,
	TransientBlankNode,
} from "../BlankNode";
import { ModelDecorator } from "../core/ModelDecorator";
import { ModelFactory } from "../core/ModelFactory";
import {
	IDAlreadyInUseError,
	IllegalArgumentError,
} from "../Errors";
import { TransientFragment } from "../Fragment";
import { JSONLDConverter } from "../JSONLD";
import {
	BaseNamedFragment,
	TransientNamedFragment,
} from "../NamedFragment";
import {
	DigestedObjectSchema,
	ObjectSchemaResolver,
} from "../ObjectSchema";
import {
	Pointer,
	PointerLibrary,
	PointerValidator,
} from "../Pointer";
import {
	RDFDocument,
	RDFNode,
	URI,
} from "../RDF";
import { TransientResource } from "../Resource";
import {
	hasFunction,
	hasPropertyDefined,
	isObject,
	isPlainObject,
	isString,
} from "../Utils";
import { C } from "../Vocabularies";
import { BaseDocument } from "./BaseDocument";


export interface TransientDocument extends TransientResource, PointerLibrary, PointerValidator {
	defaultInteractionModel?:Pointer;
	isMemberOfRelation?:Pointer;
	hasMemberRelation?:Pointer;

	_fragmentsIndex:Map<string, TransientFragment>;

	_normalize():void;


	_removeFragment( slugOrFragment:string | TransientFragment ):void;


	hasFragment( slug:string ):boolean;


	getFragment<T>( slug:string ):T & TransientFragment;

	getNamedFragment<T>( slug:string ):T & TransientNamedFragment;


	getFragments():TransientFragment[];


	createFragment<T>( object:T, slug?:string ):T & TransientFragment;

	createFragment( slug?:string ):TransientFragment;


	createNamedFragment<T>( object:T, slug:string ):T & TransientNamedFragment;

	createNamedFragment( slug:string ):TransientNamedFragment;


	removeNamedFragment( slugOrFragment:string | TransientNamedFragment ):void;


	toJSON( objectSchemaResolver?:ObjectSchemaResolver, jsonldConverter?:JSONLDConverter ):RDFDocument;
}


export interface TransientDocumentFactory extends ModelFactory<TransientDocument>, ModelDecorator<TransientDocument> {
	TYPE:C[ "Document" ];


	is( value:any ):value is TransientDocument;

	isDecorated( object:object ):object is TransientDocument;


	create<T extends BaseDocument>( data?:T ):T & TransientDocument;

	createFrom<T extends BaseDocument>( object:T ):T & TransientDocument;

	decorate<T extends object>( object:T ):T & TransientDocument;


	_convertNestedObjects( parent:TransientDocument, actual:any, fragmentsTracker?:Set<string> ):void;
}

export const TransientDocument:TransientDocumentFactory = {
	TYPE: C.Document,

	isDecorated: ( object ):object is TransientDocument =>
		isObject( object ) &&
		hasPropertyDefined( object, "_fragmentsIndex" ) &&

		hasFunction( object, "_normalize" ) &&
		hasFunction( object, "_removeFragment" ) &&

		hasFunction( object, "hasPointer" ) &&
		hasFunction( object, "getPointer" ) &&

		hasFunction( object, "inScope" ) &&

		hasFunction( object, "hasFragment" ) &&
		hasFunction( object, "getFragment" ) &&
		hasFunction( object, "getNamedFragment" ) &&
		hasFunction( object, "getFragments" ) &&
		hasFunction( object, "createFragment" ) &&
		hasFunction( object, "createNamedFragment" ) &&
		hasFunction( object, "removeNamedFragment" ) &&

		hasFunction( object, "toJSON" )
	,

	is: ( value ):value is TransientDocument =>
		TransientResource.is( value ) &&
		TransientDocument.isDecorated( value )
	,


	decorate: <T extends object>( object:T ) => {
		if( TransientDocument.isDecorated( object ) ) return object;

		TransientResource.decorate( object );

		Object.defineProperties( object, {
			"_fragmentsIndex": {
				configurable: true,
				value: new Map<string, TransientFragment>(),
			},

			"_normalize": {
				configurable: true,
				value: normalize,
			},
			"_removeFragment": {
				configurable: true,
				value: removeFragment,
			},

			"hasPointer": {
				configurable: true,
				value: hasPointer,
			},
			"getPointer": {
				configurable: true,
				value: getPointer,
			},
			"inScope": {
				configurable: true,
				value: inScope,
			},

			"hasFragment": {
				configurable: true,
				value: hasFragment,
			},
			"getFragment": {
				configurable: true,
				value: getFragment,
			},
			"getNamedFragment": {
				configurable: true,
				value: getNamedFragment,
			},
			"getFragments": {
				configurable: true,
				value: getFragments,
			},
			"createFragment": {
				configurable: true,
				value: createFragment,
			},
			"createNamedFragment": {
				configurable: true,
				value: createNamedFragment,
			},
			"removeNamedFragment": {
				configurable: true,
				value: removeNamedFragment,
			},
			"toJSON": {
				configurable: true,
				value: toJSON,
			},
		} );

		return object as any;
	},

	createFrom: <T extends BaseDocument>( object:T ) => {
		if( TransientDocument.is( object ) ) throw new IllegalArgumentError( "The object provided is already a Document." );

		const document:T & TransientDocument = TransientDocument.decorate<T>( object );
		TransientDocument._convertNestedObjects( document, document );

		return document;
	},

	create: <T extends BaseDocument>( data?:T ) => {
		const copy:T = Object.assign( {}, data );
		return TransientDocument.createFrom( copy );
	},


	_convertNestedObjects( parent:TransientDocument, actual:any, fragmentsTracker:Set<string> = new Set() ):void {
		for( let key of Object.keys( actual ) ) {
			const next:any = actual[ key ];

			if( Array.isArray( next ) ) {
				TransientDocument._convertNestedObjects( parent, next, fragmentsTracker );
				continue;
			}

			if( ! isPlainObject( next ) ) continue;
			if( TransientDocument.is( next ) ) continue;

			const idOrSlug:string = getNestedObjectId( next );
			if( ! ! idOrSlug && ! inScope.call( parent, idOrSlug ) ) continue;

			const parentFragment:TransientFragment = parent.getFragment( idOrSlug );
			if( ! parentFragment ) {
				const fragment:TransientFragment = parent.createFragment( <Object> next, idOrSlug );
				TransientDocument._convertNestedObjects( parent, fragment, fragmentsTracker );

			} else if( parentFragment !== next ) {
				const fragment:TransientFragment = actual[ key ] = Object.assign( parentFragment, next );
				TransientDocument._convertNestedObjects( parent, fragment, fragmentsTracker );

			} else if( ! fragmentsTracker.has( next.id ) ) {
				fragmentsTracker.add( next.id );
				TransientDocument._convertNestedObjects( parent, next, fragmentsTracker );
			}

		}

	},

};

function getNestedObjectId( object:any ):string {
	if( "id" in object ) return object.id;

	if( "slug" in object ) return URI.hasFragment( object.slug ) ?
		object.slug : "#" + object.slug;

	return "";
}


function hasPointer( this:TransientDocument, id:string ):boolean {
	if( id === this.id ) return true;
	if( ! this.inScope( id ) ) return false;

	return this.hasFragment( id );
}

function getPointer( this:TransientDocument, id:string ):Pointer {
	if( ! this.inScope( id ) ) return null;
	if( id === this.id ) return this;

	return this.hasFragment( id ) ?
		this.getFragment( id ) :
		this.createFragment( id );
}

function inScope( this:TransientDocument, idOrPointer:string | Pointer ):boolean {
	const id:string = isString( idOrPointer ) ? idOrPointer : idOrPointer.id;

	if( id === this.id ) return true;
	if( URI.isBNodeID( id ) ) return true;
	if( URI.isFragmentOf( id, this.id ) ) return true;
	return id.startsWith( "#" );
}

function hasFragment( this:TransientDocument, id:string ):boolean {
	if( URI.isAbsolute( id ) ) {
		if( ! URI.isFragmentOf( id, this.id ) ) return false;
		id = URI.hasFragment( id ) ? URI.getFragment( id ) : id;
	} else if( id.startsWith( "#" ) ) {
		id = id.substring( 1 );
	}

	return this._fragmentsIndex.has( id );
}

function getFragment( this:TransientDocument, id:string ):TransientFragment {
	if( ! URI.isBNodeID( id ) ) return this.getNamedFragment( id );
	return this._fragmentsIndex.get( id ) || null;
}

function getNamedFragment( this:TransientDocument, id:string ):TransientNamedFragment {
	if( URI.isBNodeID( id ) ) throw new IllegalArgumentError( "Named fragments can't have a id that starts with '_:'." );
	if( URI.isAbsolute( id ) ) {
		if( ! URI.isFragmentOf( id, this.id ) ) throw new IllegalArgumentError( "The id is out of scope." );
		id = URI.hasFragment( id ) ? URI.getFragment( id ) : id;
	} else if( id.startsWith( "#" ) ) {
		id = id.substring( 1 );
	}

	return <TransientNamedFragment> this._fragmentsIndex.get( id ) || null;
}

function getFragments( this:TransientDocument ):TransientFragment[] {
	return Array.from( this._fragmentsIndex.values() );
}

function createFragment<T extends object>( object:T, slug?:string ):T & TransientFragment;
function createFragment( slug?:string ):TransientFragment;
function createFragment<T extends object>( this:TransientDocument, slugOrObject?:any, slug?:string ):T & TransientFragment {
	slug = isString( slugOrObject ) ? slugOrObject : slug;
	const object:T = ! isString( slugOrObject ) && ! ! slugOrObject ? slugOrObject : <T> {};

	if( slug ) {
		if( ! URI.isBNodeID( slug ) ) return this.createNamedFragment<T>( object, slug );
		if( this._fragmentsIndex.has( slug ) ) throw new IDAlreadyInUseError( "The slug provided is already being used by a fragment." );
	}

	const baseBNode:T & BaseBlankNode = Object.assign( object, {
		_document: this,
		id: slug,
	} );
	const fragment:T & TransientBlankNode = TransientBlankNode.createFrom( baseBNode );
	this._fragmentsIndex.set( fragment.id, fragment );

	TransientDocument._convertNestedObjects( this, fragment );
	return fragment;
}

function createNamedFragment<T extends Object>( object:T, slug:string ):TransientNamedFragment & T;
function createNamedFragment( slug:string ):TransientNamedFragment;
function createNamedFragment<T extends Object>( this:TransientDocument, slugOrObject:any, slug?:string ):T & TransientNamedFragment {
	slug = isString( slugOrObject ) ? slugOrObject : slug;
	const object:T = ! isString( slugOrObject ) && ! ! slugOrObject ? slugOrObject : <T> {};

	if( URI.isBNodeID( slug ) ) throw new IllegalArgumentError( "Named fragments can't have a slug that starts with '_:'." );

	if( URI.isAbsolute( slug ) ) {
		if( ! URI.isFragmentOf( slug, this.id ) ) throw new IllegalArgumentError( "The slug is out of scope." );
		slug = URI.hasFragment( slug ) ? URI.getFragment( slug ) : slug;
	} else if( slug.startsWith( "#" ) ) slug = slug.substring( 1 );

	if( this._fragmentsIndex.has( slug ) ) throw new IDAlreadyInUseError( "The slug provided is already being used by a fragment." );

	const baseFragment:T & BaseNamedFragment = Object.assign( object, {
		_document: this,
		slug,
	} );
	const fragment:T & TransientNamedFragment = TransientNamedFragment.createFrom( baseFragment );
	this._fragmentsIndex.set( slug, fragment );

	TransientDocument._convertNestedObjects( this, fragment );
	return fragment;
}

function removeFragment( this:TransientDocument, fragmentOrSlug:string | TransientFragment ):void {
	let id:string = isString( fragmentOrSlug ) ? fragmentOrSlug : fragmentOrSlug.id;

	if( URI.isAbsolute( id ) ) {
		if( ! URI.isFragmentOf( id, this.id ) ) return;
		id = URI.hasFragment( id ) ? URI.getFragment( id ) : id;
	} else if( id.startsWith( "#" ) ) {
		id = id.substring( 1 );
	}

	this._fragmentsIndex.delete( id );
}

function removeNamedFragment( this:TransientDocument, fragmentOrSlug:TransientNamedFragment | string ):void {
	const id:string = isString( fragmentOrSlug ) ? fragmentOrSlug : fragmentOrSlug.id;

	if( URI.isBNodeID( id ) ) throw new IllegalArgumentError( "You can only remove NamedFragments." );
	this._removeFragment( id );
}

function toJSON( this:TransientDocument, keyOrObjectSchemaResolver?:string | ObjectSchemaResolver, jsonldConverter:JSONLDConverter = new JSONLDConverter() ):RDFDocument {
	const objectSchemaResolver:ObjectSchemaResolver = isObject( keyOrObjectSchemaResolver ) ?
		keyOrObjectSchemaResolver : null;
	const generalSchema:DigestedObjectSchema = objectSchemaResolver ?
		objectSchemaResolver.getGeneralSchema() : new DigestedObjectSchema();

	const resources:object[] = [ this, ...this.getFragments() ];
	const expandedResources:RDFNode[] = resources.map( resource => {
		const resourceSchema:DigestedObjectSchema = objectSchemaResolver ? objectSchemaResolver.getSchemaFor( resource ) : new DigestedObjectSchema();
		return jsonldConverter.expand( resource, generalSchema, resourceSchema );
	} );

	return {
		"@id": this.id,
		"@graph": expandedResources,
	};
}

function normalize( this:TransientDocument ):void {
	const currentFragments:TransientFragment[] = this.getFragments()
		.filter( fragment => URI.isBNodeID( fragment.id ) );
	const usedFragmentsIDs:Set<string> = new Set();

	TransientDocument._convertNestedObjects( this, this, usedFragmentsIDs );
	currentFragments.forEach( fragment => {
		if( usedFragmentsIDs.has( fragment.id ) ) return;
		this._fragmentsIndex.delete( fragment.id );
	} );
}