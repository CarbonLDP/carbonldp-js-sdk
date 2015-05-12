import * as Utils from '../Utils';

class Util {
	static hasFragment( uri:string ):boolean {
		return uri.indexOf( '#' ) != - 1;
	}

	static isAbsolute( uri:string ):boolean {
		if ( Utils.S.startsWith( uri, 'http://' ) ) return true;
		if ( Utils.S.startsWith( uri, 'https://' ) ) return true;
		if ( Utils.S.startsWith( uri, '://' ) ) return true;
	}

	static isRelative( uri:string ):boolean {
		return ! Util.isAbsolute( uri );
	}

	static getDocumentURI( uri:string ):string {
		var parts:string[] = uri.split( '#' );
		if ( parts.length > 2 ) throw new Error( 'IllegalArgument: The URI provided has more than one # sign.' );

		return parts[ 0 ];
	}

	static resolve( parentURI:string, childURI:string ):string {
		var finalURI:string = parentURI;
		if ( ! Utils.S.endsWith( parentURI, '/' ) ) finalURI += '/';

		if ( Utils.S.startsWith( childURI, '/' ) ) finalURI = finalURI + childURI.substr( 1, childURI.length );
		else finalURI += childURI;

		return finalURI;
	}
}

export { Util };