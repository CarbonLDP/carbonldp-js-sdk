import * as BlankNode from "./BlankNode";
import * as Errors from "./Errors";
import * as Fragment from "./Fragment";
import JSONLDConverter from "./JSONLD/Converter";
import * as NamedFragment from "./NamedFragment";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Resource from "./Resource";
import * as Utils from "./Utils";

export const RDF_CLASS:string = NS.C.Class.Document;

export const SCHEMA:ObjectSchema.Class = {
	"contains": {
		"@id": NS.LDP.Predicate.contains,
		"@container": "@set",
		"@type": "@id",
	},
	"members": {
		"@id": NS.LDP.Predicate.member,
		"@container": "@set",
		"@type": "@id",
	},
	"membershipResource": {
		"@id": NS.LDP.Predicate.membershipResource,
		"@type": "@id",
	},
	"isMemberOfRelation": {
		"@id": NS.LDP.Predicate.isMemberOfRelation,
		"@type": "@id",
	},
	"hasMemberRelation": {
		"@id": NS.LDP.Predicate.hasMemberRelation,
		"@type": "@id",
	},
	"insertedContentRelation": {
		"@id": NS.LDP.Predicate.insertedContentRelation,
		"@type": "@id",
	},
	"created": {
		"@id": NS.C.Predicate.created,
		"@type": NS.XSD.DataType.dateTime,
	},
	"modified": {
		"@id": NS.C.Predicate.modified,
		"@type": NS.XSD.DataType.dateTime,
	},
	"defaultInteractionModel": {
		"@id": NS.C.Predicate.defaultInteractionModel,
		"@type": "@id",
	},
	"accessPoints": {
		"@id": NS.C.Predicate.accessPoint,
		"@type": "@id",
		"@container": "@set",
	},
};

export interface Class extends Resource.Class, Pointer.Library, Pointer.Validator {
	defaultInteractionModel?:Pointer.Class;
	isMemberOfRelation?:Pointer.Class;
	hasMemberRelation?:Pointer.Class;

	_fragmentsIndex:Map<string, Fragment.Class>;

	_normalize():void;

	_removeFragment( fragment:Fragment.Class ):void;
	_removeFragment( slug:string ):void;

	hasFragment( slug:string ):boolean;
	getFragment<T>( slug:string ):T & Fragment.Class;
	getNamedFragment<T>( slug:string ):T & NamedFragment.Class;
	getFragments():Fragment.Class[];

	createFragment<T>( object:T, slug:string ):T & Fragment.Class;
	createFragment<T>( object:T ):T & Fragment.Class;
	createFragment( slug:string ):Fragment.Class;
	createFragment():Fragment.Class;

	createNamedFragment<T>( object:T, slug:string ):T & NamedFragment.Class;
	createNamedFragment( slug:string ):NamedFragment.Class;

	removeNamedFragment( fragment:NamedFragment.Class ):void;
	removeNamedFragment( slug:string ):void;

	toJSON( objectSchemaResolver:ObjectSchema.Resolver, jsonldConverter:JSONLDConverter ):string;
	toJSON( objectSchemaResolver:ObjectSchema.Resolver ):string;
	toJSON():string;
}

function hasPointer( id:string ):boolean {
	let document:Class = <Class> this;

	if( id === document.id ) return true;

	if( ! document.inScope( id ) ) return false;

	return document.hasFragment( id );
}

function getPointer( id:string ):Pointer.Class {
	let document:Class = <Class> this;

	if( ! document.inScope( id ) ) return null;

	if( id === document.id ) return document;

	let fragment:Fragment.Class = document.getFragment( id );
	fragment = ! fragment ? document.createFragment( id ) : fragment;

	return fragment;
}

