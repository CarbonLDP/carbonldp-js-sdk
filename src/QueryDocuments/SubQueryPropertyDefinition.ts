import { QuerySchemaProperty } from "./QuerySchemaProperty";


/**
 * Internal interface that extends the definition of a query property
 * when creating an internal sub-property.
 *
 * @private
 */
export interface SubQueryPropertyDefinition extends QuerySchemaProperty {
	/**
	 * Flag that can avoid the search of a inheritable definition
	 * when is ensured that the current definition is complete.
	 */
	inherit?:false;
}
