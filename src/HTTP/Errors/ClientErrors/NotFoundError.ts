import { HTTPError } from "../HTTPError";

const name:string = "NotFoundError";
const statusCode:number = 404;

/**
 * Error class to indicate that the resource was not found.
 */
export class NotFoundError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