function inScope( pointer:Pointer.Class ):boolean;
function inScope( id:string ):boolean;
function inScope( idOrPointer:any ):boolean {
	let document:Class = <Class> this;

	let id:string = Pointer.Factory.is( idOrPointer ) ? idOrPointer.id : idOrPointer;

	if( id === document.id ) return true;

	if( RDF.URI.Util.isBNodeID( id ) ) return true;

	if( RDF.URI.Util.isFragmentOf( id, document.id ) ) return true;

	return RDF.URI.Util.isFragmentOf( id, "" );
}

function hasFragment( id:string ):boolean {
	let document:Class = <Class> this;

	if( RDF.URI.Util.isAbsolute( id ) ) {
		if( ! RDF.URI.Util.isFragmentOf( id, document.id ) ) return false;
		id = RDF.URI.Util.hasFragment( id ) ? RDF.URI.Util.getFragment( id ) : id;
	} else if( Utils.S.startsWith( id, "#" ) ) id = id.substring( 1 );

	return document._fragmentsIndex.has( id );
}
function getFragment( id:string ):Fragment.Class {
	let document:Class = <Class> this;

	if( ! RDF.URI.Util.isBNodeID( id ) ) return document.getNamedFragment( id );

	return document._fragmentsIndex.get( id ) || null;
}
function getNamedFragment( id:string ):NamedFragment.Class {
	let document:Class = <Class> this;

	if( RDF.URI.Util.isBNodeID( id ) ) throw new Errors.IllegalArgumentError( "Named fragments can't have a id that starts with '_:'." );
	if( RDF.URI.Util.isAbsolute( id ) ) {
		if( ! RDF.URI.Util.isFragmentOf( id, document.id ) ) throw new Errors.IllegalArgumentError( "The id is out of scope." );
		id = RDF.URI.Util.hasFragment( id ) ? RDF.URI.Util.getFragment( id ) : id;
	} else if( Utils.S.startsWith( id, "#" ) ) id = id.substring( 1 );

	return <NamedFragment.Class> document._fragmentsIndex.get( id ) || null;
}
function getFragments():Fragment.Class[] {
	let document:Class = <Class> this;
	return Utils.A.from( document._fragmentsIndex.values() );
}

function createFragment<T extends Object>( object:T, slug:string ):T & Fragment.Class;
function createFragment<T extends Object>( object:T ):T & Fragment.Class;
function createFragment( slug:string ):Fragment.Class;
function createFragment():Fragment.Class;
function createFragment<T extends Object>( slugOrObject?:any, slug?:string ):T & Fragment.Class {
	let document:Class = <Class> this;
	slug = Utils.isString( slugOrObject ) ? slugOrObject : slug;
	let object:T = ! Utils.isString( slugOrObject ) && ! ! slugOrObject ? slugOrObject : <T> {};

	if( slug ) {
		if( ! RDF.URI.Util.isBNodeID( slug ) ) return document.createNamedFragment<T>( object, slug );
		if( this._fragmentsIndex.has( slug ) ) throw new Errors.IDAlreadyInUseError( "The slug provided is already being used by a fragment." );
	}

	let fragment:T & BlankNode.Class = BlankNode.Factory.createFrom<T>( object, slug, document );
	document._fragmentsIndex.set( fragment.id, fragment );

	convertNestedObjects( document, fragment );
	return fragment;
}

function createNamedFragment<T extends Object>( object:T, slug:string ):NamedFragment.Class & T;
function createNamedFragment( slug:string ):NamedFragment.Class;
function createNamedFragment<T extends Object>( slugOrObject:any, slug?:string ):T & NamedFragment.Class {
	let document:Class = <Class> this;
	slug = Utils.isString( slugOrObject ) ? slugOrObject : slug;
	let object:T = ! Utils.isString( slugOrObject ) && ! ! slugOrObject ? slugOrObject : <T> {};

	if( RDF.URI.Util.isBNodeID( slug ) ) throw new Errors.IllegalArgumentError( "Named fragments can't have a slug that starts with '_:'." );

	if( RDF.URI.Util.isAbsolute( slug ) ) {
		if( ! RDF.URI.Util.isFragmentOf( slug, document.id ) ) throw new Errors.IllegalArgumentError( "The slug is out of scope." );
		slug = RDF.URI.Util.hasFragment( slug ) ? RDF.URI.Util.getFragment( slug ) : slug;
	} else if( Utils.S.startsWith( slug, "#" ) ) slug = slug.substring( 1 );

	if( document._fragmentsIndex.has( slug ) ) throw new Errors.IDAlreadyInUseError( "The slug provided is already being used by a fragment." );

	let fragment:T & NamedFragment.Class = NamedFragment.Factory.createFrom<T>( object, slug, document );
	document._fragmentsIndex.set( slug, fragment );

	convertNestedObjects( document, fragment );
	return fragment;
}

