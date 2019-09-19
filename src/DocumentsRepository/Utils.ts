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


/**
 * Parse the arguments of a relative repository method detecting if has a valid URI
 * if not, the URI will be taken from the resource provided.
 * @param resource The resource from where is executing the repository method.
 * @param uri The possible URI to be selected or another argument.
 * @param args All the arguments of the repository method that is been executed.
 * @returns An object with the target URI detected and the rest of the arguments to be applied in the repository method.
 */
export function _parseURIParams<T>( this:void, resource:ResolvablePointer, uri?:string | T, args?:IArguments ):{ _uri:string, _args:any[] } {
	const _uri:string = isString( uri ) ?
		URI.resolve( resource.$id, uri ) : resource.$id;

	const _args:any[] = ! isString( uri ) ?
		Array.from( args! ) :
		Array.prototype.slice.call( args, 1 );

	return { _uri, _args };
}

/**
 * Parse the arguments of a relative repository method detecting if has a valid resource
 * if not, the resource will be the one provided by the param {@param resource}.
 * @param resource The resource from where is executing the repository method.
 * @param $resource The possible target resource to be selected or another argument.
 * @param args All the arguments of the repository method that is been executed.
 * @returns An object with the target resource detected and the rest of the argument to be applied in the repository method.
 */
export function _parseResourceParams<T>( this:void, resource:ResolvablePointer, $resource?:ResolvablePointer | T, args?:IArguments ):{ _resource:ResolvablePointer, _args:any[] } {
	const _resource:ResolvablePointer = Pointer.is( $resource ) ?
		$resource : resource;

	const _args:any[] = ! Pointer.is( $resource ) ?
		Array.from( args! ) :
		Array.prototype.slice.call( args, 1 );

	return { _resource, _args };
}


/**
 * Returns a function that can parse a {@link HTTPError} into a {@link ErrorResponse} inside a rejected Promise.
 * @param registry The registry from where to get the information to convert the {@link HTTPError#response `HTTPError.response`}'s data.
 */
export function _getErrorResponseParserFn( this:void, registry:DocumentsRegistry ):( error:HTTPError | Error ) => Promise<never> {
	return ( error:HTTPError | Error ) => {
		if( ! ("response" in error) ) return Promise.reject( error );
		if( ! error.response.data ) return Promise.reject( error );

		return new JSONLDParser()
			.parse( error.response.data )
			.then( ( rdfNodes:object[] ) => {
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
