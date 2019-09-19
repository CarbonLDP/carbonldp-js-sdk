import { ModelDecorator } from "../Model/ModelDecorator";


/**
 * Object that has implements a model decorator for an specific type
 * defined by the property {@link TypedModelDecorator#TYPE `TypedModelDecorator.TYPE`}.
 */
export interface TypedModelDecorator extends ModelDecorator<any, any> {
	/**
	 * The type associated to the model decorator methods.
	 */
	TYPE:string;
}
