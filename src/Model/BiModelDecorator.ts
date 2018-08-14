import { Pointer } from "../Pointer/Pointer";

import { ModelDecorator, ModelDecoratorFactory } from "./ModelDecorator";


export interface BiModelDecorator<MODEL extends object, $MODEL extends Pointer, BASE extends object, $BASE extends Pointer> extends ModelDecorator<MODEL, BASE> {
	isDecorated( object:Pointer ):object is $MODEL;
	isDecorated( object:object ):object is MODEL;

	decorate<T extends object>( object:T & $BASE ):T & $MODEL;
	decorate<T extends object>( object:T & BASE ):T & MODEL;
}

export const BiModelDecorator:ModelDecoratorFactory = {
	hasPropertiesFrom( prototype:object, object:object ):boolean {
		return ModelDecorator.hasPropertiesFrom( prototype, object );
	},

	definePropertiesFrom<P extends object, O extends object>( prototype:P, object:O ):O & P {
		if( "$id" in object ) Pointer
			.decorate( object );

		return ModelDecorator
			.definePropertiesFrom( prototype, object );
	},

	decorateMultiple: ModelDecorator.decorateMultiple,
};
