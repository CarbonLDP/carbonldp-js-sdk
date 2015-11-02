/// <reference path="./../typings/es6/es6.d.ts" />

import * as Fragment from './Fragment';
import * as NamedFragment from './NamedFragment';
import * as RDF from './RDF';
import * as Utils from './Utils';
import * as Errors from './Errors';

export interface Class extends RDF.Resource.Class {
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
	removeFragment( fragmentOrSlug ):void;

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
function createFragment( slug ):any {
	let document:Class = <Class> this;
	if( slug ) return document.createNamedFragment( slug );

	let id:string = Fragment.Util.generateID();
	let fragmentObject:RDF.Node.Class & { document:Class } = {
		'@id': id,
		'document': document
	};

	let fragment:Fragment.Class = Fragment.factory.from( fragmentObject );

	document._fragmentsIndex.set( id, fragment );

	return fragment
}
function createNamedFragment( slug:string ):NamedFragment.Class {
	let document:Class = <Class> this;

	if( RDF.URI.Util.isBNodeID( slug ) ) throw new Errors.IllegalArgumentError( "Named fragments can't have a slug that starts with '_:'." );
	slug = RDF.URI.Util.hasFragment( slug ) ? RDF.URI.Util.getFragment( slug ) : slug;
	if( document._fragmentsIndex.has( slug ) ) throw new Errors.IDAlreadyInUseError( "The slug provided is already being used by a fragment." );

	let uri:string = document.uri + '#' + slug;
	let fragmentObject:RDF.Node.Class & { document:Class } = {
		'@id': uri,
		'document': document
	};

	let fragment:NamedFragment.Class = <NamedFragment.Class> NamedFragment.factory.from( fragmentObject );

	document._fragmentsIndex.set( slug, fragment );

	return fragment;
}

function removeFragment( fragment:NamedFragment.Class ):void;
function removeFragment( fragment:Fragment.Class ):void;
function removeFragment( slug:string ):void;
function removeFragment( fragmentOrSlug ):void {
	// TODO: FT
}

function toJSON():string {
	let rdfDocument:RDF.Document.Class = {
		'@graph': this.getFragments()
	};
	if( this.uri ) rdfDocument['@id'] = this.id;

	rdfDocument['@graph'].push( this );

	return JSON.stringify( rdfDocument );
}

export class Factory extends RDF.Resource.Factory {
	from( rdfDocuments:RDF.Document.Class[] ):Class[];
	from( rdfDocument:RDF.Document.Class ):Class;
	from( rdfDocuments ):any {
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
		if( documentResources.length > 1 ) throw new Errors.IllegalArgumentError('The RDFDocument contains more than one document resource.');
		else if( documentResources.length === 0 ) throw new Errors.IllegalArgumentError('The RDFDocument doesn\'t contain a document resource.');

		let document:Class = this.injectBehavior( documentResources[ 0 ] );

		let fragmentResources:RDF.Node.Class[] = RDF.Document.Util.getBNodeResources( rdfDocument );
		for( let i = 0, length = fragmentResources.length; i < length; i++ ) {
			let fragmentResource:RDF.Node.Class & {document:Class} = <any>fragmentResources[i];
			fragmentResource.document = document;

			let fragment:Fragment.Class = Fragment.factory.from( fragmentResource );

			if( ! fragment.uri ) fragment.uri = Fragment.Util.generateID();
			document._fragmentsIndex.set( fragment.uri, fragment );
		}

		let namedFragmentResources:RDF.Node.Class[] = RDF.Document.Util.getFragmentResources( rdfDocument );
		for( let i = 0, length = namedFragmentResources.length; i < length; i++ ) {
			let namedFragmentResource:RDF.Node.Class & { document:Class } = <any>namedFragmentResources[i];
			namedFragmentResource.document = document;

			let namedFragment:NamedFragment.Class = NamedFragment.factory.from( namedFragmentResource );

			document._fragmentsIndex.set( RDF.URI.Util.getFragment( namedFragment.uri ), namedFragment );
		}

		return document;
	}

	protected injectBehavior( resource:RDF.Node.Class ):Class {
		let documentResource:RDF.Resource.Class = super.injectBehavior( resource );

		if( this.hasClassProperties( documentResource ) ) return <Class> documentResource;

		Object.defineProperties( documentResource, {
			'_fragmentsIndex': {
				writable: false,
				enumerable: false,
				configurable: false,
				value: new Map<string, Fragment.Class>()
			},
			'hasFragment': {
				writable: false,
				enumerable: false,
				configurable: false,
				value: hasFragment
			},
			'getFragment': {
				writable: false,
				enumerable: false,
				configurable: false,
				value: getFragment
			},
			'getNamedFragment': {
				writable: false,
				enumerable: false,
				configurable: false,
				value: getNamedFragment
			},
			'getFragments': {
				writable: false,
				enumerable: false,
				configurable: false,
				value: getFragments
			},
			'createFragment': {
				writable: false,
				enumerable: false,
				configurable: false,
				value: createFragment
			},
			'createNamedFragment': {
				writable: false,
				enumerable: false,
				configurable: false,
				value: createNamedFragment
			},
			'removeFragment': {
				writable: false,
				enumerable: false,
				configurable: false,
				value: removeFragment
			},
			'toJSON': {
				writable: false,
				enumerable: false,
				configurable: false,
				value: toJSON
			}
		} );

		return <any> documentResource;
	}

	protected hasClassProperties( documentResource:RDF.Resource.Class ):boolean {
		return (
			Utils.hasPropertyDefined( documentResource, '_fragmentsIndex' )
		);
	}
}

export var factory:Factory = new Factory();

export default Document;