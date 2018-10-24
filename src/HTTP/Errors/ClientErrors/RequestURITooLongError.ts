import { HTTPError } from "../HTTPError";

const name:string = "RequestURITooLongError";
const statusCode:number = 414;

/**
 * Error class to indicate that the server is not able to process the request because the URI is too long.
 */
export class RequestURITooLongError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
