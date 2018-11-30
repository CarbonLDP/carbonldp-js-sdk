import { HTTPError } from "../HTTPError";

const name:string = "RequestEntityTooLargeError";
const statusCode:number = 413;

/**
 * Error class to indicate that the request entity is larger than the server is able to process.
 */
export class RequestEntityTooLargeError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
