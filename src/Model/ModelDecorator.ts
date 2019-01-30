import { isFunction } from "../Utils";


/**
 * Interface with the methods of a model decoration.
 */
export interface ModelDecorator<MODEL extends object, BASE extends object = object> {
	/**
	 * Returns true if the object provided has the decorated properties and methods of a model.
	 * @param object The object to check.
	 */
	isDecorated( object:object ):object is MODEL;

	/**
	 * Decorates an object with the correct prototypes to create a model.
	 * @param object The object to decorate.
	 */
	decorate<W extends object>( object:W & BASE ):W & MODEL;
}


/**
 * Factory and utils for {@link ModelDecorator}.
 */
export interface ModelDecoratorFactory {
	hasPropertiesFrom<P extends object, O extends object>( prototype:P, object:O ):boolean;

	definePropertiesFrom<P extends object, O extends object>( prototype:P, object:O ):O & P;

	decorateMultiple<O extends B1, M1 extends object, B1 extends object>( object:O, model1:ModelDecorator<M1, B1> ):O & M1;
	decorateMultiple<O extends B1 & Pick<B2, Exclude<keyof B2, keyof M1>>, M1 extends object, B1 extends object, M2 extends object, B2 extends object>( object:O, model1:ModelDecorator<M1, B1>, model2:ModelDecorator<M2, B2> ):O & M1 & M2;
	decorateMultiple<O extends B1 & B2 & B3, M1 extends object, B1 extends object, M2 extends object, B2 extends object, M3 extends object, B3 extends object>( object:O, model1:ModelDecorator<M1, B1>, model2:ModelDecorator<M2, B2>, model3:ModelDecorator<M3, B3> ):O & M1 & M2 & M3;
	decorateMultiple<O extends B1 & B2 & B3 & B4, M1 extends object, B1 extends object, M2 extends object, B2 extends object, M3 extends object, B3 extends object, M4 extends object, B4 extends object>( object:O, model1:ModelDecorator<M1, B1>, model2:ModelDecorator<M2, B2>, model3:ModelDecorator<M3, B3>, model4:ModelDecorator<M4, B4> ):O & M1 & M2 & M3 & M4;
	decorateMultiple<O extends B1 & B2 & B3 & B4 & B5, M1 extends object, B1 extends object, M2 extends object, B2 extends object, M3 extends object, B3 extends object, M4 extends object, B4 extends object, M5 extends object, B5 extends object>( object:O, model1:ModelDecorator<M1, B1>, model2:ModelDecorator<M2, B2>, model3:ModelDecorator<M3, B3>, model4:ModelDecorator<M4, B4>, model5:ModelDecorator<M5, B5> ):O & M1 & M2 & M3 & M4 & M5;
	decorateMultiple<O extends B1 & B2 & B3 & B4 & B5 & B6, M1 extends object, B1 extends object, M2 extends object, B2 extends object, M3 extends object, B3 extends object, M4 extends object, B4 extends object, M5 extends object, B5 extends object, M6 extends object, B6 extends object>( object:O, model1:ModelDecorator<M1, B1>, model2:ModelDecorator<M2, B2>, model3:ModelDecorator<M3, B3>, model4:ModelDecorator<M4, B4>, model5:ModelDecorator<M5, B5>, model6:ModelDecorator<M6, B6> ):O & M1 & M2 & M3 & M4 & M5 & M6;
}

/**
 * Constant that implements {@link ModelDecoratorFactory}.
 */
export const ModelDecorator:ModelDecoratorFactory = {
	hasPropertiesFrom( prototype:object, object:object ):boolean {
		const prototypeKeys:string[] = Object
			.keys( prototype );

		const shouldAddDollar:boolean = "$id" in object
			&& ! prototypeKeys.some( key => key.startsWith( "$" ) );

		return prototypeKeys
			.every( key => {
				const targetKey:string = shouldAddDollar ?
					"$" + key : key;


				const definition:PropertyDescriptor | undefined = Object
					.getOwnPropertyDescriptor( prototype, key );

				if( ! definition ) return false;


				const targetDefinition:PropertyDescriptor | undefined = Object
					.getOwnPropertyDescriptor( object, targetKey );

				if( ! targetDefinition ) return false;


				if( isFunction( definition.value ) )
					return isFunction( targetDefinition.value );

				return ! targetDefinition.enumerable;
			} )
			;
	},

	definePropertiesFrom<P extends object, O extends object>( prototype:P, object:O ):O & P {
		const prototypeKeys:string[] = Object
			.keys( prototype );

		const shouldAddDollar:boolean = "$id" in object
			&& ! prototypeKeys.some( key => key.startsWith( "$" ) );

		prototypeKeys
			.forEach( key => {
				const targetKey:string = shouldAddDollar ?
					"$" + key : key;


				const definition:PropertyDescriptor = Object
					.getOwnPropertyDescriptor( prototype, key )!;

				const descriptor:PropertyDescriptor = {
					enumerable: false,
					configurable: true,
				};

				if( isFunction( definition.value ) ) {
					descriptor.writable = false;
					descriptor.value = definition.value;

				} else if( ! definition.set ) {
					descriptor.writable = true;
					descriptor.value = object.hasOwnProperty( targetKey ) ?
						object[ targetKey ] : definition.get ?
							definition.get() : definition.value;

				} else {
					descriptor.get = definition.get;
					descriptor.set = definition.set;
				}

				Object.defineProperty( object, targetKey, descriptor );
			} )
		;

		return object as P & O;
	},

	decorateMultiple<O extends object, M extends object>( object:O, ...models:ModelDecorator<M>[] ):O & M {
		models.forEach( model => model.decorate( object ) );
		return object as O & M;
	},
};
