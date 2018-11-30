import { HTTPError } from "../HTTPError";

const name:string = "BadResponseError";
const statusCode:number = 0;

/**
 * Error class to indicate that the response obtained isn't the expected or can't be interpreted.
 */
export class BadResponseError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
