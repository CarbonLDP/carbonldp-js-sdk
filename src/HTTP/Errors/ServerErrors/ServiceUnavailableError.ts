import { HTTPError } from "../HTTPError";

const name:string = "ServiceUnavailableError";
const statusCode:number = 503;

/**
 * Error class to indicate that the server is currently unavailable (because it's overloaded or down for maintenance).
 */
export class ServiceUnavailableError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
