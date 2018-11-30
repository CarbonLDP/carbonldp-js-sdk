import { ModelFactory } from "./ModelFactory";

/**
 * Interface with the methods for a model creation with an optional base data.
 */
export interface ModelFactoryOptional<MODEL extends object, BASE extends object = object> extends ModelFactory<MODEL, BASE> {
	/**
	 * Creates an object model with the provided data.
	 * @param data The optional data to use in the model creation.
	 */
	create<T extends object>( data?:T & BASE ):T & MODEL;
}
