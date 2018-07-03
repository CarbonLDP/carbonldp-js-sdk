import {
	ModelDecorator,
	ModelPrototype,
	ModelTypeGuard
} from "../core";
import { Pointer } from "../Pointer";
import { Repository } from "./index";

export interface ResolvablePointer extends Pointer {
	$repository:Repository;
	$eTag:string | undefined;

	_resolved:boolean;

	isResolved():boolean;
}


export type ResolvablePointerFactory =
	& ModelPrototype<ResolvablePointer, Pointer>
	& ModelDecorator<ResolvablePointer>
	& ModelTypeGuard<ResolvablePointer>
	;

export const ResolvablePointer:ResolvablePointerFactory = {
	PROTOTYPE: {
		$repository: void 0,
		$eTag: void 0,

		_resolved: false,

		isResolved( this:ResolvablePointer ):boolean {
			return this._resolved;
		},
	},


	isDecorated( object:object ):object is ResolvablePointer {
		return ModelDecorator
			.hasPropertiesFrom( ResolvablePointer.PROTOTYPE, object )
			;
	},

	decorate<T extends object>( object:T ):T & ResolvablePointer {
		if( ResolvablePointer.isDecorated( object ) ) return object;

		const resource:T & Pointer = ModelDecorator
			.decorateMultiple( object, Pointer );

		return ModelDecorator
			.definePropertiesFrom( ResolvablePointer.PROTOTYPE, resource );
	},


	is( value:any ):value is ResolvablePointer {
		return Pointer.is( value )
			&& ResolvablePointer.isDecorated( value )
			;
	},
};
