import { HTTPError } from "../HTTPError";

const name:string = "BadRequestError";
const statusCode:number = 400;

/**
 * Error class to indicate that a malformed request has been sent.
 */
export class BadRequestError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
