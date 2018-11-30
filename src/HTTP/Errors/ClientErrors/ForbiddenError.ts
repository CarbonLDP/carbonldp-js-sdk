import { HTTPError } from "../HTTPError";

const name:string = "ForbiddenError";
const statusCode:number = 403;

/**
 * Error class to indicate that the current user doesn't have permissions to fulfill the request.
 */
export class ForbiddenError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
