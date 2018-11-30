import { HTTPError } from "./../HTTPError";

const name:string = "HTTPVersionNotSupportedError";
const statusCode:number = 505;

/**
 * Error class to indicate that the server doesn't support the HTTP protocol version used in the request.
 */
export class HTTPVersionNotSupportedError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
