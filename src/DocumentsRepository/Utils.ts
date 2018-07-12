import { Pointer } from "../Pointer/Pointer";

import { URI } from "../RDF/URI";

import { ResolvablePointer } from "../Repository/ResolvablePointer";

import { isString } from "../Utils";


export function _getNotInContextMessage( uri:string ):string {
	return `"${ uri }" is outside the scope of the repository context.`;
}


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
