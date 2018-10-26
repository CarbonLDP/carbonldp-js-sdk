import { QuerySchemaProperty } from "./QuerySchemaProperty";


/**
 * Interface that describes an object that contains the data to to use in a partial query creation.
 */
export interface QuerySchema {
	/**
	 * An entry that describes a property to retrieve with the name specified and the assigned property schema.
	 * If a string is provided this will be interpreted as the URI of the property.
	 */
	[ propertyName:string ]:QuerySchemaProperty | string;
}
