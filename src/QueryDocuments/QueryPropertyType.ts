/**
 * Types of data expected to return for a property.
 */
export enum QueryPropertyType {
	/**
	 * The property is expected to point to a partial resource (document/fragment).
	 */
	PARTIAL,
	/**
	 * The property is expected to point to a resource with only its types but will be marked as unresolved.
	 */
	EMPTY,
	/**
	 * The property is expected to point to a resource with all is properties but without related fragments resolved.
	 */
	ALL,
	/**
	 * The property is expected to point to a fulled resolved document
	 */
	FULL,
}
