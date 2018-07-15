import { URI } from "../RDF/URI";
import { DigestedObjectSchemaProperty } from "./DigestedObjectSchemaProperty";


export class DigestedObjectSchema {
	base:string;
	language:string;
	vocab:string;
	prefixes:Map<string, string>;
	properties:Map<string, DigestedObjectSchemaProperty>;

	constructor() {
		this.base = "";
		this.vocab = void 0;
		this.language = null;
		this.prefixes = new Map<string, string>();
		this.properties = new Map<string, DigestedObjectSchemaProperty>();
	}

	resolveURI( uri:string, relativeTo:{ vocab?:boolean, base?:boolean } = {} ):string {
		if( uri === null || URI.isAbsolute( uri ) || URI.isBNodeID( uri ) ) return uri;

		const [ prefix, localName = "" ]:[ string, string ] = uri.split( ":" ) as [ string, string ];

		const definedReference:string = this.prefixes.has( prefix ) ?
			this.prefixes.get( prefix ) : this.properties.has( prefix ) ?
				this.properties.get( prefix ).uri
				: null;

		if( definedReference !== null && definedReference !== prefix ) {
			return this.resolveURI( definedReference + localName, { vocab: true } );
		}

		if( localName ) return uri;

		if( relativeTo.vocab && this.vocab ) return this.vocab + uri;
		if( relativeTo.base ) return URI.resolve( this.base, uri );

		return uri;
	}

}
