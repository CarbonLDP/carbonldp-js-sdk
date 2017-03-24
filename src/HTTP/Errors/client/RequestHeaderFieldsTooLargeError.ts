import HTTPError from "./../HTTPError";
import Response from "./../../Response";

const name:string = "RequestHeaderFieldsTooLargeError";
const statusCode:number = 431;

export class RequestHeaderFieldsTooLargeError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }

	constructor( message:string, response:Response ) {
		super( message, response );
		Object.setPrototypeOf( this, RequestHeaderFieldsTooLargeError.prototype );
	}
}

export default RequestHeaderFieldsTooLargeError;
