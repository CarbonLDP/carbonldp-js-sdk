import { Class as Context } from "../Context";
import { IllegalArgumentError, IllegalStateError } from "../Errors";
import { Util as URIUtils } from "../RDF/URI";

export function validateEventContext( context:Context ):void {
	if( context &&
		"connectMessaging" in context &&
		"messagingClient" in context
	) return;
	throw new IllegalStateError( "This instance does not support messaging events" );
}

export function validateEventType( eventType:string ):void {
	if( ! /(access-point|child|\*\.created|\*)|(document|\*\.modidied|deleted\*)|(member|\*\.added|removed|\*)/.test( eventType ) ) throw new IllegalArgumentError( `Provided event type "${ eventType }" is invalid` );
}

export function parseURIPattern( uriPattern:string, baseURI:string ):string {
	if( ! URIUtils.isBaseOf( baseURI, uriPattern ) ) throw new IllegalArgumentError( `Provided uriPattern "${ uriPattern }" an invalid Carbon URI` );

	if( uriPattern === "/" ) return "";
	uriPattern = URIUtils.getRelativeURI( uriPattern, baseURI );
	uriPattern = uriPattern.substring( + uriPattern.startsWith( "/" ), uriPattern.length - + uriPattern.endsWith( "/" ) );

	return uriPattern
		.split( "/" )
		.map( slug => {
			if( slug === "**" ) return "#";
			return encodeURIComponent( slug )
				.replace( ".", "^" );
		} ).join( "." )
		;
}

export function createDestination( eventType:string, uriPattern:string, baseURI:string ):string {
	uriPattern = parseURIPattern( uriPattern, baseURI );
	return `/topic/${ eventType }${ uriPattern ? "." + uriPattern : uriPattern }`;
}
