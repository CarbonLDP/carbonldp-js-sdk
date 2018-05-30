import { CarbonLDP } from "../CarbonLDP";
import { Document } from "../Document";
import { IllegalArgumentError } from "../Errors";
import { FreeResources } from "../FreeResources";
import { Response } from "../HTTP";
import { JSONLDParser } from "../JSONLD";
import { ErrorResponse } from "../LDP";
import {
	RDFNode,
	URI
} from "../RDF";
import { Registry } from "./Registry";
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

	_getLocalID( id:string ):string {
		if( URI.isBNodeID( id ) || URI.hasFragment( id ) )
			return Registry.PROTOTYPE._getLocalID.call( this, id );

		return super._getLocalID( id );
	}


	_parseErrorFromResponse<T extends object>( response:Response | Error | null ):Promise<never> {
		if( ! (response instanceof Response) ) return super._parseErrorFromResponse( response );

		return super
			._parseErrorFromResponse( response )
			.catch( error => this._addErrorResponseData( response, error ) )
			;
	}

	protected _addErrorResponseData( response:Response, error:Error ):Promise<never> {
		if( ! response.data ) return Promise.reject( error );

		return new JSONLDParser()
			.parse( response.data )
			.then( ( freeNodes:RDFNode[] ) => {
				const freeResources:FreeResources = this._parseFreeNodes( freeNodes );

				const errorResponses:ErrorResponse[] = freeResources
					.getPointers( true )
					.filter( ErrorResponse.is );

				if( errorResponses.length === 0 ) return Promise.reject( new IllegalArgumentError( "The response string does not contains a c:ErrorResponse." ) );
				if( errorResponses.length > 1 ) return Promise.reject( new IllegalArgumentError( "The response string contains multiple c:ErrorResponse." ) );

				const errorResponse:ErrorResponse = Object.assign( error, errorResponses[ 0 ] );
				error.message = ErrorResponse.getMessage( errorResponse );
				return Promise.reject( error );
			}, () => {
				return Promise.reject( error );
			} );
	}

}
