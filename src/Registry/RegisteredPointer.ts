import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import { Pointer } from "../Pointer/Pointer";

import { BaseRegisteredPointer } from "./BaseRegisteredPointer";
import { $Registry, Registry } from "./Registry";


/**
 * Interface that represents the base to any model that can be registered in any {@link Registry}/{@link $Registry}.
 */
export interface RegisteredPointer extends Pointer {
	/**
	 * Registry the current pointer belongs to.
	 */
	$registry:Registry<RegisteredPointer> | $Registry<RegisteredPointer> | undefined;
}


/**
 * Factory, decorator and utils for {@link RegisteredPointer}.
 */
export type RegisteredPointerFactory =
	& ModelPrototype<RegisteredPointer, Pointer>
	& ModelDecorator<RegisteredPointer, BaseRegisteredPointer>
	& ModelFactory<RegisteredPointer, BaseRegisteredPointer>
	& ModelTypeGuard<RegisteredPointer>
	;

/**
 * Constant with the factory, decorator and/or utils for an {@link RegisteredPointer} object.
 */
export const RegisteredPointer:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link RegisteredPointer}.
	 */
	PROTOTYPE: RegisteredPointerFactory["PROTOTYPE"];

	/**
	 * Checks if the RegisteredPointer has the decorated properties and methods from its prototype.
	 */
	isDecorated( object:object ):object is RegisteredPointer;

	/**
	 * Returns true when the value provided is considered to be a {@link RegisteredPointer}.
	 */
	is( value:any ):value is RegisteredPointer;

	/**
	 * Defines the RegisteredPointer's prototype properties and methods to the RegisteredPointer object.
	 */
	decorate<T extends object>( object:T & BaseRegisteredPointer ):T & RegisteredPointer;

	/**
	 * Creates a {@link RegisteredPointer} with the provided data.
	 */
	create<T extends object>( data:T & BaseRegisteredPointer ):T & RegisteredPointer;

	/**
	 * Creates a {@link RegisteredPointer} from the provided object.
	 */
	createFrom<T extends object>( object:T & BaseRegisteredPointer ):T & RegisteredPointer;
} = <RegisteredPointerFactory> {
	PROTOTYPE: {
		get $registry():Registry {
			throw new IllegalArgumentError( `Property "$registry" is required.` );
		},
	},


	isDecorated( object:object ):object is RegisteredPointer {
		return ModelDecorator
			.hasPropertiesFrom( RegisteredPointer.PROTOTYPE, object );
	},

	decorate<T extends BaseRegisteredPointer>( object:T ):T & RegisteredPointer {
		if( RegisteredPointer.isDecorated( object ) ) return object;

		const resource:T & Pointer = ModelDecorator
			.decorateMultiple( object, Pointer );

		return ModelDecorator
			.definePropertiesFrom( RegisteredPointer.PROTOTYPE, resource );
	},


	create<T extends object>( data:T & BaseRegisteredPointer ):T & RegisteredPointer {
		const copy:T & BaseRegisteredPointer = Object.assign( {}, data );
		return RegisteredPointer.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseRegisteredPointer ):T & RegisteredPointer {
		return RegisteredPointer.decorate( object );
	},

	is( value:any ):value is RegisteredPointer {
		return Pointer.is( value )
			&& RegisteredPointer.isDecorated( value )
			;
	},
};
