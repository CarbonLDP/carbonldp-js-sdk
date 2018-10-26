import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import { BaseResolvablePointer } from "../Repository/BaseResolvablePointer";
import { ResolvablePointer } from "../Repository/ResolvablePointer";

import { QueryableProperty } from "./QueryableProperty";


/**
 * Model of a resource that can be queried or has been queried.
 */
export interface QueryablePointer extends ResolvablePointer {
	/**
	 * Metadata with the data to query the resource again.
	 */
	$_queryableMetadata:QueryableProperty | undefined;


	/**
	 * Returns true if the resource has been queried.
	 */
	$isQueried():boolean;
}


/**
 * Factory, decorator and utils for {@link QueryablePointer}.
 */
export type QueryablePointerFactory =
	& ModelPrototype<QueryablePointer, ResolvablePointer>
	& ModelDecorator<QueryablePointer, BaseResolvablePointer>
	& ModelTypeGuard<QueryablePointer>
	;

/**
 * Constant that implements {@link QueryablePointerFactory}.
 */
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