function removeFragment( fragment:Fragment.Class ):void;
function removeFragment( slug:string ):void;
function removeFragment( fragmentOrSlug:any ):void {
	let document:Class = <Class> this;

	let id:string = Utils.isString( fragmentOrSlug ) ? fragmentOrSlug : <Fragment.Class> fragmentOrSlug.id;

	if( RDF.URI.Util.isAbsolute( id ) ) {
		if( ! RDF.URI.Util.isFragmentOf( id, document.id ) ) return;
		id = RDF.URI.Util.hasFragment( id ) ? RDF.URI.Util.getFragment( id ) : id;
	} else if( Utils.S.startsWith( id, "#" ) ) id = id.substring( 1 );

	document._fragmentsIndex.delete( id );
}

function removeNamedFragment( fragment:NamedFragment.Class ):void;
function removeNamedFragment( slug:string ):void;
function removeNamedFragment( fragmentOrSlug:any ):void {
	let document:Class = <Class> this;

	let id:string = Utils.isString( fragmentOrSlug ) ? fragmentOrSlug : <Fragment.Class> fragmentOrSlug.id;

	if( RDF.URI.Util.isBNodeID( id ) ) throw new Errors.IllegalArgumentError( "You can only remove NamedFragments." );

	document._removeFragment( id );
}

function toJSON( objectSchemaResolver:ObjectSchema.Resolver, jsonldConverter:JSONLDConverter ):string;
function toJSON( objectSchemaResolver:ObjectSchema.Resolver ):string;
function toJSON():string;
function toJSON( objectSchemaResolver:ObjectSchema.Resolver = null, jsonldConverter:JSONLDConverter = null ):string {
	let generalSchema:ObjectSchema.DigestedObjectSchema = objectSchemaResolver ? objectSchemaResolver.getGeneralSchema() : new ObjectSchema.DigestedObjectSchema();
	jsonldConverter = ! ! jsonldConverter ? jsonldConverter : new JSONLDConverter();

	let resources:{ toJSON:() => string }[] = [];
	resources.push( this );
	resources = resources.concat( this.getFragments() );

	let expandedResources:RDF.Node.Class[] = [];
	for( let resource of resources ) {
		let resourceSchema:ObjectSchema.DigestedObjectSchema = objectSchemaResolver ? objectSchemaResolver.getSchemaFor( resource ) : new ObjectSchema.DigestedObjectSchema();

		expandedResources.push( jsonldConverter.expand( resource, generalSchema, resourceSchema ) );
	}

	let graph:RDF.Document.Class = {
		"@id": this.id,
		"@graph": expandedResources,
	};

	return JSON.stringify( graph );
}

function normalize():void {
	let currentFragments:Fragment.Class[] = (<Class> this).getFragments().filter( fragment => RDF.URI.Util.isBNodeID( fragment.id ) );
	let usedFragmentsIDs:Set<string> = new Set();

	convertNestedObjects( this, this, usedFragmentsIDs );

	currentFragments.forEach( fragment => {
		if( ! usedFragmentsIDs.has( fragment.id ) ) {
			(<Class> this)._fragmentsIndex.delete( fragment.id );
		}
	} );
}

