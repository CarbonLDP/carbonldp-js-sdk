import Value from './Value';
import * as RDFNode from './RDFNode';
import * as Utils from '../Utils';
import * as URI from './URI';

interface RDFDocument extends RDFNode.Class {
	'@graph':RDFNode.Class[];
}

class Factory {
	static is( object:Object ):boolean {
		if ( ! Utils.hasProperty( object, '@graph' ) ) return false;
		if ( ! Utils.hasProperty( object, '@id' ) ) return false;

		return true;
	}

	static create( uri:string, resources:RDFNode.Class[] ):RDFDocument {
		return {
			'@id': uri,
			'@graph': resources
		};
	}
}

class Util {
	private static getResources( document:RDFNode.Class[] ):RDFNode.Class[];
	private static getResources( document:RDFDocument ):RDFNode.Class[];
	private static getResources( document:any ):RDFNode.Class[] {
		if ( Utils.isArray( document ) ) return document;
		else return document[ '@graph' ];
	}

	static getDocumentResources( document:RDFNode.Class[] ):RDFNode.Class[];
	static getDocumentResources( document:RDFDocument ):RDFNode.Class[];
	static getDocumentResources( document:any ):RDFNode.Class[] {
		var resources:RDFNode.Class[] = Util.getResources( document );
		var documentResources:RDFNode.Class[] = [];

		for ( var i:number = 0, length:number = resources.length; i < length; i ++ ) {
			var resource:RDFNode.Class = resources[ i ];
			var uri:string = resource[ '@id' ];
			if ( ! uri ) continue;

			if ( ! URI.Util.hasFragment( uri ) ) documentResources.push( resource );
		}

		return documentResources;
	}

	static getFragmentResources( document:RDFNode.Class[], documentResource?:RDFNode.Class ):RDFNode.Class[];
	static getFragmentResources( document:RDFDocument, documentResource?:RDFNode.Class ):RDFNode.Class[];
	static getFragmentResources( document:RDFNode.Class[], documentResource?:string ):RDFNode.Class[];
	static getFragmentResources( document:RDFDocument, documentResource?:string ):RDFNode.Class[];
	static getFragmentResources( document:any, documentResource?:any ):RDFNode.Class[] {
		var resources:RDFNode.Class[] = Util.getResources( document );

		var documentURIToMatch:string = null;
		if ( documentResource ) {
			if ( Utils.isString( documentResource ) ) documentURIToMatch = documentResource;
			else documentURIToMatch = documentResource[ '@id' ];
		}

		var fragmentResources:RDFNode.Class[] = [];

		for ( var i:number = 0, length:number = resources.length; i < length; i ++ ) {
			var resource:RDFNode.Class = resources[ i ];
			var uri:string = resource[ '@id' ];

			if ( ! uri ) continue;
			if ( ! URI.Util.hasFragment( uri ) ) continue;

			if ( ! documentURIToMatch ) fragmentResources.push( resource );
			else {
				var documentURI:string = URI.Util.getDocumentURI( uri );
				if ( documentURI === documentURIToMatch ) fragmentResources.push( resource );
			}
		}

		return fragmentResources;
	}
}

export { RDFDocument as Class, Factory, Util };