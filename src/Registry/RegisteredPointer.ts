import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype
} from "../Model";
import { Pointer } from "../Pointer";
import { BaseRegisteredPointer } from "./BaseRegisteredPointer";
import { Registry } from "./Registry";


export interface RegisteredPointer extends Pointer {
	$registry:Registry<RegisteredPointer>;
}


export type RegisteredPointerFactory =
	& ModelPrototype<RegisteredPointer, Pointer & BaseRegisteredPointer>
	& ModelDecorator<RegisteredPointer, BaseRegisteredPointer>
	& ModelFactory<RegisteredPointer, BaseRegisteredPointer>
	;

export const RegisteredPointer:RegisteredPointerFactory = {
	PROTOTYPE: {
		$registry:void 0,
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
			.definePropertiesFrom( RegisteredPointer, resource );
	},


	create<T extends object>( data:T & BaseRegisteredPointer ):T & RegisteredPointer {
		const copy:T & BaseRegisteredPointer = Object.assign( {}, data );
		return RegisteredPointer.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseRegisteredPointer ):T & RegisteredPointer {
		return RegisteredPointer.decorate( object );
	},
};
