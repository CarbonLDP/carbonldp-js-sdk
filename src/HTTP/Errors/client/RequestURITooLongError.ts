import HTTPError from "./../HTTPError";
import Response from "./../../Response";

const name:string = "RequestURITooLongError";
const statusCode:number = 414;

class RequestURITooLongError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }

	constructor( message:string, response:Response ) {
		super( message, response );
		Object.setPrototypeOf( this, RequestURITooLongError.prototype );
	}
}

export default RequestURITooLongError;
