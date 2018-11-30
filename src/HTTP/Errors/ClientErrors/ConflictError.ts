import { HTTPError } from "../HTTPError";

const name:string = "ConflictError";
const statusCode:number = 409;

/**
 * Error class to indicate that the request could not be processed because of a conflict, such as an ID conflict.
 */
export class ConflictError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
