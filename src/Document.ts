/// <reference path="./../typings/typings.d.ts" />

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

	hasFragment( slug:string ):boolean;
	getFragment( slug:string ):Fragment.Class;
	getNamedFragment( slug:string ):NamedFragment.Class;
	getFragments():Fragment.Class[];

	createFragment():Fragment.Class;
	createFragment( slug:string ):NamedFragment.Class;
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

	if( ! document.inScope( id ) ) return false;

	return !! document.getFragment( id );
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

	if( RDF.URI.Util.isAbsolute( id ) && RDF.URI.Util.isFragmentOf( id, document.id ) ) return true;

	if( ! RDF.URI.Util.isAbsolute( document.id ) && ! RDF.URI.Util.isAbsolute( id ) && RDF.URI.Util.isFragmentOf( id, document.id ) ) return true;

	return false;
}

function hasFragment( id:string ):boolean {
	let document:Class = <Class> this;

	if( ! document.inScope( id ) ) return false;

	return !! document._fragmentsIndex.has( id );
}
function getFragment( id:string ):Fragment.Class {
	let document:Class = <Class> this;

	if( ! RDF.URI.Util.isBNodeID( id ) ) return document.getNamedFragment( id );

	return document._fragmentsIndex.get( id );
}
function getNamedFragment( id:string ):NamedFragment.Class {
	let document:Class = <Class> this;

	if( RDF.URI.Util.isBNodeID( id ) ) throw new Errors.IllegalArgumentError( "Named fragments can't have a id that starts with '_:'." );
	if( RDF.URI.Util.isAbsolute( id ) ) {
		if( ! RDF.URI.Util.isFragmentOf( id, document.id ) ) throw new Errors.IllegalArgumentError( "The id is out of scope." );
		id = RDF.URI.Util.hasFragment( id ) ? RDF.URI.Util.getFragment( id ) : id;
	} else if( Utils.S.startsWith( id, "#" ) ) id = id.substring( 1 );

	return <NamedFragment.Class> document._fragmentsIndex.get( id );
}
function getFragments():Fragment.Class[] {
	let document:Class = <Class> this;
	return Utils.A.from( document._fragmentsIndex.values() );
}

function createFragment( slug:string ):NamedFragment.Class;
function createFragment( slug?:string ):Fragment.Class;
function createFragment( slug:any ):any {
	let document:Class = <Class> this;

	let id:string;
	if( slug ) {
		if( ! RDF.URI.Util.isBNodeID( slug ) ) return document.createNamedFragment( slug );
		id = slug;
		if( this._fragmentsIndex.has( id ) ) return this.getFragment( id );
	} else {
		id = Fragment.Util.generateID();
	}

	let fragment:Fragment.Class = Fragment.factory.create( id, document );

	document._fragmentsIndex.set( id, fragment );

	return fragment;
}
function createNamedFragment( slug:string ):NamedFragment.Class {
	let document:Class = <Class> this;

	if( RDF.URI.Util.isBNodeID( slug ) ) throw new Errors.IllegalArgumentError( "Named fragments can't have a slug that starts with '_:'." );

	if( RDF.URI.Util.isAbsolute( slug ) ) {
		if( ! RDF.URI.Util.isFragmentOf( slug, document.id ) ) throw new Errors.IllegalArgumentError( "The slug is out of scope." );
		slug = RDF.URI.Util.hasFragment( slug ) ? RDF.URI.Util.getFragment( slug ) : slug;
	} else if( Utils.S.startsWith( slug, "#" ) ) slug = slug.substring( 1 );

	if( document._fragmentsIndex.has( slug ) ) throw new Errors.IDAlreadyInUseError( "The slug provided is already being used by a fragment." );

	let fragment:NamedFragment.Class = <NamedFragment.Class> NamedFragment.factory.create( slug, document );

	document._fragmentsIndex.set( slug, fragment );

	return fragment;
}

function removeFragment( fragment:NamedFragment.Class ):void;
function removeFragment( fragment:Fragment.Class ):void;
function removeFragment( slug:string ):void;
function removeFragment( fragmentOrSlug:any ):void {
	// TODO: FT
}

function toJSON( objectSchemaResolver:ObjectSchema.Resolver, jsonLDConverter:JSONLDConverter ):string;
function toJSON( objectSchemaResolver:ObjectSchema.Resolver ):string;
function toJSON():string;
function toJSON( objectSchemaResolver:ObjectSchema.Resolver = null, jsonldConverter:JSONLDConverter = null ):string {
	jsonldConverter = !! jsonldConverter ? jsonldConverter : new JSONLDConverter();

	let resources:{ toJSON:() => string }[] = [];
	resources.push( this );
	resources = resources.concat( this.getFragments() );

	let expandedResources:RDF.Node.Class[] = [];
	for( let resource of resources ) {
		let digestedContext:ObjectSchema.DigestedObjectSchema = objectSchemaResolver ? objectSchemaResolver.getSchemaFor( resource ) : new ObjectSchema.DigestedObjectSchema();

		expandedResources.push( jsonldConverter.expand( resource, digestedContext, this ) );
	}

	let graph:RDF.Document.Class = {
		"@id": this.id,
		"@graph": expandedResources,
	};

	return JSON.stringify( graph );
}

export class Factory {
	hasClassProperties( documentResource:Object ):boolean {
		return (
			Utils.isObject( documentResource ) &&

			Utils.hasPropertyDefined( documentResource, "_fragmentsIndex" ) &&

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

	create( uri:string ):Class;
	create():Class;
	create( uri:string = null ):Class {
		return this.createFrom( {}, uri );
	}

	createFrom<T extends Object>( object:T, uri:string ):T & Class;
	createFrom<T extends Object>( object:T ):T & Class;
	createFrom<T extends Object>( object:T, uri:string = null ):T & Class {
		if( !! uri && RDF.URI.Util.isBNodeID( uri ) ) throw new Errors.IllegalArgumentError( "Documents cannot have a BNodeID as a uri." );

		let resource:Resource.Class = Resource.Factory.createFrom( object, uri );

		let document:Class = this.decorate( resource );

		return <any> document;
	}

	decorate<T extends Object>( object:T ):T & Class {
		if( this.hasClassProperties( object ) ) return <any> object;

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

export var factory:Factory = new Factory();

export default Document;
