import * as Value from "./Value";
import * as RDFNode from "./RDFNode";
import * as Utils from "../Utils";
import * as URI from "./URI";

export interface Class {
	"@id"?:string;
	"@graph":RDFNode.Class[];
}

export class Factory {
	static is( object:Object ):boolean {
		return (
			Utils.hasProperty( object, "@graph" )
		);
	}

	static create( resources:RDFNode.Class[] ):Class;
	static create( resources:RDFNode.Class[], uri?:string ):Class {
		let document:any = uri ? RDFNode.Factory.create( uri ) : {};
		document[ "@graph" ] = resources;

		return document;
	}
}

export class Util {
	static getDocuments( object:Object[] ):Class[];
	static getDocuments( object:Object ):Class[];
	static getDocuments( value:any ):Class[] {
		if ( Utils.isArray( value ) ) {
			if ( value.length === 0 ) return value;
			if ( Factory.is( value[ 0 ] ) ) return value;
			if ( RDFNode.Factory.is( value[ 0 ] ) ) return [ Factory.create( value ) ];
		} else if ( Utils.isObject( value ) ) {
			if ( Factory.is( value ) ) return [ value ];
			if ( RDFNode.Factory.is( value ) ) return [ Factory.create( [ value ] ) ];
		} else throw new Error( "IllegalArgument: The value structure isn't valid." );
	}

	static getResources( objects:Object[] ):RDFNode.Class[];
	static getResources( object:Object ):RDFNode.Class[];
	static getResources( value:any ):RDFNode.Class[] {
		let documents:Class[] = Util.getDocuments( value );

		let resources:RDFNode.Class[] = [];

		/* tslint:disable: typedef */
		// TSLint is saying that document should have a typedef, but TypeScript doesn't allow typedefs in for .. of loops
		for( let document of documents ) {
			resources = resources.concat( document[ "@graph"] );
		}
		/* tslint:enable: typedef */

		return resources;
	}

	static getDocumentResources( document:RDFNode.Class[] ):RDFNode.Class[];
	static getDocumentResources( document:Class ):RDFNode.Class[];
	static getDocumentResources( document:any ):RDFNode.Class[] {
		let resources:RDFNode.Class[] = Util.getResources( document );
		let documentResources:RDFNode.Class[] = [];

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			let resource:RDFNode.Class = resources[ i ];
			let uri:string = resource[ "@id" ];
			if ( ! uri ) continue;

			if ( ! URI.Util.hasFragment( uri ) && ! URI.Util.isBNodeID( uri ) ) documentResources.push( resource );
		}

		return documentResources;
	}

	static getFragmentResources( document:RDFNode.Class[], documentResource?:RDFNode.Class ):RDFNode.Class[];
	static getFragmentResources( document:Class, documentResource?:RDFNode.Class ):RDFNode.Class[];
	static getFragmentResources( document:RDFNode.Class[], documentResource?:string ):RDFNode.Class[];
	static getFragmentResources( document:Class, documentResource?:string ):RDFNode.Class[];
	static getFragmentResources( document:any, documentResource?:any ):RDFNode.Class[] {
		let resources:RDFNode.Class[] = Util.getResources( document );

		let documentURIToMatch:string = null;
		if ( documentResource ) {
			if ( Utils.isString( documentResource ) ) {
				documentURIToMatch = documentResource;
			} else documentURIToMatch = documentResource[ "@id" ];
		}

		let fragmentResources:RDFNode.Class[] = [];

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			let resource:RDFNode.Class = resources[ i ];
			let uri:string = resource[ "@id" ];

			if ( ! uri ) continue;
			if ( ! URI.Util.hasFragment( uri ) ) continue;

			if ( ! documentURIToMatch ) {
				fragmentResources.push( resource );
			} else {
				let documentURI:string = URI.Util.getDocumentURI( uri );
				if ( documentURI === documentURIToMatch ) fragmentResources.push( resource );
			}
		}

		return fragmentResources;
	}

	static getBNodeResources( document:Class ):RDFNode.Class[] {
		let resources:RDFNode.Class[] = Util.getResources( document );

		let bnodes:RDFNode.Class[] = [];
		for( let i:number = 0, length:number = resources.length; i < length; i++ ) {
			let resource:RDFNode.Class = resources[i];
			if( ! ( "@id" in resource ) || URI.Util.isBNodeID( resource["@id"] ) ) bnodes.push( resource );
		}

		return bnodes;
	}
}