export class Factory {
	static hasClassProperties( documentResource:Object ):boolean {
		return (
			Utils.isObject( documentResource ) &&

			Utils.hasPropertyDefined( documentResource, "_fragmentsIndex" ) &&

			Utils.hasFunction( documentResource, "_normalize" ) &&
			Utils.hasFunction( documentResource, "_removeFragment" ) &&

			Utils.hasFunction( documentResource, "hasFragment" ) &&
			Utils.hasFunction( documentResource, "getFragment" ) &&
			Utils.hasFunction( documentResource, "getNamedFragment" ) &&
			Utils.hasFunction( documentResource, "getFragments" ) &&
			Utils.hasFunction( documentResource, "createFragment" ) &&
			Utils.hasFunction( documentResource, "createNamedFragment" ) &&
			Utils.hasFunction( documentResource, "removeNamedFragment" ) &&
			Utils.hasFunction( documentResource, "toJSON" )
		);
	}

	static is( object:Object ):boolean {
		return (
			Resource.Factory.is( object ) &&
			Factory.hasClassProperties( object )
		);
	}

	static create():Class {
		return Factory.createFrom( {} );
	}

	static createFrom<T extends Object>( object:T ):T & Class {
		if( Factory.is( object ) ) throw new Errors.IllegalArgumentError( "The object provided is already a Document" );

		let resource:Resource.Class = <any> object;
		if( ! Resource.Factory.is( object ) ) resource = Resource.Factory.createFrom( object );

		let document:T & Class = Factory.decorate<T>( <any> resource );
		convertNestedObjects( document, document );

		return document;
	}

	static decorate<T extends Object>( object:T ):T & Class {
		Resource.Factory.decorate( object );

		if( Factory.hasClassProperties( object ) ) return <any> object;

		Object.defineProperties( object, {
			"_fragmentsIndex": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: new Map<string, Fragment.Class>(),
			},
			"_normalize": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: normalize,
			},
			"_removeFragment": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: removeFragment,
			},
			"hasPointer": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: hasPointer,
			},
			"getPointer": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: getPointer,
			},
			"inScope": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: inScope,
			},

			"hasFragment": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: hasFragment,
			},
			"getFragment": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: getFragment,
			},
			"getNamedFragment": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: getNamedFragment,
			},
			"getFragments": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: getFragments,
			},
			"createFragment": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: createFragment,
			},
			"createNamedFragment": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: createNamedFragment,
			},
			"removeNamedFragment": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: removeNamedFragment,
			},
			"toJSON": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: toJSON,
			},
		} );

		return <any> object;
	}
}

function convertNestedObjects( parent:Class, actual:any, fragmentsTracker:Set<string> = new Set() ):void {
	let next:any;
	let idOrSlug:string;
	let fragment:Fragment.Class;

	let keys:string[] = Object.keys( actual );
	for( let key of keys ) {
		next = actual[ key ];

		if( Utils.isArray( next ) ) {
			convertNestedObjects( parent, next, fragmentsTracker );
			continue;
		}

		if( ! Utils.isPlainObject( next ) ) continue;
		if( Pointer.Factory.is( next ) ) {
			if( parent.hasFragment( next.id ) && ! fragmentsTracker.has( next.id ) ) {
				fragmentsTracker.add( next.id );
				convertNestedObjects( parent, next, fragmentsTracker );
			}
			continue;
		}

		idOrSlug = ( "id" in next ) ? next.id : ( ( "slug" in next ) ? RDF.URI.Util.hasFragment( next.slug ) ? next.slug : "#" + next.slug : "" );
		if( ! ! idOrSlug && ! parent.inScope( idOrSlug ) ) continue;

		let parentFragment:Fragment.Class = parent.getFragment( idOrSlug );

		if( ! parentFragment ) {
			fragment = parent.createFragment( <Object> next, idOrSlug );
			convertNestedObjects( parent, fragment, fragmentsTracker );

		} else if( parentFragment !== next ) {
			Object.assign( parentFragment, next );
			fragment = actual[ key ] = parentFragment;
			convertNestedObjects( parent, fragment, fragmentsTracker );
		}

	}

}

export default Class;
