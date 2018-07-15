import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { URI } from "../RDF/URI";


export function validateEventType( event:string ):void {
	if( ! /(access-point|child|\*)\.(created|\*)|(document|\*)\.(modified|deleted|\*)|(member|\*)\.(added|removed|\*)/.test( event ) ) throw new IllegalArgumentError( `Provided event type "${ event }" is invalid.` );
}

export function parseURIPattern( uriPattern:string, baseURI:string ):string {
	if( ! URI.isBaseOf( baseURI, uriPattern ) ) throw new IllegalArgumentError( `"${ uriPattern }" is out of scope.` );

	if( uriPattern === "/" ) return "";
	uriPattern = URI.getRelativeURI( uriPattern, baseURI );
	uriPattern = uriPattern.substring( + uriPattern.startsWith( "/" ), uriPattern.length - + uriPattern.endsWith( "/" ) );

	return uriPattern
		.split( "/" )
		.map( slug => {
			if( slug === "**" ) return "#";
			return encodeURIComponent( slug )
				.replace( /\./g, "^" );
		} ).join( "." )
		;
}

export function createDestination( event:string, uriPattern:string, baseURI:string ):string {
	validateEventType( event );

	uriPattern = parseURIPattern( uriPattern, baseURI );
	return `/topic/${ event }${ uriPattern ? "." + uriPattern : uriPattern }`;
}
