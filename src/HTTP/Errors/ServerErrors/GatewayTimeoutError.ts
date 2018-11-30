import { HTTPError } from "../HTTPError";

const name:string = "GatewayTimeoutError";
const statusCode:number = 504;

/**
 * Error class to indicate that the server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.
 */
export class GatewayTimeoutError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }
}
