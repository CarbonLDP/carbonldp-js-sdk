import HTTPError from "./../HTTPError";
import Response from "./../../Response";

const name:string = "NotFoundError";
const statusCode:number = 404;

class NotFoundError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }

	constructor( message:string, response:Response ) {
		super( message, response );
		Object.setPrototypeOf( this, NotFoundError.prototype );
	}
}

export default NotFoundError;
