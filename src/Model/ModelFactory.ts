/**
 * Interface with the standard methods for a model creation.
 */
export interface ModelFactory<MODEL extends object, BASE extends object = object> {
	/**
	 * Creates an object model with the provided data.
	 * @param data The data to create the model.
	 */
	create<W extends object>( data:W & BASE ):W & MODEL;

	/**
	 * Creates an object model from the provided object.
	 * @param object The object with the base data to be converted into the model.
	 */
	createFrom<W extends object>( object:W & BASE ):W & MODEL;
}
