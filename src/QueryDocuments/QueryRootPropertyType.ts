/**
 * Type of retrieval for the root documents.
 */
export enum QueryRootPropertyType {
	/**
	 * Retrieves the children of a container.
	 */
	CHILD = "child",
	/**
	 * Retrieves the members of a container.
	 */
	MEMBER = "member",
	/**
	 * Retrieves specific documents.
	 */
	DOCUMENT = "document",
}
