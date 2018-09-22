import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import { BaseResolvablePointer } from "../Repository/BaseResolvablePointer";
import { ResolvablePointer } from "../Repository/ResolvablePointer";

import { QueryableProperty } from "./QueryableProperty";


export interface QueryablePointer extends ResolvablePointer {
	$_queryableMetadata:QueryableProperty | undefined;


	$isQueried():boolean;
}


export type QueryablePointerFactory =
	& ModelPrototype<QueryablePointer, ResolvablePointer>
	& ModelDecorator<QueryablePointer, BaseResolvablePointer>
	& ModelTypeGuard<QueryablePointer>
	;

export const QueryablePointer:QueryablePointerFactory = {
	PROTOTYPE: {
		$_queryableMetadata: void 0,

		$isQueried( this:QueryablePointer ):boolean {
			return ! ! this.$_queryableMetadata;
		},
	},


	isDecorated( object:object ):object is QueryablePointer {
		return ModelDecorator
			.hasPropertiesFrom( QueryablePointer.PROTOTYPE, object );
	},

	decorate<T extends BaseResolvablePointer>( object:T ):T & QueryablePointer {
		if( QueryablePointer.isDecorated( object ) ) return object;

		const target:T & ResolvablePointer = ModelDecorator
			.decorateMultiple( object, ResolvablePointer );

		return ModelDecorator
			.definePropertiesFrom( QueryablePointer.PROTOTYPE, target );
	},


	is( value:any ):value is QueryablePointer {
		return ResolvablePointer.is( value )
			&& QueryablePointer.isDecorated( value )
			;
	},
};
