import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";

import { isString, StringUtils, UUIDUtils } from "../Utils";


/**
 * Utils for URI strings.
 */
export interface URIFactory {
	/**
	 * Returns true if the URI provided contains a fragment.
	 * @param uri URI to check.
	 */
	hasFragment( uri:string ):boolean;

	/**
	 * Returns true if the URI provided contains query parameters.
	 * @param uri URI to check.
	 */
	hasQuery( uri:string ):boolean;

	/**
	 * Returns true if the URI provided has a protocol.
	 * @param uri URI to check.
	 */
	hasProtocol( uri:string ):boolean;

	/**
	 * Returns true if the URI provided is absolute.
	 * @param uri URI to check.
	 */
	isAbsolute( uri:string ):boolean;

	/**
	 * Returns true if the URI provided is relative.
	 * @param uri URI to check.
	 */
	isRelative( uri:string ):boolean;

	/**
	 * Returns true if the URI provided reference to a BlankNode.
	 * @param uri URI to check.
	 */
	isBNodeID( uri:string ):boolean;

	/**
	 * Returns an ID for a BlankNode using a universally unique identifier (UUID).
	 */
	generateBNodeID():string;

	/**
	 * Returns true if the URI provided has a prefix.
	 * @param uri URI to check.
	 */
	isPrefixed( uri:string ):boolean;

	/**
	 * Returns true if the first URI is a fragment of the second URI provided.
	 * @param fragmentURI URI to check.
	 * @param uri Base URI to be checked against {@param fragmentURI}.
	 */
	isFragmentOf( fragmentURI:string, uri:string ):boolean;

	/**
	 * Returns true if the first URI is parent of the second URI provided.
	 * @param baseURI URI to check its the parent.
	 * @param uri URI to check that is under the {@param baseURI }.
	 */
	isBaseOf( baseURI:string, uri:string ):boolean;

	/**
	 * Returns the relative URI from a base URI provided.
	 * @param absoluteURI URI to be converted into a relative URI.
	 * @param base The base URI to remove from the {@param absoluteURI}.
	 */
	getRelativeURI( absoluteURI:string, base:string ):string;

	/**
	 * Returns the URI that just reference to the document of the URI provided.
	 * @param uri URI to obtains its document URI.
	 */
	getDocumentURI( uri:string ):string;

	/**
	 * Returns the name of the fragment in the URI provided.
	 * If no fragment exists in the URI, null will be returned.
	 * @param uri URI to obtains its fragment section.
	 */
	getFragment( uri:string ):string;

	/**
	 * Returns the slug of the URI.
	 * @param uri URI to obtain ir slug.
	 */
	getSlug( uri:string ):string;

	/**
	 * Returns the query parameters of the URI provided in form of a Map.
	 * @param uri URL to parse is query parameters.
	 */
	getParameters( uri:string ):Map<string, string | string[]>;

	/**
	 * Returns a URI formed from a parent URI and a relative child URI.
	 * @param parentURI The absolute URI to be used as the base for the resolved URI.
	 * @param childURI The relative URI to be appended in the parent URI.
	 */
	resolve( parentURI:string, childURI:string ):string;

	/**
	 * Removes the protocol of the URI provided.
	 * @param uri URI to remove its protocol.
	 */
	removeProtocol( uri:string ):string;

	/**
	 * Replace a base of a URI with the prefix provided.
	 * If the prefix can not be resolved, the URI provided will be returned.
	 * @param uri URI to be prefixed.
	 * @param prefix Prefix name to use in the compaction.
	 * @param prefixURI Prefix URI to ensure the specified URI can be changed for a prefixed name.
	 */
	prefix( uri:string, prefix:string, prefixURI:string ):string;
	/**
	 * Replace the base of a URI with a prefix in accordance with the ObjectSchema provided.
	 * If the prefix can not be resolved, the URI provided will be returned.
	 * @param uri URI to be prefixed.
	 * @param objectSchema Schema to look for a compatible prefix to use.
	 */
	prefix( uri:string, objectSchema:DigestedObjectSchema ):string;
}

/**
 * Constant that implements {@link URIFactory}.
 */
