import { HTTPError } from "../HTTPError";

const name:string = "NotImplementedError";
const statusCode:number = 501;

/**
 * Error class to indicate that the server doesn't have the ability to fulfill the request yet.
 */
export class NotImplementedError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
