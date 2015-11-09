import * as Utils from "../Utils";

export class Util {
	static hasFragment( uri:string ):boolean {
		return uri.indexOf( "#" ) !== - 1;
	}

	static hasProtocol( uri:string ):boolean {
		return Utils.S.startsWith( uri, "https://" ) || Utils.S.startsWith( uri, "http://" );
	}

	static isAbsolute( uri:string ):boolean {
		if ( Utils.S.startsWith( uri, "http://" ) ) return true;
		if ( Utils.S.startsWith( uri, "https://" ) ) return true;
		if ( Utils.S.startsWith( uri, "://" ) ) return true;
	}

	static isRelative( uri:string ):boolean {
		return ! Util.isAbsolute( uri );
	}

	static isBNodeID( uri:string ):boolean {
		return Utils.S.startsWith( uri, "_:" );
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

	static resolve( parentURI:string, childURI:string ):string {
		let finalURI:string = parentURI;
		if ( ! Utils.S.endsWith( parentURI, "/" ) ) finalURI += "/";

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
}
