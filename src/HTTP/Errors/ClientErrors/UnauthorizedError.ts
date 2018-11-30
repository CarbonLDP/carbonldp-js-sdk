import { HTTPError } from "../HTTPError";

const name:string = "UnauthorizedError";
const statusCode:number = 401;

/**
 * Error class to indicate that authentication is required or has failed.
 */
export class UnauthorizedError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
