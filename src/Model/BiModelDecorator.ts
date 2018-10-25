import { Pointer } from "../Pointer/Pointer";

import { ModelDecorator, ModelDecoratorFactory } from "./ModelDecorator";


/**
 * Interface with the methods of a model decoration of plain object and an {@link Pointer} based model.
 * The {@link Pointer} based one, will be decorated adding a `$` before every property and method name,
 * while the plain one will just add the normal property and methods names.
 */
export interface BiModelDecorator<MODEL extends object, $MODEL extends Pointer, BASE extends object, $BASE extends Pointer> extends ModelDecorator<MODEL, BASE> {
	/**
	 * Returns true if the object provided has the decorated properties and methods of a {@link Pointer} based model.
	 * @param object The object to check.
	 */
	isDecorated( object:Pointer ):object is $MODEL;
	/**
	 * Returns true if the object provided has the decorated properties and methods of a model.
	 * @param object The object to check.
	 */
	isDecorated( object:object ):object is MODEL;

	/**
	 * Decorates an object with the extended prototypes to create a {@link Pointer} based model.
	 * @param object The object to decorate.
	 */
	decorate<T extends object>( object:T & $BASE ):T & $MODEL;
	/**
	 * Decorates an object with the correct prototypes to create a model.
	 * @param object The object to decorate.
	 */
	decorate<T extends object>( object:T & BASE ):T & MODEL;
}

/**
 * Constant that implements {@link ModelDecoratorFactory} extending to support {@link Pointer} based models.
 */
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
