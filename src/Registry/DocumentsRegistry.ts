import { CarbonLDP } from "../CarbonLDP";
import {
	Document,
	TransientDocument,
} from "../Document";
import { IllegalArgumentError } from "../Errors";
import { GlobalContext } from "../GlobalContext";
import { Response } from "../HTTP";
import {
	HTTPError,
	statusCodeMap,
	UnknownError
} from "../HTTP/Errors";
import { JSONLDParser } from "../JSONLD";
import { ErrorResponse } from "../LDP";
import {
	DigestedObjectSchema,
	ObjectSchemaDigester
} from "../ObjectSchema";
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


	_requestURLFor( pointer:Pointer, uri?:string ):string {
		uri = uri ? URI.resolve( pointer.id, uri ) : pointer.id;

		if( URI.isBNodeID( uri ) )
			throw new IllegalArgumentError( `"${ uri }" (Blank Node) can't be fetched directly.` );
		if( URI.hasFragment( uri ) )
			throw new IllegalArgumentError( `"${ uri }" (Named Fragment) can't be fetched directly.` );

		const localIRI:string = this._getLocalID( uri );
		if( localIRI === null )
			throw new IllegalArgumentError( `"${ uri }" is outside ${ this._context ? `"${ this._context.baseURI }" ` : "" }scope.` );

		if( this._context )
			return URI.resolve( this._context.baseURI, localIRI );

		if( URI.isRelative( uri ) )
			throw new IllegalArgumentError( `"${ uri }" Sí` );

		return localIRI;
	}


	_parseErrorResponse<T extends object>( response:Response | Error | null ):Promise<never> {
		if( ! response || response instanceof Error ) return Promise.reject( response );

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
