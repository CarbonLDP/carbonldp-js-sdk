import * as Errors from "./../Errors";
import * as ObjectSchema from "./../ObjectSchema";
import * as Utils from "./../Utils";

export class Class {
	stringValue:string;

	constructor( stringValue:string ) {
		this.stringValue = stringValue;
	}

	toString():string {
		return this.stringValue;
	}
}

export class Util {
	static hasFragment( uri:string ):boolean {
		return uri.indexOf( "#" ) !== - 1;
	}

	static hasQuery( uri:string ):boolean {
		return uri.indexOf( "?" ) !== - 1;
	}

	static hasProtocol( uri:string ):boolean {
		return Utils.S.startsWith( uri, "https://" ) || Utils.S.startsWith( uri, "http://" );
	}

	static isAbsolute( uri:string ):boolean {
		return Utils.S.startsWith( uri, "http://" )
			|| Utils.S.startsWith( uri, "https://" )
			|| Utils.S.startsWith( uri, "://" );
	}

	static isRelative( uri:string ):boolean {
		return ! Util.isAbsolute( uri );
	}

	static isBNodeID( uri:string ):boolean {
		return Utils.S.startsWith( uri, "_:" );
	}

	static generateBNodeID():string {
		return "_:" + Utils.UUID.generate();
	}

	static isPrefixed( uri:string ):boolean {
		return ! Util.isAbsolute( uri ) && ! Util.isBNodeID( uri ) && Utils.S.contains( uri, ":" );
	}

	static isFragmentOf( fragmentURI:string, uri:string ):boolean {
		if( ! Util.hasFragment( fragmentURI ) ) return false;

		return Util.getDocumentURI( fragmentURI ) === uri;
	}

	static isBaseOf( baseURI:string, uri:string ):boolean {
		if( baseURI === uri ) return true;
		if( baseURI === "" ) return true;
		if( Util.isRelative( uri ) && ! Util.isPrefixed( uri ) ) return true;

		if( uri.startsWith( baseURI ) ) {
			if( Utils.S.endsWith( baseURI, "/" ) || Utils.S.endsWith( baseURI, "#" ) ) return true;

			let relativeURI:string = uri.substring( baseURI.length );
			if( Utils.S.startsWith( relativeURI, "/" ) || Utils.S.startsWith( relativeURI, "#" ) ) return true;
		}

		return false;
	}

	static getRelativeURI( absoluteURI:string, base:string ):string {
		if( ! absoluteURI.startsWith( base ) )
			return absoluteURI;
		return absoluteURI.substring( base.length );
	}

	static getDocumentURI( uri:string ):string {
		let parts:string[] = uri.split( "#" );
		if( parts.length > 2 ) throw new Error( "IllegalArgument: The URI provided has more than one # sign." );

		return parts[ 0 ];
	}

	static getFragment( uri:string ):string {
		let parts:string[] = uri.split( "#" );
		if( parts.length < 2 ) return null;
		if( parts.length > 2 ) throw new Error( "IllegalArgument: The URI provided has more than one # sign." );

		return parts[ 1 ];
	}

	static getSlug( uri:string ):string {
		let uriParts:string[] = uri.split( "#" );
		if( uriParts.length === 2 ) return Util.getSlug( uriParts[ 1 ] );
		if( uriParts.length > 2 ) throw new Errors.IllegalArgumentError( "Invalid URI: The uri contains two '#' symbols." );

		uri = uriParts[ 0 ];

		if( uri === "" ) return uri;
		if( uri === "/" ) return uri;

		let parts:string[] = uri.split( "/" );
		if( parts[ parts.length - 1 ] === "" ) {
			return parts[ parts.length - 2 ] + "/";
		} else {
			return parts[ parts.length - 1 ];
		}
	}

	static getParameters( uri:string ):Map<string, string | string[]> {
		let parameters:Map<string, string | string[]> = new Map();

		if( ! Util.hasQuery( uri ) ) return parameters;

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
	}

	static resolve( parentURI:string, childURI:string ):string {
		if( Util.isAbsolute( childURI ) || Util.isBNodeID( childURI ) || Util.isPrefixed( childURI ) )
			return childURI;

		let protocol:string = parentURI.substr( 0, parentURI.indexOf( "://" ) + 3 );
		let path:string = parentURI.substr( parentURI.indexOf( "://" ) + 3,  parentURI.length - 1 );
		if( path.lastIndexOf( "/" ) === -1 ) path += "/";

		if( Utils.S.startsWith( childURI, "?" ) || Utils.S.startsWith( childURI, "#" ) ) {
			if( Util.hasQuery( path ) ) path = path.substr( 0, path.indexOf( "?" ) );
			if( Util.hasFragment( path ) && ( ! Utils.S.startsWith( childURI, "?" ) || Utils.S.endsWith( path, "#" ) ) ) path = Util.getDocumentURI( path );
		} else {
			path = path.substr( 0, path.lastIndexOf( "/" ) + 1 );
			if( ! Utils.S.endsWith( path, "?" ) && ! Utils.S.endsWith( path, "#" )  && ! Utils.S.endsWith( path, "/" ) ) path += "/";
		}

		if( Utils.S.startsWith( childURI, "/" ) ) {
			childURI = childURI.substr( 1, childURI.length );
		}

		return protocol + path + childURI;
	}

	static removeProtocol( uri:string ):string {
		if( Utils.S.startsWith( uri, "https://" ) ) return uri.substr( 5, uri.length );
		if( Utils.S.startsWith( uri, "http://" ) ) return uri.substr( 4, uri.length );
		return uri;
	}

	static prefix( uri:string, prefix:string, prefixURI:string ):string;
	static prefix( uri:string, objectSchema:ObjectSchema.DigestedObjectSchema ):string;
	static prefix( uri:string, prefixOrObjectSchema:any, prefixURI:string = null ):string {
		let objectSchema:ObjectSchema.DigestedObjectSchema = ! Utils.isString( prefixOrObjectSchema ) ? prefixOrObjectSchema : null;
		let prefix:string = Utils.isString( prefixOrObjectSchema ) ? prefixOrObjectSchema : null;

		if( objectSchema !== null ) return prefixWithObjectSchema( uri, objectSchema );

		if( Util.isPrefixed( uri ) || ! uri.startsWith( prefixURI ) )
			return uri;

		return `${ prefix }:${ uri.substring( prefixURI.length ) }`;
	}
}

function prefixWithObjectSchema( uri:string, objectSchema:ObjectSchema.DigestedObjectSchema ):string {
	let prefixEntries:IterableIterator<[ string, Class ]> = objectSchema.prefixes.entries();
	while( true ) {
		let result:IteratorResult<[ string, Class ]> = prefixEntries.next();
		if( result.done ) return uri;

		let [ prefix, prefixURI ]:[ string, Class ] = result.value;
		if( ! Util.isAbsolute( prefixURI.toString() ) ) continue;
		if( ! uri.startsWith( prefixURI.toString() ) ) continue;

		return Util.prefix( uri, prefix, prefixURI.toString() );
	}
}

export default Class;
