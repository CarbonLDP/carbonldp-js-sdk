import { IllegalArgumentError } from "../Errors";
import * as Fragment from "../Fragment";
import * as Resource from "../Resource";
import {
	hasFunction,
	hasPropertyDefined,
	isObject
} from "../Utils";

import { Document } from "./";
import {
	convertNestedObjects,
	createFragment,
	createNamedFragment,
	getFragment,
	getFragments,
	getNamedFragment,
	getPointer,
	hasFragment,
	hasPointer,
	inScope,
	normalize,
	removeFragment,
	removeNamedFragment,
	toJSON,
} from "./prototype";

export const isDecoratedDocument:( object:object ) => object is Document = ( object ):object is Document =>
	isObject( object ) &&
	hasPropertyDefined( object, "_fragmentsIndex" ) &&

	hasFunction( object, "_normalize" ) &&
	hasFunction( object, "_removeFragment" ) &&

	hasFunction( object, "hasPointer" ) &&
	hasFunction( object, "getPointer" ) &&

	hasFunction( object, "inScope" ) &&

	hasFunction( object, "hasFragment" ) &&
	hasFunction( object, "getFragment" ) &&
	hasFunction( object, "getNamedFragment" ) &&
	hasFunction( object, "getFragments" ) &&
	hasFunction( object, "createFragment" ) &&
	hasFunction( object, "createNamedFragment" ) &&
	hasFunction( object, "removeNamedFragment" ) &&

	hasFunction( object, "toJSON" )
;


export const isDocument:( object:object ) => object is Document = ( object ):object is Document =>
	Resource.Factory.is( object ) &&
	isDecoratedDocument( object )
;

export const createDocument:() => Document = () => {
	return createDocumentFrom( {} );
};

export const createDocumentFrom:<T extends object>( object:T ) => T & Document = <T extends object>( object:T ) => {
	if( isDocument( object ) ) throw new IllegalArgumentError( "The object provided is already a Document." );

	const document:T & Document = decorateDocument<T>( object );
	convertNestedObjects( document, document );

	return document;
};

export const decorateDocument:<T extends object>( object:T ) => T & Document = <T extends object>( object:T ) => {
	if( isDecoratedDocument( object ) ) return object;

	Resource.Factory.decorate( object );

	Object.defineProperties( object, {
		"_fragmentsIndex": {
			configurable: true,
			value: new Map<string, Fragment.Class>(),
		},

		"_normalize": {
			configurable: true,
			value: normalize,
		},
		"_removeFragment": {
			configurable: true,
			value: removeFragment,
		},

		"hasPointer": {
			configurable: true,
			value: hasPointer,
		},
		"getPointer": {
			configurable: true,
			value: getPointer,
		},
		"inScope": {
			configurable: true,
			value: inScope,
		},

		"hasFragment": {
			configurable: true,
			value: hasFragment,
		},
		"getFragment": {
			configurable: true,
			value: getFragment,
		},
		"getNamedFragment": {
			configurable: true,
			value: getNamedFragment,
		},
		"getFragments": {
			configurable: true,
			value: getFragments,
		},
		"createFragment": {
			configurable: true,
			value: createFragment,
		},
		"createNamedFragment": {
			configurable: true,
			value: createNamedFragment,
		},
		"removeNamedFragment": {
			configurable: true,
			value: removeNamedFragment,
		},
		"toJSON": {
			configurable: true,
			value: toJSON,
		},
	} );

	return object as any;
};
