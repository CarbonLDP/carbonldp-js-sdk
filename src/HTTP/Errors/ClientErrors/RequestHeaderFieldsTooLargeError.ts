import { HTTPError } from "../HTTPError";

const name:string = "RequestHeaderFieldsTooLargeError";
const statusCode:number = 431;

/**
 * Error class to indicate that the server is not able to process the request because its header fields are too large.
 */
export class RequestHeaderFieldsTooLargeError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
