import { CarbonLDP } from "../CarbonLDP";
import { Context } from "../Context";
import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { IllegalStateError } from "../Errors/IllegalStateError";
import { URI } from "../RDF/URI";
import { MessagingService } from "./Service";

export function validateEventContext( context:Context ):void {
	if( ! ( context && (context as CarbonLDP).messaging instanceof MessagingService ) )
		throw new IllegalStateError( "This instance does not support messaging subscriptions." );
}

export function validateEventType( event:string ):void {
	if( ! /(access-point|child|\*)\.(created|\*)|(document|\*)\.(modified|deleted|\*)|(member|\*)\.(added|removed|\*)/.test( event ) ) throw new IllegalArgumentError( `Provided event type "${ event }" is invalid.` );
}

export function parseURIPattern( uriPattern:string, baseURI:string ):string {
	if( ! URI.isBaseOf( baseURI, uriPattern ) ) throw new IllegalArgumentError( `Provided uriPattern "${ uriPattern }" is an invalid for your Carbon LDP instance.` );

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
