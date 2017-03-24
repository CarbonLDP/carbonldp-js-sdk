import HTTPError from "./../HTTPError";
import Response from "./../../Response";

const name:string = "RequestEntityTooLargeError";
const statusCode:number = 413;

export class RequestEntityTooLargeError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }

	constructor( message:string, response:Response ) {
		super( message, response );
		Object.setPrototypeOf( this, RequestEntityTooLargeError.prototype );
	}
}

export default RequestEntityTooLargeError;
