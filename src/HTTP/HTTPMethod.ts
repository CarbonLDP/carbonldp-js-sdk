/**
 * Enum for the HTTP/1.1 methods.
 */
export enum HTTPMethod {
	/**
	 * Identifies the OPTIONS HTTP/1.1 method, which allows the client to determine the options and/or requirements associated with a resource, or the capabilities of a server, without implying a resource action or initiating a resource retrieval.
	 */
	OPTIONS,
	/**
	 * Identifies the HEAD HTTP/1.1 method, which returns only the headers of a GET HTTP request.
	 */
	HEAD,
	/**
	 * Identifies the GET HTTP/1.1 method, which returns whatever information is identified by the request URI.
	 */
	GET,
	/**
	 * Identifies the POST HTTP/1.1 method, which requests to the server to create a new entity.
	 */
	POST,
	/**
	 * Identifies the PUT HTTP/1.1 method, which allows you to replace an entirely entity, or to send a signal to a resource.
	 */
	PUT,
	/**
	 * Identifies the PATCH HTTP/1.1 method, which allows you to update specified fields of an entity.
	 */
	PATCH,
	/**
	 * Identifies the DELETE HTTP/1.1 method, which allows you to request the deletion of a resource identified by the request URI.
	 */
	DELETE,
}
