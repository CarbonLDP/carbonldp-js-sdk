import HTTPError from "./../HTTPError";
import Response from "./../../Response";

const name:string = "NotImplementedError";
const statusCode:number = 501;

class NotImplementedError extends HTTPError {
	static get statusCode():number { return statusCode; }

	get name():string { return name; }

	constructor( message:string, response:Response ) {
		super( message, response );
		Object.setPrototypeOf( this, NotImplementedError.prototype );
	}
}

export default NotImplementedError;
