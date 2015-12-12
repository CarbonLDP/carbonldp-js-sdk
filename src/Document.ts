/// <reference path="./../typings/tsd.d.ts" />

import * as Errors from "./Errors";
import * as Fragment from "./Fragment";
import * as NamedFragment from "./NamedFragment";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Utils from "./Utils";


export interface Class extends Pointer.Library, Pointer.Validator {
	_fragmentsIndex:Map<string, Fragment.Class>;

	uri:string;

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

	let fragment:Fragment.Class = document.getFragment( id );
	fragment = ! fragment ? document.createFragment( id ) : fragment;

	return fragment;

}

function inScope( pointer:Pointer.Class ):boolean;
function inScope( id:string ):boolean;
function inScope( idOrPointer:any ):boolean {
	let document:Class = <Class> this;

	let id:string = Pointer.Factory.is( idOrPointer ) ? idOrPointer.uri : idOrPointer;

	if( id === document.uri ) return false;

	// BNodes need to be already in the index to be in-scope
	if( RDF.URI.Util.isBNodeID( id ) && ! document._fragmentsIndex.has( id ) ) return false;

	if( RDF.URI.Util.isAbsolute( id ) && ! RDF.URI.Util.isFragmentOf( id, document.uri ) ) return false;

	return true;
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
		if( ! RDF.URI.Util.isFragmentOf( id, document.uri ) ) throw new Errors.IllegalArgumentError( "The id is out of scope." );
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
		if( ! RDF.URI.Util.isFragmentOf( slug, document.uri ) ) throw new Errors.IllegalArgumentError( "The slug is out of scope." );
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

function toJSON():string {
	let resources:{ toJSON:() => string }[] = [];
	resources.push( this );
	resources.push( this.getFragments() );

	let toJSONFunctions:(() => string)[] = [];

	for( let resource of resources ) {
		let toJSON:() => string = null;
		if( "toJSON" in resource ) {
			toJSONFunctions.push( resource.toJSON );
			delete resource.toJSON;
		}
		toJSONFunctions.push( toJSON );
	}

	let rdfDocument:RDF.Document.Class = {
		"@graph": <any> resources
	};
	if( this.uri ) rdfDocument[ "@id" ] = this.id;
	let json:string = JSON.stringify( rdfDocument );

	for( let i:number = 0, length:number = resources.length; i < length; i++ ) {
		if( toJSONFunctions[i] !== null ) resources[ i ].toJSON = toJSONFunctions[i];
	}

	return json;
}

export class Factory {
	hasClassProperties( documentResource:Object ):boolean {
		return (
			Utils.isObject( documentResource ) &&

			Utils.hasPropertyDefined( documentResource, "_fragmentsIndex" ) &&

			Utils.hasPropertyDefined( documentResource, "uri" ) &&

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
		let document:Class = this.decorate( object );

		if( !! uri ) document.uri = uri;
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
			"uri": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: null,
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

	from( rdfDocuments:RDF.Document.Class[] ):Class[];
	from( rdfDocument:RDF.Document.Class ):Class;
	from( rdfDocuments:any ):any {
		if( ! Utils.isArray( rdfDocuments ) ) return this.singleFrom( <RDF.Document.Class> rdfDocuments );

		let documents:Class[] = [];
		for ( let i:number = 0, length:number = rdfDocuments.length; i < length; i ++ ) {
			let rdfDocument:RDF.Document.Class = <RDF.Document.Class> rdfDocuments[ i ];

			documents.push( this.singleFrom( rdfDocument ) );
		}

		return documents;
	}

	protected singleFrom( rdfDocument:RDF.Document.Class ):Class {
		let documentResources:RDF.Node.Class[] = RDF.Document.Util.getDocumentResources( rdfDocument );
		if( documentResources.length > 1 ) throw new Errors.IllegalArgumentError( "The RDFDocument contains more than one document resource." );
		if( documentResources.length === 0 ) throw new Errors.IllegalArgumentError( "The RDFDocument doesn\'t contain a document resource." );

		let documentResource:RDF.Resource.Class = RDF.Resource.factory.from( documentResources[ 0 ] );

		let document:Class = this.decorate( documentResource );

		let fragmentResources:RDF.Node.Class[] = RDF.Document.Util.getBNodeResources( rdfDocument );
		for( let i:number = 0, length:number = fragmentResources.length; i < length; i++ ) {
			let fragmentResource:RDF.Node.Class = fragmentResources[ i ];

			let fragment:Fragment.Class = Fragment.factory.from( fragmentResource, document );

			if( ! fragment.uri ) fragment.uri = Fragment.Util.generateID();
			document._fragmentsIndex.set( fragment.uri, fragment );
		}

		let namedFragmentResources:RDF.Node.Class[] = RDF.Document.Util.getFragmentResources( rdfDocument );
		for( let i:number = 0, length:number = namedFragmentResources.length; i < length; i++ ) {
			let namedFragmentResource:RDF.Node.Class = <any> namedFragmentResources[i];

			let namedFragment:NamedFragment.Class = NamedFragment.factory.from( namedFragmentResource, document );

			document._fragmentsIndex.set( RDF.URI.Util.getFragment( namedFragment.uri ), namedFragment );
		}

		return document;
	}
}

export var factory:Factory = new Factory();

export default Document;
