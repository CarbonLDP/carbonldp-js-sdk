import { Repository } from ".";
import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype,
	ModelTypeGuard
} from "../core";
import { Pointer } from "../Pointer";
import { BaseResolvablePointer } from "./BaseResolvablePointer";

export interface ResolvablePointer extends Pointer {
	$repository:Repository;
	$eTag:string | undefined;

	_resolved:boolean;

	isResolved():boolean;
}


export type ResolvablePointerFactory =
	& ModelPrototype<ResolvablePointer, Pointer & BaseResolvablePointer>
	& ModelDecorator<ResolvablePointer, BaseResolvablePointer>
	& ModelTypeGuard<ResolvablePointer>
	& ModelFactory<ResolvablePointer, BaseResolvablePointer>
	;

export const ResolvablePointer:ResolvablePointerFactory = {
	PROTOTYPE: {
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

	decorate<T extends BaseResolvablePointer>( object:T ):T & ResolvablePointer {
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


	create<T extends object>( data:T & BaseResolvablePointer ):T & ResolvablePointer {
		// FIXME
		return ResolvablePointer.createFrom( { ...data as any } );
	},

	createFrom<T extends object>( object:T & BaseResolvablePointer ):T & ResolvablePointer {
		return ResolvablePointer.decorate( object );
	},
};
