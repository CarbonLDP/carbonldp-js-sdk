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
 * Constant that implements {@link RegisteredPointerFactory}
 */
export const RegisteredPointer:RegisteredPointerFactory = {
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
