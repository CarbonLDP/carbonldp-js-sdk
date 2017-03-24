import HTTPError from "./../HTTPError";
import Response from "./../../Response";

const name:string = "HTTPVersionNotSupportedError";
const statusCode:number = 505;

export class HTTPVersionNotSupportedError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }

	constructor( message:string, response:Response ) {
		super( message, response );
		Object.setPrototypeOf( this, HTTPVersionNotSupportedError.prototype );
	}
}

export default HTTPVersionNotSupportedError;
