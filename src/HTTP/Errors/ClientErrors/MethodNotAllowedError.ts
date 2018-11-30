import { HTTPError } from "../HTTPError";

const name:string = "MethodNotAllowedError";
const statusCode:number = 405;

/**
 * Error class to indicate that the method used in the request is not allowed for that URI.
 */
export class MethodNotAllowedError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
