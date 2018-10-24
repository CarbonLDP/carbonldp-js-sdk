import { HTTPError } from "../HTTPError";

const name:string = "BadGatewayError";
const statusCode:number = 502;

/**
 * Error class to indicate that the server was acting as a gateway or proxy and received an invalid response from the upstream server.
 */
export class BadGatewayError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
