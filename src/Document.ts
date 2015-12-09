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

function hasFragment( id:string ):boolean {
	let document:Class = <Class> this;
	id = RDF.URI.Util.hasFragment( id ) ? RDF.URI.Util.getFragment( id ) : id;
	return document._fragmentsIndex.has( id );
}
function getFragment( id:string ):Fragment.Class {
	let document:Class = <Class> this;
	id = RDF.URI.Util.hasFragment( id ) ? RDF.URI.Util.getFragment( id ) : id;
	return document._fragmentsIndex.get( id );
}
function getNamedFragment( slug:string ):NamedFragment.Class {
	let document:Class = <Class> this;
	if( RDF.URI.Util.isBNodeID( slug ) ) throw new Errors.IllegalArgumentError( "Named fragments can't have a slug that starts with '_:'." );
	slug = RDF.URI.Util.hasFragment( slug ) ? RDF.URI.Util.getFragment( slug ) : slug;
	return <NamedFragment.Class> document._fragmentsIndex.get( slug );
}
function getFragments():Fragment.Class[] {
	let document:Class = <Class> this;
	return Utils.A.from( document._fragmentsIndex.values() );
}

function createFragment( slug:string ):NamedFragment.Class;
function createFragment( slug?:string ):Fragment.Class;
function createFragment( slug:any ):any {
	let document:Class = <Class> this;
	if( slug ) return document.createNamedFragment( slug );

	let id:string = Fragment.Util.generateID();
	let fragmentObject:RDF.Node.Class = {
		"@id": id
	};

	let fragment:Fragment.Class = Fragment.factory.from( fragmentObject, document );

	document._fragmentsIndex.set( id, fragment );

	return fragment;
}
function createNamedFragment( slug:string ):NamedFragment.Class {
	let document:Class = <Class> this;

	if( RDF.URI.Util.isBNodeID( slug ) ) throw new Errors.IllegalArgumentError( "Named fragments can't have a slug that starts with '_:'." );
	slug = RDF.URI.Util.hasFragment( slug ) ? RDF.URI.Util.getFragment( slug ) : slug;
	if( document._fragmentsIndex.has( slug ) ) throw new Errors.IDAlreadyInUseError( "The slug provided is already being used by a fragment." );

	let uri:string = document.uri + "#" + slug;
	let fragmentObject:RDF.Node.Class = {
		"@id": uri
	};

	let fragment:NamedFragment.Class = <NamedFragment.Class> NamedFragment.factory.from( fragmentObject, document );

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

		let document:Class = this.injectBehavior( documentResource );

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

	protected injectBehavior( documentResource:RDF.Resource.Class ):Class {
		if( this.hasClassProperties( documentResource ) ) return <any> documentResource;

		Object.defineProperties( documentResource, {
			"_fragmentsIndex": {
				writable: false,
				enumerable: false,
				configurable: false,
				value: new Map<string, Fragment.Class>(),
			},
			"hasFragment": {
				writable: false,
				enumerable: false,
				configurable: false,
				value: hasFragment,
			},
			"getFragment": {
				writable: false,
				enumerable: false,
				configurable: false,
				value: getFragment,
			},
			"getNamedFragment": {
				writable: false,
				enumerable: false,
				configurable: false,
				value: getNamedFragment,
			},
			"getFragments": {
				writable: false,
				enumerable: false,
				configurable: false,
				value: getFragments,
			},
			"createFragment": {
				writable: false,
				enumerable: false,
				configurable: false,
				value: createFragment,
			},
			"createNamedFragment": {
				writable: false,
				enumerable: false,
				configurable: false,
				value: createNamedFragment,
			},
			"removeFragment": {
				writable: false,
				enumerable: false,
				configurable: false,
				value: removeFragment,
			},
			"toJSON": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: toJSON,
			},
		} );

		return <any> documentResource;
	}
}

export var factory:Factory = new Factory();

export default Document;
