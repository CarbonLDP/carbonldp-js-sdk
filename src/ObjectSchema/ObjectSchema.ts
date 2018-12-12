import { ObjectSchemaProperty } from "./ObjectSchemaProperty";

/**
 * Interface that represents an schema based in the [JSON-LD contexts](https://www.w3.org/TR/json-ld/#the-context).
 *
 * This is used to convert from the JSON-LD stored in the server to the resources used in the SDK and viceversa.
 */
export interface ObjectSchema {
	/**
	 * An absolute URI that is used to resolve relative URIs.
	 * If it's set to `null`, this will invalidate the usage of a previous `@base` value.
	 */
	"@base"?:string | null;
	/**
	 * An absolute URI that is used to as the common prefix for all the relative properties.
	 * If it's set to `null`, this will invalidate the usage of a previous `@vocab` value.
	 */
	"@vocab"?:string | null;
	/**
	 * [Not Supported] This element is ignored.
	 */
	"@index"?:object;
	/**
	 * The default language of the string properties.
	 */
	"@language"?:string | null;
	/**
	 * [Not Supported] This element is ignored.
	 */
	"@reverse"?:object;

	/**
	 * This index can be interpreted in two forms: prefix or property.
	 *
	 * ### Prefix
	 * - When the value is as string.
	 * The key is taken the prefix name and the string value must be an absolute URI.
	 *
	 * ### Property
	 * - When the value is of type {@link ObjectSchemaProperty}.
	 * The key is taken as the property name and the {@link ObjectSchemaProperty} must be a valid definition.
	 */
	[ name:string ]:string | ObjectSchemaProperty | undefined | null;
}
