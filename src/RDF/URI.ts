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

		if( uri.startsWith( baseURI ) ) {
			if( Utils.S.endsWith( baseURI, "/" ) || Utils.S.endsWith( baseURI, "#" ) ) return true;

			let relativeURI:string = uri.substring( baseURI.length );
			if( Utils.S.startsWith( relativeURI, "/" ) || Utils.S.startsWith( relativeURI, "#" ) ) return true;
		}

		return false;
	}

	static getRelativeURI( absoluteURI:string, base:string ):string {
		if ( ! absoluteURI.startsWith( base ) )
			return absoluteURI;
		return absoluteURI.substring( base.length );
	}

	static getDocumentURI( uri:string ):string {
		let parts:string[] = uri.split( "#" );
		if ( parts.length > 2 ) throw new Error( "IllegalArgument: The URI provided has more than one # sign." );

		return parts[ 0 ];
	}

	static getFragment( uri:string ):string {
		let parts:string[] = uri.split( "#" );
		if ( parts.length < 2 ) return null;
		if ( parts.length > 2 ) throw new Error( "IllegalArgument: The URI provided has more than one # sign." );

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

	static resolve( parentURI:string, childURI:string ):string {
		if ( Util.isAbsolute( childURI ) || Util.isPrefixed( childURI ) )
			return childURI;

		let finalURI:string = parentURI;
		if ( ! Utils.S.endsWith( parentURI, "#" ) && ! Utils.S.endsWith( parentURI, "/" ) ) finalURI += "/";

		if ( Utils.S.startsWith( childURI, "/" ) ) {
			finalURI = finalURI + childURI.substr( 1, childURI.length );
		} else finalURI += childURI;

		return finalURI;
	}

	static removeProtocol( uri:string ):string {
		if ( Utils.S.startsWith( uri, "https://" ) ) return uri.substr( 5, uri.length );
		if ( Utils.S.startsWith( uri, "http://" ) ) return uri.substr( 4, uri.length );
		return uri;
	}

	static prefix( uri:string, prefix:string, prefixURI:string ):string;
	static prefix( uri:string, objectSchema:ObjectSchema.DigestedObjectSchema ):string;
	static prefix( uri:string, prefixOrObjectSchema:any, prefixURI:string = null ):string {
		let objectSchema:ObjectSchema.DigestedObjectSchema = ! Utils.isString( prefixOrObjectSchema ) ? prefixOrObjectSchema : null;
		let prefix:string = Utils.isString( prefixOrObjectSchema ) ? prefixOrObjectSchema : null;

		if( objectSchema !== null ) return prefixWithObjectSchema( uri, objectSchema );

		if ( Util.isPrefixed( uri ) || ! uri.startsWith( prefixURI ) )
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
