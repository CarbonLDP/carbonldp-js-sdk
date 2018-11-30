import { ContainerType } from "./ContainerType";
import { PointerType } from "./PointerType";


/**
 * Standardized definition of a property in a schema.
 */
export class DigestedObjectSchemaProperty {
	/**
	 * The URI that represents the property.
	 */
	uri:string = null;
	/**
	 * Indicates if the property is a literal or not.
	 */
	literal:boolean = null;
	/**
	 * The type of literal the property is.
	 * Will be `null` when the property is not a literal.
	 */
	literalType:string = null;
	/**
	 * Type of pointer the property value is related.
	 */
	pointerType:PointerType = null;
	/**
	 * The language the property value is in.
	 */
	language?:string;
	/**
	 * Type of container when the property contains multiple values.
	 * Will be `null` when the property is not a multiple one.
	 */
	containerType:ContainerType = null;
}
