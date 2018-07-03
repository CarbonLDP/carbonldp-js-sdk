import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype,
	ModelTypeGuard
} from "../core";
import * as Utils from "../Utils";
import { isObject } from "../Utils";
import { BasePointer } from "./BasePointer";


export interface Pointer {
	$id:string;
}


export interface PointerFactory extends ModelPrototype<Pointer>, ModelDecorator<Pointer>, ModelFactory<Pointer, BasePointer>, ModelTypeGuard<Pointer> {
	create<T extends object>( data?:T & BasePointer ):T & Pointer;


	areEqual( pointer1:Pointer, pointer2:Pointer ):boolean;

	getIDs( pointers:Pointer[] ):string[];

	getID( pointerOrIRI:Pointer | string ):string;
}

export const Pointer:PointerFactory = {
	PROTOTYPE: {
		get $id():string { return ""; },
	},


	isDecorated( object:object ):object is Pointer {
		return ModelDecorator
			.hasPropertiesFrom( Pointer.PROTOTYPE, object );
	},

	decorate<T extends object>( object:T ):T & Pointer {
		if( Pointer.isDecorated( object ) ) return object;

		return ModelDecorator
			.definePropertiesFrom( Pointer.PROTOTYPE, object );
	},


	is( value:any ):value is Pointer {
		return isObject( value )
			&& Pointer.isDecorated( value )
			;
	},

	create<T extends object>( data?:T & BasePointer ):T & Pointer {
		const clone:T = Object.assign( {}, data );
		return Pointer.createFrom<T>( clone );
	},

	createFrom<T extends object>( object:T & BasePointer ):T & Pointer {
		return Pointer.decorate<T>( object );
	},


	areEqual( pointer1:Pointer, pointer2:Pointer ):boolean {
		return pointer1.$id === pointer2.$id;
	},

	getIDs( pointers:Pointer[] ):string[] {
		return pointers
			.map( pointer => pointer.$id )
			;
	},

	getID( pointerOrIRI:Pointer | string ):string {
		return Utils.isString( pointerOrIRI ) ? pointerOrIRI : pointerOrIRI.$id;
	},
};

