import { URI } from "../RDF/URI";

import { DigestedObjectSchemaProperty } from "./DigestedObjectSchemaProperty";
import { ObjectSchemaUtils } from "./ObjectSchemaUtils";


/**
 * Standardized schema that is used for the SDK for compact and expand JSON-LD objects.
 */
export class DigestedObjectSchema {
	/**
	 * The base URI of the schema.
	 */
	base:string;
	/**
	 * The default language of the string properties.
	 */
	language:string | null;
	/**
	 * URI that will be used to resolve relative URIs that aren't defined in the schema.
	 */
	vocab:string | undefined;
	/**
	 * Map that contains the prefixes of absolutes URIs.
	 */
	prefixes:Map<string, string>;
	/**
	 * Map that contains the definitions of the properties in the schema.
	 */
	properties:Map<string, DigestedObjectSchemaProperty>;

	constructor() {
		this.base = "";
		this.vocab = undefined;
		this.language = null;
		this.prefixes = new Map<string, string>();
		this.properties = new Map<string, DigestedObjectSchemaProperty>();
	}

	/**
	 * Tries to resolve a non absolute URI using the schema and the configuration provided.
	 *
	 * The configuration indicates if the `vocab` or the `base` URI must be used to resolve the URI;
	 * if both are set, the `vocab` one takes preference before the `base`-
	 *
	 * @param uri Relative URI to resolve.
	 * @param relativeTo Object with flags indicating which resolution mode to use.
	 */
	resolveURI( uri:string, relativeTo?:{ vocab?:boolean, base?:boolean } ):string;
	/**
	 * Tries to resolve a non absolute URI using the schema and the configuration provided.
	 *
	 * The configuration indicates if the `vocab` or the `base` URI must be used to resolve the URI;
	 * if both are set, the `vocab` one takes preference before the `base`-
	 *
	 * @param uri Relative URI to resolve.
	 * @param relativeTo Object with flags indicating which resolution mode to use.
	 */
	resolveURI( uri:string | null, relativeTo?:{ vocab?:boolean, base?:boolean } ):string | null;
	resolveURI( uri:string | null, relativeTo:{ vocab?:boolean, base?:boolean } = {} ):string | null {
		if( uri === null || URI.isAbsolute( uri ) || URI.isBNodeID( uri ) ) return uri;

		const [ prefix, localName = "" ]:[ string, string ] = uri.split( ":" ) as [ string, string ];

		const definedReference:string | null = this.prefixes.has( prefix ) ?
			this.prefixes.get( prefix )! : this.properties.has( prefix ) ?
				this.properties.get( prefix )!.uri
				: null;

		if( definedReference !== null && definedReference !== prefix ) {
			return this.resolveURI( definedReference + localName, { vocab: true } );
		}

		if( localName ) return uri;

		if( relativeTo.vocab && this.vocab ) return this.vocab + uri;
		if( relativeTo.base ) return URI.resolve( this.base, uri );

		return uri;
	}

	/**
	 * Returns the definition of a property resolving internal URIs
	 * using the current schema configuration.
	 *
	 * If no property exists with the name provided `undefined` is returned.
	 *
	 * @param name Property name to return its definition.
	 */
	getProperty( name:string ):DigestedObjectSchemaProperty | undefined {
		if( ! this.properties.has( name ) ) return void 0;
		return ObjectSchemaUtils._resolveProperty( this, this.properties.get( name )! );
	}

}
