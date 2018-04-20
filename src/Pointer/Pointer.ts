import { Document } from "../Document";
import { IllegalStateError } from "../Errors";
import { GETOptions } from "../HTTP";
import { QueryDocumentBuilder } from "../SPARQL/QueryDocument";
import * as Utils from "../Utils";
import { BasePointer } from "./BasePointer";


export interface Pointer {
	_id:string;
	_resolved:boolean;

	id:string;

	isResolved():boolean;

	resolve<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	resolve<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
}


export interface PointerFactory {
	isDecorated( object:object ):object is Pointer;

	is( value:any ):value is Pointer;


	create<T extends BasePointer>( data?:T ):T & Pointer;

	createFrom<T extends BasePointer>( object:T ):T & Pointer;

	decorate<T extends object>( object:T ):T & Pointer;


	areEqual( pointer1:Pointer, pointer2:Pointer ):boolean;

	getIDs( pointers:Pointer[] ):string[];
}


export function isPointerResolved( this:Pointer ):boolean {
	return this._resolved;
}

export function resolveStandalonePointer( this:Pointer ):Promise<never> {
	return Promise.reject( new IllegalStateError( "The pointer has not been assigned to a context." ) );
}

export const Pointer:PointerFactory = {
	isDecorated( object:object ):object is Pointer {
		return (
			Utils.hasPropertyDefined( object, "_id" ) &&
			Utils.hasPropertyDefined( object, "_resolved" ) &&

			Utils.hasPropertyDefined( object, "id" ) &&

			Utils.hasFunction( object, "isResolved" ) &&
			Utils.hasFunction( object, "resolve" )
		);
	},

	is( value:any ):value is Pointer {
		return (
			Utils.isObject( value ) &&
			Pointer.isDecorated( value )
		);
	},


	create<T extends BasePointer>( data:T ):T & Pointer {
		const clone:T = Object.assign( {}, data );
		return Pointer.createFrom<T>( clone );
	},

	createFrom<T extends BasePointer>( object:T ):T & Pointer {
		return Pointer.decorate<T>( object );
	},

	decorate<T extends object>( object:T ):T & Pointer {
		if( Pointer.isDecorated( object ) ) return object;

		const pointer:T & Pointer = object as T & Pointer;
		Object.defineProperties( pointer, {
			"_id": {
				writable: true,
				configurable: true,
				value: pointer.id || "",
			},
			"_resolved": {
				writable: true,
				configurable: true,
				value: pointer._resolved || false,
			},
			"id": {
				enumerable: false,
				configurable: true,
				get( this:Pointer ):string {
					return this._id;
				},
				set( this:Pointer, value:string ):void {
					this._id = value;
				},
			},
			"isResolved": {
				configurable: true,
				value: isPointerResolved,
			},
			"resolve": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: resolveStandalonePointer,
			},
		} );

		return pointer;
	},


	areEqual( pointer1:Pointer, pointer2:Pointer ):boolean {
		return pointer1.id === pointer2.id;
	},

	getIDs( pointers:Pointer[] ):string[] {
		return pointers
			.map( pointer => pointer.id )
			;
	},
};

