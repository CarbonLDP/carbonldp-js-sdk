import { Path, PathBuilder } from "sparqler/patterns";

import { SubQueryDocumentsBuilder } from "./QueryDocumentBuilder";


/**
 * Interface that describes an property to retrieve in a query creation.
 */
export interface QuerySchemaProperty {
	/**
	 * The URI that the actual property has in the platform.
	 */
	"@id"?:string;
	/**
	 * The type of the property value.
	 *
	 * If `@id` is used, it will represent a Pointer.
	 *
	 * For an literal it will generally expect the absolute XSD type URI, but a relative one can also be assigned.
	 * e.g. `string` will be interpreted as `http://www.w3.org/2001/XMLSchema#string`.
	 */
	"@type"?:"@id" | string;
	/**
	 * The only specific language of a string primitive to be retrieved.
	 */
	"@language"?:string;
	/**
	 * The container type the property will be interpreted to have.
	 * - `@set`: An unordered array of element
	 * - `@list`: An ordered array of elements
	 * - `@language`: An object map with the language as key and the string content as the value
	 */
	"@container"?:"@set" | "@list" | "@language";
	/**
	 * Function to build a sub-query to specify sub-properties or when retrieving multiple resources to filter the resources.
	 * @param queryBuilder The builder from where to construct the sub-query.
	 */
	query?:( queryBuilder:SubQueryDocumentsBuilder ) => SubQueryDocumentsBuilder;
	/**
	 * Function to build a path to specify an property that may point to data from another document.
	 * @param pathBuilder The builder from where to construct the path.
	 */
	path?:( pathBuilder:PathBuilder ) => Path;
}
