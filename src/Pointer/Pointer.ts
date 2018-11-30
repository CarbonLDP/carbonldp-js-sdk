import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import { isObject } from "../Utils";

import { BasePointer } from "./BasePointer";


/**
 * Interface that represents the base to any model that can be referenced by a URI.
 */
export interface Pointer {
	/**
	 * The URI that identifies the pointer.
	 */
	$id:string;
}


// TODO: Change to type-alias
/**
 * Factory, decorator and utils for {@link Pointer}.
 */
export interface PointerFactory extends ModelPrototype<Pointer>
	, ModelDecorator<Pointer, BasePointer>
	, ModelTypeGuard<Pointer>
	, ModelFactory<Pointer, BasePointer> {

	/**
	 * Creates a pointer object with the ID provided.
	 * @param data The optional data to use in the pointer creation.
	 */
	create<T extends object>( data?:T & BasePointer ):T & Pointer;


	/**
	 * Checks if the objects refer to the same resource by its ID.
	 * @param pointer1
	 * @param pointer2
	 */
	areEqual( pointer1:Pointer, pointer2:Pointer ):boolean;

	/**
	 * Extracts the IDs of all the pointers provided.
	 * @param pointers The array of pointers to obtain their IDs.
	 */
	getIDs( pointers:Pointer[] ):string[];

	/**
	 * Extract the IF of the pointer provided.
	 * @param pointerOrIRI Pointer to extract its ID, or the URI that will be immediately returned.
	 */
	getID( pointerOrIRI:Pointer | string ):string;
}

/**
 * Constant that implements {@link PointerFactory}.
 */
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
		return isObject( pointerOrIRI ) ? pointerOrIRI.$id : pointerOrIRI;
	},
};
