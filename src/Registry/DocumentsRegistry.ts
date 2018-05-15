import { CarbonLDP } from "../CarbonLDP";
import { Document, } from "../Document";
import { IllegalArgumentError } from "../Errors";
import { Response } from "../HTTP";
import {
	HTTPError,
	statusCodeMap,
	UnknownError
} from "../HTTP/Errors";
import { JSONLDParser } from "../JSONLD";
import { ErrorResponse } from "../LDP";
import { Pointer } from "../Pointer";
import {
	RDFNode,
	URI
} from "../RDF";
import { FreeResources } from "../FreeResources";
import { RegistryService } from "./RegistryService";


export class DocumentsRegistry extends RegistryService<Document, CarbonLDP> {

	readonly _context:CarbonLDP | undefined;

	constructor( context?:CarbonLDP ) {
		super( Document, context );
	}


	register( id:string ):Document {
		return this._register( { id } );
	}

	_register<T extends object>( base:T & { id:string } ):T & Document {
		const document:T & Document = super._register( base );
		document._context = this._context;

		return document;
	}


	_getLocalID( id:string ):string | null {
		if( URI.isBNodeID( id ) || URI.hasFragment( id ) ) return null;

		return super._getLocalID( id );
	}

	_resolveIRIFor( pointer:Pointer, iri?:string ):string {
		iri = iri ? URI.resolve( pointer.id, iri ) : pointer.id;

		if( URI.isBNodeID( iri ) ) throw new IllegalArgumentError( "Blank nodes cannot be fetched directly." );
		if( URI.hasFragment( iri ) ) throw new IllegalArgumentError( "Named fragments cannot be fetched directly." );

		const localIRI:string = this._getLocalID( iri );
		if( localIRI === null ) throw new IllegalArgumentError( `The IRI "${ iri }" is outside the scope of this registry.` );

		return URI.resolve( this._context.baseURI, localIRI );
	}


	_parseErrorResponse<T extends object>( response:Response | Error ):Promise<never> {
		if( response instanceof Error ) return Promise.reject( response );

		if( ! (response.status >= 400 && response.status < 600 && statusCodeMap.has( response.status )) )
			return Promise.reject( new UnknownError( response.data, response ) );

		const error:HTTPError = new (statusCodeMap.get( response.status ))( response.data, response );
		if( ! response.data ) return Promise.reject( error );

		return new JSONLDParser()
			.parse( response.data )
			.then( ( freeNodes:RDFNode[] ) => {
				const freeResources:FreeResources = this._parseFreeNodes( freeNodes );
				const errorResponses:ErrorResponse[] = freeResources
					.getPointers()
					.filter( ErrorResponse.is );
				if( errorResponses.length === 0 ) return Promise.reject( new IllegalArgumentError( "The response string does not contains a c:ErrorResponse." ) );
				if( errorResponses.length > 1 ) return Promise.reject( new IllegalArgumentError( "The response string contains multiple c:ErrorResponse." ) );

				Object.assign( error, errorResponses[ 0 ] );
				error.message = ErrorResponse.getMessage( error );
				return Promise.reject( error );
			}, () => {
				return Promise.reject( error );
			} );
	}
}
