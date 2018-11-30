import { HTTPError } from "../HTTPError";

const name:string = "TooManyRequestsError";
const statusCode:number = 429;

/**
 * Error class to indicate that the current user has sent too many request in a given amount of time.
 */
export class TooManyRequestsError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
