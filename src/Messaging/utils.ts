import Carbon from "../Carbon";
import { Class as Context } from "../Context";
import { IllegalArgumentError, IllegalStateError } from "../Errors";
import { Util as URIUtils } from "../RDF/URI";
import Service from "./Service";

export function validateEventContext( context:Context ):void {
	if( ! ( context && (context as Carbon).messaging instanceof Service ) )
		throw new IllegalStateError( "This instance does not support messaging subscriptions." );
}

export function validateEventType( eventType:string ):void {
	if( ! /(access-point|child|\*)\.(created|\*)|(document|\*)\.(modified|deleted|\*)|(member|\*)\.(added|removed|\*)/.test( eventType ) ) throw new IllegalArgumentError( `Provided event type "${ eventType }" is invalid.` );
}

export function parseURIPattern( uriPattern:string, baseURI:string ):string {
	if( ! URIUtils.isBaseOf( baseURI, uriPattern ) ) throw new IllegalArgumentError( `Provided uriPattern "${ uriPattern }" is an invalid for your Carbon instance.` );

	if( uriPattern === "/" ) return "";
	uriPattern = URIUtils.getRelativeURI( uriPattern, baseURI );
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
