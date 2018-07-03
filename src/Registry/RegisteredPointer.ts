import { ModelFactory } from "../core";
import { Pointer } from "../Pointer";
import { BaseRegisteredPointer } from "./BaseRegisteredPointer";
import { Registry } from "./Registry";


export interface RegisteredPointer extends Pointer {
	$registry:Registry<RegisteredPointer>;
}


export type RegisteredPointerFactory =
	& ModelFactory<RegisteredPointer, BaseRegisteredPointer>
	;

export const RegisteredPointer:RegisteredPointerFactory = {
	create<T extends object>( data:T & BaseRegisteredPointer ):T & RegisteredPointer {
		const copy:T & BaseRegisteredPointer = Object.assign( {}, data );
		return RegisteredPointer.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseRegisteredPointer ):T & RegisteredPointer {
		return Pointer.createFrom( object );
	},
};
