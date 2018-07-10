import { Parser } from "../HTTP";
import { JSONLDParser } from "../JSONLD";
import * as Utils from "./../Utils";
import { RDFNode } from "./Node";
import { URI } from "./URI";

export interface RDFDocument extends RDFNode {
	"@id":string;
	"@graph":RDFNode[];
}


export interface RDFDocumentFactory {
	is( value:any ):value is RDFDocument;

	create( resources:RDFNode[], uri?:string ):RDFDocument;


	getDocuments( objects:object | object[] ):RDFDocument[];

	getResources( objects:object | object[] ):RDFNode[];

	getDocumentResources( document:RDFNode[] | RDFDocument ):RDFNode[];

	getNamedFragmentResources( document:RDFNode[] | RDFDocument, documentResource?:string | RDFNode ):RDFNode[];

	getBNodeResources( document:RDFDocument ):RDFNode[];

	getNodes( rdfDocument:RDFDocument ):[ RDFNode[], RDFNode[] ];
}

export const RDFDocument:RDFDocumentFactory = {
	is( value:any ):value is RDFDocument {
		return Utils.hasProperty( value, "@graph" )
			&& Utils.isArray( value[ "@graph" ] );
	},

	create( resources:RDFNode[], uri?:string ):RDFDocument {
		return {
			"@id": uri ? uri : "",
			"@graph": resources,
		};
	},


	getDocuments( objects:object | object[] ):RDFDocument[] {
		if( Utils.isArray( objects ) ) return objects
			.filter( RDFDocument.is );

		if( RDFDocument.is( objects ) ) return [ objects ];

		return [];
	},

	getResources( objects:object | object[] ):RDFNode[] {
		const resources:RDFNode[] = RDFNode.getFreeNodes( objects );

		RDFDocument
			.getDocuments( objects )
			.map( document => document[ "@graph" ] )
			.forEach( nodes => resources.push( ...nodes ) )
		;

		return resources;
	},

	getDocumentResources( document:RDFDocument | RDFNode[] ):RDFNode[] {
		return RDFDocument
			.getResources( document )
			.filter( node => ! RDFNode.isFragment( node ) )
			;
	},

	getNamedFragmentResources( document:RDFDocument | RDFNode[], documentResource?:string | RDFNode ):RDFNode[] {
		const uriToMatch:string = Utils.isObject( documentResource ) ?
			RDFNode.getID( documentResource ) :
			documentResource;

		return RDFDocument
			.getResources( document )
			.filter( node => {
				const id:string = RDFNode.getID( node );

				if( ! URI.hasFragment( id ) ) return;

				if( ! uriToMatch ) return true;
				return URI.getDocumentURI( id ) === uriToMatch;
			} )
			;
	},

	getBNodeResources( document:RDFDocument | RDFNode[] ):RDFNode[] {
		return RDFDocument
			.getResources( document )
			.filter( node => {
				const id:string = RDFNode.getID( node );
				return URI.isBNodeID( id );
			} )
			;
	},

	getNodes( rdfDocument:RDFDocument ):[ RDFNode[], RDFNode[] ] {
		const documentNodes:RDFNode[] = [];
		const fragmentNodes:RDFNode[] = [];

		for( const node of rdfDocument[ "@graph" ] ) {
			( RDFNode.isFragment( node ) ? fragmentNodes : documentNodes ).push( node );
		}

		return [ documentNodes, fragmentNodes ];
	},

};


export class RDFDocumentParser extends JSONLDParser implements Parser<RDFDocument[]> {
	parse( input:string ):Promise<RDFDocument[]> {
		return super.parse( input ).then( RDFDocument.getDocuments );
	}
}
