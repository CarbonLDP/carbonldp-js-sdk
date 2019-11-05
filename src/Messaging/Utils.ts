import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { URI } from "../RDF/URI";


/**
 * Throws an error when an invalid event is provided.
 * @param event The event to check.
 */
export function _validateEventType( event:string ):void {
	if( !/(access-point|child|\*)\.(created|\*)|(document|\*)\.(modified|deleted|\*)|(member|\*)\.(added|removed|\*)/.test( event ) ) throw new IllegalArgumentError( `Provided event type "${ event }" is invalid.` );
}

/**
 * Parses an URI pattern into the form of a AMQP path.
 * @param uriPattern The URI pattern to parse.
 * @param baseURI The base URI to remove from an absolute URI pattern since the AMQP requires a relative path.
 */
export function _parseURIPattern( uriPattern:string, baseURI:string ):string {
	if( !URI.isBaseOf( baseURI, uriPattern ) ) throw new IllegalArgumentError( `"${ uriPattern }" is out of scope.` );

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

/**
 * Creates a complete AMQP path to use as the destination of a subscription.
 * @param event The event target to subscribe.
 * @param uriPattern The URI pattern to subscribe.
 * @param baseURI The base URI ro remove from an absolute URI pattern.
 */
export function _createDestination( event:string, uriPattern:string, baseURI:string ):string {
	_validateEventType( event );

	uriPattern = _parseURIPattern( uriPattern, baseURI );
	return `/topic/${ event }${ uriPattern ? "." + uriPattern : uriPattern }`;
}
