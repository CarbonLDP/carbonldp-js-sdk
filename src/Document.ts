import * as Errors from "./Errors";
import * as Fragment from "./Fragment";
import JSONLDConverter from "./JSONLDConverter";
import * as NamedFragment from "./NamedFragment";
import * as ObjectSchema from "./ObjectSchema";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Resource from "./Resource";
import * as Utils from "./Utils";

export interface Class extends Resource.Class, Pointer.Library, Pointer.Validator {
	_fragmentsIndex:Map<string, Fragment.Class>;

	addType( type:string ):void;
	hasType( type:string ):boolean;
	removeType( type:string ):void;

	hasFragment( slug:string ):boolean;
	getFragment( slug:string ):Fragment.Class;
	getNamedFragment( slug:string ):NamedFragment.Class;
	getFragments():Fragment.Class[];

	createFragment<T extends Object>( slug:string, object:T ):NamedFragment.Class & T;
	createFragment<T extends Object>( object:T ):Fragment.Class & T;
	createFragment():Fragment.Class;
	createFragment( slug:string ):NamedFragment.Class;

	createNamedFragment<T extends Object>( slug:string, object:T ):NamedFragment.Class & T;
	createNamedFragment( slug:string ):NamedFragment.Class;

	removeFragment( fragment:NamedFragment.Class ):void;
	removeFragment( fragment:Fragment.Class ):void;
	removeFragment( slug:string ):void;
	removeFragment( fragmentOrSlug:any ):void;

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

	return RDF.URI.Util.isRelative( id );
}

