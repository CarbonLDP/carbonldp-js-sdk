import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { DigestedObjectSchema } from "../ObjectSchema";
import {
	isString,
	StringUtils,
	UUIDUtils,
} from "../Utils";

export interface URIFactory {
	hasFragment( uri:string ):boolean;


	hasQuery( uri:string ):boolean;


	hasProtocol( uri:string ):boolean;


	isAbsolute( uri:string ):boolean;


	isRelative( uri:string ):boolean;


	isBNodeID( uri:string ):boolean;


	generateBNodeID():string;


	isPrefixed( uri:string ):boolean;


	isFragmentOf( fragmentURI:string, uri:string ):boolean;


	isBaseOf( baseURI:string, uri:string ):boolean;


	getRelativeURI( absoluteURI:string, base:string ):string;


	getDocumentURI( uri:string ):string;


	getFragment( uri:string ):string;


	getSlug( uri:string ):string;


	getParameters( uri:string ):Map<string, string | string[]>;


	resolve( parentURI:string, childURI:string ):string;


	removeProtocol( uri:string ):string;


	prefix( uri:string, prefix:string, prefixURI:string ):string;

	prefix( uri:string, objectSchema:DigestedObjectSchema ):string;
}

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

		return URI.getDocumentURI( fragmentURI ) === uri;
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
		if( parts.length > 2 ) throw new Error( "IllegalArgument: The URI provided has more than one # sign." );

		return parts[ 0 ];
	},

	getFragment( uri:string ):string {
		let parts:string[] = uri.split( "#" );
		if( parts.length < 2 ) return null;
		if( parts.length > 2 ) throw new Error( "IllegalArgument: The URI provided has more than one # sign." );

		return parts[ 1 ];
	},

	getSlug( uri:string ):string {
		let uriParts:string[] = uri.split( "#" );
		if( uriParts.length === 2 ) return URI.getSlug( uriParts[ 1 ] );
		if( uriParts.length > 2 ) throw new IllegalArgumentError( "Invalid URI: The uri contains two '#' symbols." );

		uri = uriParts[ 0 ];

		if( uri === "" ) return uri;
		if( uri === "/" ) return uri;

		let parts:string[] = uri.split( "/" );
		if( parts[ parts.length - 1 ] === "" ) {
			return parts[ parts.length - 2 ] + "/";
		} else {
			return parts[ parts.length - 1 ];
		}
	},

	getParameters( uri:string ):Map<string, string | string[]> {
		let parameters:Map<string, string | string[]> = new Map();

		if( ! URI.hasQuery( uri ) ) return parameters;

		uri.replace( /^.*\?/, "" ).split( "&" ).forEach( ( param:string ) => {
			let parts:string[] = param.replace( /\+/g, " " ).split( "=" );

			let key:string = parts.shift();
			let val:string = parts.length > 0 ? parts.join( "=" ) : null;

			if( ! parameters.has( key ) ) {
				parameters.set( key, val );
			} else {
				parameters.set( key, [].concat( parameters.get( key ), val ) );
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
			if( URI.hasFragment( path ) && ( ! StringUtils.startsWith( childURI, "?" ) || StringUtils.endsWith( path, "#" ) ) ) path = URI.getDocumentURI( path );
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

		if( URI.isPrefixed( uri ) || ! uri.startsWith( prefixURI ) ) return uri;

		return `${ prefix }:${ uri.substring( prefixURI.length ) }`;
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

export default URI;
