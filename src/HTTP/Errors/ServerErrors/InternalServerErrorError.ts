import { HTTPError } from "../HTTPError";

const name:string = "InternalServerErrorError";
const statusCode:number = 500;

/**
 * Error class to indicate that the server encountered an unexpected condition. This generic error is given when no other specific error is suitable.
 */
export class InternalServerErrorError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