function addType( type:string ):void {
	this.types.push( type );
}
function hasType( type:string ):boolean {
	return this.types.indexOf( type ) !== - 1;
}
function removeType( type:string ):void {
	let index:number = this.types.indexOf( type );
	if( index !== - 1 ) this.types.splice( index, 1 );
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

function createFragment<T extends Object>( slug:string, object:T ):NamedFragment.Class & T;
function createFragment<T extends Object>( object:T ):Fragment.Class & T;
function createFragment( slug:string ):NamedFragment.Class;
function createFragment():Fragment.Class;
function createFragment( slugOrObject?:any, object?:any ):any {
	let document:Class = <Class> this;
	let slug:string = Utils.isString( slugOrObject ) ? slugOrObject : null;
	object = Utils.isString( slugOrObject ) ? object : slugOrObject;
	object = object || {};

	if( slug ) {
		if( ! RDF.URI.Util.isBNodeID( slug ) ) return document.createNamedFragment( slug, object );
		if( this._fragmentsIndex.has( slug ) ) throw new Errors.IDAlreadyInUseError( "The slug provided is already being used by a fragment." );
	}

	let fragment:Fragment.Class = Fragment.Factory.createFrom( object, slug, document );
	document._fragmentsIndex.set( fragment.id, fragment );

	convertNestedObjects( document, fragment );
	return fragment;
}

function createNamedFragment<T extends Object>( slug:string, object:T ):NamedFragment.Class & T;
function createNamedFragment( slug:string ):NamedFragment.Class;
function createNamedFragment( slug:string, object?:any ):any {
	let document:Class = <Class> this;
	object = object || {};

	if( RDF.URI.Util.isBNodeID( slug ) ) throw new Errors.IllegalArgumentError( "Named fragments can't have a slug that starts with '_:'." );

	if( RDF.URI.Util.isAbsolute( slug ) ) {
		if( ! RDF.URI.Util.isFragmentOf( slug, document.id ) ) throw new Errors.IllegalArgumentError( "The slug is out of scope." );
		slug = RDF.URI.Util.hasFragment( slug ) ? RDF.URI.Util.getFragment( slug ) : slug;
	} else if( Utils.S.startsWith( slug, "#" ) ) slug = slug.substring( 1 );

	if( document._fragmentsIndex.has( slug ) ) throw new Errors.IDAlreadyInUseError( "The slug provided is already being used by a fragment." );

	let fragment:NamedFragment.Class = <NamedFragment.Class> NamedFragment.Factory.createFrom( object, slug, document );
	document._fragmentsIndex.set( slug, fragment );

	convertNestedObjects( document, fragment );
	return fragment;
}

function removeFragment( fragment:NamedFragment.Class ):void;
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

function toJSON( objectSchemaResolver:ObjectSchema.Resolver, jsonLDConverter:JSONLDConverter ):string;
function toJSON( objectSchemaResolver:ObjectSchema.Resolver ):string;
function toJSON():string;
function toJSON( objectSchemaResolver:ObjectSchema.Resolver = null, jsonldConverter:JSONLDConverter = null ):string {
	jsonldConverter = ! ! jsonldConverter ? jsonldConverter : new JSONLDConverter();

	let resources:{ toJSON:() => string }[] = [];
	resources.push( this );
	resources = resources.concat( this.getFragments() );

	let expandedResources:RDF.Node.Class[] = [];
	for( let resource of resources ) {
		let digestedContext:ObjectSchema.DigestedObjectSchema = objectSchemaResolver ? objectSchemaResolver.getSchemaFor( resource ) : new ObjectSchema.DigestedObjectSchema();

		expandedResources.push( jsonldConverter.expand( resource, digestedContext ) );
	}

	let graph:RDF.Document.Class = {
		"@id": this.id,
		"@graph": expandedResources,
	};

	return JSON.stringify( graph );
}

export class Factory {
	static hasClassProperties( documentResource:Object ):boolean {
		return (
			Utils.isObject( documentResource ) &&

			Utils.hasPropertyDefined( documentResource, "_fragmentsIndex" ) &&

			Utils.hasFunction( documentResource, "addType" ) &&
			Utils.hasFunction( documentResource, "hasType" ) &&
			Utils.hasFunction( documentResource, "removeType" ) &&

			Utils.hasFunction( documentResource, "hasFragment" ) &&
			Utils.hasFunction( documentResource, "getFragment" ) &&
			Utils.hasFunction( documentResource, "getNamedFragment" ) &&
			Utils.hasFunction( documentResource, "getFragments" ) &&
			Utils.hasFunction( documentResource, "createFragment" ) &&
			Utils.hasFunction( documentResource, "createNamedFragment" ) &&
			Utils.hasFunction( documentResource, "removeFragment" ) &&
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
		if( Factory.is( object ) ) throw new Errors.IllegalArgumentError( "The object passed is already a Document" );

		let resource:Resource.Class = <any> object;
		if( ! Resource.Factory.is( object ) ) resource = Resource.Factory.createFrom( object );

		let document:T & Class = Factory.decorate<T>( <any> resource );
		convertNestedObjects( document, document );

		return document;
	}

	static decorate<T extends Object>( object:T ):T & Class {
		if( Factory.hasClassProperties( object ) ) return <any> object;

		Object.defineProperties( object, {
			"_fragmentsIndex": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: new Map<string, Fragment.Class>(),
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

			"addType": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: addType,
			},
			"hasType": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: hasType,
			},
			"removeType": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: removeType,
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
			"removeFragment": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: removeFragment,
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

function convertNestedObjects( parent:Class, actual:any ):void {
	let next:any;
	let idOrSlug:string;
	let fragment:Fragment.Class;

	let keys:string[] = Object.keys( actual );
	for( let key of keys ) {
		next = actual[ key ];

		if( Utils.isArray( next ) ) {
			convertNestedObjects( parent, next );
			continue;
		}

		if( ! Utils.isPlainObject( next ) || Pointer.Factory.is( next ) ) continue;

		idOrSlug = ( "id" in next ) ? next.id : ( ( "slug" in next ) ? next.slug : "" );
		if( ! parent.inScope( idOrSlug ) ) continue;

		let parentFragment:Fragment.Class = parent.getFragment( idOrSlug );

		if( ! parentFragment ) {
			fragment = parent.createFragment( idOrSlug, next );
			convertNestedObjects( parent, fragment );

		} else if( parentFragment !== next ) {
			Object.assign( parentFragment, next );
			fragment = actual[ key ] = parentFragment;
			convertNestedObjects( parent, fragment );
		}

	}

}

export default Class;
