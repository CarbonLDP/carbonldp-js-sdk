import HTTPError from "./../HTTPError";
import Response from "./../../Response";

const name:string = "NotAcceptableError";
const statusCode:number = 406;

class NotAcceptableError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }

	constructor( message:string, response:Response ) {
		super( message, response );
		Object.setPrototypeOf( this, NotAcceptableError.prototype );
	}
}

export default NotAcceptableError;
