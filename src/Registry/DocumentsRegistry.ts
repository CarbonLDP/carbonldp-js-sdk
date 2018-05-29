import { CarbonLDP } from "../CarbonLDP";
import { Document } from "../Document";
import { IllegalArgumentError } from "../Errors";
import { FreeResources } from "../FreeResources";
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
	ObjectSchemaUtils
} from "../ObjectSchema";
import { Pointer } from "../Pointer";
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


	_requestURLFor( pointer:Pointer, uri?:string ):string {
		if( uri && this._context ) {
			const schema:DigestedObjectSchema = this.getGeneralSchema();
			uri = ObjectSchemaUtils.resolveURI( uri, schema );
		}

		const id:string = uri ? URI.resolve( pointer.id, uri ) : pointer.id;

		const localIRI:string = this._getLocalID( id );
		if( this._context )
			return URI.resolve( this._context.baseURI, localIRI );

		if( URI.isRelative( id ) )
			throw new IllegalArgumentError( `"${ id }" cannot be resolved.` );
		return id;
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
					.getPointers( true )
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
