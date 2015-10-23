import * as Value from './Value';
import * as RDFNode from './RDFNode';
import * as Utils from '../Utils';
import * as URI from './URI';

interface RDFDocument extends RDFNode.Class {
	'@graph':RDFNode.Class[];
}

class Factory {
	static is( object:Object ):boolean {
		//@formatter:off
		return (
			Utils.hasProperty( object, '@graph' )
		);
		//@formatter:on
	}

	static create( resources:RDFNode.Class[] ):RDFDocument;
	static create( resources:RDFNode.Class[], uri?:string ):RDFDocument {
		var document:any = uri ? RDFNode.Factory.create( uri ) : {};
		document[ '@graph' ] = resources;

		return document;
	}
}

class Util {
	static getDocuments( object:Object[] ):RDFDocument[];
	static getDocuments( object:Object ):RDFDocument[];
	static getDocuments( value:any ):RDFDocument[] {
		if ( Utils.isArray( value ) ) {
			if ( value.length === 0 ) return value;
			if ( Factory.is( value[ 0 ] ) ) return value;
			if ( RDFNode.Factory.is( value[ 0 ] ) ) return [ Factory.create( value ) ];
		} else if ( Utils.isObject( value ) ) {
			if ( Factory.is( value ) ) return [ value ];
			if ( RDFNode.Factory.is( value ) ) return [ Factory.create( [ value ] ) ];
		} else throw new Error( "IllegalArgument: The value structure isn't valid." );
	}

	static getResources( document:RDFNode.Class[] ):RDFNode.Class[];
	static getResources( document:RDFDocument ):RDFNode.Class[];
	static getResources( document:any ):RDFNode.Class[] {
		if ( Utils.isArray( document ) ) {
			if ( document.length === 0 ) return document;
			if ( document.length === 1 ) {
				if ( Utils.isArray( document[ 0 ] ) ) return Util.getResources( document[ 0 ] );
				if ( ! Utils.isObject( document[ 0 ] ) ) throw new Error( "IllegalArgument: The document structure isn't valid." );
				if ( ! document[ 0 ].hasOwnProperty( '@graph' ) ) return document;
				return Util.getResources( document[ 0 ][ '@graph' ] );
			}
			return document;
		} else {
			if ( ! Utils.isObject( document ) ) throw new Error( "IllegalArgument: The document structure isn't valid." );
			if ( ! document.hasOwnProperty( '@graph' ) ) throw new Error( "IllegalArgument: The document structure isn't valid." );
			return Util.getResources( document[ '@graph' ] );
		}
	}

	static getDocumentResources( document:RDFNode.Class[] ):RDFNode.Class[];
	static getDocumentResources( document:RDFDocument ):RDFNode.Class[];
	static getDocumentResources( document:any ):RDFNode.Class[] {
		let resources:RDFNode.Class[] = Util.getResources( document );
		let documentResources:RDFNode.Class[] = [];

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			let resource:RDFNode.Class = resources[ i ];
			let uri:string = resource[ '@id' ];
			if ( ! uri ) continue;

			if ( ! URI.Util.hasFragment( uri ) ) documentResources.push( resource );
		}

		return documentResources;
	}

	static getFragmentResources( document:RDFNode.Class[], documentResource ?:RDFNode.Class ):RDFNode.Class[];
	static getFragmentResources( document:RDFDocument, documentResource ?:RDFNode.Class ):RDFNode.Class[];
	static getFragmentResources( document:RDFNode.Class[], documentResource ?:string ):RDFNode.Class[];
	static getFragmentResources( document:RDFDocument, documentResource ?:string ):RDFNode.Class[];
	static getFragmentResources( document:any, documentResource ?:any ):RDFNode.Class[] {
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

//@formatter:off
export {
	RDFDocument as Class,
	Factory,
	Util
};
//@formatter:on