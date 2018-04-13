import { BlankNode } from "./BlankNode";
import { IDAlreadyInUseError } from "./Errors/IDAlreadyInUseError";
import { IllegalArgumentError } from "./Errors/IllegalArgumentError";
import { Fragment } from "./Fragment";
import { JSONLDConverter } from "./JSONLD/Converter";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import { NamedFragment } from "./NamedFragment";
import {
	DigestedObjectSchema,
	ObjectSchema,
	ObjectSchemaResolver,
} from "./ObjectSchema";
import {
	Pointer,
	PointerLibrary,
	PointerValidator,
} from "./Pointer";
import { RDFDocument } from "./RDF/Document";
import { RDFNode } from "./RDF/Node";
import { URI } from "./RDF/URI";
import { Resource } from "./Resource";
import {
	hasFunction,
	hasPropertyDefined,
	isObject,
	isPlainObject,
	isString,
} from "./Utils";
import { C } from "./Vocabularies/C";
import { LDP } from "./Vocabularies/LDP";
import { XSD } from "./Vocabularies/XSD";


export interface Document extends Resource, PointerLibrary, PointerValidator {
	defaultInteractionModel?:Pointer;
	isMemberOfRelation?:Pointer;
	hasMemberRelation?:Pointer;

	_fragmentsIndex:Map<string, Fragment>;

	_normalize():void;


	_removeFragment( slugOrFragment:string | Fragment ):void;


	hasFragment( slug:string ):boolean;


	getFragment<T>( slug:string ):T & Fragment;

	getNamedFragment<T>( slug:string ):T & NamedFragment;


	getFragments():Fragment[];


	createFragment<T>( object:T, slug?:string ):T & Fragment;

	createFragment( slug?:string ):Fragment;


	createNamedFragment<T>( object:T, slug:string ):T & NamedFragment;

	createNamedFragment( slug:string ):NamedFragment;


	removeNamedFragment( slugOrFragment:string | NamedFragment ):void;


	toJSON( objectSchemaResolver?:ObjectSchemaResolver, jsonldConverter?:JSONLDConverter ):RDFDocument;
}


export interface DocumentFactory extends ModelFactory<Document>, ModelDecorator<Document> {
	TYPE:string;
	SCHEMA:ObjectSchema;


	is( object:object ):object is Document;

	isDecorated( object:object ):object is Document;


	create():Document;

	createFrom<T extends object>( object:T ):T & Document;

	decorate<T extends object>( object:T ):T & Document;


	_convertNestedObjects( parent:Document, actual:any, fragmentsTracker?:Set<string> ):void;
}


const SCHEMA:ObjectSchema = {
	"contains": {
		"@id": LDP.contains,
		"@container": "@set",
		"@type": "@id",
	},
	"members": {
		"@id": LDP.member,
		"@container": "@set",
		"@type": "@id",
	},
	"membershipResource": {
		"@id": LDP.membershipResource,
		"@type": "@id",
	},
	"isMemberOfRelation": {
		"@id": LDP.isMemberOfRelation,
		"@type": "@id",
	},
	"hasMemberRelation": {
		"@id": LDP.hasMemberRelation,
		"@type": "@id",
	},
	"insertedContentRelation": {
		"@id": LDP.insertedContentRelation,
		"@type": "@id",
	},
	"created": {
		"@id": C.created,
		"@type": XSD.dateTime,
	},
	"modified": {
		"@id": C.modified,
		"@type": XSD.dateTime,
	},
	"defaultInteractionModel": {
		"@id": C.defaultInteractionModel,
		"@type": "@id",
	},
	"accessPoints": {
		"@id": C.accessPoint,
		"@type": "@id",
		"@container": "@set",
	},
};

