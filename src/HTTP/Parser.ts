/**
 * Interface that represents a what a parser must contains to be used when converting the response of a request.
 */
export interface Parser<T> {
	/**
	 * Parses the provided string to a specified T element.
	 * @param body The body string of the request to parse.
	 */
	parse( body:string ):Promise<T>;
}
