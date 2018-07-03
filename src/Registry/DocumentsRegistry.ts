import { Document } from "../Document";
import { DocumentsContext } from "../DocumentsContext";
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


export class DocumentsRegistry extends RegistryService<Document, DocumentsContext> {

	readonly context:DocumentsContext | undefined;

	constructor( context?:DocumentsContext ) {
		super( Document, context );
	}


	register( id:string ):Document {
		return this._register( { id } );
	}

	_getLocalID( id:string ):string {
		if( URI.isBNodeID( id ) || URI.hasFragment( id ) )
			return Registry.PROTOTYPE._getLocalID.call( this, id );

		return super._getLocalID( id );
	}


	_parseFailedResponse<T extends object>( response:Response | Error | null ):Promise<never> {
		if( ! (response instanceof Response) ) return super._parseFailedResponse( response );

		return super
			._parseFailedResponse( response )
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
