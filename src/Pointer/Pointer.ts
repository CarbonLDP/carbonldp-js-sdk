import { Registry } from "../Registry";
import * as Utils from "../Utils";
import { BasePointer } from "./BasePointer";


export interface Pointer {
	_registry:Registry<Pointer> | undefined;
	_id:string;

	id:string;
}


export interface PointerFactory {
	isDecorated( object:object ):object is Pointer;

	is( value:any ):value is Pointer;


	create<T extends object>( data?:T & BasePointer ):T & Pointer;

	createFrom<T extends object>( object:T & BasePointer ):T & Pointer;

	decorate<T extends object>( object:T ):T & Pointer;


	areEqual( pointer1:Pointer, pointer2:Pointer ):boolean;

	getIDs( pointers:Pointer[] ):string[];

	getID( pointerOrIRI:Pointer | string ):string;
}

export const Pointer:PointerFactory = {
	isDecorated( object:object ):object is Pointer {
		return (
			Utils.hasPropertyDefined( object, "_id" ) &&
			Utils.hasPropertyDefined( object, "id" )
		);
	},

	is( value:any ):value is Pointer {
		return (
			Utils.isObject( value ) &&
			Pointer.isDecorated( value )
		);
	},


	create<T extends object>( data?:T & BasePointer ):T & Pointer {
		const clone:T = Object.assign( {}, data );
		return Pointer.createFrom<T>( clone );
	},

	createFrom<T extends object>( object:T & BasePointer ):T & Pointer {
		return Pointer.decorate<T>( object );
	},

	decorate<T extends object>( object:T ):T & Pointer {
		if( Pointer.isDecorated( object ) ) return object;

		const pointer:T & Pointer = object as T & Pointer;
		Object.defineProperties( pointer, {
			"_registry": {
				writable: true,
				enumerable: false,
				configurable: true,
			},

			"_id": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: pointer.id || "",
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

	getID( pointerOrIRI:Pointer | string ):string {
		return Utils.isString( pointerOrIRI ) ? pointerOrIRI : pointerOrIRI.id;
	},
};

