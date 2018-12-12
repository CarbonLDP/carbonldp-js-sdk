import { AbstractError } from "../../Errors/AbstractError";
import { Response } from "../Response";


/**
 * Generic error class that defines any type of HTTP Error used in the SDK.
 */
export class HTTPError extends AbstractError {
	/**
	 * Status code of the HTTP error.
	 */
	static get statusCode():number | null { return null; }

	get name():string { return "HTTPError"; }

	/**
	 * Response that was received with the HTTP error.
	 */
	response:Response;

	constructor( message:string, response:Response ) {
		super( message );
		this.response = response;
	}
}