export const URI:URIFactory = {
	hasFragment( uri:string ):boolean {
		return uri.indexOf( "#" ) !== - 1;
	},

	hasQuery( uri:string ):boolean {
		return uri.indexOf( "?" ) !== - 1;
	},

	hasProtocol( uri:string ):boolean {
		return StringUtils.startsWith( uri, "https://" ) || StringUtils.startsWith( uri, "http://" );
	},

	isAbsolute( uri:string ):boolean {
		return StringUtils.startsWith( uri, "http://" )
			|| StringUtils.startsWith( uri, "https://" )
			|| StringUtils.startsWith( uri, "://" );
	},

	isRelative( uri:string ):boolean {
		return ! URI.isAbsolute( uri );
	},

	isBNodeID( uri:string ):boolean {
		return StringUtils.startsWith( uri, "_:" );
	},

	generateBNodeID():string {
		return "_:" + UUIDUtils.generate();
	},

	isPrefixed( uri:string ):boolean {
		return ! URI.isAbsolute( uri ) && ! URI.isBNodeID( uri ) && StringUtils.contains( uri, ":" );
	},

	isFragmentOf( fragmentURI:string, uri:string ):boolean {
		if( ! URI.hasFragment( fragmentURI ) ) return false;

		const documentURI:string = URI.getDocumentURI( fragmentURI );
		return documentURI === "" || documentURI === uri;
	},

	isBaseOf( baseURI:string, uri:string ):boolean {
		if( baseURI === uri ) return true;
		if( baseURI === "" ) return true;
		if( URI.isRelative( uri ) && ! URI.isPrefixed( uri ) ) return true;

		if( uri.startsWith( baseURI ) ) {
			if( StringUtils.endsWith( baseURI, "/" ) || StringUtils.endsWith( baseURI, "#" ) ) return true;

			let relativeURI:string = uri.substring( baseURI.length );
			if( StringUtils.startsWith( relativeURI, "/" ) || StringUtils.startsWith( relativeURI, "#" ) ) return true;
		}

		return false;
	},

	getRelativeURI( absoluteURI:string, base:string ):string {
		if( ! absoluteURI.startsWith( base ) )
			return absoluteURI;
		return absoluteURI.substring( base.length );
	},

	getDocumentURI( uri:string ):string {
		let parts:string[] = uri.split( "#" );
		if( parts.length > 2 ) throw new IllegalArgumentError( "The URI provided has more than one # sign." );

		return parts[ 0 ];
	},

	getFragment( uri:string ):string {
		let parts:string[] = uri.split( "#" );
		if( parts.length < 2 ) throw new IllegalArgumentError( "The URI provided hasn't a # sign." );
		if( parts.length > 2 ) throw new IllegalArgumentError( "The URI provided has more than one # sign." );

		return parts[ 1 ];
	},

	getSlug( uri:string ):string {
		let uriParts:string[] = uri.split( "#" );
		if( uriParts.length === 2 ) return URI.getSlug( uriParts[ 1 ] );
		if( uriParts.length > 2 ) throw new IllegalArgumentError( "Invalid URI: The uri contains two '#' symbols." );

		uri = uriParts[ 0 ];

		if( uri === "" ) return uri;
		if( uri === "/" ) return "";

		let parts:string[] = uri.split( "/" );
		if( parts[ parts.length - 1 ] === "" ) {
			return parts[ parts.length - 2 ];
		} else {
			return parts[ parts.length - 1 ];
		}
	},

	getParameters( uri:string ):Map<string, string | string[]> {
		const parameters:Map<string, string | string[]> = new Map();

		if( ! URI.hasQuery( uri ) ) return parameters;

		uri.replace( /^.*\?/, "" ).split( "&" ).forEach( ( param:string ) => {
			const parts:string[] = param
				.replace( /\+/g, " " )
				.split( "=" );

			const key:string = parts.shift()!;
			const val:string = parts.length > 0 ? parts.join( "=" ) : "";

			if( ! parameters.has( key ) ) {
				parameters.set( key, val );
			} else {
				parameters.set( key, new Array<string>().concat( parameters.get( key )!, val ) );
			}
		} );

		return parameters;
	},

	resolve( parentURI:string, childURI:string ):string {
		if( ! parentURI || URI.isAbsolute( childURI ) || URI.isBNodeID( childURI ) || URI.isPrefixed( childURI ) )
			return childURI;

		let protocol:string = parentURI.substr( 0, parentURI.indexOf( "://" ) + 3 );
		let path:string = parentURI.substr( parentURI.indexOf( "://" ) + 3, parentURI.length - 1 );
		if( path.lastIndexOf( "/" ) === - 1 ) path += "/";

		if( StringUtils.startsWith( childURI, "?" ) || StringUtils.startsWith( childURI, "#" ) ) {
			if( URI.hasQuery( path ) ) path = path.substr( 0, path.indexOf( "?" ) );
			if( URI.hasFragment( path ) && (! StringUtils.startsWith( childURI, "?" ) || StringUtils.endsWith( path, "#" )) ) path = URI.getDocumentURI( path );
		} else {
			path = path.substr( 0, path.lastIndexOf( "/" ) + 1 );
			if( ! StringUtils.endsWith( path, "?" ) && ! StringUtils.endsWith( path, "#" ) && ! StringUtils.endsWith( path, "/" ) ) path += "/";
		}

		if( StringUtils.startsWith( childURI, "/" ) ) {
			childURI = childURI.substr( 1, childURI.length );
		}

		return protocol + path + childURI;
	},

	removeProtocol( uri:string ):string {
		if( ! URI.hasProtocol( uri ) ) return uri;
		return uri.substring( uri.indexOf( "://" ) + 3 );
	},

	prefix( uri:string, prefixOrObjectSchema:string | DigestedObjectSchema, prefixURI?:string ):string {
		if( ! isString( prefixOrObjectSchema ) ) return prefixWithObjectSchema( uri, prefixOrObjectSchema );

		const prefix:string = prefixOrObjectSchema;

		if( URI.isPrefixed( uri ) || ! uri.startsWith( prefixURI! ) ) return uri;

		return `${prefix}:${uri.substring( prefixURI!.length )}`;
	},
};

function prefixWithObjectSchema( uri:string, objectSchema:DigestedObjectSchema ):string {
	const prefixEntries:IterableIterator<[ string, string ]> = objectSchema.prefixes.entries();
	while( true ) {
		const result:IteratorResult<[ string, string ]> = prefixEntries.next();
		if( result.done ) return uri;

		let [ prefix, prefixURI ]:[ string, string ] = result.value;
		if( ! URI.isAbsolute( prefixURI ) ) continue;
		if( ! uri.startsWith( prefixURI ) ) continue;

		return URI.prefix( uri, prefix, prefixURI );
	}
}