export const Document:DocumentFactory = {
	TYPE: C.Document,
	SCHEMA,

	isDecorated: ( object ):object is Document =>
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

	is: ( object ):object is Document =>
		Resource.is( object ) &&
		Document.isDecorated( object )
	,


	decorate: <T extends object>( object:T ) => {
		if( Document.isDecorated( object ) ) return object;

		Resource.decorate( object );

		Object.defineProperties( object, {
			"_fragmentsIndex": {
				configurable: true,
				value: new Map<string, Fragment>(),
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

	createFrom: <T extends object>( object:T ) => {
		if( Document.is( object ) ) throw new IllegalArgumentError( "The object provided is already a Document." );

		const document:T & Document = Document.decorate<T>( object );
		Document._convertNestedObjects( document, document );

		return document;
	},

	create: () => Document.createFrom( {} ),


	_convertNestedObjects( parent:Document, actual:any, fragmentsTracker:Set<string> = new Set() ):void {
		for( let key of Object.keys( actual ) ) {
			const next:any = actual[ key ];

			if( Array.isArray( next ) ) {
				Document._convertNestedObjects( parent, next, fragmentsTracker );
				continue;
			}

			if( ! isPlainObject( next ) ) continue;
			if( Document.is( next ) ) continue;

			const idOrSlug:string = getNestedObjectId( next );
			if( ! ! idOrSlug && ! inScope.call( parent, idOrSlug ) ) continue;

			const parentFragment:Fragment = parent.getFragment( idOrSlug );
			if( ! parentFragment ) {
				const fragment:Fragment = parent.createFragment( <Object> next, idOrSlug );
				Document._convertNestedObjects( parent, fragment, fragmentsTracker );

			} else if( parentFragment !== next ) {
				const fragment:Fragment = actual[ key ] = Object.assign( parentFragment, next );
				Document._convertNestedObjects( parent, fragment, fragmentsTracker );

			} else if( ! fragmentsTracker.has( next.id ) ) {
				fragmentsTracker.add( next.id );
				Document._convertNestedObjects( parent, next, fragmentsTracker );
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


function hasPointer( this:Document, id:string ):boolean {
	if( id === this.id ) return true;
	if( ! this.inScope( id ) ) return false;

	return this.hasFragment( id );
}

function getPointer( this:Document, id:string ):Pointer {
	if( ! this.inScope( id ) ) return null;
	if( id === this.id ) return this;

	return this.hasFragment( id ) ?
		this.getFragment( id ) :
		this.createFragment( id );
}

function inScope( this:Document, idOrPointer:string | Pointer ):boolean {
	const id:string = isString( idOrPointer ) ? idOrPointer : idOrPointer.id;

	if( id === this.id ) return true;
	if( URI.isBNodeID( id ) ) return true;
	if( URI.isFragmentOf( id, this.id ) ) return true;
	return id.startsWith( "#" );
}

function hasFragment( this:Document, id:string ):boolean {
	if( URI.isAbsolute( id ) ) {
		if( ! URI.isFragmentOf( id, this.id ) ) return false;
		id = URI.hasFragment( id ) ? URI.getFragment( id ) : id;
	} else if( id.startsWith( "#" ) ) {
		id = id.substring( 1 );
	}

	return this._fragmentsIndex.has( id );
}

function getFragment( this:Document, id:string ):Fragment {
	if( ! URI.isBNodeID( id ) ) return this.getNamedFragment( id );
	return this._fragmentsIndex.get( id ) || null;
}

function getNamedFragment( this:Document, id:string ):NamedFragment {
	if( URI.isBNodeID( id ) ) throw new IllegalArgumentError( "Named fragments can't have a id that starts with '_:'." );
	if( URI.isAbsolute( id ) ) {
		if( ! URI.isFragmentOf( id, this.id ) ) throw new IllegalArgumentError( "The id is out of scope." );
		id = URI.hasFragment( id ) ? URI.getFragment( id ) : id;
	} else if( id.startsWith( "#" ) ) {
		id = id.substring( 1 );
	}

	return <NamedFragment> this._fragmentsIndex.get( id ) || null;
}

function getFragments( this:Document ):Fragment[] {
	return Array.from( this._fragmentsIndex.values() );
}

function createFragment<T extends object>( object:T, slug?:string ):T & Fragment;
function createFragment( slug?:string ):Fragment;
function createFragment<T extends object>( this:Document, slugOrObject?:any, slug?:string ):T & Fragment {
	slug = isString( slugOrObject ) ? slugOrObject : slug;
	const object:T = ! isString( slugOrObject ) && ! ! slugOrObject ? slugOrObject : <T> {};

	if( slug ) {
		if( ! URI.isBNodeID( slug ) ) return this.createNamedFragment<T>( object, slug );
		if( this._fragmentsIndex.has( slug ) ) throw new IDAlreadyInUseError( "The slug provided is already being used by a fragment." );
	}

	const fragment:T & BlankNode = BlankNode.createFrom<T>( object, this, slug );
	this._fragmentsIndex.set( fragment.id, fragment );

	Document._convertNestedObjects( this, fragment );
	return fragment;
}

function createNamedFragment<T extends Object>( object:T, slug:string ):NamedFragment & T;
function createNamedFragment( slug:string ):NamedFragment;
function createNamedFragment<T extends Object>( this:Document, slugOrObject:any, slug?:string ):T & NamedFragment {
	slug = isString( slugOrObject ) ? slugOrObject : slug;
	const object:T = ! isString( slugOrObject ) && ! ! slugOrObject ? slugOrObject : <T> {};

	if( URI.isBNodeID( slug ) ) throw new IllegalArgumentError( "Named fragments can't have a slug that starts with '_:'." );

	if( URI.isAbsolute( slug ) ) {
		if( ! URI.isFragmentOf( slug, this.id ) ) throw new IllegalArgumentError( "The slug is out of scope." );
		slug = URI.hasFragment( slug ) ? URI.getFragment( slug ) : slug;
	} else if( slug.startsWith( "#" ) ) slug = slug.substring( 1 );

	if( this._fragmentsIndex.has( slug ) ) throw new IDAlreadyInUseError( "The slug provided is already being used by a fragment." );

	const fragment:T & NamedFragment = NamedFragment.createFrom<T>( object, this, slug );
	this._fragmentsIndex.set( slug, fragment );

	Document._convertNestedObjects( this, fragment );
	return fragment;
}

function removeFragment( this:Document, fragmentOrSlug:string | Fragment ):void {
	let id:string = isString( fragmentOrSlug ) ? fragmentOrSlug : fragmentOrSlug.id;

	if( URI.isAbsolute( id ) ) {
		if( ! URI.isFragmentOf( id, this.id ) ) return;
		id = URI.hasFragment( id ) ? URI.getFragment( id ) : id;
	} else if( id.startsWith( "#" ) ) {
		id = id.substring( 1 );
	}

	this._fragmentsIndex.delete( id );
}

function removeNamedFragment( this:Document, fragmentOrSlug:NamedFragment | string ):void {
	const id:string = isString( fragmentOrSlug ) ? fragmentOrSlug : fragmentOrSlug.id;

	if( URI.isBNodeID( id ) ) throw new IllegalArgumentError( "You can only remove NamedFragments." );
	this._removeFragment( id );
}

function toJSON( this:Document, keyOrObjectSchemaResolver?:string | ObjectSchemaResolver, jsonldConverter:JSONLDConverter = new JSONLDConverter() ):RDFDocument {
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

function normalize( this:Document ):void {
	const currentFragments:Fragment[] = this.getFragments()
		.filter( fragment => URI.isBNodeID( fragment.id ) );
	const usedFragmentsIDs:Set<string> = new Set();

	Document._convertNestedObjects( this, this, usedFragmentsIDs );
	currentFragments.forEach( fragment => {
		if( usedFragmentsIDs.has( fragment.id ) ) return;
		this._fragmentsIndex.delete( fragment.id );
	} );
}


