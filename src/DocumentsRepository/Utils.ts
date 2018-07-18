import { DocumentsRegistry } from "../DocumentsRegistry/DocumentsRegistry";

import { FreeResources } from "../FreeResources/FreeResources";

import { HTTPError } from "../HTTP/Errors/HTTPError";

import { JSONLDParser } from "../JSONLD/JSONLDParser";

import { ErrorResponse } from "../LDP/ErrorResponse";

import { Pointer } from "../Pointer/Pointer";

import { RDFDocument } from "../RDF/Document";
import { RDFNode } from "../RDF/Node";

import { URI } from "../RDF/URI";

import { ResolvablePointer } from "../Repository/ResolvablePointer";

import { isString } from "../Utils";


export function _parseURIParams<T>( this:void, resource:ResolvablePointer, uri?:string | T, args?:IArguments ):{ _uri:string, _args:any[] } {
	const _uri:string = isString( uri ) ?
		URI.resolve( resource.$id, uri ) : resource.$id;

	const _args:any[] = ! isString( uri ) ?
		Array.from( args ) :
		Array.prototype.slice.call( args, 1 );

	return { _uri, _args };
}

export function _parseResourceParams<T>( this:void, resource:ResolvablePointer, $resource?:ResolvablePointer | T, args?:IArguments ):{ _resource:ResolvablePointer, _args:any[] } {
	const _resource:ResolvablePointer = Pointer.is( $resource ) ?
		$resource : resource;

	const _args:any[] = ! Pointer.is( $resource ) ?
		Array.from( args ) :
		Array.prototype.slice.call( args, 1 );

	return { _resource, _args };
}


export function _getErrorResponseParserFn( this:void, registry:DocumentsRegistry ):( error:HTTPError | Error ) => Promise<never> {
	return ( error:HTTPError | Error ) => {
		if( ! ("response" in error) ) return Promise.reject( error );
		if( ! error.response.data ) return Promise.reject( error );

		return new JSONLDParser()
			.parse( error.response.data )
			.then( ( rdfNodes:RDFNode[] ) => {
				const freeNodes:RDFNode[] = RDFDocument.getFreeNodes( rdfNodes );
				const freeResources:FreeResources = FreeResources.parseFreeNodes( registry, freeNodes );

				const errorResponses:ErrorResponse[] = freeResources
					.getPointers( true )
					.filter( ErrorResponse.is );

				if( errorResponses.length === 0 )
					return Promise.reject( error );

				const errorResponse:ErrorResponse = Object.assign( error, errorResponses[ 0 ] );
				error.message = ErrorResponse.getMessage( errorResponse );

				return Promise.reject( error );
			}, () => {
				return Promise.reject( error );
			} );
	};
}
