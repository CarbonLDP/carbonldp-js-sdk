/**
 * Interface that defines the property of a schema.
 */
export interface ObjectSchemaProperty {
	/**
	 * The URI of the property in the JSON-LD which is mapped to the key name where the definition is referred.
	 */
	"@id"?:string;
	/**
	 * The type of values the property have.
	 * This can be set to `"@id"` for pointers, or a {@link XSD} type for literals.
	 */
	"@type"?:string;
	/**
	 * The language the string property value has.
	 */
	"@language"?:string | null;
	/**
	 * If the property is multiple it can be of tree types:
	 * - `@set`: An unsorted array of elements.
	 * - `@list`: A sorted array of elements.
	 * - `@language`: A string property with multiple languages tags.
	 */
	"@container"?:string;
}
