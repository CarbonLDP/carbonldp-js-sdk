import * as HTTP from "./../HTTP";
import * as JSONLD from "./../JSONLD";
import * as Node from "./Node";
import * as Utils from "./../Utils";
import * as URI from "./URI";

export interface Class {
	"@id"?:string;
	"@graph":Node.Class[];
}

export class Factory {
	static is( object:Object ):boolean {
		return Utils.hasProperty( object, "@graph" )
			&& Utils.isArray( object[ "@graph" ] );
	}

	static create( resources:Node.Class[], uri?:string ):Class {
		let document:any = uri ? Node.Factory.create( uri ) : {};
		document[ "@graph" ] = resources;

		return document;
	}
}

export class Util {
	static getDocuments( objects:Object[] ):Class[];
	static getDocuments( object:Object ):Class[];
	static getDocuments( value:any ):Class[] {
		if( Utils.isArray( value ) ) {
			let array:any[] = <any> value;
			return array.filter( ( element:any ) => Factory.is( element ) );
		} else if( Utils.isObject( value ) ) {
			if( Factory.is( value ) ) return [ value ];
		}
		return [];
	}

	static getResources( objects:Object[] ):Node.Class[];
	static getResources( object:Object ):Node.Class[];
	static getResources( value:any ):Node.Class[] {
		let freeNodes:Node.Class[] = Node.Util.getFreeNodes( value );
		let documents:Class[] = Util.getDocuments( value );

		let resources:Node.Class[] = [].concat( freeNodes );

		for( let document of documents ) {
			resources = resources.concat( document[ "@graph" ] );
		}

		return resources;
	}

	static getDocumentResources( document:Node.Class[] ):Node.Class[];
	static getDocumentResources( document:Class ):Node.Class[];
	static getDocumentResources( document:any ):Node.Class[] {
		let resources:Node.Class[] = Util.getResources( document );
		let documentResources:Node.Class[] = [];

		for( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			let resource:Node.Class = resources[ i ];
			let uri:string = resource[ "@id" ];
			if( ! uri ) continue;

			if( ! URI.Util.hasFragment( uri ) && ! URI.Util.isBNodeID( uri ) ) documentResources.push( resource );
		}

		return documentResources;
	}

	static getFragmentResources( document:Node.Class[], documentResource?:Node.Class ):Node.Class[];
	static getFragmentResources( document:Class, documentResource?:Node.Class ):Node.Class[];
	static getFragmentResources( document:Node.Class[], documentResourceURI?:string ):Node.Class[];
	static getFragmentResources( document:Class, documentResourceURI?:string ):Node.Class[];
	static getFragmentResources( document:any, documentResource?:any ):Node.Class[] {
		let resources:Node.Class[] = Util.getResources( document );

		let documentURIToMatch:string = null;
		if( documentResource ) {
			if( Utils.isString( documentResource ) ) {
				documentURIToMatch = documentResource;
			} else documentURIToMatch = documentResource[ "@id" ];
		}

		let fragmentResources:Node.Class[] = [];

		for( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			let resource:Node.Class = resources[ i ];
			let uri:string = resource[ "@id" ];

			if( ! uri ) continue;
			if( ! URI.Util.hasFragment( uri ) ) continue;

			if( ! documentURIToMatch ) {
				fragmentResources.push( resource );
			} else {
				let documentURI:string = URI.Util.getDocumentURI( uri );
				if( documentURI === documentURIToMatch ) fragmentResources.push( resource );
			}
		}

		return fragmentResources;
	}

	static getBNodeResources( document:Class ):Node.Class[] {
		let resources:Node.Class[] = Util.getResources( document );

		let bnodes:Node.Class[] = [];
		for( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			let resource:Node.Class = resources[ i ];
			if( ! ( "@id" in resource ) || URI.Util.isBNodeID( resource[ "@id" ] ) ) bnodes.push( resource );
		}

		return bnodes;
	}
}

export class Parser implements HTTP.Parser.Class<Class[]> {
	parse( input:string ):Promise<any> {
		let jsonLDParser:JSONLD.Parser.Class = new JSONLD.Parser.Class();
		return jsonLDParser.parse( input ).then( ( expandedResult:any ) => {
			return Util.getDocuments( expandedResult );
		} );
	}
}

export default Class;
