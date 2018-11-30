import { ObjectSchema } from "../ObjectSchema/ObjectSchema";

/**
 * Interface to define the pair TYPE/SCHEMA of a model.
 */
export interface ModelSchema<T extends string = string> {
	/**
	 * The type associated to the model.
	 */
	TYPE:T;
	/**
	 * The schema associated to the model.
	 */
	SCHEMA:ObjectSchema;
}

/**
 * Constant with the utils for {@link ModelSchema}.
 */
export const ModelSchema:{
	/**
	 * Returns true when the object provided has the properties of a {@link ModelSchema}.
	 * @param object The object to check.
	 */
	is( object:object ):object is ModelSchema;
} = {
	is( object:object ):object is ModelSchema {
		return "TYPE" in object
			&& "SCHEMA" in object
			;
	},
};
